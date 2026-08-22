'use client';

import SubpageShell, { Section, Spec, Stat, StatGrid, BtnLink } from '@/components/SubpageShell';

export default function ResearchPage() {
  return (
    <SubpageShell
      dwg="2026"
      eyebrow="RESEARCH — MICROGRAVITY ADDITIVE MANUFACTURING"
      title={
        <>
          Vibration, <span className="text-signal">answered in firmware</span>
        </>
      }
      meta="77TH INTERNATIONAL ASTRONAUTICAL CONGRESS · ANTALYA · 5—9 OCTOBER 2026 · INTERACTIVE PRESENTATION · ROLE: RESEARCH IDEA, CONTROL DESIGN, TEST RIG"
      lede="On a station, the micro-vibration environment shows up directly in the surface quality of an FDM print. Classical active vibration control answers that with another actuator. This work does not: it modulates the print head's instantaneous kinematic speed at the firmware level, so the motion itself avoids exciting the structure's resonances. To validate it on a bench I built the disturbance — a single-axis shaker rig, mechanics through desktop software."
      actions={
        <>
          <BtnLink href="https://github.com/dereyurtali/single-axis-shaker-rig">
            THE TEST RIG ON GITHUB
          </BtnLink>
          <a
            href="/docs/Ali-Dereyurt-Portfolio.pdf"
            download
            className="label label-link underline-offset-4 transition-colors hover:text-signal hover:underline"
          >
            PORTFOLIO (PDF) ↓
          </a>
        </>
      }
    >
      {/* ---------- IAC study ---------- */}
      <Section dwg="TAB 01" title="IAC 2026 — THE STUDY">
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <Spec
            title="WHAT THE WORK LOOKS AT"
            items={[
              'How an ISS-like micro-vibration environment degrades FDM surface quality',
              'An FxLMS-based control approach against that disturbance',
              'A software answer instead of added hardware — no counter-actuator, no extra mass',
              'Speed modulation as the control handle: resonances are avoided, not cancelled after the fact',
            ]}
          />
          <Spec
            title="MY CONTRIBUTION"
            items={[
              'The research idea, the experimental approach and the system concept',
              'Design of the control side',
              'Building the test rig the validation runs on',
              'Paper title: Real-Time Active Vibration Compensation in Microgravity Additive Manufacturing via Kinematic Speed Modulation',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Rig ---------- */}
      <Section dwg="TAB 02" title="SINGLE-AXIS SHAKER RIG" band>
        <StatGrid>
          <Stat value="1 kHz" label="POSITION SET-POINT UPDATE" />
          <Stat value="±150 mm" label="USABLE STROKE" />
          <Stat value="~10 kg" label="TARGET LOAD CLASS" />
          <Stat value="<200 USD" label="COST, EXCL. PRINTER & PC" />
        </StatGrid>

        <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-2">
          <Spec
            title="WHAT I BUILT"
            items={[
              'Mechanical layout and drive selection',
              'STEP/DIR driver chain and power electronics',
              'Firmware on an Arduino Nano',
              'Python/Tk control application and the test logic around it',
            ]}
          />
          <Spec
            title="WHY IT EXISTS"
            items={[
              'The disturbance in the IAC study has to be physically reproducible to be argued about',
              'One project carries mechanics, electronics, firmware, desktop software and test procedure',
              'Open hardware — the whole rig is published, not described',
              'github.com/dereyurtali/single-axis-shaker-rig',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Publications ---------- */}
      <Section dwg="TAB 03" title="PUBLICATIONS — IN PREPARATION">
        <div className="grid gap-px border border-line bg-line lg:grid-cols-2">
          <div className="bg-card p-6 sm:p-8" data-reveal>
            <p className="label label-signal mb-4">SURFACE ROUGHNESS · CUSP FILTERING</p>
            <h3 className="text-base leading-snug text-ink">
              Effects of process parameters on surface roughness in fused deposition modelling after
              cusp filtering
            </h3>
            <p className="label mt-3">ALI DEREYURT · EBUBEKIR KOÇ</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim">
              Layer height, wall count, infill density and print speed studied in a full factorial
              design: 324 surface profiles collected from 108 specimens, measured to ISO 4287/4288.
              To separate out the dominant effect of layer geometry I developed a cusp filtering
              method locked to the measured peak and valley positions. After filtering, print speed
              becomes significant at p = 0.005.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {['108 specimens', '324 profiles', 'ISO 4287 / 4288', 'p = 0.005'].map((t) => (
                <span key={t} className="tag">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-card p-6 sm:p-8" data-reveal>
            <p className="label label-signal mb-4">MULTI-OBJECTIVE OPTIMISATION</p>
            <h3 className="text-base leading-snug text-ink">
              Multi-objective parameter optimisation in fused deposition modelling using machine
              learning and Bayesian optimisation
            </h3>
            <p className="label mt-3">ALI DEREYURT · EBUBEKIR KOÇ</p>
            <p className="mt-4 text-sm leading-relaxed text-ink-dim">
              An end-to-end approach: the uploaded 3D model is read through four orthographic views
              and a vision-language model, roughness is predicted by monotonicity-constrained
              gradient boosting, and a Bayesian search balances roughness, material use, print time
              and structural strength — every candidate validated through the slicer. Shipped as a
              product at printimize.dereyurt.dev.
            </p>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {['5-fold CV R² = 0.989 ± 0.007', 'LOOCV R² = 0.991', 'RMSE 0.569 µm', 'full cycle ≈ 270 s'].map(
                (t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div className="mt-10" data-reveal>
          <BtnLink href="/parameter">SEE THE PRODUCT SIDE — PRINTIMIZE</BtnLink>
        </div>
      </Section>

      {/* ---------- Manufacturing background ---------- */}
      <Section dwg="TAB 04" title="THE MANUFACTURING SIDE" band>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2" data-reveal>
          {[
            [
              '3DOIT ADDITIVE MANUFACTURING',
              'ENGINEER CANDIDATE · AUG 2024 — FEB 2025',
              'FDM production management for aerospace and industrial prototyping: printer-farm operation, parameter optimisation, DfM, dimensional verification and surface inspection.',
            ],
            [
              'FSMVÜ ALUTEAM',
              'PART-TIME STUDENT · OCT 2021 — FEB 2022',
              'EOS SLS and DMLS systems: build preparation, powder handling, depowdering and surface finishing; 3D scanning and part inspection on a Hexagon robotic arm.',
            ],
          ].map(([org, meta, body]) => (
            <div key={org} className="bg-card p-6 sm:p-8">
              <p className="label label-signal mb-2">{org}</p>
              <p className="label mb-4">{meta}</p>
              <p className="text-sm leading-relaxed text-ink-dim">{body}</p>
            </div>
          ))}
        </div>
      </Section>
    </SubpageShell>
  );
}
