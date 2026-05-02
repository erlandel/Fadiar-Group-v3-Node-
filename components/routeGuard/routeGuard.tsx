"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

type GuardType = "auth" | "protected" | "cart";

interface ClientRouteGuardProps {
  children: React.ReactNode;
  type: GuardType;
}

export default function ClientRouteGuard({ children, type }: ClientRouteGuardProps) {
  const router = useRouter();

  useEffect(() => {
    const validateRouteAccess = () => {
      const loggedIn = document.cookie.includes("logged_in=true");
      const hasCart = document.cookie.includes("has_cart=true");

      switch (type) {
        case "auth":
          // Solo usuarios NO logueados (login, register, etc.)
          if (loggedIn) {
            router.replace("/");
          }
          break;
        case "protected":
          // Solo usuarios logueados (myProfile, orders)
          if (!loggedIn) {
            router.replace("/login");
          }
          break;
        case "cart":
          // Logueados + con carrito
          if (!loggedIn) {
            router.replace("/login");
          } else if (!hasCart) {
            router.replace("/");
          }
          break;
      }
    };

    validateRouteAccess();
    window.addEventListener("pageshow", validateRouteAccess);

    return () => {
      window.removeEventListener("pageshow", validateRouteAccess);
    };
  }, [type, router]);

  return <>{children}</>;
}
