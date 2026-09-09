import type { NextConfig } from "next";

const CHAT_STAGE_ORIGIN =
  "https://chat-stage.estithmarcom.com";

const configuredChatOrigin =
  process.env.CHAT_WIDGET_ORIGIN?.replace(/\/+$/, "");

if (
  configuredChatOrigin &&
  configuredChatOrigin !== CHAT_STAGE_ORIGIN
) {
  throw new Error(
    "CHAT_WIDGET_ORIGIN is not an approved chat origin",
  );
}

const nextConfig: NextConfig = {
  output: "standalone",

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        pathname: "/storage/**",
      },
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

  async rewrites() {
    if (!configuredChatOrigin) {
      return [];
    }

    return [
      {
        source: "/chat-widget/:path*",
        destination: `${configuredChatOrigin}/:path*`,
      },
      {
        source: "/api/chat/:path*",
        destination: `${configuredChatOrigin}/api/chat/:path*`,
      },
    ];
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
