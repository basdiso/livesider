import {
  siYoutube, siInstagram, siFacebook, siTiktok, siX,
  siTwitch, siKick, siVimeo, siDailymotion, siWhatsapp, siEtsy, siShopify,
} from 'simple-icons';

export type Platform = {
  key: string;
  label: { tr: string; en: string; ar: string };
  path?: string;
  letter?: string;
  variant?: 'own' | 'more';
};

export const PLATFORMS: Platform[] = [
  { key: 'own', label: { tr: 'WEB & MOBİL APP', en: 'WEB & MOBILE APP', ar: 'موقع وتطبيق' }, variant: 'own' },
  { key: 'whatsapp', label: { tr: 'WHATSAPP', en: 'WHATSAPP', ar: 'واتساب' }, path: siWhatsapp.path },
  { key: 'youtube', label: { tr: 'YOUTUBE', en: 'YOUTUBE', ar: 'يوتيوب' }, path: siYoutube.path },
  { key: 'instagram', label: { tr: 'INSTAGRAM', en: 'INSTAGRAM', ar: 'إنستغرام' }, path: siInstagram.path },
  { key: 'facebook', label: { tr: 'FACEBOOK', en: 'FACEBOOK', ar: 'فيسبوك' }, path: siFacebook.path },
  { key: 'linkedin', label: { tr: 'LINKEDIN', en: 'LINKEDIN', ar: 'لينكد إن' }, letter: 'in' },
  { key: 'tiktok', label: { tr: 'TIKTOK', en: 'TIKTOK', ar: 'تيك توك' }, path: siTiktok.path },
  { key: 'x', label: { tr: 'X', en: 'X', ar: 'X' }, path: siX.path },
  { key: 'twitch', label: { tr: 'TWITCH', en: 'TWITCH', ar: 'تويتش' }, path: siTwitch.path },
  { key: 'kick', label: { tr: 'KICK', en: 'KICK', ar: 'كيك' }, path: siKick.path },
  { key: 'vimeo', label: { tr: 'VIMEO', en: 'VIMEO', ar: 'فيميو' }, path: siVimeo.path },
  { key: 'dailymotion', label: { tr: 'DAILYMOTION', en: 'DAILYMOTION', ar: 'ديلي موشن' }, path: siDailymotion.path },
  { key: 'trendyol', label: { tr: 'TRENDYOL', en: 'TRENDYOL', ar: 'تريندويل' }, letter: 'ty' },
  { key: 'amazon', label: { tr: 'AMAZON', en: 'AMAZON', ar: 'أمازون' }, letter: 'a' },
  { key: 'etsy', label: { tr: 'ETSY', en: 'ETSY', ar: 'إتسي' }, path: siEtsy.path },
  { key: 'shopify', label: { tr: 'SHOPIFY', en: 'SHOPIFY', ar: 'شوبيفاي' }, path: siShopify.path },
  { key: 'ikas', label: { tr: 'IKAS', en: 'IKAS', ar: 'إيكاس' }, letter: 'ik' },
  { key: 'ideasoft', label: { tr: 'IDEASOFT', en: 'IDEASOFT', ar: 'آيديا سوفت' }, letter: 'id' },
  { key: 'ticimax', label: { tr: 'TICIMAX', en: 'TICIMAX', ar: 'تيسي ماكس' }, letter: 'tc' },
  { key: 'more', label: { tr: '+ 20 PLATFORM', en: '+ 20 MORE', ar: '+ ٢٠ منصة' }, variant: 'more' },
];

export const ORBIT_KEYS = [
  'youtube', 'instagram', 'facebook', 'linkedin', 'tiktok',
  'x', 'twitch', 'vimeo', 'dailymotion', 'whatsapp',
  'trendyol', 'amazon', 'etsy', 'shopify',
] as const;

export const ORBIT_PLATFORMS = ORBIT_KEYS.map(
  (k) => PLATFORMS.find((p) => p.key === k)!,
);
