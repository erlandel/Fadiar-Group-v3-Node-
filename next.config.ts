import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app.fadiar.com",
        port: "444",
        pathname: "/prueba/api/_images/**",
      },
    ],
     formats: ["image/webp"], // 👈 solo WebP
    minimumCacheTTL: 3600,
  },
};

export default nextConfig;