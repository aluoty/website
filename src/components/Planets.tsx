function rnd(a: number, b: number) { return Math.random() * (b - a) + a }

interface P { cx: number; cy: number; r: number; fill: string; dur: number; del: number; float: number }

function build(): P[] {
  const out: P[] = [];
  for (let i = 0; i < 6; i++) {
    out.push({
      cx: rnd(60, 1380), cy: rnd(60, 840), r: rnd(3, 22),
      fill: '#64748b',
      dur: rnd(20, 40), del: rnd(-30, 0), float: rnd(4, 12),
    });
  }
  return out;
}

export function Planets() {
  const planets = build();
  return (
    <svg className="planets" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        {planets.map((p, i) => (
          <radialGradient key={i} id={`g${i}`} cx="34%" cy="28%" r="62%">
            <stop offset="0" stopColor="#94a3b8" stopOpacity={0.08} />
            <stop offset="35%" stopColor="#94a3b8" stopOpacity={0.02} />
            <stop offset="100%" stopColor="#94a3b8" stopOpacity={0} />
          </radialGradient>
        ))}
      </defs>
      {planets.map((p, i) => (
        <g key={i} className="planet-group" style={{ transformOrigin: `${p.cx}px ${p.cy}px`, animationDuration: `${p.dur}s`, animationDelay: `${p.del}s`, '--float': `${p.float}px` } as React.CSSProperties}>
          <circle cx={p.cx} cy={p.cy} r={p.r} fill={p.fill} opacity={0.08} />
          <circle cx={p.cx} cy={p.cy} r={p.r} fill={`url(#g${i})`} />
          <circle cx={p.cx} cy={p.cy} r={p.r} fill="none" stroke={p.fill} strokeOpacity={0.1} strokeWidth={0.3} />
        </g>
      ))}
    </svg>
  );
}
