import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },

  // Fix for Sanity Studio on Vercel - jsdom/dompurify issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Externalize packages that cause issues in serverless environments
      config.externals = config.externals || [];
      config.externals.push({
        jsdom: "commonjs jsdom",
        canvas: "commonjs canvas",
      });
    }
    return config;
  },
  /* eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  }, */
};

export default nextConfig;
