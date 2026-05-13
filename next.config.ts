import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "standalone",
  images: {
    remotePatterns: [{ protocol: "https", hostname: "picsum.photos" }],
  },
  reactCompiler: true,
  logging: {
    browserToTerminal: false,
  },
};

export default nextConfig;
