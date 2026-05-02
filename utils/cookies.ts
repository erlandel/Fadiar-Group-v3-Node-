// Solo para uso en Client Components
export const setAuthCookie = () => {
  document.cookie = "logged_in=true; path=/;"; // 7 días
};

export const clearAuthCookie = () => {
  document.cookie = "logged_in=; path=/; ";
};

export const setCartCookie = () => {
  document.cookie = "has_cart=true; path=/; "; // 30 días
};

export const clearCartCookie = () => {
  document.cookie = "has_cart=; path=/; ";
};

// Helper para middleware (server-side)
export const getCookieValue = (cookieString: string, name: string): string | null => {
  const match = cookieString.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
};