import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const SITE = 'https://livesider.com';

const pathMap = {
  '/': { 'tr-TR': '/', 'en-US': '/en', 'ar-SA': '/ar' },
  '/en': { 'tr-TR': '/', 'en-US': '/en', 'ar-SA': '/ar' },
  '/ar': { 'tr-TR': '/', 'en-US': '/en', 'ar-SA': '/ar' },
  '/neden': { 'tr-TR': '/neden', 'en-US': '/en/why', 'ar-SA': '/ar/why' },
  '/en/why': { 'tr-TR': '/neden', 'en-US': '/en/why', 'ar-SA': '/ar/why' },
  '/ar/why': { 'tr-TR': '/neden', 'en-US': '/en/why', 'ar-SA': '/ar/why' },
  '/ornekler': { 'tr-TR': '/ornekler', 'en-US': '/en/showcase', 'ar-SA': '/ar/showcase' },
  '/en/showcase': { 'tr-TR': '/ornekler', 'en-US': '/en/showcase', 'ar-SA': '/ar/showcase' },
  '/ar/showcase': { 'tr-TR': '/ornekler', 'en-US': '/en/showcase', 'ar-SA': '/ar/showcase' },
};

export default defineConfig({
  site: SITE,
  trailingSlash: 'never',
  build: { format: 'file' },
  i18n: {
    defaultLocale: 'tr',
    locales: ['tr', 'en', 'ar'],
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
            { lang: 'ar-SA', url: SITE + links['ar-SA'] },
            { lang: 'x-default', url: SITE + links['tr-TR'] },
          ],
        };
      },
    }),
  ],
});
