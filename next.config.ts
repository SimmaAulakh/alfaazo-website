import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async redirects() {
    return [
      // Legacy slug with stray colon (still indexed by Google) → canonical slug
      {
        source: "/blog/journey-through-basic-punjabi-\\:-ten-essential-phrases-for-new-learners",
        destination: "/blog/journey-through-basic-punjabi-ten-essential-phrases-for-new-learners",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
