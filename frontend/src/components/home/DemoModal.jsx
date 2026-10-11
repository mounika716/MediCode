import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────────────────────────────────
   Mini UI mockups — real product previews
   ───────────────────────────────────────── */
function MockDashboard() {
  return (
    <div className="w-full h-full flex gap-2 p-3 bg-[#08080c]">
      {/* Sidebar */}
      <div className="w-16 rounded-lg bg-white/[0.03] border border-white/[0.06] p-2 space-y-1.5">
        <div className="h-4 w-full rounded bg-red-500/40" />
        <div className="h-2 w-3/4 rounded bg-white/10" />
        <div className="h-2 w-2/3 rounded bg-white/10" />
        <div className="h-2 w-3/4 rounded bg-white/10" />
        <div className="h-2 w-1/2 rounded bg-white/10" />
      </div>
      {/* Main */}
      <div className="flex-1 space-y-2">
        <div className="grid grid-cols-3 gap-2">
          {[
            { c: '#8b5cf6', v: '24' },
            { c: '#22d3ee', v: '5' },
            { c: '#ef4444', v: '2' },
          ].map((s, i) => (
            <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2">
              <div className="text-[8px] font-mono mb-1" style={{ color: s.c }}>
                {s.v}
              </div>
              <div className="h-1 rounded bg-white/10" />
            </div>
          ))}
        </div>
        <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 h-24">
          <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,45 L30,35 L60,40 L90,20 L120,30 L150,15 L180,25 L200,18"
              fill="none"
              stroke="#8b5cf6"
              strokeWidth="2"
            />
            <path
              d="M0,45 L30,35 L60,40 L90,20 L120,30 L150,15 L180,25 L200,18 L200,60 L0,60 Z"
              fill="url(#gradDash)"
            />
            <defs>
              <linearGradient id="gradDash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
}

function MockUpload() {
  return (
    <div className="w-full h-full flex items-center justify-center p-6 bg-[#08080c]">
      <div className="w-full max-w-[220px] border-2 border-dashed border-cyan-500/40 rounded-xl p-6 flex flex-col items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22d3ee" strokeWidth="1.8">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
          </svg>
        </div>
        <div className="text-[10px] text-white/60 text-center font-mono">
          Drop PDF or image
        </div>
        <div className="text-[9px] text-white/30 text-center font-mono">
          Prescription · Lab Report · Discharge
        </div>
      </div>
    </div>
  );
}

function MockExtraction() {
  const rows = [
    { n: 'Hemoglobin', v: '11.2 g/dL', s: 'low', c: '#22d3ee' },
    { n: 'WBC',        v: '12,500 /µL', s: 'high', c: '#f97316' },
    { n: 'Platelets',  v: '245,000',    s: 'normal', c: '#22c55e' },
    { n: 'Glucose',    v: '128 mg/dL',  s: 'high', c: '#f97316' },
  ];
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-[#08080c]">
      <div className="w-full max-w-[280px] rounded-lg border border-white/[0.06] bg-white/[0.02] overflow-hidden">
        <div className="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-2 border-b border-white/[0.06]">
          <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Test</span>
          <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Value</span>
          <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono">Status</span>
        </div>
        {rows.map((r, i) => (
          <div key={i} className="grid grid-cols-[1fr_auto_auto] gap-2 px-3 py-1.5 border-b border-white/[0.04] last:border-0">
            <span className="text-[10px] text-white/75">{r.n}</span>
            <span className="text-[10px] font-mono text-white/85">{r.v}</span>
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded" style={{ color: r.c, background: `${r.c}20` }}>
              {r.s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockReview() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-[#08080c]">
      <div className="w-full max-w-[260px] space-y-2">
        {[
          { l: 'Test',    v: 'Hemoglobin', edit: false },
          { l: 'Value',   v: '11.2',       edit: true },
          { l: 'Unit',    v: 'g/dL',       edit: false },
          { l: 'Range',   v: '13.5-17.5',  edit: false },
        ].map((f, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-[9px] uppercase tracking-wider text-white/40 font-mono w-12">{f.l}</span>
            <div
              className={`flex-1 px-2 py-1.5 rounded text-[11px] ${
                f.edit
                  ? 'bg-orange-500/10 border border-orange-500/40 text-white'
                  : 'bg-white/[0.03] border border-white/[0.06] text-white/70'
              }`}
            >
              {f.v}
            </div>
            {f.edit && <span className="text-orange-400 text-xs">✎</span>}
          </div>
        ))}
        <div className="flex justify-end pt-1">
          <div className="px-3 py-1 rounded bg-white text-black text-[10px] font-medium">
            Save ✓
          </div>
        </div>
      </div>
    </div>
  );
}

function MockLanguages() {
  const langs = [
    { l: 'EN', c: '#8b5cf6' },
    { l: 'हि', c: '#22d3ee' },
    { l: 'తె', c: '#10b981' },
    { l: 'த',  c: '#f97316' },
    { l: 'বাং', c: '#ef4444' },
    { l: 'म', c: '#ec4899' },
  ];
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-4 p-4 bg-[#08080c]">
      <div className="flex flex-wrap justify-center gap-2">
        {langs.map((l, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold"
            style={{
              color: l.c,
              background: `${l.c}15`,
              border: `1px solid ${l.c}40`,
            }}
          >
            {l.l}
          </div>
        ))}
      </div>
      <div className="text-[10px] text-white/40 font-mono text-center">
        AI summary in your language
      </div>
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08]">
        <span className="text-[10px] text-white/50 font-mono">▶</span>
        <div className="flex items-end gap-[2px] h-3">
          {[3, 6, 4, 8, 5, 7, 4].map((h, i) => (
            <div
              key={i}
              className="w-[2px] rounded-full bg-red-500/70"
              style={{ height: `${h * 1.2}px` }}
            />
          ))}
        </div>
        <span className="text-[9px] text-white/40 font-mono">72 BPM</span>
      </div>
    </div>
  );
}

function MockTimeline() {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-[#08080c]">
      <div className="w-full max-w-[240px] relative">
        <div className="absolute left-[7px] top-3 bottom-3 w-px bg-white/10" />
        {[
          { t: 'Lab Report',   d: 'Oct 12', c: '#22d3ee' },
          { t: 'Prescription', d: 'Oct 08', c: '#8b5cf6' },
          { t: 'Discharge',    d: 'Sep 28', c: '#f97316' },
        ].map((e, i) => (
          <div key={i} className="relative flex items-center gap-3 mb-3 last:mb-0">
            <div
              className="w-3.5 h-3.5 rounded-full border-2 ring-4 ring-[#08080c] flex-shrink-0"
              style={{ background: e.c, borderColor: e.c }}
            />
            <div className="flex-1 rounded-lg border border-white/[0.06] bg-white/[0.02] px-2.5 py-1.5 flex items-center justify-between">
              <span className="text-[10px] text-white/75">{e.t}</span>
              <span className="text-[9px] text-white/35 font-mono">{e.d}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   Slides data
   ───────────────────────────────────────── */
const SLIDES = [
  {
    label: 'Dashboard',
    title: 'One dashboard. Every analysis.',
    caption: 'Stats, trends, and 7-day activity — real-time.',
    tech: 'MongoDB aggregation · Recharts',
    accent: '#8b5cf6',
    Component: MockDashboard,
  },
  {
    label: 'Upload',
    title: 'Drop a file. AI reads it.',
    caption: 'Prescriptions, lab reports, discharge summaries.',
    tech: 'pdfjs-dist · client-side compression',
    accent: '#22d3ee',
    Component: MockUpload,
  },
  {
    label: 'Extract',
    title: 'Structured data. Automatically.',
    caption: 'Values, units, reference ranges, status flags.',
    tech: 'Groq Qwen 3.8 · vision extraction',
    accent: '#10b981',
    Component: MockExtraction,
  },
  {
    label: 'Review',
    title: 'You confirm. Then it saves.',
    caption: 'Every field editable. Full audit trail.',
    tech: 'Human-in-the-loop · status flow',
    accent: '#f97316',
    Component: MockReview,
  },
  {
    label: 'Languages',
    title: 'Six Indian languages. Voice too.',
    caption: 'Read it or hear it — in your mother tongue.',
    tech: 'Web Speech API · multilingual AI',
    accent: '#ef4444',
    Component: MockLanguages,
  },
  {
    label: 'Timeline',
    title: 'Your complete health story.',
    caption: 'Every record, chronologically organized.',
    tech: 'FHIR-inspired schema · ABDM ready',
    accent: '#ec4899',
    Component: MockTimeline,
  },
];

/* ─────────────────────────────────────────
   DemoModal
   ───────────────────────────────────────── */
export default function DemoModal({ open, onClose }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!open || paused) return;
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % SLIDES.length);
    }, 4500);
    return () => clearInterval(id);
  }, [open, paused]);

  useEffect(() => {
    if (!open) return;
    setCurrent(0);
    setPaused(false);
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') setCurrent((c) => (c + 1) % SLIDES.length);
      if (e.key === 'ArrowLeft') setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length);
      if (e.key === ' ') { e.preventDefault(); setPaused((p) => !p); }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const slide = SLIDES[current];
  const Mock = slide.Component;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-lg p-4 animate-[fadeIn_0.25s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl border border-white/[0.08] bg-[#0a0a0f] overflow-hidden shadow-[0_0_120px_-20px_rgba(255,45,45,0.35)]"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ─── Header ─── */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-[11px] uppercase tracking-widest text-white/40 font-mono ml-1">
              medicode · walkthrough
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[10px] text-white/30 font-mono hidden md:block">
              ← → navigate · space pause · esc close
            </span>
            <button
              onClick={onClose}
              className="cursor-target w-7 h-7 rounded-lg border border-white/10 text-white/50 hover:text-white hover:border-white/25 transition flex items-center justify-center text-xs"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
        </div>

        {/* ─── Main: split layout ─── */}
        <div className="grid md:grid-cols-[1.15fr_1fr]">

          {/* Mock preview */}
          <div className="relative bg-black border-b md:border-b-0 md:border-r border-white/[0.06]">
            <div
              className="absolute inset-0 transition-all duration-700 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 50%, ${slide.accent}18 0%, transparent 65%)`,
              }}
            />
            <div className="relative h-[240px] md:h-[340px]">
              <Mock />
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col justify-center px-7 py-8 md:py-10">

            <div
              className="text-[10px] uppercase tracking-[0.35em] font-mono mb-4 transition-colors duration-500 flex items-center gap-2"
              style={{ color: slide.accent }}
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ background: slide.accent }}
              />
              Step {String(current + 1).padStart(2, '0')} of {String(SLIDES.length).padStart(2, '0')}
            </div>

            <h3
              key={`title-${current}`}
              className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight leading-tight mb-3 animate-[fadeIn_0.5s_ease-out]"
            >
              {slide.title}
            </h3>

            <p
              key={`cap-${current}`}
              className="text-sm md:text-base text-white/60 leading-relaxed mb-5 animate-[fadeIn_0.6s_ease-out]"
            >
              {slide.caption}
            </p>

            <div
              key={`tech-${current}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.02] w-fit animate-[fadeIn_0.7s_ease-out]"
            >
              <span className="text-[10px] text-white/30 font-mono">⚙</span>
              <span className="text-[10px] md:text-[11px] text-white/55 font-mono">
                {slide.tech}
              </span>
            </div>
          </div>
        </div>

        {/* ─── Progress bar ─── */}
        {!paused && (
          <div className="relative h-0.5 bg-white/[0.06]">
            <div
              key={`progress-${current}`}
              className="absolute inset-y-0 left-0"
              style={{
                background: slide.accent,
                animation: 'progressBar 4.5s linear',
              }}
            />
          </div>
        )}

        {/* ─── Slide selector (labels) ─── */}
        <div className="flex items-center justify-center gap-1 px-4 py-3 border-t border-white/[0.06] overflow-x-auto">
          {SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => {
                setCurrent(i);
                setPaused(false);
              }}
              className={`cursor-target px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all whitespace-nowrap ${
                i === current
                  ? 'text-white'
                  : 'text-white/40 hover:text-white/80'
              }`}
              style={
                i === current
                  ? { background: `${s.accent}20`, border: `1px solid ${s.accent}50` }
                  : {}
              }
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* ─── Footer ─── */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-white/[0.06] bg-black/40">
          <button
            onClick={() => setPaused((p) => !p)}
            className="cursor-target text-[10px] uppercase tracking-widest text-white/40 hover:text-white transition font-mono flex items-center gap-2"
          >
            <span>{paused ? '▶' : '❚❚'}</span>
            <span>{paused ? 'Play' : 'Pause'}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrent((c) => (c - 1 + SLIDES.length) % SLIDES.length)}
              className="cursor-target w-7 h-7 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition flex items-center justify-center text-xs"
              aria-label="Previous"
            >
              ←
            </button>
            <button
              onClick={() => setCurrent((c) => (c + 1) % SLIDES.length)}
              className="cursor-target w-7 h-7 rounded-lg border border-white/10 text-white/60 hover:text-white hover:border-white/30 transition flex items-center justify-center text-xs"
              aria-label="Next"
            >
              →
            </button>
            <Link
              to="/register"
              className="cursor-target text-xs px-3.5 py-1.5 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition ml-2"
            >
              Try it free →
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes progressBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
      `}</style>
    </div>
  );
}