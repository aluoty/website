import { useEffect, useRef } from 'react';

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let id = 0;
    let stars: { x: number; y: number; r: number; s: number; p: number }[] = [];

    const init = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;

      const n = Math.floor((w * h) / 14000);
      stars = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2,
        s: Math.random() * 0.002 + 0.0005,
        p: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.beginPath();
      for (const star of stars) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.s + star.p);
        const radius = star.r * (0.4 + 0.6 * twinkle);
        ctx.moveTo(star.x + radius, star.y);
        ctx.arc(star.x, star.y, radius, 0, Math.PI * 2);
      }
      ctx.fillStyle = 'rgba(220, 235, 255, 0.6)';
      ctx.fill();

      id = requestAnimationFrame(draw);
    };

    init();
    id = requestAnimationFrame(draw);

    const onResize = () => {
      cancelAnimationFrame(id);
      init();
      id = requestAnimationFrame(draw);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
