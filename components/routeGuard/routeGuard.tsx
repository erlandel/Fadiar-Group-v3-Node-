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
  const [isHydrated, setIsHydrated] = useState(false);

  // Esperar a que Zustand rehidrate desde localStorage antes de evaluar
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;

    const isAuthenticated = auth !== null;
    const cartHasItems = cartItems.length > 0;

    if (type === "auth" && isAuthenticated) {
      router.replace(redirectTo ?? "/");
      return;
    }

    if (type === "protected" && !isAuthenticated) {
      const currentPath = window.location.pathname;
      router.replace(`${redirectTo ?? "/login"}?redirect=${currentPath}`);
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
