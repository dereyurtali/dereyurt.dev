'use client';

import SubpageShell, { Section, Spec, Stat, StatGrid, BtnLink } from '@/components/SubpageShell';
import { MissionProfile, StateMachine, Plate } from '@/components/subpage/figures';

const PDF = '/2021-muy-cdr/T-MUY2021_37032_CDR_v1.0.pdf';

const PHASES = [
  { x: 140, y: 56, n: '1', label: 'DEPLOYMENT', sub: 'FROM ROCKET @ 700 M' },
  { x: 320, y: 130, n: '2', label: 'SEPARATION', sub: '@ 400 M · SMOKE' },
  { x: 520, y: 226, n: '3', label: 'HOVER', sub: '10 S @ 200 M' },
  { x: 762, y: 344, n: '4', label: 'LANDING', sub: 'BUZZER + GPS' },
];

const ALTITUDES = [
  { y: 56, label: '700 M' },
  { y: 130, label: '400 M' },
  { y: 226, label: '200 M' },
];

export default function TurksatCDR2021() {
  return (
    <SubpageShell
      dwg="2021"
      eyebrow="TÜRKSAT MODEL SATELLITE — CRITICAL DESIGN REVIEW"
      title={
        <>
          Autogyro <span className="text-signal">descent</span>
        </>
      }
      meta="TEAM TALIA AEROSPACE · TEAM #37032 · FATIH SULTAN MEHMET VAKIF UNIVERSITY · 2021 · ROLE: TEAM LEAD & OPERATIONS CONTROL"
      lede="A 199-page critical design review for a rocket-deployed model satellite that slows its own fall. After separating at 400 m, the payload switches from parachute to an autogyro rotor, holds altitude for ten seconds at 200 m under PID control, and marks its position with a pyrotechnic smoke capsule."
      actions={<BtnLink href={PDF} download>DOWNLOAD THE CDR — 199 PAGES</BtnLink>}
    >
      {/* ---------- Mission profile ---------- */}
      <Section dwg="FIG 01" title="MISSION PROFILE">
        <Plate caption="DEPLOYMENT @700 M → SEPARATION @400 M → HOVER @200 M → LANDING">
          <MissionProfile
            path="M140 56 C 210 84, 270 108, 320 130 C 390 162, 460 194, 520 226 C 600 262, 690 312, 762 344"
            carrier="M320 130 C 400 210, 480 320, 536 398"
            phases={PHASES}
            altitudes={ALTITUDES}
            notes={[
              { x: 160, y: 140, text: 'PARACHUTE — 10–14 M/S' },
              { x: 350, y: 116, text: 'SMOKE CAPSULE', signal: true },
              { x: 404, y: 176, text: 'AUTOGYRO ROTOR — 8–10 M/S', signal: true },
              { x: 268, y: 360, text: 'CARRIER FALLS SEPARATELY' },
              { x: 786, y: 94, text: 'TELEMETRY 1 HZ', signal: true, anchor: 'middle' },
            ]}
          />
        </Plate>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Spec
            title="PRIMARY MISSION"
            items={[
              'Deploy from the rocket at 700 m',
              'Autonomous separation at 400 m',
              'Active descent on the autogyro system — 8–10 m/s',
              'Real-time telemetry at 1 Hz',
            ]}
          />
          <Spec
            title="BONUS MISSION"
            items={[
              'Hold ~200 m for 10 seconds',
              'Maintain altitude under PID control',
              'Resume descent after the timeout',
              'Visual tracking via the smoke capsule',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Numbers ---------- */}
      <Section dwg="TAB 01" title="REVIEW AT A GLANCE" band>
        <StatGrid>
          <Stat value="199" label="CDR PAGES" />
          <Stat value="30+" label="TEAM MEMBERS LED" />
          <Stat value="1 Hz" label="TELEMETRY RATE" />
          <Stat value="100%" label="REQUIREMENTS MET" />
        </StatGrid>
      </Section>

      {/* ---------- Subsystems ---------- */}
      <Section dwg="TAB 02" title="SUBSYSTEM HIGHLIGHTS">
        <div className="grid min-w-0 gap-6 lg:grid-cols-3">
          <Spec
            title="SENSING"
            items={[
              'MPU9250 — 9-axis MEMS for pitch, roll and yaw',
              'NEO M8N GPS with compass for recovery',
              'BMP280 barometer — better than 0.1 m altitude resolution',
            ]}
          />
          <Spec
            title="ACTIVE LANDING"
            items={[
              'Single BLDC motor driving counter-rotating props',
              '30 A ESC, PID altitude hold',
              'Autogyro rotor takes over from the parachute after separation',
            ]}
          />
          <Spec
            title="AVIONICS & COMMS"
            items={[
              'Arduino Nano flight controller',
              'ESP32-CAM for WiFi link and live video',
              '1 Hz telemetry, ~1500 m range, SD-card logging',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Flight software ---------- */}
      <Section dwg="FIG 02" title="FLIGHT SOFTWARE STATE MACHINE" band>
        <figure className="card" data-reveal>
          <div className="h-[180px] p-4">
            <StateMachine states={['YERDE', 'YÜKSELİŞ', 'AYRILMA', 'AKTİF İNİŞ', 'SABİT', 'İNİŞ', 'BİTİŞ']} />
          </div>
          <figcaption className="label border-t border-line px-4 py-2.5">AUTONOMOUS PHASE SEQUENCING</figcaption>
        </figure>
      </Section>

      {/* ---------- Team ---------- */}
      <Section dwg="TAB 03" title="TEAM TALIA AEROSPACE">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {[
            ['ALI DEREYURT', 'Team lead · operations control', true],
            ['NAGKICHAN MOUSTAFA IMPRAM', 'Software lead', false],
            ['FATMA SEMİHA ÜNAL', 'Electronics · communications', false],
            ['ERVANUR MIDILLI', 'Integration · ground station', false],
            ['ABDULLAH SELİM KÖKSAL', 'Support engineer', false],
            ['TEAM MEMBER', 'Mechanical · analysis', false],
          ].map(([name, role, me]) => (
            <div key={name as string} className="bg-card p-6">
              <p className={`label ${me ? 'label-signal' : ''}`}>{name}</p>
              <p className="mt-2 text-sm text-ink-dim">{role}</p>
            </div>
          ))}
        </div>
        <p className="label mt-8" data-reveal>
          FATIH SULTAN MEHMET VAKIF UNIVERSITY · TEAM ID 37032 · 199 PAGES · 7.7 MB · V1.0
        </p>
      </Section>
    </SubpageShell>
  );
}
