// Solo para uso en Client Components
const COOKIE_FOREVER_EXPIRES = "Fri, 31 Dec 9999 23:59:59 GMT";
const COOKIE_BASE_ATTRS = "path=/; SameSite=Lax";

export const setAuthCookie = () => {
  const cookie = `logged_in=true; expires=${COOKIE_FOREVER_EXPIRES}; ${COOKIE_BASE_ATTRS}`;
  document.cookie = cookie;
  console.log("[Cookies] setAuthCookie:", cookie);
};

export const clearAuthCookie = () => {
  const cookie = `logged_in=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; ${COOKIE_BASE_ATTRS}`;
  document.cookie = cookie;
  console.log("[Cookies] clearAuthCookie:", cookie);
};

export const setCartCookie = () => {
  const cookie = `has_cart=true; expires=${COOKIE_FOREVER_EXPIRES}; ${COOKIE_BASE_ATTRS}`;
  document.cookie = cookie;
  console.log("[Cookies] setCartCookie:", cookie);
};

export const clearCartCookie = () => {
  const cookie = `has_cart=; expires=Thu, 01 Jan 1970 00:00:00 GMT; Max-Age=0; ${COOKIE_BASE_ATTRS}`;
  document.cookie = cookie;
  console.log("[Cookies] clearCartCookie:", cookie);
};

// Helper para el proxy (server-side)
export const getCookieValue = (cookieString: string, name: string): string | null => {
  const match = cookieString.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};