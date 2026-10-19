import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://livesider.com';

const pathMap = {
  '/': { 'tr-TR': '/', 'en-US': '/en' },
  '/en': { 'tr-TR': '/', 'en-US': '/en' },
  '/neden': { 'tr-TR': '/neden', 'en-US': '/en/why' },
  '/en/why': { 'tr-TR': '/neden', 'en-US': '/en/why' },
  '/ornekler': { 'tr-TR': '/ornekler', 'en-US': '/en/showcase' },
  '/en/showcase': { 'tr-TR': '/ornekler', 'en-US': '/en/showcase' },
};

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      serialize(item) {
        const path = new URL(item.url).pathname.replace(/\/$/, '') || '/';
        const links = pathMap[path];
        if (!links) return item;
        return {
          ...item,
          links: [
            { lang: 'tr-TR', url: SITE + links['tr-TR'] },
            { lang: 'en-US', url: SITE + links['en-US'] },
            { lang: 'x-default', url: SITE + links['tr-TR'] },
          ],
        };
      },
    }),
  ],
});
