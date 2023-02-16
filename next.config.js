const remarkFrontmatter = import('remark-frontmatter');
const remarkImages = import('remark-images');
const remarkSmallcaps = import('gatsby-remark-smallcaps');
// TODO
// const remarkAutolinkHeaders = import('remark-autolink-headers');
const remarkSlug = import('remark-slug');
const remarkToc = import('@stefanprobst/remark-extract-toc');
const remarkTocExport = import('@stefanprobst/remark-extract-toc/mdx');

const nextMDX = require('@next/mdx');
const withMdxFm = require('next-mdx-frontmatter');
const withLinaria = require('next-with-linaria');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    mdxRs: true,
  },
  async rewrites() {
    return [{source: '/email', destination: '/api/email'}];
  },
};

module.exports = withLinaria(
  withMdxFm({
    options: {
      remarkPlugins: [
        remarkFrontmatter,
        remarkImages,
        remarkSmallcaps,
        // remarkAutolinkHeaders,
        remarkSlug,
        remarkToc,
        remarkTocExport,
      ],
    },
  })(nextConfig)
);
