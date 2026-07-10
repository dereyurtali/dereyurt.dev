'use client';

import SubpageShell, { Section, Spec, BtnLink } from '@/components/SubpageShell';
import { SpinRig, Plate } from '@/components/subpage/figures';

const PDF = '/Spin-Stabilize-Methods-for-Cansat.pdf';

export default function CansatStabilization() {
  return (
    <SubpageShell
      dwg="2020"
      eyebrow="NASA CANSAT — CAMERA STABILIZATION RESEARCH"
      title={
        <>
          Holding the <span className="text-signal">horizon</span> still
        </>
      }
      meta="TALIA AEROSPACE · NASA CANSAT COMPETITION · 2020 · ROLE: MECHANICAL SUBSYSTEM LEAD"
      lede="A CanSat descends spinning, so its camera does too — and the footage is unusable. This study works the problem from both ends: correct the image in software, or cancel the spin in hardware. The arithmetic decided it. At 640×480 and 24 FPS a raw feed is 22 MB every second, which no CanSat-class processor is going to chew through mid-flight."
      actions={<BtnLink href={PDF} download>DOWNLOAD THE STUDY (PDF)</BtnLink>}
    >
      {/* ---------- The rig ---------- */}
      <Section dwg="FIG 01" title="COUNTER-ROTATING CAMERA">
        <Plate caption="THE BODY SPINS · THE CAMERA PLATFORM SPINS THE OTHER WAY · THE HORIZON STAYS PUT">
          <SpinRig />
        </Plate>
      </Section>

      {/* ---------- The budget ---------- */}
      <Section dwg="TAB 01" title="WHY SOFTWARE LOSES" band>
        <div className="grid gap-px border border-line bg-line lg:grid-cols-3" data-reveal>
          {[
            ['640 × 480', 'RESOLUTION', '307,200 pixels per frame'],
            ['921,600 B', 'PER FRAME', '307,200 × 24 bits ÷ 8'],
            ['22.1 MB/s', 'AT 24 FPS', 'Sustained, in flight, on battery'],
          ].map(([v, l, s]) => (
            <div key={l} className="bg-card p-8">
              <p className="display text-4xl leading-none text-signal sm:text-5xl">{v}</p>
              <p className="label mt-3">{l}</p>
              <p className="mt-3 text-sm text-ink-dim">{s}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink-dim" data-reveal>
          Rotating every frame back into place means touching all of that data, every second, on a
          processor that also has to fly the vehicle. Cancelling the rotation mechanically costs a
          motor and a gyro — and nothing at all at runtime.
        </p>
      </Section>

      {/* ---------- Method comparison ---------- */}
      <Section dwg="TAB 02" title="METHOD COMPARISON">
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <div className="card p-8" data-reveal>
            <p className="label mb-6">SOFTWARE STABILIZATION</p>
            <ul className="space-y-2.5">
              {[
                ['+', 'No additional hardware'],
                ['+', 'Can be applied post-processing on the ground'],
                ['−', 'High computational load, every frame'],
                ['−', 'Needs a processor the mass budget will not allow'],
                ['−', 'Large memory requirement'],
              ].map(([sign, text]) => (
                <li key={text} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                  <span className={sign === '+' ? 'text-green' : 'text-red'}>{sign}</span>
                  {text}
                </li>
              ))}
            </ul>
            <p className="label mt-8">TRACKING BY IMAGE POINT — FAILS WHEN THE POINT LEAVES FRAME</p>
          </div>

          <div className="card border-signal p-8" data-reveal>
            <p className="label label-signal mb-6">HARDWARE STABILIZATION — CHOSEN</p>
            <ul className="space-y-2.5">
              {[
                ['+', 'Real-time; the camera never sees the spin'],
                ['+', 'Zero processing overhead in flight'],
                ['+', 'Yaw read straight from the gyro, not inferred from pixels'],
                ['−', 'Additional weight'],
                ['−', 'Separate power and a more complex mechanism'],
              ].map(([sign, text]) => (
                <li key={text} className="flex gap-3 text-sm leading-relaxed text-ink-dim">
                  <span className={sign === '+' ? 'text-green' : 'text-red'}>{sign}</span>
                  {text}
                </li>
              ))}
            </ul>
            <p className="label label-signal mt-8">GYRO → MOTOR → ENCODER, CLOSED LOOP</p>
          </div>
        </div>
      </Section>

      {/* ---------- Build ---------- */}
      <Section dwg="TAB 03" title="WHAT THE RIG NEEDS" band>
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <Spec
            title="COMPONENTS"
            items={[
              'Gyroscope on the body to measure yaw rate',
              'Electric motor driving the camera platform',
              'Motor encoder to close the loop on angle',
              'A power source independent of the flight computer',
            ]}
          />
          <Spec
            title="WHAT I LEARNED"
            items={[
              'The cheapest place to solve a problem is often upstream of the code',
              'Sensors beat inference — read yaw, do not recover it from pixels',
              'Sketch the mechanism before optimizing the algorithm',
              'A back-of-envelope data-rate calculation can end an architecture debate',
            ]}
          />
        </div>
        <p className="label mt-10" data-reveal>
          &quot;MY AWESOME PAINT DRAWING&quot; — ORIGINAL CAPTION, 2020
        </p>
      </Section>
    </SubpageShell>
  );
}
