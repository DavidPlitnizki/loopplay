import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@loop-play/ui", "@loop-play/types", "@loop-play/game-sdk"],
};

export default nextConfig;
