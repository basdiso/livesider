import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const publicDir = join(__dirname, '..', 'public');

const ogSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0b0d12"/>
      <stop offset="100%" stop-color="#05060a"/>
    </linearGradient>
    <radialGradient id="glow" cx="80%" cy="25%" r="55%">
      <stop offset="0%" stop-color="#e8a849" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0b0d12" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <g font-family="Archivo, Arial Narrow, Arial, sans-serif" fill="#ece8df">
    <text x="90" y="90" font-size="22" letter-spacing="4" font-weight="500" fill="#8e94a5">LIVESIDER</text>
    <circle cx="245" cy="83" r="7" fill="#ff2a2a"/>
    <text x="90" y="300" font-size="124" font-weight="800" font-stretch="72%" letter-spacing="-2">Your brand's</text>
    <text x="90" y="420" font-size="124" font-weight="800" font-stretch="72%" letter-spacing="-2" fill="#e8a849">own channel.</text>
    <text x="90" y="520" font-size="30" font-weight="500" fill="#c9c6bf">Corporate broadcast channels · Istanbul</text>
    <text x="90" y="570" font-size="22" font-family="JetBrains Mono, monospace" fill="#8e94a5" letter-spacing="2">LIVESIDER.COM</text>
  </g>
  <g transform="translate(960,420)">
    <rect x="-120" y="-120" width="240" height="240" rx="24" fill="#11141b" stroke="#242a38" stroke-width="2"/>
    <circle cx="0" cy="0" r="54" fill="#ece8df"/>
    <circle cx="0" cy="-32" r="7" fill="#ff2a2a"/>
    <text x="0" y="8" text-anchor="middle" font-family="Archivo, sans-serif" font-weight="700" font-size="24" fill="#0b0d12">STUDIO</text>
    <text x="0" y="30" text-anchor="middle" font-family="JetBrains Mono, monospace" font-size="12" fill="#555b68">1 → 30</text>
  </g>
</svg>`);

const appleSvg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="7" fill="#0b0d12"/>
  <circle cx="16" cy="16" r="6" fill="#ff2a2a"/>
</svg>`);

await sharp(ogSvg).png({ compressionLevel: 9 }).toFile(join(publicDir, 'og.png'));
console.log('og.png written');

await sharp(appleSvg).resize(180, 180).png({ compressionLevel: 9 }).toFile(join(publicDir, 'apple-touch-icon.png'));
console.log('apple-touch-icon.png written');
