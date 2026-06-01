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
};

export default nextConfig;
