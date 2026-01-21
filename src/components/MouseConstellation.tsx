import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
  symbol: string;
  vx: number;
  vy: number;
}

const symbols = ["π", "∞", "∑", "θ", "Φ", "λ", "Δ", "∫", "√", "e"];

const MouseConstellation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const pointsRef = useRef<Point[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize floating points
    pointsRef.current = symbols.map((symbol) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      symbol,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
    }));

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", handleMouseMove);

    const animate = () => {
      if (!ctx || !canvas) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;
      const points = pointsRef.current;

      // Update and draw points
      points.forEach((point) => {
        // Float animation
        point.x += point.vx;
        point.y += point.vy;

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

        // Draw symbol
        ctx.font = "24px 'STIX Two Math', serif";
        ctx.fillStyle = "rgba(255, 204, 0, 0.4)";
        ctx.fillText(point.symbol, point.x, point.y);
      });

      // Draw lines from mouse to nearby points
      const connectionRadius = 200;
      const nearbyPoints = points.filter((point) => {
        const dist = Math.hypot(point.x - mouse.x, point.y - mouse.y);
        return dist < connectionRadius;
      });

      // Connect mouse to nearby points
      nearbyPoints.forEach((point) => {
        const dist = Math.hypot(point.x - mouse.x, point.y - mouse.y);
        const opacity = 1 - dist / connectionRadius;

        ctx.beginPath();
        ctx.moveTo(mouse.x, mouse.y);
        ctx.lineTo(point.x, point.y);
        ctx.strokeStyle = `rgba(255, 204, 0, ${opacity * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Connect nearby points to each other
      for (let i = 0; i < nearbyPoints.length; i++) {
        for (let j = i + 1; j < nearbyPoints.length; j++) {
          const p1 = nearbyPoints[i];
          const p2 = nearbyPoints[j];
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

          if (dist < 150) {
            const opacity = 1 - dist / 150;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.2})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw cursor glow
      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 100);
      gradient.addColorStop(0, "rgba(255, 204, 0, 0.1)");
      gradient.addColorStop(1, "rgba(255, 204, 0, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(mouse.x - 100, mouse.y - 100, 200, 200);

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.8 }}
    />
  );
};

export default MouseConstellation;
