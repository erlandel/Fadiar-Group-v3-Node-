import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rutas de autenticación que deben ser protegidas
const AUTH_ROUTES = [
  '/login',
  '/register',
  '/enterEmail',
  '/verificationCodeEmail',
  '/recoverPassword',
];

// Rutas que requieren autenticación
const PROTECTED_ROUTES = [
  '/myProfile',
  '/orders',
];

// Rutas del carrito que requieren items
const CART_ROUTES = ['/cart1','/cart2','/cart3'];

/**
 * Proxy para control de navegación en Next.js 16
 * Reemplaza la funcionalidad del middleware para manejo de rutas
 * Usa cookie 'auth-status' para saber si el usuario está autenticado
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const requestHeaders = new Headers(request.headers);

  // Headers útiles para el cliente
  requestHeaders.set('x-pathname', pathname);

  // Verificar si es una ruta de autenticación
  const isAuthRoute = AUTH_ROUTES.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Verificar si es una ruta protegida
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Leer estado de autenticación desde la cookie
  const authStatus = request.cookies.get('auth-status')?.value;
  const isAuthenticated = authStatus === 'true';

  // Redirección: Usuario autenticado intentando acceder a rutas de auth -> home
  if (isAuthRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Redirección: Usuario no autenticado intentando acceder a rutas protegidas -> login
  if (isProtectedRoute && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verificar si es ruta del carrito
  const isCartRoute = CART_ROUTES.some(route =>
    pathname === route || pathname.startsWith(`${route}/`)
  );

  // Redirección: Carrito vacío intentando acceder a rutas del carrito -> home
  if (isCartRoute) {
    const cartHasItems = request.cookies.get('cart-has-items')?.value === 'true';
    if (!cartHasItems) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

/**
 * Configuración del matcher para el proxy
 * Define qué rutas serán procesadas por el proxy
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
