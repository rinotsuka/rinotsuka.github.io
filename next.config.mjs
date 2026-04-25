import createMDX from "@next/mdx";
import rehypePrettyCode from "rehype-pretty-code";

const basePath = process.env.NEXT_BASE_PATH ?? "";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "github-light",
          keepBackground: true,
        },
      ],
    ],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  ...(basePath
    ? {
        basePath,
        assetPrefix: basePath,
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default withMDX(nextConfig);
