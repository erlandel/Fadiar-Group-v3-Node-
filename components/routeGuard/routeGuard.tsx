"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import cartStore from "@/store/cartStore";

type GuardType = "auth" | "protected" | "cart";

interface RouteGuardProps {
  children: React.ReactNode;
  /**
   * "auth"      → solo para usuarios NO autenticados (login, register, etc.)
   * "protected" → solo para usuarios autenticados (myProfile, orders, etc.)
   * "cart"      → solo si el carrito tiene items (cart1, cart2, cart3)
   */
  type: GuardType;
  redirectTo?: string;
}

export default function RouteGuard({ children, type, redirectTo }: RouteGuardProps) {
  const router = useRouter();
  const auth = useAuthStore((state) => state.auth);
  const cartItems = cartStore((state) => state.items);
  const [isHydrated, setIsHydrated] = useState(() => {
    const authHydrated = useAuthStore.persist.hasHydrated();
    const cartHydrated = cartStore.persist.hasHydrated();
    return type === "cart" ? authHydrated && cartHydrated : authHydrated;
  });

  // Esperar a la hidratacion real de Zustand antes de evaluar guardas/redirecciones
  useEffect(() => {
    const checkReady = () => {
      const authReady = useAuthStore.persist.hasHydrated();
      const cartReady = cartStore.persist.hasHydrated();
      return type === "cart" ? authReady && cartReady : authReady;
    };
  
    if (checkReady()) {
      setIsHydrated(true);
      return;
    }
  
    const updateHydration = () => setIsHydrated(checkReady());
  
    const unsubAuth = useAuthStore.persist.onFinishHydration(updateHydration);
    const unsubCart =
      type === "cart"
        ? cartStore.persist.onFinishHydration(updateHydration)
        : undefined;
  
    return () => {
      unsubAuth?.();
      unsubCart?.();
    };
  }, [type]);

  
  useEffect(() => {
    if (!isHydrated) return;

    const isAuthenticated = auth !== null;
    const cartHasItems = cartItems.length > 0;

    if (type === "auth" && isAuthenticated) {
      router.replace(redirectTo ?? "/");
      return;
    }

    if (type === "protected" && !isAuthenticated) {
      router.replace(redirectTo ?? "/");
      return;
    }

    if (type === "cart" && !cartHasItems) {
      router.replace(redirectTo ?? "/");
      return;
    }
  }, [isHydrated, auth, cartItems, type, redirectTo, router]);

  // Mientras no hidrata, no renderizar nada para evitar flash de contenido
  if (!isHydrated) return null;

  const isAuthenticated = auth !== null;
  const cartHasItems = cartItems.length > 0;

  if (type === "auth" && isAuthenticated) return null;
  if (type === "protected" && !isAuthenticated) return null;
  if (type === "cart" && !cartHasItems) return null;

  return <>{children}</>;
}
