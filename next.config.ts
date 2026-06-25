import type { NextConfig } from "next";

const backendOriginEnv = process.env.BACKEND_ORIGIN || "";
const publicApiEnv = process.env.NEXT_PUBLIC_API_URL || "";
const backendOriginFromPublicApi = publicApiEnv.startsWith("http")
  ? publicApiEnv.replace(/\/api\/?$/, "")
  : "";
const backendOrigin =
  (backendOriginEnv || backendOriginFromPublicApi).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!backendOrigin) {
      return process.env.NODE_ENV === "production"
        ? []
        : [
            {
              source: "/api/:path*",
              destination: "http://localhost:5000/api/:path*",
            },
          ];
    }
    return [
      {
        source: "/api/:path*",
        destination: `${backendOrigin}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
