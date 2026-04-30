"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/authStore";
import cartStore from "@/store/cartStore";

type GuardType = "auth" | "protected" | "cart";
type GuardDecision = "pending" | "allow" | "redirect";

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
  const [decision, setDecision] = useState<GuardDecision>("pending");
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
    if (!isHydrated) {
      setDecision("pending");
      return;
    }

    // Usar snapshot directo evita decidir con un valor intermedio del selector.
    const authSnapshot = useAuthStore.getState().auth;
    const cartSnapshot = cartStore.getState().items;
    const isAuthenticated = Boolean(authSnapshot?.access_token);
    const cartHasItems = cartSnapshot.length > 0;

    const shouldRedirect =
      (type === "auth" && isAuthenticated) ||
      (type === "protected" && !isAuthenticated) ||
      (type === "cart" && (!isAuthenticated || !cartHasItems));

    setDecision(shouldRedirect ? "redirect" : "allow");
  }, [isHydrated, auth, cartItems.length, type]);

  useEffect(() => {
    if (decision !== "redirect") return;
    router.replace(redirectTo ?? "/");
  }, [decision, redirectTo, router]);

  useEffect(() => {
    if (decision !== "allow" || typeof window === "undefined") return;
    window.dispatchEvent(new Event("route-guard-ready"));
  }, [decision]);

  // Mientras hidrata y decide, no renderizar nada para evitar flashes.
  if (!isHydrated || decision !== "allow") return null;

  return <>{children}</>;
}
