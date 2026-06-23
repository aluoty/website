const HUES = [
  '#64748b','#6e7d95','#7c8aa3','#718096','#636e7e','#586b7e',
  '#8b5a2b','#7a4a22','#6d4040','#5a4a3a',
  '#4a6b8a','#3d5a73','#2c6b6b','#4a6b5a',
];
const ATMOS = ['#94a3b8','#7c8aa3','#a08060','#6a8a9a','#5a8a7a'];

function rnd(a: number, b: number) { return Math.random() * (b - a) + a }

interface P { cx: number; cy: number; r: number; fill: string; atm: string; ring: boolean; rx: number; ry: number; rot: number; dur: number; del: number; float: number; gid: string }

function buildPlanets(): P[] {
  const out: P[] = [];
  const cols = 6, rows = 4;
  const cw = 1440 / cols, rh = 900 / rows;
  for (let i = 0; i < cols * rows; i++) {
    const col = i % cols, row = Math.floor(i / cols);
    const cx = col * cw + cw / 2 + rnd(-cw * 0.3, cw * 0.3);
    const cy = row * rh + rh / 2 + rnd(-rh * 0.3, rh * 0.3);
    const r = rnd(3, 32);
    const fill = HUES[Math.floor(Math.random() * HUES.length)];
    const hasAtm = Math.random() > 0.45;
    const atm = hasAtm ? ATMOS[Math.floor(Math.random() * ATMOS.length)] : fill;
    const ring = r > 8 && Math.random() > 0.5;
    const rx = ring ? r * rnd(1.8, 4.0) : 0;
    const ry = ring ? r * rnd(0.1, 0.25) : 0;
    const rot = ring ? rnd(0, 360) : 0;
    const dur = rnd(14, 34);
    const del = rnd(-30, 0);
    const float = rnd(4, 18);
    out.push({ cx, cy, r, fill, atm, ring, rx, ry, rot, dur, del, float, gid: `g${i}` });
  }
  out.sort((a, b) => a.r - b.r);
  return out;
}

interface Star { cx: number; cy: number; r: number; dur: number; del: number; arms: number }
function buildStars(): Star[] {
  const out: Star[] = [];
  for (let i = 0; i < 24; i++) {
    out.push({
      cx: rnd(20, 1420), cy: rnd(20, 880), r: rnd(4, 18),
      dur: rnd(2.5, 7), del: rnd(-8, 0), arms: Math.random() > 0.5 ? 4 : 6,
    });
  }
  return out;
}

interface Comet { x1: number; y1: number; x2: number; y2: number; dur: number; del: number }
function buildComets(): Comet[] {
  const out: Comet[] = [];
  for (let i = 0; i < 4; i++) {
    const x1 = rnd(600, 1420), y1 = rnd(20, 400);
    out.push({ x1, y1, x2: x1 + rnd(-350, -80), y2: y1 + rnd(60, 200), dur: rnd(7, 12), del: rnd(-12, 2) });
  }
  return out;
}

interface BH { cx: number; cy: number; r: number; diskRx: number; diskRy: number; rot: number; dur: number; del: number }
function buildBlackHoles(): BH[] {
  const out: BH[] = [];
  for (let i = 0; i < 3; i++) {
    const cx = rnd(80, 1360), cy = rnd(60, 840);
    const r = rnd(4, 10);
    out.push({ cx, cy, r, diskRx: r * rnd(3, 5), diskRy: r * rnd(0.8, 1.4), rot: rnd(0, 360), dur: rnd(20, 34), del: rnd(-30, 0) });
  }
  return out;
}

export function Planets() {
  const planets = buildPlanets();
  const stars = buildStars();
  const comets = buildComets();
  const blackHoles = buildBlackHoles();

  const sun = { cx: rnd(100, 400), cy: rnd(80, 300), r: rnd(20, 36), glowR: rnd(55, 90) };

  return (
    <svg className="planets" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        {planets.map((p) => (
          <radialGradient key={p.gid} id={p.gid} cx="34%" cy="28%" r="62%">
            <stop offset="0" stopColor="#e2e8f0" stopOpacity={0.12} />
            <stop offset="35%" stopColor="#e2e8f0" stopOpacity={0.03} />
            <stop offset="100%" stopColor="#0f172a" stopOpacity={0.3} />
          </radialGradient>
        ))}
        <radialGradient id="sun-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fef3c7" stopOpacity="0.35" />
          <stop offset="25%" stopColor="#f59e0b" stopOpacity="0.15" />
          <stop offset="60%" stopColor="#ea580c" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sun-core" cx="40%" cy="35%" r="55%">
          <stop offset="0" stopColor="#fff" stopOpacity="0.7" />
          <stop offset="30%" stopColor="#fef3c7" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.6" />
        </radialGradient>
        <radialGradient id="bh-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#38bdf8" stopOpacity="0.2" />
          <stop offset="40%" stopColor="#818cf8" stopOpacity="0.06" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Sun */}
      <g className="sun" style={{ transformOrigin: `${sun.cx}px ${sun.cy}px` } as React.CSSProperties}>
        <circle cx={sun.cx} cy={sun.cy} r={sun.glowR} fill="url(#sun-glow)" />
        {Array.from({ length: 12 }, (_, i) => {
          const angle = (i / 12) * Math.PI * 2 + rnd(0, 0.3);
          const len = sun.r * (1.2 + Math.random() * 0.6);
          return (
            <line key={i} x1={sun.cx} y1={sun.cy} x2={sun.cx + Math.cos(angle) * len} y2={sun.cy + Math.sin(angle) * len} stroke="#f59e0b" strokeOpacity={0.1 + Math.random() * 0.08} strokeWidth={0.8} />
          );
        })}
        <circle cx={sun.cx} cy={sun.cy} r={sun.r} fill="url(#sun-core)" />
      </g>

      {/* Black holes */}
      {blackHoles.map((b, i) => (
        <g key={`bh${i}`} className="planet-group" style={{ transformOrigin: `${b.cx}px ${b.cy}px`, animationDuration: `${b.dur}s`, animationDelay: `${b.del}s`, '--float': `${rnd(3, 8)}px` } as React.CSSProperties}>
          <ellipse cx={b.cx} cy={b.cy} rx={b.diskRx} ry={b.diskRy} fill="none" stroke="#b45309" strokeOpacity={0.15} strokeWidth={1.5} transform={`rotate(${b.rot}, ${b.cx}, ${b.cy})`} />
          <ellipse cx={b.cx} cy={b.cy} rx={b.diskRx * 0.7} ry={b.diskRy * 0.7} fill="none" stroke="#f59e0b" strokeOpacity={0.08} strokeWidth={1} transform={`rotate(${b.rot}, ${b.cx}, ${b.cy})`} />
          <circle cx={b.cx} cy={b.cy} r={b.r + 5} fill="url(#bh-glow)" />
          <circle cx={b.cx} cy={b.cy} r={b.r} fill="#000" />
        </g>
      ))}

      {/* Shooting stars */}
      {comets.map((c, i) => (
        <g key={`comet${i}`} className="comet" style={{ animationDuration: `${c.dur}s`, animationDelay: `${c.del}s` } as React.CSSProperties}>
          <line x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2} stroke="#94a3b8" strokeOpacity={0.1} strokeWidth={0.8} />
          <circle cx={c.x2} cy={c.y2} r={1.2} fill="#e2e8f0" opacity={0.2} />
        </g>
      ))}

      {/* Bright stars */}
      {stars.map((s, i) => (
        <g key={`star${i}`} className="star-bright" style={{ transformOrigin: `${s.cx}px ${s.cy}px`, animationDuration: `${s.dur}s`, animationDelay: `${s.del}s` } as React.CSSProperties}>
          <line x1={s.cx - s.r} y1={s.cy} x2={s.cx + s.r} y2={s.cy} stroke="#e2e8f0" strokeOpacity={0.3} strokeWidth={0.4} />
          <line x1={s.cx} y1={s.cy - s.r} x2={s.cx} y2={s.cy + s.r} stroke="#e2e8f0" strokeOpacity={0.3} strokeWidth={0.4} />
          {s.arms === 6 && (
            <>
              <line x1={s.cx - s.r * 0.5} y1={s.cy - s.r * 0.5} x2={s.cx + s.r * 0.5} y2={s.cy + s.r * 0.5} stroke="#e2e8f0" strokeOpacity={0.18} strokeWidth={0.4} />
              <line x1={s.cx - s.r * 0.5} y1={s.cy + s.r * 0.5} x2={s.cx + s.r * 0.5} y2={s.cy - s.r * 0.5} stroke="#e2e8f0" strokeOpacity={0.18} strokeWidth={0.4} />
            </>
          )}
          <circle cx={s.cx} cy={s.cy} r={s.r * 0.12 + 0.4} fill="#fff" opacity={0.5} />
        </g>
      ))}

      {/* Planets */}
      {planets.map((p) => (
        <g key={p.gid} className="planet-group" style={{ transformOrigin: `${p.cx}px ${p.cy}px`, animationDuration: `${p.dur}s`, animationDelay: `${p.del}s`, '--float': `${p.float}px` } as React.CSSProperties}>
          {p.ring && (
            <ellipse cx={p.cx} cy={p.cy} rx={p.rx} ry={p.ry} fill="none" stroke={p.fill} strokeOpacity={0.1} strokeWidth={rnd(0.3, 0.8)} transform={`rotate(${p.rot}, ${p.cx}, ${p.cy})`} />
          )}
          <circle cx={p.cx} cy={p.cy} r={p.r + 2} fill={p.atm} opacity={0.04} />
          <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} opacity={0.35} />
          <circle cx={p.cx} cy={p.cy} r={p.r} fill={`url(#${p.gid})`} />
          <circle cx={p.cx} cy={p.cy} r={p.r} fill="none" stroke={p.fill} strokeOpacity={0.25} strokeWidth={0.3} />
        </g>
      ))}
    </svg>
  );
}
