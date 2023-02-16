import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config

import rehypePrettyCode from 'rehype-pretty-code';

const prettyCodeOptions = {
  keepBackground: false,
  theme: JSON.parse(fs.readFileSync('./moonlight-ii.json', 'utf-8')),
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [{type: 'text', value: ' '}];
    }
  },
  onVisitHighlightedLine(node) {
    if (!node.properties.className) {
      node.properties.className = [];
    }
    node.properties.className.push('highlighted');
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word'];
  },
  tokensMap: {},
};

export default defineConfig({
  site: 'https://attardi.org',
  scopedStyleStrategy: 'where',
  integrations: [
    mdx({
      // syntaxHighlight: 'prism',
    }),
    sitemap(),
    svelte(),
  ],
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});
