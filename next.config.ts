import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
        optimizePackageImports: ["@chakra-ui/react", "@emotion/react"],
    },
};

export default nextConfig;
