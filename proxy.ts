import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PROTECTED_ROUTES = ['/myProfile', '/orders'];
const AUTH_ROUTES = ['/login', '/register', '/enterEmail', '/recoverPassword', '/verificationCodeEmail', '/changePassword'];
const CART_ROUTES = [ '/cart2', '/cart3'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  const loggedIn = request.cookies.get('logged_in')?.value === 'true';
  const hasCart = request.cookies.get('has_cart')?.value === 'true';
  
  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));
  const isAuthRoute = AUTH_ROUTES.some(r => pathname.startsWith(r));
  const isCartRoute = CART_ROUTES.some(r => pathname.startsWith(r));
  
  // 1. Redirecciones (Si no cumple, cortamos aquí)
  if (isAuthRoute && loggedIn) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  if (isProtected && !loggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  if (isCartRoute && !hasCart) {
      return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // 2. Si llegamos aquí, el usuario tiene permiso para ver la página
  // Capturamos la respuesta normal
  const response = NextResponse.next();

  // 3. AÑADIR HEADERS PARA EVITAR CACHÉ en rutas sensibles
  // Esto evita que el navegador guarde la página en el historial "físico"
  if (isProtected || isCartRoute || isAuthRoute) {
    response.headers.set('Cache-Control', 'no-store, max-age=0, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  }
  
  return response;
}

// ... config matcher se mantiene igual
