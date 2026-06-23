const STEEL = ['#64748b','#767f92','#858b9d','#6e7d95','#546379','#94a3b8','#7c8aa3','#5a6b7f','#8b9dc3','#9ca3af','#718096','#a0aabf','#4a5568','#636e7e'];
const ACCENTS = ['#2dd4bf','#38bdf8','#e2e8f0','#6ee7b7','#7dd3fc','#a5b4fc'];

interface P { cx: number; cy: number; r: number; fill: string; grad: string; ring: boolean; rx: number; ry: number; rot: number; ringW: number; dur: number; del: number; float: number; spin: boolean }

function rnd(a: number, b: number) { return Math.random() * (b - a) + a }

function build(): P[] {
  const out: P[] = [];
  for (let i = 0; i < 38; i++) {
    const cx = rnd(0, 1440);
    const cy = rnd(0, 900);
    const r = rnd(4, 32);
    const isAccent = Math.random() > 0.72;
    const fill = isAccent ? ACCENTS[Math.floor(Math.random() * ACCENTS.length)] : STEEL[Math.floor(Math.random() * STEEL.length)];
    const ring = Math.random() > 0.6;
    const rx = ring ? r * rnd(1.6, 3.2) : 0;
    const ry = ring ? r * rnd(0.15, 0.35) : 0;
    const rot = ring ? rnd(0, 360) : 0;
    const ringW = ring ? rnd(0.3, 1.2) : 0;
    const dur = rnd(10, 28);
    const del = rnd(-25, 0);
    const float = rnd(4, 16);
    const spin = Math.random() > 0.7;
    out.push({ cx, cy, r, fill, grad: `pg${i}`, ring, rx, ry, rot, ringW, dur, del, float, spin });
  }
  out.sort((a, b) => a.r - b.r);
  return out;
}

export function Planets() {
  const planets = build();
  return (
    <svg className="planets" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        {planets.map((p) => (
          <radialGradient key={p.grad} id={p.grad} cx="36%" cy="30%" r="58%">
            <stop offset="0" stopColor="#e2e8f0" stopOpacity={0.12 + Math.random() * 0.1} />
            <stop offset="100%" stopColor={p.fill} stopOpacity={0.08 + Math.random() * 0.12} />
          </radialGradient>
        ))}
      </defs>

      {planets.map((p) => (
        <g
          key={p.grad}
          className={`planet-group${p.spin ? ' planet-spin' : ''}`}
          style={{
            transformOrigin: `${p.cx}px ${p.cy}px`,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.del}s`,
            '--float': `${p.float}px`,
          } as React.CSSProperties}
        >
          {p.ring && (
            <ellipse
              cx={p.cx}
              cy={p.cy}
              rx={p.rx}
              ry={p.ry}
              fill="none"
              stroke={p.fill}
              strokeOpacity={0.06 + Math.random() * 0.1}
              strokeWidth={p.ringW}
              transform={`rotate(${p.rot}, ${p.cx}, ${p.cy})`}
            />
          )}
          <circle cx={p.cx} cy={p.cy} r={p.r} fill={`url(#${p.grad})`} stroke={p.fill} strokeWidth={0.3} strokeOpacity={0.25} />
        </g>
      ))}
    </svg>
  );
}
