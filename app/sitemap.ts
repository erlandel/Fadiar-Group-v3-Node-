// <!-- <?xml version="1.0" encoding="UTF-8"?>
// <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//   <url>
//     <loc>test.grupofadiar.com./</loc>
//     <priority>1.0</priority>
//   </url>
//   <url>
//     <loc>test.grupofadiar.com./products</loc>
//     <priority>0.9</priority>
//   </url>
//   <url>
//     <loc>test.grupofadiar.com./about</loc>
//     <priority>0.8</priority>
//   </url>
//   <url>
//     <loc>test.grupofadiar.com./contact</loc>
//     <priority>0.7</priority>
//   </url>
//   <url>
//     <loc>test.grupofadiar.com./faq</loc>
//     <priority>0.7</priority>
//   </url>
//   <url>
//     <loc>test.grupofadiar.com./shipping</loc>
//     <priority>0.6</priority>
//   </url>
//   <url>
//     <loc>test.grupofadiar.com./warranty</loc>
//     <priority>0.6</priority>
//   </url>
// </urlset> -->

import { MetadataRoute } from "next";
import { inventory_managerUrl } from "@/urlApi/urlApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const params = new URLSearchParams();
    params.append("emisor", "web");
    params.append("productos", "true");

    const res = await fetch(`${inventory_managerUrl}?${params.toString()}`);
    const data = await res.json();

    const tiendas = data.tiendas?.filter((t: any) => t.active) || [];
    const allProducts = tiendas.flatMap((t: any) => t.productos || []);

    const productUrls = allProducts.map((p: any) => ({
      url: `https://test.grupofadiar.com/product/${p.id}`,
      lastModified: new Date(),
      priority: 0.7,
    }));

    return [
      { url: "https://test.grupofadiar.com",         priority: 1.0 },
      { url: "https://test.grupofadiar.com/products", priority: 0.9 },
      { url: "https://test.grupofadiar.com/about",    priority: 0.8 },
      { url: "https://test.grupofadiar.com/contact",  priority: 0.7 },
      { url: "https://test.grupofadiar.com/faq",      priority: 0.7 },
      { url: "https://test.grupofadiar.com/shipping", priority: 0.6 },
      { url: "https://test.grupofadiar.com/warranty", priority: 0.6 },
      ...productUrls,
    ];
  } catch {
    return [
      { url: "https://test.grupofadiar.com",         priority: 1.0 },
      { url: "https://test.grupofadiar.com/products", priority: 0.9 },
      { url: "https://test.grupofadiar.com/about",    priority: 0.8 },
      { url: "https://test.grupofadiar.com/contact",  priority: 0.7 },
      { url: "https://test.grupofadiar.com/faq",      priority: 0.7 },
      { url: "https://test.grupofadiar.com/shipping", priority: 0.6 },
      { url: "https://test.grupofadiar.com/warranty", priority: 0.6 },
    ];
  }
}