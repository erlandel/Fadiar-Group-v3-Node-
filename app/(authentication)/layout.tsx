"use client";

import RouteGuard from "@/components/routeGuard/routeGuard";

export default function AuthenticationLayout({ children }: { children: React.ReactNode }) {
  return (
    <RouteGuard type="auth">
      {children}
    </RouteGuard>
  );
}
