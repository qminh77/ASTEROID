import { useEffect } from "react";

const clamp = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

export const useParallax = (): void => {
  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches) {
      return;
    }

    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if (nodes.length === 0) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let scrollY = window.scrollY;
    let rafId = 0;

    const update = (): void => {
      const scrollFactor = clamp(scrollY / Math.max(window.innerHeight, 1), -2, 8);

      for (const node of nodes) {
        const speed = Number(node.dataset.speed ?? "0.08");
        const translateX = mouseX * speed * 36;
        const translateY = mouseY * speed * 36 - scrollFactor * speed * 14;
        node.style.setProperty("--px", `${translateX.toFixed(2)}px`);
        node.style.setProperty("--py", `${translateY.toFixed(2)}px`);
      }

      rafId = 0;
    };

    const requestUpdate = (): void => {
      if (rafId === 0) {
        rafId = window.requestAnimationFrame(update);
      }
    };

    const onMouseMove = (event: MouseEvent): void => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
      requestUpdate();
    };

    const onScroll = (): void => {
      scrollY = window.scrollY;
      requestUpdate();
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    requestUpdate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      if (rafId !== 0) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);
};
