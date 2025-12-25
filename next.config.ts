import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  output: "standalone",
};

const withMDX = createMDX({
  // Don't pass plugin options here - they're not serializable in Turbopack
  // Instead, handle GFM and headings in the mdx-components.tsx or via compile options
});

export default withMDX(nextConfig);
