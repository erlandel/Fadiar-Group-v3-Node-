"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, Suspense } from "react";
import { useInventory } from "@/hooks/productRequests/useInventory";
import { useUpcomingProducts } from "@/hooks/productRequests/useUpcomingProducts";
import { Product } from "@/types/product";
import CardAllProducts from "@/components/ui/cardAllProducts";
import SkeletonCardAllProducts from "@/components/ui/skeletonCardAllProducts";
import Pagination from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 15;

function normalizeExact(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/k/g, "c")
    .replace(/q/g, "c")
    .replace(/v/g, "b")
    .replace(/z/g, "s")
    .replace(/ll/g, "y")
    .replace(/y/g, "i")
    .replace(/rr/g, "r")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

function normalizeFuzzy(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/k/g, "c")
    .replace(/q/g, "c")
    .replace(/v/g, "b")
    .replace(/z/g, "s")
    .replace(/ll/g, "y")
    .replace(/y/g, "i")
    .replace(/rr/g, "r")
    .replace(/h/g, "")
    .replace(/[^a-z0-9\s]/g, "")
    .trim();
}

function levenshteinDistance(a: string, b: string): number {
  const n = a.length;
  const m = b.length;
  if (n === 0) return m;
  if (m === 0) return n;

  let prev = new Array<number>(m + 1);
  let curr = new Array<number>(m + 1);
  for (let j = 0; j <= m; j++) prev[j] = j;

  for (let i = 1; i <= n; i++) {
    curr[0] = i;
    const ai = a.charCodeAt(i - 1);
    for (let j = 1; j <= m; j++) {
      const cost = ai === b.charCodeAt(j - 1) ? 0 : 1;
      curr[j] = Math.min(
        prev[j] + 1,
        curr[j - 1] + 1,
        prev[j - 1] + cost
      );
    }
    const tmp = prev;
    prev = curr;
    curr = tmp;
  }
  return prev[m];
}

function calculateScore(query: string, product: Product) {
  const qWords = normalizeExact(query)
    .split(/\s+/)
    .filter((w) => w.length > 0);
  if (qWords.length === 0) return { exactMatches: 0, fuzzyMatches: 0, total: 0, percentage: 0 };

  const pTextExact = normalizeExact(
    [product.name, product.brand, product.categoria?.name || ""].join(" ")
  );
  const pTextFuzzy = normalizeFuzzy(
    [product.name, product.brand, product.categoria?.name || ""].join(" ")
  );

  const pWordsExact = pTextExact.split(/\s+/).filter((w) => w.length > 0);
  const pWordsFuzzy = pTextFuzzy.split(/\s+/).filter((w) => w.length > 0);

  let exactMatches = 0;
  let fuzzyMatches = 0;
  const usedIndices = new Set<number>();

  for (const qWord of qWords) {
    for (let i = 0; i < pWordsExact.length; i++) {
      if (qWord === pWordsExact[i] && !usedIndices.has(i)) {
        exactMatches++;
        usedIndices.add(i);
        break;
      }
    }
  }

  if (exactMatches < qWords.length) {
    for (const qWord of qWords) {
      for (let i = 0; i < pWordsFuzzy.length; i++) {
        if (usedIndices.has(i)) continue;

        const maxLen = Math.max(qWord.length, pWordsFuzzy[i].length);
        const threshold = Math.max(1, Math.floor(maxLen / 3));
        const dist = levenshteinDistance(qWord, pWordsFuzzy[i]);

        if (dist <= threshold) {
          fuzzyMatches++;
          usedIndices.add(i);
          break;
        }
      }
    }
  }

  const total = exactMatches + fuzzyMatches;
  const percentage = (exactMatches / qWords.length) * 100;

  return { exactMatches, fuzzyMatches, total, percentage };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const { data: inventoryData, isLoading: isInventoryLoading } = useInventory();
  const { data: upcomingProducts = [], isLoading: isUpcomingLoading } =
    useUpcomingProducts();

  const [currentPage, setCurrentPage] = useState(1);

  const allProducts: Product[] = useMemo(() => {
    return [
      ...(inventoryData?.products ?? []),
      ...upcomingProducts.map((p) => ({ ...p, isPreSale: true })),
    ];
  }, [inventoryData?.products, upcomingProducts]);

  const results = useMemo(() => {
    if (!query.trim()) return [];

    const scored = allProducts
      .map((product) => ({
        product,
        ...calculateScore(query, product),
      }))
      .filter((s) => s.total > 0);

    // Si hay productos con 100% de coincidencia exacta, mostrar SOLO esos
    const exact100 = scored.filter((s) => s.percentage === 100);
    if (exact100.length > 0) {
      return exact100.map((s) => s.product);
    }

    // Si hay productos con coincidencias (fuzzy o parciales), mostrar los de mayor total
    if (scored.length > 0) {
      const maxTotal = Math.max(...scored.map((s) => s.total));
      return scored
        .filter((s) => s.total === maxTotal)
        .map((s) => s.product);
    }

    // Fallback: coincidencia por caracteres
    const queryChars = [...new Set(normalizeFuzzy(query).split(""))].filter(
      (c) => c !== " "
    );
    if (queryChars.length === 0) return [];

    const charScored = allProducts
      .map((product) => {
        const productText = normalizeFuzzy(
          [
            product.name,
            product.brand,
            product.categoria?.name || "",
          ].join(" ")
        );
        let charCount = 0;
        for (const c of queryChars) {
          if (productText.includes(c)) charCount++;
        }
        return { product, matches: charCount };
      })
      .filter((item) => item.matches > 0);

    if (charScored.length === 0) return [];

    const maxCharMatches = Math.max(...charScored.map((s) => s.matches));
    return charScored
      .filter((s) => s.matches === maxCharMatches)
      .map((s) => s.product);
  }, [query, allProducts]);

  const totalPages = Math.ceil(results.length / ITEMS_PER_PAGE);
  const paginatedResults = results.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const isLoading = isInventoryLoading || isUpcomingLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 sm:gap-4">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <SkeletonCardAllProducts key={i} position="vertical" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!query.trim()) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-500 text-lg">
          Ingresa un término de búsqueda para ver resultados.
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 text-lg">
            No se encontraron productos para &quot;{query}&quot;
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#022954] mb-2">
          Resultados de búsqueda: &quot;{query}&quot;
        </h1>
        <p className="text-gray-500 mb-6">
          {results.length} producto{results.length !== 1 ? "s" : ""} encontrado
          {results.length !== 1 ? "s" : ""}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 sm:gap-4">
          {paginatedResults.map((product, index) => (
            <CardAllProducts
              key={`${product.id}-${index}`}
              productId={product.id}
              currency={product.currency}
              category={product.categoria?.name}
              title={product.name}
              brand={product.brand}
              warranty={product.warranty}
              price={product.price}
              image={product.img}
              count={product.count}
              temporal_price={product?.temporal_price}
              tiendaId={product.tiendaId}
              position="vertical"
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center my-10">
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-white">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="h-8 bg-gray-200 rounded w-64 mb-8 animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-3 sm:gap-4">
              {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
                <SkeletonCardAllProducts key={i} position="vertical" />
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
