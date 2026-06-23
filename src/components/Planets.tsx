const STEEL = ['#64748b','#767f92','#858b9d','#6e7d95','#546379','#94a3b8','#7c8aa3','#5a6b7f','#8b9dc3','#9ca3af','#718096','#a0aabf'];
const TEAL = '#2dd4bf';
const BLUE = '#38bdf8';
const WHITE = '#e2e8f0';

function mulberry32(a: number) {
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rng = mulberry32(42);

interface P {
  cx: number; cy: number; r: number;
  fill: string; ring: boolean;
  dur: number; del: number; float: number;
}

function buildPlanets(): P[] {
  const out: P[] = [];
  for (let i = 0; i < 28; i++) {
    const cx = rng() * 1440;
    const cy = rng() * 900;
    const r = rng() * 24 + 5;
    const steel = STEEL[Math.floor(rng() * STEEL.length)];
    const accent = rng() > 0.7;
    const fill = accent ? (rng() > 0.5 ? TEAL : BLUE) : steel;
    const ring = rng() > 0.65;
    const dur = rng() * 18 + 8;
    const del = rng() * -20;
    const float = rng() * 8 + 3;
    out.push({ cx, cy, r, fill, ring, dur, del, float });
  }
  out.sort((a, b) => a.r - b.r);
  return out;
}

export function Planets() {
  const planets = buildPlanets();
  return (
    <svg className="planets" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={WHITE} stopOpacity="0.03" />
          <stop offset="100%" stopColor={WHITE} stopOpacity="0" />
        </linearGradient>
      </defs>

      {planets.map((p, i) => {
        const gradId = `pg${i}`;
        return (
          <g
            key={i}
            className="planet-group"
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
                rx={p.r * (rng() * 0.8 + 1.8)}
                ry={p.r * (rng() * 0.15 + 0.2)}
                fill="none"
                stroke={p.fill}
                strokeOpacity={0.08 + rng() * 0.08}
                strokeWidth={0.5 + rng() * 0.5}
                transform={`rotate(${rng() * 360}, ${p.cx}, ${p.cy})`}
              />
            )}
            <defs>
              <radialGradient id={gradId} cx="38%" cy="32%" r="55%">
                <stop offset="0" stopColor={WHITE} stopOpacity="0.15" />
                <stop offset="100%" stopColor={p.fill} stopOpacity="0.15" />
              </radialGradient>
            </defs>
            <circle cx={p.cx} cy={p.cy} r={p.r} fill={`url(#${gradId})`} stroke={p.fill} strokeWidth={0.3} strokeOpacity={0.3} />
          </g>
        );
      })}

      <rect x="0" y="0" width="1440" height="900" fill="url(#g1)" />
    </svg>
  );
}
