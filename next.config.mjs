import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
  },
  async redirects() {
    return [
      {
        source: "/:locale/creative-studio/artkal-bead-pattern",
        destination: "/:locale/creative-studio/bead-pattern",
        permanent: true,
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
