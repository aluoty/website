export function Planets() {
  return (
    <svg className="planets" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="planet1" cx="40%" cy="35%" r="50%">
          <stop offset="0" stopColor="#7dd3fc" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#0284c7" stopOpacity="0.15" />
        </radialGradient>
        <radialGradient id="planet2" cx="40%" cy="35%" r="50%">
          <stop offset="0" stopColor="#5eead4" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0d9488" stopOpacity="0.1" />
        </radialGradient>
        <radialGradient id="planet3" cx="40%" cy="35%" r="50%">
          <stop offset="0" stopColor="#a5b4fc" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#4338ca" stopOpacity="0.08" />
        </radialGradient>
      </defs>

      <g className="planet-group" style={{ transformOrigin: '1080px 180px' }}>
        <ellipse cx={1080} cy={180} rx={48} ry={10} fill="none" stroke="rgba(56,189,248,0.1)" strokeWidth={1} />
        <circle cx={1080} cy={180} r={26} fill="url(#planet1)" />
      </g>

      <g className="planet-group" style={{ transformOrigin: '170px 630px', animationDuration: '20s' }}>
        <circle cx={170} cy={630} r={14} fill="url(#planet2)" />
      </g>

      <g className="planet-group" style={{ transformOrigin: '1040px 540px', animationDuration: '25s' }}>
        <circle cx={1040} cy={540} r={10} fill="url(#planet3)" />
      </g>

      <g className="planet-group" style={{ transformOrigin: '320px 200px', animationDuration: '18s' }}>
        <ellipse cx={320} cy={200} rx={22} ry={4} fill="none" stroke="rgba(45,212,191,0.08)" strokeWidth={1} />
        <circle cx={320} cy={200} r={10} fill="url(#planet2)" />
      </g>
    </svg>
  );
}
