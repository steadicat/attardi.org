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
      frames: {
        showCopyToClipboardButton: false,
      },
      themes: ['min-dark', 'min-light'],
      styleOverrides: {
        codeFontFamily: 'var(--mono)',
        codeFontSize: '11px',
        codeFontWeight: '400',
        codeLineHeight: '18px',
        codePaddingBlock: '18px',
        codePaddingInline: '18px',
      },
    }),
    mdx({}),
    sitemap(),
    svelte(),
  ],
});
