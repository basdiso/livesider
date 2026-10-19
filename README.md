# Livesider

Astro 5 ile üretilmiş statik site. TR varsayılan, EN prefix altında (`/en`). Cloudflare Pages'e dağıtılacak şekilde yapılandırılmıştır.

## Geliştirme

```bash
pnpm install
pnpm dev
```

Local: http://localhost:4321

## Üretim derlemesi

```bash
pnpm build       # dist/ içine statik çıktı
pnpm preview     # dist/ üzerinde yerel sunucu
```

## Yapı

- `src/pages/` — TR sayfalar (`index.astro`, `neden.astro`, `ornekler.astro`)
- `src/pages/en/` — EN sayfalar (`index.astro`, `why.astro`, `showcase.astro`)
- `src/layouts/Base.astro` — ortak doctype/head/header/footer
- `src/components/` — `Head.astro` (SEO), `SiteHeader.astro`, `SiteFooter.astro`, `MailBlock.astro`
- `src/data/i18n.ts` — URL eşlemeleri, meta içerikleri, hreflang helper'ları
- `src/styles/` — `global.css` (ortak), `home.css`, `neden.css`, `ornekler.css`
- `src/scripts/` — `copy-mail.ts`, `home-rig.ts` (PGM canvas + multiview + metrelik + timecode), `orbit.ts` (SVG orbit)
- `src/assets/` — orijinal JPG'ler (Astro Image ile optimize edilir)
- `public/img/` — "Tam boy" linklerinin hedefi olan orijinal JPG'ler
- `public/favicon.svg`, `public/apple-touch-icon.png`, `public/og.png`
- `public/robots.txt`, `public/_headers`, `public/_redirects`
- `public/humans.txt`
- `astro.config.mjs` — `site: 'https://livesider.com'`, i18n routing, sitemap serialize ile hreflang eşlemesi
- `scripts/generate-images.mjs` — `public/og.png` ve `apple-touch-icon.png` üretir (sharp)

## URL haritası

| TR            | EN              |
| ------------- | --------------- |
| `/`           | `/en`           |
| `/neden`      | `/en/why`       |
| `/ornekler`   | `/en/showcase`  |

`build.format: 'file'` + `trailingSlash: 'never'` ile çıktılar `/index.html`, `/neden.html`, `/en.html`, `/en/why.html` şeklinde Cloudflare Pages route tablosuna uygun üretilir.

## SEO

Her sayfada otomatik olarak eklenir:
- `<link rel="canonical">` + `hreflang` (tr/en/x-default)
- Open Graph (title, description, url, type, locale, image 1200×630)
- Twitter Card (summary_large_image)
- JSON-LD: Organization + WebSite (ana sayfa) / WebPage (iç sayfalar)
- Sitemap: `/sitemap-index.xml` + `/sitemap-0.xml` (hreflang eşleştirmeli)
- `robots.txt` sitemap yönlendirmesi ile

## Cloudflare Pages dağıtımı

1. **GitHub repo oluştur** ve `C:\livesider` içeriğini push et:
   ```bash
   git remote add origin git@github.com:<kullanici>/livesider.git
   git branch -M main
   git push -u origin main
   ```

2. **Cloudflare Dashboard → Workers & Pages → Create → Pages → Connect to Git**:
   - Repo'yu seç
   - Framework preset: **Astro**
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Root directory: boş (repo kökü)
   - Environment variables → `NODE_VERSION = 20`
   - (pnpm için) `PNPM_VERSION = 10` ya da Cloudflare'in default pnpm'i yeterli

3. **Custom domain** → `livesider.com` ekle, DNS adımlarını takip et (Cloudflare'de DNS zaten varsa tek tık).

4. İlk deploy sonrası her `main` push'u otomatik yayınlanır.

## Headers ve redirect'ler

- `public/_headers` — statik asset'lere `immutable` cache, HTML'lere `no-cache`, güvenlik header'ları (X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy).
- `public/_redirects` — eski `.html` URL'lerinden (varsa Claude artifact'inden paylaşıldıysa) temiz route'lara 301.

## OG image güncelleme

`scripts/generate-images.mjs` içindeki SVG'yi düzenleyip tekrar `node scripts/generate-images.mjs` çalıştır.

## Yapılacaklar

- [ ] GitHub repo + ilk push
- [ ] Cloudflare Pages bağlantısı
- [ ] `livesider.com` custom domain + DNS doğrulaması
- [ ] (opsiyonel) Analytics (Cloudflare Web Analytics)
