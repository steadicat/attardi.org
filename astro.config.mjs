import {defineConfig} from 'astro/config';
import mdx from '@astrojs/mdx';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';

export default defineConfig({
  site: 'https://attardi.org',
  scopedStyleStrategy: 'where',
  integrations: [
    expressiveCode({
      frames: false,
      defaultProps: {
        wrap: true,
      },
      themes: ['min-dark'],
      styleOverrides: {
        codeFontFamily: 'var(--mono)',
        codeFontSize: 'var(--codeFontSize)',
        codeFontWeight: '400',
        codeLineHeight: 'var(--codeLineHeight)',
        codePaddingBlock: '18px',
        codePaddingInline: '18px',
      },
    }),
    mdx({}),
    sitemap(),
    svelte(),
  ],
});
