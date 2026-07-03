import { useEffect, useRef } from "react";

export function CodeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const cols = Math.floor(canvas.width / 18);
    const drops: number[] = Array(cols).fill(0).map(() => Math.random() * -50);

    const chars = "01アイウエオカキクケコサシスセソタチツテトナニヌネノ{}[]()<>/\\|=+*&^%$#@!~";

    let frame = 0;
    const draw = () => {
      ctx.fillStyle = "rgba(9, 14, 20, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = "13px 'Share Tech Mono', monospace";

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * 18;
        const y = drops[i] * 18;

        const isHead = Math.random() > 0.95;
        ctx.fillStyle = isHead ? "#ffffff" : `rgba(0, 255, 136, ${0.1 + Math.random() * 0.4})`;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i] += 0.4;
      }

      frame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full opacity-30"
      style={{ display: "block" }}
    />
  );
}
