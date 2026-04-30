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
  },
};

export default nextConfig;