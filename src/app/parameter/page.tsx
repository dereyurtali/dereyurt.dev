'use client';

import SubpageShell, { Section, Spec, Stat, StatGrid, BtnLink } from '@/components/SubpageShell';
import { PrintPipeline, Plate } from '@/components/subpage/figures';

export default function PrintimizeProject() {
  return (
    <SubpageShell
      dwg="2025"
      eyebrow="PRINTIMIZE — GRADUATION PROJECT"
      title={
        <>
          Print parameters, <span className="text-signal">solved</span>
        </>
      }
      meta="2025 — 2026 · ROLE: SOLE DEVELOPER · LIVE IN PRODUCTION · FASTAPI · REACT · THREE.JS · SCIKIT-OPTIMIZE"
      lede="A hybrid AI system for FDM 3D printing. Claude reads renders of your model with forced tool-use, so its geometry analysis comes back as a schema, never as prose to be parsed. A physics-constrained gradient-boosting model — trained on profilometer readings from 108 real printed samples — predicts surface roughness. A multi-objective Bayesian optimizer searches the parameter space against it, and PrusaSlicer validates the winners into print-ready G-code."
      actions={
        <>
          <BtnLink href="https://parameterapp.dereyurt.dev">LAUNCH THE APP</BtnLink>
          <a
            href="https://github.com/dereyurtali/printimize-showcase"
            target="_blank"
            rel="noopener noreferrer"
            className="label label-link underline-offset-4 transition-colors hover:text-signal hover:underline"
          >
            GITHUB ↗
          </a>
        </>
      }
    >
      {/* ---------- Pipeline ---------- */}
      <Section dwg="FIG 01" title="THE PIPELINE">
        <Plate
          caption="STL → RENDERS → CLAUDE VISION → ML MODEL → BAYESIAN OPTIMIZER → SLICER → G-CODE"
          w={760}
          h={340}
          hLg={400}
        >
          <PrintPipeline />
        </Plate>
      </Section>

      {/* ---------- Numbers ---------- */}
      <Section dwg="TAB 01" title="RESULTS" band>
        <StatGrid>
          <Stat value="0.99" label="R² — ROUGHNESS MODEL" />
          <Stat value="0.51 µm" label="RMSE" />
          <Stat value="108" label="PROFILOMETER SAMPLES" />
          <Stat value="30+" label="PRINTER PROFILES" />
        </StatGrid>
      </Section>

      {/* ---------- AI engineering decisions ---------- */}
      <Section dwg="TAB 02" title="AI ENGINEERING DECISIONS">
        <div className="grid min-w-0 gap-6 lg:grid-cols-2">
          <Spec
            title="FORCED TOOL-USE FOR STRUCTURED OUTPUT"
            items={[
              'Claude analyses multi-angle renders of the STL and must answer through a tool schema',
              'Overhangs, layer-defect risk and a parameter range come back typed, not as free text',
              'No prose parsing, so a wording change upstream cannot break the pipeline',
            ]}
          />
          <Spec
            title="MULTI-OBJECTIVE BAYESIAN OPTIMIZATION"
            items={[
              'scikit-optimize gp_minimize plus a qNEHVI engine, Pareto post-filtering',
              'Surface quality traded against print time — the operator picks a point on the front',
              'Cheap ML screening first, expensive slicer validation only on the finalists',
            ]}
          />
          <Spec
            title="PHYSICS-CONSTRAINED ML"
            items={[
              'Gradient boosting with monotonic constraints — layer height cannot improve roughness',
              'Trained on real lab measurements, not simulated data',
              'A geometry fingerprint retrieves similar past prints for a warm start',
            ]}
          />
          <Spec
            title="A MEASURABLE FEEDBACK LOOP"
            items={[
              'Every recommendation can be answered with "did it actually print well?"',
              'That ground truth feeds the failure classifier and conformal recalibration',
              'Every billable model call is logged with tokens and latency, so cost can be recomputed when prices move',
            ]}
          />
        </div>
      </Section>

      {/* ---------- Stack ---------- */}
      <Section dwg="TAB 03" title="STACK" band>
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {[
            ['AI / VISION', 'Claude (Anthropic) · forced tool-use · multi-angle STL renders'],
            ['ML / OPTIMIZATION', 'scikit-learn · scikit-optimize · qNEHVI · conformal intervals'],
            ['BACKEND', 'FastAPI · Python 3.11 · PostgreSQL · SQLAlchemy 2 · Alembic'],
            ['FRONTEND', 'React 18 · TypeScript · Three.js · React Three Fiber · Zustand'],
          ].map(([k, v]) => (
            <div key={k} className="bg-card p-6">
              <p className="label label-signal mb-3">{k}</p>
              <p className="text-sm leading-relaxed text-ink-dim">{v}</p>
            </div>
          ))}
        </div>
        <p className="label mt-8" data-reveal>
          SLICER: PRUSASLICER CLI · DEPLOY: DOCKER ON AWS EC2 · GRADUATION PROJECT, FSMVÜ
        </p>
      </Section>
    </SubpageShell>
  );
}
