import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import useCartStore, { CartItem } from "@/store/cartStore";
import WarningMenssage from "@/messages/warningMenssage";
import { syncCartStandalone } from "@/utils/syncCart";

// Re-exportar para compatibilidad
export { syncCartStandalone };

export const useSyncCart = (autoSync: boolean = false) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const setItems = useCartStore((state) => state.setItems);
  const setRawCart = useCartStore((state) => state.setRawCart);
  const items = useCartStore((state) => state.items);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const scheduledExpiryRef = useRef<number | null>(null);

  const syncCart = useCallback(async () => {
    setLoading(true);
    try {
      // Usar la función standalone que accede directo al store
      await syncCartStandalone();
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!autoSync || items.length === 0) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      scheduledExpiryRef.current = null;
      return;
    }

    const now = Date.now();
    let minExpiry = Infinity;

    items.forEach((item) => {
      if (item.expiryTimestamp && item.expiryTimestamp > now) {
        if (item.expiryTimestamp < minExpiry) {
          minExpiry = item.expiryTimestamp;
        }
      }
    });

    if (minExpiry === Infinity) {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      scheduledExpiryRef.current = null;
      return;
    }

    if (minExpiry !== Infinity && minExpiry !== scheduledExpiryRef.current) {
      if (timerRef.current) clearTimeout(timerRef.current);
      
      scheduledExpiryRef.current = minExpiry;
      const delay = minExpiry - now;

      timerRef.current = setTimeout(async () => {
        const expiredItem = items.find(
          (item) => item.expiryTimestamp && item.expiryTimestamp <= Date.now()
        );

        console.log("Un producto ha expirado. Sincronizando carrito automáticamente...");
        scheduledExpiryRef.current = null;

        // Primero sincronizamos el carrito (remueve items expirados del store)
        await syncCart();

        // Luego mostramos warning y redirigimos
        if (expiredItem) {
          WarningMenssage(`El producto "${expiredItem.title}" ha expirado y fue removido del carrito`);
          const cartPaths = ["/cart1","/cart2", "/cart3"];
          const shouldRedirect = cartPaths.some(path => pathname?.includes(path));
          if (shouldRedirect && useCartStore.getState().items.length === 0) {
            router.push("/");
          }
        }
      }, delay + 2000);
    }

    return () => {
      // No limpiamos el timer aquí para permitir que persista entre renders 
      // si el carrito no ha cambiado
    };
  }, [items, syncCart, autoSync]);

  return { syncCart, loading };
};
