import { RefObject, useEffect } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  phase: number;
  twinkle: number;
  vx: number;
  vy: number;
  hue: number;
}

interface DustParticle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  drift: number;
  speed: number;
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
}

const randomBetween = (min: number, max: number): number => Math.random() * (max - min) + min;

export const useSpaceCanvas = (canvasRef: RefObject<HTMLCanvasElement>): void => {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let dust: DustParticle[] = [];
    let comets: Comet[] = [];
    let rafId = 0;
    let lastFrameTime = performance.now();

    const seedParticles = (): void => {
      const starCount = Math.min(220, Math.max(120, Math.floor((width * height) / 11000)));
      const dustCount = Math.min(90, Math.max(40, Math.floor((width * height) / 28000)));

      stars = Array.from({ length: starCount }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        radius: randomBetween(0.45, 2.1),
        alpha: randomBetween(0.2, 0.8),
        phase: randomBetween(0, Math.PI * 2),
        twinkle: randomBetween(0.006, 0.024),
        vx: randomBetween(-0.02, 0.03),
        vy: randomBetween(-0.02, 0.03),
        hue: randomBetween(182, 255)
      }));

      dust = Array.from({ length: dustCount }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        radius: randomBetween(16, 42),
        alpha: randomBetween(0.012, 0.055),
        drift: randomBetween(-0.04, 0.06),
        speed: randomBetween(-0.015, 0.02)
      }));

      comets = [];
    };

    const resizeCanvas = (): void => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
      renderFrame(1);
    };

    const spawnComet = (): void => {
      const fromLeft = Math.random() > 0.45;
      const startX = fromLeft ? randomBetween(width * 0.1, width * 0.95) : randomBetween(-80, width * 0.3);
      const startY = randomBetween(-40, height * 0.4);
      const speed = randomBetween(7, 12);

      comets.push({
        x: startX,
        y: startY,
        vx: fromLeft ? -speed : speed,
        vy: speed * randomBetween(0.45, 0.85),
        life: 0,
        maxLife: randomBetween(28, 54),
        size: randomBetween(1.6, 3.4)
      });
    };

    const drawStars = (delta: number): void => {
      for (const star of stars) {
        if (!reducedMotion) {
          star.phase += star.twinkle * delta * 8;
          star.x += star.vx * delta;
          star.y += star.vy * delta;

          if (star.x < -5) star.x = width + 4;
          if (star.x > width + 5) star.x = -4;
          if (star.y < -5) star.y = height + 4;
          if (star.y > height + 5) star.y = -4;
        }

        const opacity = Math.max(0.08, Math.min(1, star.alpha + Math.sin(star.phase) * 0.34));
        context.beginPath();
        context.fillStyle = `rgba(${Math.floor(star.hue)}, ${Math.floor(star.hue)}, 255, ${opacity})`;
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const drawDust = (delta: number): void => {
      for (const particle of dust) {
        if (!reducedMotion) {
          particle.x += particle.drift * delta;
          particle.y += particle.speed * delta;

          if (particle.x < -80) particle.x = width + 80;
          if (particle.x > width + 80) particle.x = -80;
          if (particle.y < -80) particle.y = height + 80;
          if (particle.y > height + 80) particle.y = -80;
        }

        const gradient = context.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.radius
        );
        gradient.addColorStop(0, `rgba(255, 136, 56, ${particle.alpha * 1.8})`);
        gradient.addColorStop(0.4, `rgba(255, 62, 162, ${particle.alpha})`);
        gradient.addColorStop(1, "rgba(20, 18, 48, 0)");
        context.fillStyle = gradient;
        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fill();
      }
    };

    const drawComets = (delta: number): void => {
      comets = comets.filter((comet) => comet.life < comet.maxLife);

      for (const comet of comets) {
        if (!reducedMotion) {
          comet.x += comet.vx * delta;
          comet.y += comet.vy * delta;
          comet.life += delta;
        }

        const lifeRatio = 1 - comet.life / comet.maxLife;
        const tailLength = 130 * lifeRatio;
        const tailX = comet.x - comet.vx * 2.1 - (comet.vx < 0 ? -tailLength : tailLength);
        const tailY = comet.y - comet.vy * 0.95;

        const gradient = context.createLinearGradient(comet.x, comet.y, tailX, tailY);
        gradient.addColorStop(0, `rgba(255, 221, 128, ${lifeRatio})`);
        gradient.addColorStop(0.35, `rgba(255, 131, 47, ${lifeRatio * 0.72})`);
        gradient.addColorStop(1, "rgba(255, 32, 160, 0)");

        context.strokeStyle = gradient;
        context.lineWidth = comet.size * (0.8 + lifeRatio);
        context.beginPath();
        context.moveTo(comet.x, comet.y);
        context.lineTo(tailX, tailY);
        context.stroke();

        context.fillStyle = `rgba(255, 245, 220, ${Math.min(1, lifeRatio + 0.2)})`;
        context.beginPath();
        context.arc(comet.x, comet.y, comet.size * 0.9, 0, Math.PI * 2);
        context.fill();
      }
    };

    const renderFrame = (delta: number): void => {
      context.clearRect(0, 0, width, height);
      drawStars(delta);
      drawDust(delta);
      drawComets(delta);
    };

    const animate = (timestamp: number): void => {
      const delta = Math.min((timestamp - lastFrameTime) / 16.6667, 2.8);
      lastFrameTime = timestamp;

      if (Math.random() < 0.012 * delta && comets.length < 3) {
        spawnComet();
      }

      renderFrame(delta);
      rafId = window.requestAnimationFrame(animate);
    };

    const onResize = (): void => resizeCanvas();

    window.addEventListener("resize", onResize, { passive: true });
    resizeCanvas();

    if (!reducedMotion) {
      rafId = window.requestAnimationFrame(animate);
    }

    return () => {
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", onResize);
    };
  }, [canvasRef]);
};
