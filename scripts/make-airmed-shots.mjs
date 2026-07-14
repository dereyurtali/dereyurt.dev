// Stylized AirMed HBYS screens for the portfolio showcase — NOT the real UI.
// Structure and vocabulary mirror the product (roles, modules), pixels do not.
// Demo names only. Each screen carries a small SMIL animation so the frame
// feels alive even between slide changes.
import { writeFileSync, mkdirSync, rmSync } from 'node:fs';

const OUT = '/Users/alid/Documents/dereyurt.dev/public/airmed';
mkdirSync(OUT, { recursive: true });

const W = 1440, H = 900;
const PAPER = '#f7f8f4', CARD = '#fdfdfb';
const INK = '#15171a';
const DIM = 'rgba(21,23,26,0.62)', FAINT = 'rgba(21,23,26,0.4)';
const LINE = 'rgba(21,23,26,0.1)', LINE2 = 'rgba(21,23,26,0.2)';
const SIGNAL = '#c93c0b', SIGNAL_SOFT = 'rgba(201,60,11,0.08)';
const GREEN = '#1c6b42', GREEN_SOFT = 'rgba(28,107,66,0.1)';
const RED = '#b53c3c';
const BLOCK = 'rgba(21,23,26,0.06)';

const SANS = 'Helvetica, Arial, sans-serif';
const MONO = 'ui-monospace, Menlo, monospace';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rect = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const line = (x1, y1, x2, y2, stroke = LINE, sw = 1) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}"/>`;
const text = (x, y, s, { size = 14, fill = INK, font = SANS, weight = 400, ls = 0, anchor = 'start' } = {}) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" fill="${fill}" font-weight="${weight}" letter-spacing="${ls}" text-anchor="${anchor}">${esc(s)}</text>`;
const label = (x, y, s, fill = FAINT, size = 11) => text(x, y, s, { size, fill, font: MONO, ls: 1.5 });
const chip = (x, y, s, fg, bg, w = s.length * 7.2 + 20) =>
  `${rect(x, y, w, 22, bg)}${text(x + w / 2, y + 15, s, { size: 10.5, fill: fg, font: MONO, ls: 1, anchor: 'middle' })}`;

const NAV = ['PANEL', 'RANDEVULAR', 'HASTALAR', 'MUAYENE', 'LABORATUVAR', 'FATURALAMA', 'ECZANE', 'STOK', 'RAPORLAR', 'KULLANICILAR', 'AYARLAR'];

function chrome(active, role = 'YÖNETİCİ', user = 'Cem Öztürk') {
  const nav = NAV.map((n, i) => {
    const y = 118 + i * 46;
    const on = n === active;
    return `${on ? rect(0, y - 22, 232, 36, SIGNAL_SOFT) + rect(0, y - 22, 3, 36, SIGNAL) : ''}${label(28, y, n, on ? SIGNAL : DIM, 11.5)}`;
  }).join('');
  return `
    ${rect(0, 0, W, 64, CARD)}${line(0, 64, W, 64)}
    ${rect(28, 22, 20, 20, SIGNAL)}<path d="M 34 32 h 8 M 38 28 v 8" stroke="${PAPER}" stroke-width="2.4"/>
    ${text(60, 37, 'AirMed HBYS', { size: 17, weight: 700 })}
    ${label(185, 36, '· TÜRKEYE GÖZ KLİNİĞİ — DEMO', FAINT)}
    ${chip(1236, 21, role, SIGNAL, SIGNAL_SOFT)}
    ${text(1222, 37, user, { size: 13, fill: DIM, anchor: 'end' })}
    ${rect(0, 64, 232, H - 64, CARD)}${line(232, 64, 232, H)}
    ${nav}
    ${label(28, H - 28, 'v0.4 · KVKK UYUMLU', FAINT, 10)}
  `;
}

const frame = (body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${body}
</svg>`;

const SHOTS = {};

/* ---------- 01 · LOGIN ---------- */
SHOTS['shot-login'] = frame(`
  ${[...Array(31)].map((_, i) => line(i * 48, 0, i * 48, H, 'rgba(21,23,26,0.03)')).join('')}
  ${[...Array(20)].map((_, i) => line(0, i * 48, W, i * 48, 'rgba(21,23,26,0.03)')).join('')}
  ${rect(492, 208, 456, 470, CARD, `stroke="${LINE2}"`)}
  ${rect(534, 252, 26, 26, SIGNAL)}<path d="M 541 265 h 12 M 547 259 v 12" stroke="${PAPER}" stroke-width="3"/>
  ${text(572, 272, 'AirMed HBYS', { size: 21, weight: 700 })}
  ${label(534, 305, 'TÜRKEYE GÖZ KLİNİĞİ · GÜVENLİ GİRİŞ')}
  ${label(534, 352, 'E-POSTA')}
  ${rect(534, 362, 372, 42, PAPER, `stroke="${LINE2}"`)}
  ${text(548, 388, 'yonetici.demo@klinik.example', { size: 13.5, fill: DIM, font: MONO })}
  ${label(534, 438, 'PAROLA')}
  ${rect(534, 448, 372, 42, PAPER, `stroke="${LINE2}"`)}
  ${[...Array(9)].map((_, i) => `<circle cx="${552 + i * 13}" cy="469" r="3.4" fill="${INK}"/>`).join('')}
  <rect x="674" y="458" width="1.6" height="22" fill="${INK}">
    <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.45;0.5;0.95;1" dur="1.1s" repeatCount="indefinite"/>
  </rect>
  ${label(534, 524, 'DOĞRULAMA KODU (TOTP)')}
  ${[...Array(6)].map((_, i) => `${rect(534 + i * 48, 534, 40, 46, PAPER, `stroke="${i < 4 ? LINE2 : LINE}"`)}${i < 4 ? text(554 + i * 48, 565, String([7, 3, 1, 9][i]), { size: 19, font: MONO, anchor: 'middle' }) : ''}`).join('')}
  ${rect(534, 610, 372, 44, INK)}
  <rect x="534" y="610" width="372" height="44" fill="${SIGNAL}" opacity="0">
    <animate attributeName="opacity" values="0;0;0.9;0" keyTimes="0;0.7;0.78;1" dur="4s" repeatCount="indefinite"/>
  </rect>
  ${text(720, 637, 'GİRİŞ →', { size: 13, fill: PAPER, font: MONO, ls: 2, anchor: 'middle' })}
  ${text(720, 716, 'OTURUMLAR KAYIT ALTINDADIR · BAŞARISIZ DENEMELER KİLİTLENİR', { size: 10, fill: FAINT, font: MONO, ls: 1.5, anchor: 'middle' })}
`);

/* ---------- 02 · USERS & ROLES ---------- */
{
  const ROWS = [
    ['Cem Öztürk', 'yonetici.demo@klinik.example', 'YÖNETİCİ', SIGNAL, SIGNAL_SOFT],
    ['Dr. Selin Kaya', 'doktor.demo@klinik.example', 'DOKTOR', GREEN, GREEN_SOFT],
    ['Derya Şahin', 'resepsiyon.demo@klinik.example', 'RESEPSİYON', DIM, BLOCK],
    ['Hülya Acar', 'olcum.demo@klinik.example', 'ÖLÇÜM HEMŞİRESİ', DIM, BLOCK],
    ['Burak Demir', 'satis.demo@klinik.example', 'AMELİYAT SATIŞ', DIM, BLOCK],
    ['Demo Finans', 'finans.demo@klinik.example', 'FİNANS', DIM, BLOCK],
    ['Demo Eczane', 'eczane.demo@klinik.example', 'ECZANE', DIM, BLOCK],
  ];
  const ROLES = ['Yönetici', 'Yönetici Asistanı', 'Doktor', 'Resepsiyon', 'Hemşire', 'Ölçüm Hemşiresi', 'Ameliyat Satış', 'Finans', 'Stok & Satın Alma', 'Eczane'];
  SHOTS['shot-roles'] = frame(`
  ${chrome('KULLANICILAR')}
  ${text(272, 116, 'Kullanıcılar & Roller', { size: 22, weight: 700 })}
  ${chip(1180, 96, '+ YENİ KULLANICI', PAPER, INK, 150)}
  ${rect(272, 146, 812, 700, CARD, `stroke="${LINE}"`)}
  ${label(296, 182, 'AD SOYAD')}${label(560, 182, 'E-POSTA')}${label(880, 182, 'ROL')}${label(1020, 182, 'DURUM')}
  ${line(272, 196, 1084, 196, LINE2)}
  ${ROWS.map(([name, mail, role, fg, bg], i) => {
    const y = 196 + i * 66;
    return `${i ? line(272, y, 1084, y) : ''}
      ${text(296, y + 40, name, { size: 14.5, weight: 600 })}
      ${text(560, y + 40, mail, { size: 12, fill: DIM, font: MONO })}
      ${chip(880, y + 24, role, fg, bg)}
      <circle cx="1028" cy="${y + 33}" r="4" fill="${GREEN}"/>${text(1040, y + 37, 'Aktif', { size: 12, fill: DIM })}`;
  }).join('')}
  <rect x="272" y="262" width="812" height="66" fill="${SIGNAL_SOFT}">
    <animate attributeName="y" values="196;196;262;262;328;328;196" dur="7s" repeatCount="indefinite" calcMode="discrete"/>
    <animate attributeName="opacity" values="0;1;1;1;1;1;0" dur="7s" repeatCount="indefinite"/>
  </rect>
  ${rect(1112, 146, 292, 700, CARD, `stroke="${LINE}"`)}
  ${label(1136, 182, '10 ROL · EKRANLAR ROLE GÖRE AÇILIR')}
  ${line(1112, 196, 1404, 196, LINE2)}
  ${ROLES.map((r, i) => {
    const y = 232 + i * 60;
    return `${text(1136, y, r, { size: 13.5, weight: 600 })}
      ${text(1380, y, String([1, 1, 4, 3, 2, 1, 1, 1, 1, 1][i]), { size: 12, fill: DIM, font: MONO, anchor: 'end' })}
      ${rect(1136, y + 12, 220, 3, BLOCK)}${rect(1136, y + 12, [220, 60, 150, 120, 90, 60, 60, 60, 60, 60][i], 3, i === 0 ? SIGNAL : LINE2)}`;
  }).join('')}
`);
}

/* ---------- 03 · PERMISSIONS ---------- */
{
  const PERMS = [
    'randevu.goruntule', 'randevu.olustur', 'randevu.iptal',
    'hasta.dosya.oku', 'hasta.dosya.yaz', 'muayene.baslat',
    'lab.sonuc.oku', 'lab.sonuc.onayla', 'fatura.olustur',
    'fatura.iade', 'rapor.indir', 'kullanici.yonet',
  ];
  const ROLESHORT = ['YÖNETİCİ', 'DOKTOR', 'RESEPSİYON', 'HEMŞİRE', 'FİNANS'];
  // hand-tuned truthy grid: admin all, others role-appropriate
  const GRID = [
    [1, 1, 1, 1, 1], [1, 0, 1, 0, 0], [1, 0, 1, 0, 0],
    [1, 1, 1, 1, 0], [1, 1, 0, 1, 0], [1, 1, 0, 0, 0],
    [1, 1, 0, 1, 0], [1, 1, 0, 0, 0], [1, 0, 1, 0, 1],
    [1, 0, 0, 0, 1], [1, 1, 0, 0, 1], [1, 0, 0, 0, 0],
  ];
  SHOTS['shot-permissions'] = frame(`
  ${chrome('AYARLAR')}
  ${text(272, 116, 'Yetkilendirme', { size: 22, weight: 700 })}
  ${label(272, 140, 'HER İSTEK SUNUCUDA BU KAYDA GÖRE DENETLENİR — EKRANDA GİZLEMEK YETMEZ', FAINT)}
  ${rect(272, 158, 1132, 692, CARD, `stroke="${LINE}"`)}
  ${label(296, 196, 'İZİN ANAHTARI')}
  ${ROLESHORT.map((r, c) => label(660 + c * 150, 196, r, c === 1 ? SIGNAL : FAINT))}
  ${line(272, 210, 1404, 210, LINE2)}
  ${rect(645 + 150, 158, 130, 692, SIGNAL_SOFT)}
  ${PERMS.map((p, i) => {
    const y = 210 + i * 52;
    return `${i ? line(272, y, 1404, y) : ''}
      ${text(296, y + 32, p, { size: 13, font: MONO, fill: DIM })}
      ${GRID[i].map((v, c) => {
        const x = 668 + c * 150;
        if (i === 4 && c === 1) {
          return `<g>
            <path d="M ${x} ${y + 30} l 5 5 l 9 -10" stroke="${GREEN}" stroke-width="2.4" fill="none">
              <animate attributeName="opacity" values="1;1;0;0;1" keyTimes="0;0.5;0.55;0.95;1" dur="5s" repeatCount="indefinite"/>
            </path>
            <text x="${x + 6}" y="${y + 36}" font-family="${MONO}" font-size="14" fill="${FAINT}" text-anchor="middle" opacity="0">—
              <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.5;0.55;0.95;1" dur="5s" repeatCount="indefinite"/>
            </text>
          </g>`;
        }
        return v
          ? `<path d="M ${x} ${y + 30} l 5 5 l 9 -10" stroke="${c === 0 ? SIGNAL : GREEN}" stroke-width="2.4" fill="none"/>`
          : text(x + 6, y + 36, '—', { size: 14, fill: FAINT, font: MONO, anchor: 'middle' });
      }).join('')}`;
  }).join('')}
`);
}

/* ---------- 04 · DASHBOARD ---------- */
SHOTS['shot-dashboard'] = frame(`
  ${chrome('PANEL')}
  ${text(272, 116, 'Bugün — 14 Temmuz 2026, Salı', { size: 22, weight: 700 })}
  ${[['BUGÜN RANDEVU', '42'], ['BEKLEYEN ONAY', '7'], ['TAMAMLANAN', '28'], ['YENİ MESAJ', '12']].map(([k, v], i) => `
    ${rect(272 + i * 292, 146, 268, 120, CARD, `stroke="${LINE}"`)}
    ${label(296 + i * 292, 180, k)}
    ${text(296 + i * 292, 236, v, { size: 40, weight: 700, fill: i === 1 ? SIGNAL : INK })}`).join('')}
  ${rect(272, 296, 812, 330, CARD, `stroke="${LINE}"`)}
  ${label(296, 330, 'HAFTALIK RANDEVU AKIŞI')}
  ${[0, 1, 2, 3].map((i) => line(296, 380 + i * 60, 1060, 380 + i * 60)).join('')}
  <polyline points="296,560 405,510 514,530 623,470 732,488 841,430 950,452 1060,398" fill="none" stroke="${SIGNAL}" stroke-width="2.5" stroke-dasharray="900" stroke-dashoffset="900">
    <animate attributeName="stroke-dashoffset" values="900;0;0" keyTimes="0;0.4;1" dur="6s" repeatCount="indefinite"/>
  </polyline>
  ${['PZT', 'SAL', 'ÇAR', 'PER', 'CUM', 'CMT'].map((d, i) => label(296 + i * 152, 606, d, FAINT, 10))}
  ${rect(1112, 296, 292, 330, CARD, `stroke="${LINE}"`)}
  ${label(1136, 330, 'SIRADAKİ HASTALAR')}
  ${[['09:20', 'Ayşe Yılmaz', 'Katarakt kontrol'], ['09:40', 'Mehmet Demir', 'SMILE ön muayene'], ['10:00', 'Zeynep Arslan', 'Lens ölçümü'], ['10:20', 'Ali Vural', 'Kontrol']].map(([t, n, d], i) => `
    ${text(1136, 372 + i * 62, t, { size: 12, font: MONO, fill: SIGNAL })}
    ${text(1196, 372 + i * 62, n, { size: 14, weight: 600 })}
    ${text(1196, 391 + i * 62, d, { size: 11.5, fill: DIM })}`).join('')}
  ${rect(272, 656, 1132, 190, CARD, `stroke="${LINE}"`)}
  ${label(296, 690, 'UYARILAR')}
  ${[['Stok: Lens solüsyonu kritik seviyede', SIGNAL], ['Lab: 3 sonuç onay bekliyor', DIM], ['Yedekleme 02:00’de tamamlandı', GREEN]].map(([s, c], i) => `
    <circle cx="304" cy="${718 + i * 36}" r="3.5" fill="${c}"/>
    ${text(322, 723 + i * 36, s, { size: 13.5, fill: DIM })}`).join('')}
`);

/* ---------- 05 · CALENDAR ---------- */
{
  const DOCS = ['DR. KAYA', 'DR. ÖZTÜRK', 'DR. AYDIN', 'AMELİYATHANE'];
  const APPTS = [
    [0, 0, 2, 'Ayşe Yılmaz', 0], [0, 3, 1, 'Kontrol', 0], [0, 5, 2, 'Mehmet Demir', 0],
    [1, 1, 2, 'Zeynep Arslan', 0], [1, 4, 1, 'Lens ölçümü', 0],
    [2, 0, 1, 'Kontrol', 0], [2, 2, 2, 'Ali Vural', 0],
    [3, 1, 3, 'SMILE — Oda 2', 1], [3, 5, 2, 'Katarakt — Oda 1', 1],
  ];
  SHOTS['shot-calendar'] = frame(`
  ${chrome('RANDEVULAR')}
  ${text(272, 116, 'Randevu Takvimi — 14 Temmuz 2026', { size: 22, weight: 700 })}
  ${chip(1256, 96, '+ RANDEVU', PAPER, INK, 100)}
  ${rect(272, 146, 1132, 700, CARD, `stroke="${LINE}"`)}
  ${DOCS.map((d, c) => `${label(392 + c * 264, 182, d, c === 3 ? SIGNAL : FAINT)}${line(352 + c * 264, 196, 352 + c * 264, 846, LINE)}`).join('')}
  ${[...Array(8)].map((_, r) => `${label(296, 232 + r * 80, `${9 + r}:00`, FAINT, 10.5)}${line(272, 226 + r * 80, 1404, 226 + r * 80)}`).join('')}
  ${APPTS.map(([c, r, len, name, surg]) => `
    ${rect(364 + c * 264, 232 + r * 80, 240, len * 80 - 12, surg ? SIGNAL_SOFT : GREEN_SOFT, `stroke="${surg ? 'rgba(201,60,11,0.35)' : 'rgba(28,107,66,0.3)'}"`)}
    ${text(378 + c * 264, 254 + r * 80, name, { size: 12.5, weight: 600, fill: surg ? SIGNAL : GREEN })}
    ${text(378 + c * 264, 271 + r * 80, `${9 + r}:00 – ${9 + r + len}:00`, { size: 10.5, fill: DIM, font: MONO })}`).join('')}
  <g>
    <rect x="892" y="552" width="240" height="68" fill="${GREEN_SOFT}" stroke="rgba(28,107,66,0.3)">
      <animate attributeName="y" values="552;552;712;712;552" keyTimes="0;0.4;0.5;0.95;1" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.3 0 0.2 1; 0 0 1 1; 0.3 0 0.2 1"/>
    </rect>
    <text x="906" y="574" font-family="${SANS}" font-size="12.5" font-weight="600" fill="${GREEN}">Elif Kurt — kaydırıldı
      <animate attributeName="y" values="574;574;734;734;574" keyTimes="0;0.4;0.5;0.95;1" dur="6s" repeatCount="indefinite" calcMode="spline" keySplines="0 0 1 1; 0.3 0 0.2 1; 0 0 1 1; 0.3 0 0.2 1"/>
    </text>
  </g>
`);
}

/* ---------- 06 · PATIENT RECORD ---------- */
SHOTS['shot-patient'] = frame(`
  ${chrome('HASTALAR')}
  ${rect(272, 96, 340, 750, CARD, `stroke="${LINE}"`)}
  <circle cx="342" cy="186" r="44" fill="${BLOCK}"/>
  ${text(342, 194, 'AY', { size: 22, weight: 700, fill: DIM, anchor: 'middle' })}
  ${text(412, 176, 'Ayşe Yılmaz', { size: 19, weight: 700 })}
  ${label(412, 200, 'DOSYA P-2026-0412 · 1987')}
  ${chip(412, 214, 'KVKK ONAYI VAR', GREEN, GREEN_SOFT)}
  ${line(272, 270, 612, 270)}
  ${[['TELEFON', '+90 5·· ··· ·· 42'], ['SON ZİYARET', '02.07.2026'], ['TANI', 'Katarakt — sağ göz'], ['DOKTOR', 'Dr. Selin Kaya'], ['SİGORTA', 'Özel — anlaşmalı']].map(([k, v], i) => `
    ${label(296, 312 + i * 78, k)}
    ${text(296, 338 + i * 78, v, { size: 14.5, weight: 600 })}`).join('')}
  ${text(640, 126, 'Hasta Zaman Çizelgesi', { size: 22, weight: 700 })}
  ${['ÖZET', 'MUAYENELER', 'BELGELER', 'REÇETELER'].map((t, i) => `${label(640 + i * 130, 162, t, i === 1 ? SIGNAL : FAINT)}${i === 1 ? rect(640 + i * 130, 170, 96, 2, SIGNAL) : ''}`).join('')}
  ${line(668, 200, 668, 846, LINE2)}
  ${[['02.07.2026', 'Kontrol muayenesi', 'Görme keskinliği 0.9 — ameliyat planlandı', GREEN],
     ['18.06.2026', 'Biyometri + topografi', 'Lens gücü hesaplandı, rapor dosyada', DIM],
     ['04.06.2026', 'İlk muayene', 'Katarakt tanısı — sağ göz', DIM],
     ['04.06.2026', 'Lab — kan paneli', 'Ameliyat öncesi değerler normal', DIM]].map(([d, t, s, c], i) => `
    <circle cx="668" cy="${232 + i * 150}" r="7" fill="${CARD}" stroke="${c}" stroke-width="2.5"/>
    ${i === 0 ? `<circle cx="668" cy="232" r="7" fill="none" stroke="${GREEN}" stroke-width="2"><animate attributeName="r" values="7;15" dur="2s" repeatCount="indefinite"/><animate attributeName="opacity" values="0.8;0" dur="2s" repeatCount="indefinite"/></circle>` : ''}
    ${rect(700, 202 + i * 150, 680, 116, CARD, `stroke="${LINE}"`)}
    ${label(724, 234 + i * 150, d)}
    ${text(724, 262 + i * 150, t, { size: 15.5, weight: 700 })}
    ${text(724, 286 + i * 150, s, { size: 13, fill: DIM })}`).join('')}
`);

/* ---------- 07 · LAB ---------- */
SHOTS['shot-lab'] = frame(`
  ${chrome('LABORATUVAR')}
  ${text(272, 116, 'Laboratuvar Sonuçları', { size: 22, weight: 700 })}
  ${chip(272, 130, 'CİHAZ BAĞLANTISI AKTİF', GREEN, GREEN_SOFT)}
  ${rect(272, 170, 1132, 680, CARD, `stroke="${LINE}"`)}
  ${label(296, 206, 'HASTA')}${label(560, 206, 'TETKİK')}${label(820, 206, 'SONUÇ')}${label(990, 206, 'REFERANS')}${label(1200, 206, 'DURUM')}
  ${line(272, 220, 1404, 220, LINE2)}
  ${[['Ayşe Yılmaz', 'Hemogram', '13.8 g/dL', '12–16', 'NORMAL', GREEN],
     ['Ayşe Yılmaz', 'Glukoz (açlık)', '96 mg/dL', '70–100', 'NORMAL', GREEN],
     ['Mehmet Demir', 'HbA1c', '%6.9', '< %5.7', 'YÜKSEK', RED],
     ['Zeynep Arslan', 'TSH', '2.1 mIU/L', '0.4–4.0', 'NORMAL', GREEN],
     ['Ali Vural', 'Kreatinin', '1.02 mg/dL', '0.7–1.2', 'NORMAL', GREEN],
     ['Elif Kurt', 'CRP', '11 mg/L', '< 5', 'YÜKSEK', RED],
     ['Hasan Çelik', 'ALT', '28 U/L', '< 41', 'NORMAL', GREEN]].map(([n, t, v, ref, st, c], i) => {
    const y = 220 + i * 64;
    return `${i ? line(272, y, 1404, y) : ''}
      ${text(296, y + 39, n, { size: 14, weight: 600 })}
      ${text(560, y + 39, t, { size: 13.5, fill: DIM })}
      ${text(820, y + 39, v, { size: 13.5, font: MONO })}
      ${text(990, y + 39, ref, { size: 12.5, fill: FAINT, font: MONO })}
      ${chip(1200, y + 21, st, c, c === GREEN ? GREEN_SOFT : 'rgba(181,60,60,0.09)')}`;
  }).join('')}
  <g opacity="0">
    <animate attributeName="opacity" values="0;0;1;1" keyTimes="0;0.45;0.6;1" dur="6s" repeatCount="indefinite"/>
    ${line(272, 668, 1404, 668)}
    ${rect(272, 668, 1132, 64, GREEN_SOFT)}
    ${text(296, 707, 'Fatma Aydın', { size: 14, weight: 600 })}
    ${text(560, 707, 'Sedimantasyon', { size: 13.5, fill: DIM })}
    ${text(820, 707, '12 mm/h', { size: 13.5, font: MONO })}
    ${text(990, 707, '< 20', { size: 12.5, fill: FAINT, font: MONO })}
    ${chip(1200, 689, 'YENİ — CİHAZDAN', GREEN, GREEN_SOFT)}
  </g>
`);

/* ---------- 08 · BILLING ---------- */
SHOTS['shot-billing'] = frame(`
  ${chrome('FATURALAMA')}
  ${text(272, 116, 'Fatura — F-2026-1187', { size: 22, weight: 700 })}
  ${chip(272, 130, 'SİGORTA ONAYLANDI', GREEN, GREEN_SOFT)}
  ${rect(272, 170, 740, 680, CARD, `stroke="${LINE}"`)}
  ${label(296, 206, 'HASTA: AYŞE YILMAZ · DOSYA P-2026-0412')}
  ${line(272, 220, 1012, 220, LINE2)}
  ${label(296, 252, 'KALEM')}${label(760, 252, 'ADET')}${label(900, 252, 'TUTAR')}
  ${[['Katarakt ameliyatı — tek göz', '1', '38.500'], ['Monofokal lens', '1', '6.200'], ['Biyometri ölçümü', '1', '1.150'], ['Kontrol muayenesi (3x)', '3', '0'], ['Ameliyat sonrası ilaç seti', '1', '840']].map(([k, a, t], i) => {
    const y = 268 + i * 58;
    return `${line(296, y, 988, y)}
      ${text(296, y + 36, k, { size: 14 })}
      ${text(772, y + 36, a, { size: 13, font: MONO, fill: DIM })}
      ${text(988, y + 36, t === '0' ? 'Pakete dahil' : `₺${t}`, { size: 13.5, font: MONO, anchor: 'end', fill: t === '0' ? FAINT : INK })}`;
  }).join('')}
  ${rect(1040, 170, 364, 400, CARD, `stroke="${LINE}"`)}
  ${label(1064, 206, 'ÖZET')}
  ${[['Ara toplam', '₺46.690'], ['İndirim (paket)', '− ₺2.400'], ['KDV (%10)', '₺4.429'], ['Sigorta karşılığı', '− ₺31.200']].map(([k, v], i) => `
    ${text(1064, 248 + i * 44, k, { size: 13.5, fill: DIM })}
    ${text(1380, 248 + i * 44, v, { size: 13.5, font: MONO, anchor: 'end' })}`).join('')}
  ${line(1064, 428, 1380, 428, LINE2)}
  ${text(1064, 470, 'Hasta ödemesi', { size: 15, weight: 700 })}
  <g>
    ${text(1380, 470, '₺17.519', { size: 19, weight: 700, font: MONO, anchor: 'end', fill: SIGNAL })}
    <animate attributeName="opacity" values="1;1;0.25;1" keyTimes="0;0.6;0.68;0.8" dur="5s" repeatCount="indefinite"/>
  </g>
  ${rect(1064, 500, 316, 42, INK)}
  ${text(1222, 526, 'TAHSİLAT AL →', { size: 12, fill: PAPER, font: MONO, ls: 2, anchor: 'middle' })}
  ${rect(1040, 600, 364, 250, CARD, `stroke="${LINE}"`)}
  ${label(1064, 636, 'ÖDEME GEÇMİŞİ')}
  ${[['14.07.2026', 'Kapora', '₺5.000'], ['02.07.2026', 'Ön ödeme', '₺4.000']].map(([d, k, v], i) => `
    ${text(1064, 676 + i * 44, d, { size: 12, font: MONO, fill: FAINT })}
    ${text(1180, 676 + i * 44, k, { size: 13, fill: DIM })}
    ${text(1380, 676 + i * 44, v, { size: 13, font: MONO, anchor: 'end' })}`).join('')}
`);

/* ---------- 09 · AI FRONT DESK ---------- */
SHOTS['shot-agent'] = frame(`
  ${chrome('RANDEVULAR', 'RESEPSİYON', 'Derya Şahin')}
  ${text(272, 116, 'AI Ön Büro — WhatsApp', { size: 22, weight: 700 })}
  ${chip(560, 96, 'KURAL KORUMALI · 7/24', SIGNAL, SIGNAL_SOFT)}
  ${rect(272, 146, 380, 700, CARD, `stroke="${LINE}"`)}
  ${label(296, 182, 'AKTİF GÖRÜŞMELER')}
  ${line(272, 196, 652, 196, LINE2)}
  ${[['Ayşe Y.', 'Randevu değişikliği', '09:41', 1], ['Mehmet D.', 'Fiyat bilgisi', '09:32', 0], ['Zeynep A.', 'Yol tarifi', '09:14', 0], ['Elif K.', 'Sonuç ne zaman çıkar?', '08:55', 0]].map(([n, s, t, on], i) => `
    ${on ? rect(272, 196 + i * 78, 380, 78, SIGNAL_SOFT) : ''}
    ${text(296, 228 + i * 78, n, { size: 14.5, weight: 700 })}
    ${text(296, 250 + i * 78, s, { size: 12.5, fill: DIM })}
    ${text(628, 228 + i * 78, t, { size: 11, font: MONO, fill: FAINT, anchor: 'end' })}`).join('')}
  ${rect(680, 146, 724, 700, CARD, `stroke="${LINE}"`)}
  ${label(704, 182, 'AYŞE Y. · +90 5·· ··· ·· 42 · WHATSAPP')}
  ${line(680, 196, 1404, 196, LINE2)}
  ${rect(704, 224, 330, 64, BLOCK, 'rx="3"')}
  ${text(722, 250, 'Merhaba, yarınki randevumu', { size: 13 })}
  ${text(722, 270, '14:00’e alabilir miyiz?', { size: 13 })}
  ${rect(1042, 312, 338, 84, SIGNAL_SOFT, 'rx="3"')}
  ${text(1060, 338, 'Tabii Ayşe Hanım — Dr. Kaya’nın', { size: 13 })}
  ${text(1060, 358, 'yarın 14:00 kontenjanı uygun,', { size: 13 })}
  ${text(1060, 378, 'randevunuzu aldım. ✓', { size: 13 })}
  ${chip(1042, 408, 'RANDEVU GÜNCELLENDİ · SİSTEME İŞLENDİ', GREEN, GREEN_SOFT, 300)}
  ${rect(704, 470, 300, 64, BLOCK, 'rx="3"')}
  ${text(722, 496, 'Teşekkürler! Fiyat listesini', { size: 13 })}
  ${text(722, 516, 'de alabilir miyim?', { size: 13 })}
  <g>
    ${rect(1042, 560, 84, 44, SIGNAL_SOFT, 'rx="3"')}
    ${[0, 1, 2].map((i) => `<circle cx="${1068 + i * 16}" cy="582" r="4" fill="${SIGNAL}"><animate attributeName="opacity" values="0.25;1;0.25" dur="1.2s" begin="${i * 0.2}s" repeatCount="indefinite"/></circle>`).join('')}
  </g>
  ${label(704, 744, 'ASİSTAN YALNIZ İZİNLİ İŞLEMLERİ YAPAR — KİŞİSEL VERİ PAYLAŞMAZ, HEKİM YORUMU VERMEZ', FAINT, 10.5)}
  ${line(680, 760, 1404, 760)}
  ${rect(704, 776, 676, 46, PAPER, `stroke="${LINE2}"`)}
  ${text(720, 804, 'Devralmak için yazın…', { size: 13, fill: FAINT })}
`);

for (const [name, svg] of Object.entries(SHOTS)) {
  writeFileSync(`${OUT}/${name}.svg`, svg);
  console.log('wrote', name, (svg.length / 1024).toFixed(1) + 'kb');
}
