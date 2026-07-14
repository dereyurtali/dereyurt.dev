// Stylized n8n-workflow drawings for the Clinic AI Automation row — NOT
// exports of the real canvases. Two are redrawn from the live TurkEye
// workflows (node roles and order preserved, everything else simplified);
// two illustrate the reminder and document pipelines the row describes.
// No URLs, tokens, sheet ids or prompt text — node labels only.
import { writeFileSync, mkdirSync } from 'node:fs';

const OUT = new URL('../public/clinic/', import.meta.url).pathname;
mkdirSync(OUT, { recursive: true });

const W = 1440, H = 800;
const PAPER = '#f7f8f4', CARD = '#fdfdfb';
const INK = '#15171a';
const DIM = 'rgba(21,23,26,0.62)', FAINT = 'rgba(21,23,26,0.4)';
const LINE = 'rgba(21,23,26,0.14)', LINE2 = 'rgba(21,23,26,0.28)';
const SIGNAL = '#c93c0b', GREEN = '#1c6b42', RED = '#b53c3c';
const MONO = 'ui-monospace, Menlo, monospace';
const SANS = 'Helvetica, Arial, sans-serif';

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// n8n-style dot grid
function dots() {
  let s = '';
  for (let x = 24; x < W; x += 36)
    for (let y = 24; y < H; y += 36) s += `<circle cx="${x}" cy="${y}" r="1" fill="rgba(21,23,26,0.07)"/>`;
  return s;
}

const NW = 176, NH = 58; // node card size

// A node card: icon square + two lines of label. (x,y) is the card centre.
function node(cx, cy, title, sub, color = INK, dashed = false) {
  const x = cx - NW / 2, y = cy - NH / 2;
  return `
    <rect x="${x}" y="${y}" width="${NW}" height="${NH}" rx="3" fill="${CARD}"
      stroke="${dashed ? LINE : LINE2}" ${dashed ? 'stroke-dasharray="4 4"' : ''}/>
    <rect x="${x + 14}" y="${y + NH / 2 - 5}" width="10" height="10" fill="${color}"/>
    <text x="${x + 36}" y="${cy - 2}" font-family="${MONO}" font-size="11.5" letter-spacing="0.5" fill="${INK}">${esc(title)}</text>
    <text x="${x + 36}" y="${cy + 14}" font-family="${SANS}" font-size="10.5" fill="${DIM}">${esc(sub)}</text>
  `;
}

// Orthogonal connector between card edges, with an arrowhead and an animated
// pulse riding the line so the canvas reads as "running".
function conn(x1, y1, x2, y2, { color = LINE2, pulse = false, dashed = false } = {}) {
  const midX = x1 + Math.max(28, (x2 - x1) / 2);
  const d =
    y1 === y2
      ? `M ${x1} ${y1} L ${x2 - 8} ${y2}`
      : `M ${x1} ${y1} L ${midX} ${y1} L ${midX} ${y2} L ${x2 - 8} ${y2}`;
  return `
    <path d="${d}" fill="none" stroke="${color}" stroke-width="1.4" ${dashed ? 'stroke-dasharray="4 4"' : ''}/>
    <path d="M ${x2 - 8} ${y2 - 4} L ${x2} ${y2} L ${x2 - 8} ${y2 + 4} Z" fill="${color}"/>
    ${pulse ? `<path d="${d}" fill="none" stroke="${SIGNAL}" stroke-width="2" pathLength="100" stroke-dasharray="5 95">
      <animate attributeName="stroke-dashoffset" values="100;0" dur="3.2s" repeatCount="indefinite"/>
    </path>` : ''}
  `;
}

// Straight dashed hanger from an agent card down to a tool card.
function hang(x, y1, y2) {
  return `<line x1="${x}" y1="${y1}" x2="${x}" y2="${y2}" stroke="${LINE2}" stroke-dasharray="3 4" stroke-width="1.2"/>`;
}

function annotation(x, y, txt) {
  return `<text x="${x}" y="${y}" font-family="${MONO}" font-size="10" letter-spacing="1.5" fill="${FAINT}">${esc(txt)}</text>`;
}

function frame(title, note, body) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">
  <rect width="${W}" height="${H}" fill="${PAPER}"/>
  ${dots()}
  <text x="36" y="46" font-family="${MONO}" font-size="13" letter-spacing="2" fill="${SIGNAL}">${esc(title)}</text>
  <text x="36" y="68" font-family="${MONO}" font-size="10.5" letter-spacing="1" fill="${FAINT}">${esc(note)}</text>
  <circle cx="${W - 130}" cy="40" r="4" fill="${GREEN}">
    <animate attributeName="opacity" values="1;0.25;1" dur="2.2s" repeatCount="indefinite"/>
  </circle>
  <text x="${W - 116}" y="44" font-family="${MONO}" font-size="10.5" letter-spacing="1.5" fill="${DIM}">ACTIVE</text>
  ${body}
</svg>`;
}

const FLOWS = {};

/* ---------- A · WhatsApp AI responder (redrawn from the live workflow) ---------- */
{
  const Y = 300;
  FLOWS['flow-responder'] = frame(
    'WORKFLOW A — WHATSAPP AI RESPONDER',
    'PATIENT MESSAGES · TEXT / VOICE / IMAGE · 7/24',
    `
    ${node(150, Y, 'WEBHOOK', 'WhatsApp in · via CRM', SIGNAL)}
    ${node(390, Y, 'DEBOUNCE', 'batch rapid messages', INK)}
    ${node(630, Y, 'MESSAGE TYPE?', 'switch: text / voice / image', INK)}
    ${conn(238, Y, 302, Y, { pulse: true })}
    ${conn(478, Y, 542, Y, { pulse: true })}

    ${node(880, 160, 'TRANSCRIBE', 'voice → text', INK)}
    ${node(880, Y, 'PASS TEXT', 'as-is', INK)}
    ${node(880, 440, 'READ IMAGE', 'vision: reports, photos', INK)}
    ${conn(718, Y - 14, 792, 160, {})}
    ${conn(718, Y, 792, Y, { pulse: true })}
    ${conn(718, Y + 14, 792, 440, {})}

    ${node(1130, Y, 'AI AGENT', 'books, answers, escalates', SIGNAL)}
    ${conn(968, 160, 1042, Y - 10, {})}
    ${conn(968, Y, 1042, Y, { pulse: true })}
    ${conn(968, 440, 1042, Y + 10, {})}

    ${node(1130, 470, 'CHAT MEMORY', 'per patient', INK, true)}
    ${node(920, 590, 'CALENDAR', "doctors' slots", GREEN, true)}
    ${node(1130, 590, 'PATIENT SHEET', 'read / update', GREEN, true)}
    ${node(1340, 590, 'KNOWLEDGE BASE', 'prices, prep, FAQ', GREEN, true)}
    ${hang(1130, Y + NH / 2, 470 - NH / 2)}
    ${hang(1000, 470 + NH / 2 + 24, 590 - NH / 2)}
    ${hang(1130, 470 + NH / 2, 590 - NH / 2)}
    ${hang(1260, 470 + NH / 2 + 24, 590 - NH / 2)}
    ${annotation(836, 680, 'TOOLS — THE AGENT CAN ONLY ACT THROUGH THESE')}

    ${node(1340, 160, 'SEND REPLY', 'WhatsApp out · in 3 languages', SIGNAL)}
    ${conn(1218, Y - 12, 1252, 160, { pulse: true })}
    ${annotation(60, 680, 'REDRAWN FROM THE LIVE WORKFLOW — 29 NODES SIMPLIFIED TO THE SPINE')}
  `
  );
}

/* ---------- B · EHR appointment sync (redrawn from the live workflow) ---------- */
{
  const Y = 300;
  FLOWS['flow-ehr-sync'] = frame(
    'WORKFLOW B — EHR APPOINTMENT SYNC',
    'GOOGLE SHEETS → BULUT KLİNİK (EHR) · EVERY 15 MIN',
    `
    ${node(150, Y, 'SCHEDULE', 'every 15 minutes', SIGNAL)}
    ${node(390, Y, 'READ SHEET', 'new appointment rows', GREEN)}
    ${node(630, Y, 'EHR LOGIN', 'token · OAuth session', INK)}
    ${node(870, Y, 'VALIDATE ROWS', 'required fields present?', INK)}
    ${conn(238, Y, 302, Y, { pulse: true })}
    ${conn(478, Y, 542, Y, { pulse: true })}
    ${conn(718, Y, 782, Y, { pulse: true })}

    ${node(1120, 200, 'CREATE RESERVATION', 'EHR API', SIGNAL)}
    ${node(1120, 400, 'MARK ROW FAILED', 'missing data → back to sheet', RED)}
    ${conn(958, Y - 12, 1032, 200, { pulse: true })}
    ${conn(958, Y + 12, 1032, 400, { color: 'rgba(181,60,60,0.5)' })}
    ${annotation(975, 175, 'OK')}
    ${annotation(975, 445, 'MISSING')}

    ${node(1120, 560, 'CONFIRM + WRITE BACK', 'hash check · row updated ✓', GREEN)}
    <line x1="1120" y1="${200 + NH / 2}" x2="1120" y2="${560 - NH / 2 - 8}" stroke="${LINE2}" stroke-width="1.4"/>
    <path d="M 1116 ${560 - NH / 2 - 8} L 1120 ${560 - NH / 2} L 1124 ${560 - NH / 2 - 8} Z" fill="${LINE2}"/>
    <line x1="1120" y1="${200 + NH / 2}" x2="1120" y2="${560 - NH / 2 - 4}" stroke="${SIGNAL}" stroke-width="2" pathLength="100" stroke-dasharray="5 95">
      <animate attributeName="stroke-dashoffset" values="100;0" dur="3.2s" repeatCount="indefinite"/>
    </line>
    ${annotation(60, 680, 'REDRAWN FROM THE LIVE WORKFLOW — RECEPTION NEVER RE-TYPES AN APPOINTMENT')}
  `
  );
}

/* ---------- C · Patient reminders (illustrative) ---------- */
{
  const Y = 300;
  FLOWS['flow-reminders'] = frame(
    'WORKFLOW C — PATIENT REMINDERS',
    'DAY-BEFORE CONFIRMATIONS · TR / EN / RU',
    `
    ${node(150, Y, 'SCHEDULE 09:00', 'daily', SIGNAL)}
    ${node(390, Y, "TOMORROW'S LIST", 'appointments from calendar', GREEN)}
    ${node(630, Y, 'UNCONFIRMED?', 'filter already-confirmed', INK)}
    ${node(870, Y, 'WRITE MESSAGE', "LLM · patient's language", SIGNAL)}
    ${node(1110, Y, 'SEND WHATSAPP', 'template + slot details', SIGNAL)}
    ${conn(238, Y, 302, Y, { pulse: true })}
    ${conn(478, Y, 542, Y, { pulse: true })}
    ${conn(718, Y, 782, Y, { pulse: true })}
    ${conn(958, Y, 1022, Y, { pulse: true })}

    ${node(1110, 460, 'WAIT FOR REPLY', 'up to 4 hours', INK)}
    ${hang(1110, Y + NH / 2, 460 - NH / 2)}

    ${node(660, 600, 'MARK CONFIRMED', 'sheet + calendar note', GREEN)}
    ${node(910, 600, 'OFFER NEW SLOT', 'agent reschedules', SIGNAL)}
    ${node(1160, 600, 'CALL LIST', 'no reply → reception queue', RED)}
    ${[660, 910, 1160].map((tx) => `
      <path d="M 1110 ${460 + NH / 2} L 1110 535 L ${tx} 535 L ${tx} ${600 - NH / 2 - 8}" fill="none" stroke="${LINE2}" stroke-width="1.4"/>
      <path d="M ${tx - 4} ${600 - NH / 2 - 8} L ${tx} ${600 - NH / 2} L ${tx + 4} ${600 - NH / 2 - 8} Z" fill="${LINE2}"/>
    `).join('')}
    ${annotation(600, 675, '"YES"')}
    ${annotation(860, 675, '"CHANGE IT"')}
    ${annotation(1120, 675, 'SILENCE')}
    ${annotation(60, 680, 'NO-SHOW RATE IS A COST LINE — THIS RUNS BEFORE EVERY CLINIC DAY')}
  `
  );
}

/* ---------- D · Document intake (illustrative, the vision pipeline) ---------- */
{
  const Y = 300;
  FLOWS['flow-documents'] = frame(
    'WORKFLOW D — DOCUMENT INTAKE',
    'PATIENT-SENT FILES → STRUCTURED RECORD',
    `
    ${node(150, Y, 'MEDIA WEBHOOK', 'WhatsApp file / photo', SIGNAL)}
    ${node(390, Y, 'FILE TYPE?', 'pdf / image switch', INK)}
    ${conn(238, Y, 302, Y, { pulse: true })}

    ${node(640, 190, 'PARSE PDF', 'lab reports, referrals', INK)}
    ${node(640, 410, 'VISION READ', 'photos of documents', INK)}
    ${conn(478, Y - 12, 552, 190, { pulse: true })}
    ${conn(478, Y + 12, 552, 410, {})}

    ${node(890, Y, 'STRUCTURE FIELDS', 'LLM → strict JSON schema', SIGNAL)}
    ${conn(728, 190, 802, Y - 10, { pulse: true })}
    ${conn(728, 410, 802, Y + 10, {})}

    ${node(1140, Y, 'MATCH PATIENT', 'name + DOB verified', INK)}
    ${conn(978, Y, 1052, Y, { pulse: true })}

    ${node(1140, 140, 'FILE TO RECORD', 'attached to patient chart', GREEN)}
    ${node(1140, 470, 'HUMAN REVIEW', 'no match → reception inbox', RED)}
    ${conn(1140 - 50, Y - NH / 2, 1052 + 50, 140 + NH / 2 + 4, { color: LINE2 }).replace('M', 'M')}
    ${hang(1140, Y + NH / 2, 470 - NH / 2)}
    ${annotation(1215, 250, 'MATCH')}
    ${annotation(1215, 420, 'NO MATCH')}

    ${node(1340, 300, 'NOTIFY DOCTOR', 'new result on chart', GREEN)}
    <path d="M ${1140 + NW / 2} 140 L 1340 140 L 1340 ${300 - NH / 2 - 8}" fill="none" stroke="${LINE2}" stroke-width="1.4"/>
    <path d="M 1336 ${300 - NH / 2 - 8} L 1340 ${300 - NH / 2} L 1344 ${300 - NH / 2 - 8} Z" fill="${LINE2}"/>
    ${annotation(60, 680, 'NOTHING ENTERS THE RECORD WITHOUT A VERIFIED PATIENT MATCH')}
  `
  );
}

for (const [name, svg] of Object.entries(FLOWS)) {
  writeFileSync(`${OUT}/${name}.svg`, svg);
  // Static twin for the homepage thumbnails: SMIL in an <img> keeps
  // animating (and repainting) even at thumbnail size, which taxes scroll.
  writeFileSync(`${OUT}/${name}-static.svg`, svg.replace(/<animate\b[^>]*\/>/g, ''));
  console.log('wrote', name, (svg.length / 1024).toFixed(1) + 'kb (+static)');
}
