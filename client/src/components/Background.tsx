import { useEffect, useRef, useState } from "react";

/*
 * Star sky: exactly the design from `main` — 1,500 crisp glowing dots inside a slowly
 * rotating 200vmax layer. Please keep it this way; canvas-based versions looked blurry.
 *
 * Comets (big slow groups + small quick shooting stars) are created with the Web
 * Animations API, animate only transform/opacity, remove themselves when done, and pause
 * while the tab is hidden.
 */

type Star = { x: number; y: number; size: number; opacity: number };

/** 1,500 stars over a 200vmax square (the original density), scaled to the layer we use. */
function starCount() {
  const supportsHypot = typeof CSS !== "undefined" && CSS.supports("width", "hypot(1px, 1px)");
  if (!supportsHypot) return 1500;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const side = Math.hypot(w, h) + 40;
  const original = 2 * Math.max(w, h);
  return Math.round(1500 * (side / original) ** 2);
}

/** One comet: long gradient tail with a bright head, moved with transform only. */
function launchComet(
  layer: HTMLDivElement,
  opts: { x: number; y: number; angle: number; tail: number; travel: number; duration: number; delay: number }
) {
  const { x, y, angle, tail, travel, duration, delay } = opts;
  const rad = (angle * Math.PI) / 180;
  const dx = Math.cos(rad) * travel;
  const dy = Math.sin(rad) * travel;

  const comet = document.createElement("div");
  // The head sits at the right end; rotating around it keeps the head on (x, y).
  comet.style.cssText = `
    position:absolute; left:0; top:0; width:${tail}px; height:2px;
    transform-origin:right center; opacity:0; pointer-events:none;
  `;
  comet.innerHTML = `
    <div style="position:absolute;inset:0;border-radius:2px;
      background:linear-gradient(to right, rgba(37,99,235,0) 0%, rgba(37,99,235,0.25) 45%, rgba(147,197,253,0.75) 88%, #fff 100%);"></div>
    <div style="position:absolute;right:-3px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:9999px;
      background:radial-gradient(circle,#fff 0%,rgba(191,219,254,0.9) 35%,rgba(96,165,250,0) 75%);"></div>
  `;
  layer.appendChild(comet);

  const at = (px: number, py: number) =>
    `translate(${px - tail}px, ${py - 1}px) rotate(${angle}deg)`;

  const animation = comet.animate(
    [
      { transform: at(x, y), opacity: 0 },
      { opacity: 0.9, offset: 0.1 },
      { opacity: 0.9, offset: 0.8 },
      { transform: at(x + dx, y + dy), opacity: 0 },
    ],
    { duration, delay, easing: "linear", fill: "both" }
  );
  animation.onfinish = () => comet.remove();
  animation.oncancel = () => comet.remove();
  return animation;
}

/** The small shooting star from the earlier design: a quick 80px streak that flares and fades. */
function launchShootingStar(
  layer: HTMLDivElement,
  opts: { x: number; y: number; angle: number; delay: number; duration: number }
) {
  const { x, y, angle, delay, duration } = opts;
  const distance = window.innerWidth * 0.3;

  const star = document.createElement("div");
  star.style.cssText = `
    position:absolute; left:0; top:0; width:80px; height:1.5px;
    transform-origin:right center; opacity:0; pointer-events:none;
  `;
  star.innerHTML = `
    <div style="position:absolute;inset:0;background:linear-gradient(to right, rgba(219,234,254,0), rgba(219,234,254,0.8) 70%, #fff);"></div>
    <div style="position:absolute;right:-1px;top:50%;width:3px;height:3px;margin-top:-1.5px;border-radius:9999px;
      background:radial-gradient(circle,#fff 0%,rgba(255,255,255,0.6) 50%,rgba(255,255,255,0) 100%);"></div>
  `;
  layer.appendChild(star);

  // Moves along its own rotated axis, growing in then shrinking out like the original.
  const at = (d: number, s: number) =>
    `translate(${x - 80}px, ${y}px) rotate(${angle}deg) translateX(${d}px) scale(${s})`;
  const animation = star.animate(
    [
      { transform: at(0, 0), opacity: 0 },
      { transform: at(distance / 2, 1), opacity: 1 },
      { transform: at(distance, 0), opacity: 0 },
    ],
    { duration, delay, easing: "linear", fill: "both" }
  );
  animation.onfinish = () => star.remove();
  animation.oncancel = () => star.remove();
  return animation;
}

export default function Background() {
  const cometLayerRef = useRef<HTMLDivElement>(null);

  // Stars: identical to the `main` design (generated once) — same sizes, glow, opacity and
  // density. The only change: the rotating layer is sized to the screen diagonal (all it
  // needs to cover the screen while turning) instead of 200vmax, which was ~3x the area
  // (and ~3x the GPU memory/raster work, worst on phones). Star count is scaled by the same
  // factor so the density on screen is exactly what it was with 1,500 stars over 200vmax.
  const [particles] = useState<Star[]>(() =>
    [...Array(starCount())].map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.6 + 0.4,
    }))
  );

  // Comet showers: a random number of comets sharing a rough heading, but each with its
  // own path, angle, speed, tail length and start time — scattered, never in a line.
  useEffect(() => {
    const layer = cometLayerRef.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const running = new Set<Animation>();

    const shower = () => {
      if (!document.hidden) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const diag = Math.hypot(w, h);

        // Shared heading: from the left or the right, sometimes shallow, sometimes steeper.
        const fromLeft = Math.random() < 0.5;
        const base = fromLeft ? 5 + Math.random() * 25 : 180 - (5 + Math.random() * 25);
        const rad = (base * Math.PI) / 180;
        const dir = { x: Math.cos(rad), y: Math.sin(rad) };
        const perp = { x: -dir.y, y: dir.x };

        // The whole group flies through one random band of the sky...
        const lane = (Math.random() - 0.5) * diag * 0.6;
        // ...at roughly one shared, slow "far away" speed.
        const groupSpeed = 110 + Math.random() * 80; // px per second

        const count = 3 + Math.floor(Math.random() * 6); // 3–8 comets
        for (let i = 0; i < count; i++) {
          const tail = 120 + Math.random() * 160;
          // Close together, but each on its own track: small sideways and front/back offsets.
          const side = lane + (Math.random() - 0.5) * Math.min(260, diag * 0.18);
          const back = diag / 2 + tail + Math.random() * 180;
          const x = w / 2 + perp.x * side - dir.x * back;
          const y = h / 2 + perp.y * side - dir.y * back;
          const travel = back + diag / 2 + tail;
          const speed = groupSpeed * (0.9 + Math.random() * 0.2);

          track(
            launchComet(layer, {
              x,
              y,
              angle: base + (Math.random() - 0.5) * 3,
              tail,
              travel,
              duration: (travel / speed) * 1000,
              delay: Math.random() * 1200,
            })
          );
        }
      }
      showerTimer = setTimeout(shower, 11000 + Math.random() * 7000); // 11–18s between waves
    };

    // The small, quick shooting stars from the earlier design, now more often.
    const shootingStar = () => {
      if (!document.hidden) {
        const w = window.innerWidth;
        const h = window.innerHeight;
        // A small group (1–5) heading roughly the same way, scattered over the sky and
        // popping in one by one at random moments, like a real meteor shower.
        const baseAngle = 25 + Math.random() * 20;
        const count = 1 + Math.floor(Math.random() * 5);
        for (let i = 0; i < count; i++) {
          track(
            launchShootingStar(layer, {
              x: (0.1 + Math.random() * 0.7) * w,
              y: (0.05 + Math.random() * 0.45) * h,
              angle: baseAngle + (Math.random() - 0.5) * 8,
              delay: i === 0 ? 0 : Math.random() * 2800,
              duration: 650 + Math.random() * 350,
            })
          );
        }
      }
      starTimer = setTimeout(shootingStar, 4000 + Math.random() * 5000); // 4–9s between groups
    };

    const track = (a: Animation) => {
      running.add(a);
      a.finished.then(() => running.delete(a)).catch(() => running.delete(a));
    };

    let showerTimer = setTimeout(shower, 1500);
    let starTimer = setTimeout(shootingStar, 3000);

    return () => {
      clearTimeout(showerTimer);
      clearTimeout(starTimer);
      running.forEach((a) => a.cancel());
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#030712] overflow-hidden">
      <style>{`
        @keyframes skyRotate {
          0% { transform: translate(-50%, -50%) rotate(0deg); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .sky-layer { width: 200vmax; height: 200vmax; }
        @supports (width: hypot(1px, 1px)) {
          .sky-layer { width: calc(hypot(100vw, 100vh) + 40px); height: calc(hypot(100vw, 100vh) + 40px); }
        }
      `}</style>

      <div className="absolute inset-0 bg-linear-to-b from-[#0a0f25] via-[#030712] to-[#020617]" />

      <div
        className="sky-layer absolute top-[50%] left-[50%]"
        style={{
          animation: 'skyRotate 240s linear infinite',
          contain: 'strict',
        }}
      >
        {particles.map((p, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              opacity: p.opacity,
            }}
          />
        ))}
      </div>

      {/* Comets are appended here by the effect above */}
      <div ref={cometLayerRef} className="absolute inset-0" style={{ contain: "strict" }} />
    </div>
  );
}
