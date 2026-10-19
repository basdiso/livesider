export type Locale = 'tr' | 'en';

export const siteName = 'Livesider';
export const siteUrl = 'https://livesider.com';
export const contactEmail = 'info@livesider.com';

type PathMap = Record<Locale, string>;

export const paths: Record<string, PathMap> = {
  home: { tr: '/', en: '/en' },
  neden: { tr: '/neden', en: '/en/why' },
  ornekler: { tr: '/ornekler', en: '/en/showcase' },
};

export const nav = {
  services: { tr: 'Hizmetler', en: 'Services' },
  showcase: { tr: 'Örnekler', en: 'Showcase' },
  why: { tr: 'Neden kanal?', en: 'Why a channel?' },
  contact: { tr: 'İletişim', en: 'Contact' },
};

export const footer = {
  tagline: {
    tr: 'İstanbul · Kurumsal yayın kanalları',
    en: 'Istanbul · Corporate broadcast channels',
  },
};

export const copy = {
  label: { tr: 'Kopyala', en: 'Copy' },
  done: { tr: 'Kopyalandı', en: 'Copied' },
};

export const meta = {
  home: {
    title: {
      tr: 'Livesider — Kurumsal yayın kanalları',
      en: 'Livesider — Corporate broadcast channels',
    },
    description: {
      tr: 'Firmaların kendi yayın kanallarını kurmasına ve işletmesine yardım eden küçük bir ekip. Stüdyodan sunucuya, kameradan mobil uygulamaya kadar.',
      en: 'A small team helping companies build and run their own broadcast channels. From studio to server, from camera to mobile app.',
    },
  },
  neden: {
    title: {
      tr: 'Neden kendi kanalınız? — Livesider',
      en: 'Why your own channel? — Livesider',
    },
    description: {
      tr: 'Bir firma neden kendi yayın kanalını kurmalı? Sosyal medya ile ilişkisi, dijital pazarlamaya etkisi ve dünyada live commerce iş modelleri.',
      en: 'Why a company should build its own channel: how it relates to social media, what it means for digital marketing, and live commerce business models worldwide.',
    },
  },
  ornekler: {
    title: {
      tr: 'Kanal örnekleri — Livesider',
      en: 'Channel showcase — Livesider',
    },
    description: {
      tr: 'Kozmetik, moda, mücevher ve koleksiyon markaları için canlı yayın kanal ve kamera arkası konseptleri.',
      en: 'Live broadcast channel and backstage concepts for beauty, fashion, fine jewelry and collectibles brands.',
    },
  },
};

export function t<T extends { tr: string; en: string }>(obj: T, locale: Locale): string {
  return obj[locale];
}

export function altPath(current: keyof typeof paths, target: Locale): string {
  return paths[current][target];
}

export function ogLocale(locale: Locale): string {
  return locale === 'tr' ? 'tr_TR' : 'en_US';
}

export function hreflangFor(key: keyof typeof paths): Array<{ hreflang: string; href: string }> {
  return [
    { hreflang: 'tr', href: siteUrl + paths[key].tr },
    { hreflang: 'en', href: siteUrl + paths[key].en },
    { hreflang: 'x-default', href: siteUrl + paths[key].tr },
  ];
}
