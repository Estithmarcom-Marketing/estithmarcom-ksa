import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.estithmarcom.com",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "test.api.estithmarcom.com",
        pathname: "/storage/**",
      },
    ],
  },
  reactCompiler: true,
  logging: {
    browserToTerminal: false,
  },
  async redirects() {
    return [
      {
        source: "/pages",
        destination: "/",
        permanent: false,
      },
      {
        source: "/:locale/pages",
        destination: "/:locale",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
