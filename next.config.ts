import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const backendUrl = new URL(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5001");

const nextConfig: NextConfig = {
  images: {
    // Backend `/uploads/*` rasmlari next/image orqali optimallashtiriladi
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/uploads/**",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
