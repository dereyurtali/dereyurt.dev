'use client';

import SubpageShell, { Section, Spec, Stat, StatGrid, BtnLink } from '@/components/SubpageShell';
import { MissionProfile, LayerStack, StateMachine, Plate } from '@/components/subpage/figures';

const PDF = '/2022-muy-cdr/T-MUY2022_405365_CDR_v1.0.pdf';

const PHASES = [
  { x: 130, y: 58, n: '1', label: 'ASCENT', sub: 'DEPLOY @ 700 M' },
  { x: 286, y: 128, n: '2', label: 'DESCENT', sub: 'PARACHUTE' },
  { x: 430, y: 196, n: '3', label: 'SEPARATION', sub: '@ 200 M · SMOKE' },
  { x: 560, y: 250, n: '4', label: 'HOVER', sub: '10 S @ 150 M' },
  { x: 680, y: 306, n: '5', label: 'RECOVERY', sub: 'MOTORS CUT @ 5 M' },
  { x: 812, y: 348, n: '6', label: 'LANDING', sub: 'GPS + BUZZER' },
];

const ALTITUDES = [
  { y: 58, label: '700 M' },
  { y: 128, label: '400 M' },
  { y: 196, label: '200 M' },
  { y: 250, label: '150 M' },
];

export default function TurksatCDR2022() {
  return (
    <SubpageShell
      dwg="2022"
      eyebrow="TÜRKSAT MODEL SATELLITE — CRITICAL DESIGN REVIEW"
      title={
        <>
          Model satellite <span className="text-signal">CDR</span>
        </>
      }
      meta="TEAM TALIA 4A · TEAM #405365 · FATIH SULTAN MEHMET UNIVERSITY · MARCH 2022 · ROLE: SYSTEM LEAD & OPERATION CONTROL OFFICER"
      lede="A full critical design review of a rocket-deployed model satellite: a five-layer modular payload, an actively controlled landing system that holds altitude on PID-driven counter-rotating motors, pyrotechnic smoke capsules for visual tracking, and real-time YOLOv4-tiny object detection on the ground station feed."
      actions={<BtnLink href={PDF} download>DOWNLOAD THE CDR (PDF)</BtnLink>}
    >
      {/* ---------- Mission profile ---------- */}
      <Section dwg="FIG 01" title="MISSION PROFILE">
        <Plate caption="ASCENT → DESCENT → SEPARATION @200 M → HOVER @150 M → RECOVERY → LANDING" w={900} h={450}>
          <MissionProfile
            path="M130 58 C 200 90, 240 108, 286 128 C 340 156, 386 172, 430 196 C 480 220, 520 232, 560 250 C 610 272, 650 292, 680 306 C 730 328, 780 340, 812 348"
            carrier="M430 196 C 470 250, 520 330, 560 398"
            phases={PHASES}
            altitudes={ALTITUDES}
            notes={[
              { x: 150, y: 144, text: 'PARACHUTE — PASSIVE DESCENT' },
              { x: 452, y: 176, text: 'SMOKE CAPSULE DEPLOY', signal: true },
              { x: 290, y: 358, text: 'CARRIER FALLS SEPARATELY' },
              { x: 786, y: 94, text: 'TELEMETRY 1–5 HZ + LIVE VIDEO', signal: true, anchor: 'middle' },
            ]}
          />
        </Plate>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Spec
            title="PRIMARY MISSION"
            items={[
              'Deploy from the rocket at 700 m',
              'Autonomous separation at 200 m',
              'Active landing on PID-controlled motors',
              'Real-time telemetry at 1–5 Hz plus live video',
            ]}
          />
          <Spec
            title="CUSTOM MISSIONS"
            items={[
              'Smoke capsules — colored smoke for visual tracking',
              'YOLOv4-tiny object detection on the video feed',
              'Hold altitude at 150 m for 10 seconds',
              'Dual-channel comms (WiFi + NRF24)',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Numbers ---------- */}
      <Section dwg="TAB 01" title="SYSTEM BUDGET" band>
        <StatGrid>
          <Stat value="<1500 g" label="TOTAL MASS" />
          <Stat value="5" label="PAYLOAD LAYERS" />
          <Stat value="20.2 Wh" label="ENERGY BUDGET" />
          <Stat value="39/39" label="REQUIREMENTS MET" />
        </StatGrid>
      </Section>

      {/* ---------- Payload architecture ---------- */}
      <Section dwg="FIG 02" title="FIVE-LAYER PAYLOAD ARCHITECTURE">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-7">
            <Plate caption="MODULAR STACK — LOW CoG, SERVICEABLE LAYERS, CRASH PROTECTION" w={620} h={480} hLg={520}>
              <LayerStack
                layers={[
                  { label: 'ACTIVE LANDING', sub: '2× 2205 BLDC · COUNTER-ROTATING 4" PROPS', h: 62 },
                  { label: 'SEPARATION', sub: '3-GEAR SERVO · 2× SMOKE CAPSULES', h: 62 },
                  { label: 'POWER', sub: '4S 850 mAh LiPo — 14.28 Wh', h: 54 },
                  { label: 'ELECTRONICS', sub: 'ESP32 · NRF24L01 · MS5611 · MPU9250 · GPS M8N', h: 70 },
                  { label: 'CAMERA', sub: 'FOXEER RAZER MINI 1200TVL · DTX03 TX · SD', h: 62 },
                ]}
                carrier={{ label: 'CARRIER (SEPARATES)', sub: '2S 800 mAh · ESP32 · PARACHUTE' }}
              />
            </Plate>
          </div>
          <div className="flex min-w-0 flex-col gap-6 lg:col-span-5">
            <Spec
              title="DESIGN GOALS"
              items={[
                'Every layer reachable without disassembling the stack',
                'Mass distributed for a low centre of gravity',
                'Thermal isolation between the pyrotechnics and the electronics',
                'Crash-protection ribs around the PCB layer',
              ]}
            />
            <Spec
              title="MY SCOPE"
              items={[
                'System architecture and the five-layer breakdown',
                'Six post-PDR mechanical revisions — FDM printed in PETG/ABS',
                'Separation-mechanism gearing and motor mounts',
                'Three-phase integration plan; drop, thermal and vibration tests',
              ]}
            />
          </div>
        </div>
      </Section>

      {/* ---------- Subsystems ---------- */}
      <Section dwg="TAB 02" title="SUBSYSTEM HIGHLIGHTS" band>
        <div className="grid gap-6 lg:grid-cols-3">
          <Spec
            title="ACTIVE LANDING"
            items={[
              'PID gains Kp 15.0 · Ki 0.5 · Kd 8.0',
              'Target descent 8–10 m/s; 10 s altitude hold at 150 m',
              'Counter-rotating props cancel yaw; gyro corrects drift',
              'Motors cut at 5 m, 150 s timeout, battery watchdog',
            ]}
          />
          <Spec
            title="SMOKE CAPSULES"
            items={[
              '3D-printed double-wall body — thermos-style isolation',
              '60% KNO₃ + 40% sugar, dye and baking soda, 3 g charge',
              '~20 s burn, visible beyond 500 m, exterior stays under 40 °C',
              '10/10 ignitions on an electric fuse at 100 mA',
            ]}
          />
          <Spec
            title="DUAL-CHANNEL COMMS"
            items={[
              'Primary WiFi 2.412 GHz — telemetry and commands, ~1 km',
              'Secondary NRF24 2.437 GHz — async 300 KB video pull',
              'TL-ANT2424B dish on the ground side',
              '25 MHz channel separation keeps the links from stepping on each other',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Flight software ---------- */}
      <Section dwg="FIG 03" title="FLIGHT SOFTWARE STATE MACHINE">
        <Plate caption="AUTONOMOUS PHASE SEQUENCING" w={860} h={120} hLg={150}>
          <StateMachine states={['YERDE', 'YÜKSELİŞ', 'DÜŞÜŞ', 'AYRILMA', 'SABİT', 'KURTARMA', 'BİTİŞ']} />
        </Plate>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <Spec
            title="CRITICAL TRANSITIONS"
            items={[
              'YÜKSELİŞ → DÜŞÜŞ when altitude starts decreasing',
              'DÜŞÜŞ → AYRILMA below 200 m',
              'SABİT holds for 10 s, then hands back to descent',
            ]}
          />
          <Spec
            title="GROUND STATION & AI"
            items={[
              'C# WPF console: telemetry graphs, GMap.NET GPS map, live video',
              '3D attitude visualisation with HelixToolkit',
              'YOLOv4-tiny aircraft detection, ~10 FPS, RarePlanes dataset',
              'Pre-flight checklists, mission monitoring, GPS-guided recovery',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Team ---------- */}
      <Section dwg="TAB 03" title="TEAM TALIA 4A" band>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3" data-reveal>
          {[
            ['ALI DEREYURT', 'System lead · mechanical · integration', true],
            ['ABDULLAH SELİM KÖKSAL', 'Landing control · electrical', false],
            ['ABDUSSAMET KACI', 'Communication · data processing', false],
            ['NAGKICHAN MOUSTAFA IMPRAM', 'Flight software · testing', false],
            ['FARUK BERA ZÜLALOĞLU', 'Ground station · image processing', false],
            ['TEAM MEMBER', 'Sensors · altitude stabilization', false],
          ].map(([name, role, me]) => (
            <div key={name as string} className="bg-card p-6">
              <p className={`label ${me ? 'label-signal' : ''}`}>{name}</p>
              <p className="mt-2 text-sm text-ink-dim">{role}</p>
            </div>
          ))}
        </div>
        <p className="label mt-8" data-reveal>
          FATIH SULTAN MEHMET UNIVERSITY · TEAM ID 405365 · 28 MARCH 2022
        </p>
      </Section>
    </SubpageShell>
  );
}
