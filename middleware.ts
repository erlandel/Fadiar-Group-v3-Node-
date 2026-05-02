import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/myProfile', '/orders'];
const AUTH_ROUTES = ['/login', '/register', '/enterEmail', '/recoverPassword', '/verificationCodeEmail', '/changePassword'];
const CART_ROUTES = ['/cart1', '/cart2', '/cart3'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const loggedIn = request.cookies.get('logged_in')?.value === 'true';
  const hasCart = request.cookies.get('has_cart')?.value === 'true';
  
  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));
  const isCartRoute = CART_ROUTES.some(r => pathname.startsWith(r));
  
  // 1. Rutas auth: redirigir a home si ya está logueado
  if (isAuthRoute && loggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  // 2. Rutas protegidas: redirigir a login si no está logueado
  if (isProtected && !loggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 3. Rutas carrito: redirigir si no está logueado o no tiene carrito
  if (isCartRoute) {
    if (!loggedIn) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    if (!hasCart) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/myProfile/:path*',
    '/orders/:path*',
    '/login/:path*',
    '/register/:path*',
    '/enterEmail/:path*',
    '/recoverPassword/:path*',
    '/verificationCodeEmail/:path*',
    '/changePassword/:path*',
    '/cart1',
    '/cart2',
    '/cart3',
  ],
};