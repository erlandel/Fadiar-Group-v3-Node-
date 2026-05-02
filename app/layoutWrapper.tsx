'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, Suspense, useRef } from 'react';

// Extender Window para el flag global del modal
declare global {
  interface Window {
    __modalOpen?: boolean;
  }
}
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import RouteLoading from "@/components/routeLoading/routeLoading";
import RouteChangeListener from "@/components/RouteChangeListener";
import ButtonBackTop from "@/components/buttonBackTop/buttonBackTop";
import ButtonFloatingCart from "@/components/buttonFloatingCart/buttonFloatingCart";
import ClientRouteGuard from "@/components/routeGuard/routeGuard";
import ModalProductsByLocation from "@/components/modal/modalProductsByLocation/modalProductsByLocation";
import useProductsByLocationStore from "@/store/productsByLocationStore";
import { useSyncCart } from "@/hooks/cartRequests/useSyncCart";
import useAuthStore, { initializeAuthSync } from "@/store/authStore";
import { initializeCartSync } from "@/store/cartStore";
import useClockStore from "@/store/clockStore";



export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { province, municipality, isOpen, setIsOpen } = useProductsByLocationStore();
  const { syncCart } = useSyncCart(true);
  const auth = useAuthStore((state) => state.auth);
  const startClock = useClockStore((state) => state.startClock);
  const [isHydrated, setIsHydrated] = useState(false);
  const hasSynced = useRef(false);

  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register') || pathname.startsWith('/verificationEmail')|| pathname.startsWith('/changePassword') || pathname.startsWith('/recoverPassword')|| pathname.startsWith('/verificationCodeEmail')|| pathname.startsWith('/enterEmail');
  const isProtectedRoute = pathname.startsWith('/myProfile') || pathname.startsWith('/orders');
  const isCartRoute = pathname.startsWith('/cart1') || pathname.startsWith('/cart2') || pathname.startsWith('/cart3');
  const guardType = isCartRoute
    ? "cart"
    : isProtectedRoute
      ? "protected"
      : isAuthRoute
        ? "auth"
        : null;
  
  const [queryClient] = useState(() => new QueryClient());

  useEffect(() => {
    setIsHydrated(true);
    startClock();
  }, []);

  useEffect(() => {
    const cleanupAuth = initializeAuthSync();
    const cleanupCart = initializeCartSync();

    return () => {
      cleanupAuth();
      cleanupCart();
    };
  }, []);

  useEffect(() => {
    if (isHydrated && auth?.access_token && !hasSynced.current) {
      syncCart();
      hasSynced.current = true;
    } else if (!auth?.access_token) {
      hasSynced.current = false;
    }
  }, [isHydrated, auth?.access_token, syncCart]);

  useEffect(() => {
    if (isHydrated && (!province || !municipality) && !isAuthRoute) {
      setIsOpen(true);
    }
  }, [isHydrated, province, municipality, isAuthRoute, setIsOpen]);

  // Flag global para pausar carruseles cuando el modal está abierto
  useEffect(() => {
    window.__modalOpen = isOpen;
  }, [isOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.animate-on-scroll'));
    if (elements.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const anim = el.dataset.animate || 'animate__fadeInUp';
            el.classList.add('aos-animate', 'animate__animated', anim);
            io.unobserve(el);
          }
        }
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname, children]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="relative flex min-h-screen w-full flex-col">
        <Suspense fallback={null}>
          <RouteChangeListener />
        </Suspense>
        {!isAuthRoute && <RouteLoading />}
        {isOpen && (
          <div className="fixed inset-0 z-100 flex  justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className='h-auto w-auto '>
              <ModalProductsByLocation />
            </div>
          </div>
        )}
        {!isAuthRoute && <Header />}

        <main className="grow w-full">
          {guardType ? (
            <ClientRouteGuard type={guardType}>{children}</ClientRouteGuard>
          ) : (
            children
          )}
        </main>
        {!isAuthRoute && <Footer />}
        {!isAuthRoute && <ButtonFloatingCart />}
        {!isAuthRoute && <ButtonBackTop />}
        <ToastContainer />
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
