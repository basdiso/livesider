export type Locale = 'tr' | 'en' | 'ar';

export const LOCALES: Locale[] = ['tr', 'en', 'ar'];
export const siteName = 'Livesider';
export const siteUrl = 'https://livesider.com';
export const contactEmail = 'info@livesider.com';

export type L10n<T = string> = Record<Locale, T>;
type PathMap = L10n;

export const paths: Record<string, PathMap> = {
  home: { tr: '/', en: '/en', ar: '/ar' },
  neden: { tr: '/neden', en: '/en/why', ar: '/ar/why' },
  ornekler: { tr: '/ornekler', en: '/en/showcase', ar: '/ar/showcase' },
};

export const nav: Record<string, L10n> = {
  services: { tr: 'Hizmetler', en: 'Services', ar: 'الخدمات' },
  showcase: { tr: 'Örnekler', en: 'Showcase', ar: 'النماذج' },
  why: { tr: 'Neden Live?', en: 'Why Live?', ar: 'لماذا البث؟' },
  contact: { tr: 'İletişim', en: 'Contact', ar: 'تواصل' },
};

export const footer = {
  tagline: {
    tr: 'İstanbul · Kurumsal yayın kanalları',
    en: 'Istanbul · Corporate broadcast channels',
    ar: 'إسطنبول · قنوات بث مؤسسية',
  } satisfies L10n,
};

export const copy = {
  label: { tr: 'Kopyala', en: 'Copy', ar: 'نسخ' } satisfies L10n,
  done: { tr: 'Kopyalandı', en: 'Copied', ar: 'تم النسخ' } satisfies L10n,
};

export const meta = {
  home: {
    title: {
      tr: 'Livesider — Kurumsal yayın kanalları',
      en: 'Livesider — Corporate broadcast channels',
      ar: 'Livesider — قنوات بث مؤسسية',
    } satisfies L10n,
    description: {
      tr: 'Firmaların kendi yayın kanallarını kurmasına ve işletmesine yardım eden küçük bir ekip. Stüdyodan sunucuya, kameradan mobil uygulamaya kadar.',
      en: 'A small team helping companies build and run their own broadcast channels. From studio to server, from camera to mobile app.',
      ar: 'فريق صغير يساعد الشركات على بناء قنوات البث الخاصة بها وتشغيلها. من الاستوديو إلى الخادم، ومن الكاميرا إلى تطبيق الهاتف.',
    } satisfies L10n,
  },
  neden: {
    title: {
      tr: 'Neden kendi kanalınız? — Livesider',
      en: 'Why your own channel? — Livesider',
      ar: 'لماذا قناتك الخاصة؟ — Livesider',
    } satisfies L10n,
    description: {
      tr: 'Bir firma neden kendi yayın kanalını kurmalı? Sosyal medya ile ilişkisi, dijital pazarlamaya etkisi ve dünyada live commerce iş modelleri.',
      en: 'Why a company should build its own channel: how it relates to social media, what it means for digital marketing, and live commerce business models worldwide.',
      ar: 'لماذا يجب على الشركة أن تبني قناتها الخاصة؟ علاقتها بوسائل التواصل الاجتماعي، وأثرها على التسويق الرقمي، ونماذج التجارة المباشرة حول العالم.',
    } satisfies L10n,
  },
  ornekler: {
    title: {
      tr: 'Kanal örnekleri — Livesider',
      en: 'Channel showcase — Livesider',
      ar: 'نماذج القنوات — Livesider',
    } satisfies L10n,
    description: {
      tr: 'Kozmetik, moda, mücevher ve koleksiyon markaları için canlı yayın kanal ve kamera arkası konseptleri.',
      en: 'Live broadcast channel and backstage concepts for beauty, fashion, fine jewelry and collectibles brands.',
      ar: 'مفاهيم قنوات البث المباشر والكواليس لعلامات التجميل والأزياء والمجوهرات والمقتنيات.',
    } satisfies L10n,
  },
};

export function t<T extends L10n>(obj: T, locale: Locale): string {
  return obj[locale];
}

export function altPath(current: keyof typeof paths, target: Locale): string {
  return paths[current][target];
}

export const htmlLang: L10n = { tr: 'tr', en: 'en', ar: 'ar' };
export const htmlDir: L10n = { tr: 'ltr', en: 'ltr', ar: 'rtl' };
export const ogLocaleMap: L10n = { tr: 'tr_TR', en: 'en_US', ar: 'ar_SA' };

export function hreflangFor(key: keyof typeof paths): Array<{ hreflang: string; href: string }> {
  return [
    { hreflang: 'tr', href: siteUrl + paths[key].tr },
    { hreflang: 'en', href: siteUrl + paths[key].en },
    { hreflang: 'ar', href: siteUrl + paths[key].ar },
    { hreflang: 'x-default', href: siteUrl + paths[key].tr },
  ];
}
