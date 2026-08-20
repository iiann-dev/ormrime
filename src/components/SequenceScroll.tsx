"use client";

import { useRef, useEffect } from "react";
import { useScroll, useTransform, useSpring, motion } from "motion/react";

/**
 * SequenceScroll
 * ─────────────────────────────────────────────────────────────
 * Sticky canvas hero. Scrolling drives the current frame index.
 *
 * Mechanics:
 *   - container: relative h-[400vh]  → 4× viewport for long scroll
 *   - inner: sticky top-0 h-screen w-full, holds ONE <canvas>
 *   - scroll progress (0..1) → frame index (0..FRAME_COUNT-1) → spring-smoothed
 *   - ONE requestAnimationFrame loop reads the spring and draws
 *   - cover-fit scale with mobile-friendly focal offset
 *   - DPR-aware (clamped to 2)
 *   - Sliding-window preload: ±30 around current index (step 3)
 *   - Reduced-motion users land on the LAST frame (final product)
 */

const FRAME_COUNT = 240;
const FRAME_PATH = (i: number) =>
  `/sequence/ezgif-frame-${String(i + 1).padStart(3, "0")}.webp`;

type Overlay = {
  id: string;
  start: number; // 0..1 scroll fraction where text begins fading in
  end: number; // 0..1 where it finishes fading out
  align: "left" | "right" | "center";
  eyebrow?: string;
  title: string;
  body?: string;
  cta?: { label: string; href: string };
};

const OVERLAYS: Overlay[] = [
  {
    id: "intro",
    start: 0.0,
    end: 0.18,
    align: "center",
    eyebrow: "Cold Brew Latte / Bottled",
    title: "Heppucfine",
    body: "Slow-steeped 18 hours. Creamy, lightly sweet, nothing artificial. 250ml glass, gold cap.",
  },
  {
    id: "origin",
    start: 0.22,
    end: 0.4,
    align: "left",
    eyebrow: "Extraction",
    title: "Kyoto drip, not heat.",
    body: "Ice-cold water, drop by drop, 18 hours. Preserves aroma, kills bitterness.",
  },
  {
    id: "craft",
    start: 0.52,
    end: 0.7,
    align: "right",
    eyebrow: "Blend",
    title: "Single-origin milk. Real cane sugar. Zero syrups.",
    body: "Balanced for ice dilution — stays rich to the last sip.",
  },
];

export function SequenceScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<Map<number, HTMLImageElement>>(new Map());
  const lastFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const disposedRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map 0..1 → 0..(FRAME_COUNT-1)
  const frameMV = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  // Smooth with spring for buttery scrub
  const smoothFrame = useSpring(frameMV, {
    stiffness: 180,
    damping: 26,
    mass: 0.4,
  });

  // We also keep a plain ref of the spring's current value for the rAF loop
  // (Motion's spring exposes .get())
  const motionValueRef = useRef<typeof smoothFrame>(smoothFrame);

  // Preload helper
  const ensure = (idx: number) => {
    if (disposedRef.current) return;
    const i = Math.max(0, Math.min(FRAME_COUNT - 1, idx));
    if (imagesRef.current.has(i)) return;
    const img = new Image();
    img.decoding = "async";
    img.loading = "eager";
    img.src = FRAME_PATH(i);
    imagesRef.current.set(i, img);
  };

  // Cover-fit draw
  const drawCover = (
    ctx: CanvasRenderingContext2D,
    img: HTMLImageElement,
    cw: number,
    ch: number,
    focalY: number // -1..1, mobile pulls focal toward bottom of frame
  ) => {
    if (!img.naturalWidth) return;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2 + focalY * (ch - dh) * 0.18;
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
  };

  useEffect(() => {
    motionValueRef.current = smoothFrame;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    disposedRef.current = false;

    // DPR sizing
    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // Re-draw the last frame we showed after a resize
      if (lastFrameRef.current >= 0) {
        const img = imagesRef.current.get(lastFrameRef.current);
        if (img && img.complete && img.naturalWidth) {
          const isMobile = w < 768;
          drawCover(ctx, img, w, h, isMobile ? 0.6 : 0);
        }
      }
    };
    setSize();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Snap to final product; no rAF loop
      ensure(FRAME_COUNT - 1);
      const img = imagesRef.current.get(FRAME_COUNT - 1);
      const tryDraw = () => {
        if (!img || !img.complete || !img.naturalWidth) {
          setTimeout(tryDraw, 60);
          return;
        }
        const w = window.innerWidth;
        const h = window.innerHeight;
        const isMobile = w < 768;
        drawCover(ctx, img, w, h, isMobile ? 0.6 : 0);
        lastFrameRef.current = FRAME_COUNT - 1;
      };
      tryDraw();
      window.addEventListener("resize", setSize);
      return () => {
        disposedRef.current = true;
        window.removeEventListener("resize", setSize);
      };
    }

    // Preload poster frame ASAP
    ensure(0);

    // Sliding-window preload around current index, step 3
    let preloadTimer: number | null = null;
    const schedulePreload = () => {
      if (preloadTimer) window.clearTimeout(preloadTimer);
      preloadTimer = window.setTimeout(() => {
        const cur = Math.round(motionValueRef.current.get());
        for (let d = -30; d <= 30; d += 3) {
          ensure(cur + d);
        }
        // Also keep the very ends warm
        ensure(FRAME_COUNT - 1);
        ensure(0);
      }, 80);
    };
    const unsub = motionValueRef.current.on("change", schedulePreload);

    // Initial preload burst
    for (let i = 1; i <= 20; i++) ensure(i);
    for (let i = FRAME_COUNT - 20; i < FRAME_COUNT; i++) ensure(i);

    window.addEventListener("resize", setSize);

    // Main render loop
    const tick = () => {
      if (disposedRef.current) return;
      const raw = motionValueRef.current.get();
      let idx = Math.round(raw);
      idx = Math.max(0, Math.min(FRAME_COUNT - 1, idx));

      if (idx !== lastFrameRef.current) {
        ensure(idx);
        const img = imagesRef.current.get(idx);
        if (img && img.complete && img.naturalWidth) {
          const w = window.innerWidth;
          const h = window.innerHeight;
          const isMobile = w < 768;
          drawCover(ctx, img, w, h, isMobile ? 0.6 : 0);
          lastFrameRef.current = idx;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      disposedRef.current = true;
      cancelAnimationFrame(rafRef.current);
      if (preloadTimer) window.clearTimeout(preloadTimer);
      window.removeEventListener("resize", setSize);
      unsub();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Overlay fade math — each overlay's visibility = opacity derived from progress
  const renderOverlays = () =>
    OVERLAYS.map((o) => (
      <OverlayBlock key={o.id} overlay={o} progress={scrollYProgress} />
    ));

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-sequence-bg"
      aria-label="ORMRIME scroll experience"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        />

        {/* Vignette / bottom gradient for type legibility */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(15,8,5,0.55)_100%)]" />

        {/* Overlays */}
        <div className="pointer-events-none absolute inset-0">
          {renderOverlays()}
        </div>

        {/* Scroll cue */}
        <motion.div
          style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
          className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3 text-coffee-200/80">
            <span className="eyebrow">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="h-9 w-px bg-coffee-200/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function OverlayBlock({
  overlay,
  progress,
}: {
  overlay: Overlay;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(
    progress,
    [overlay.start, overlay.start + 0.04, overlay.end - 0.04, overlay.end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    progress,
    [overlay.start, overlay.start + 0.04, overlay.end - 0.04, overlay.end],
    [28, 0, 0, -28]
  );

  const alignClass =
    overlay.align === "left"
      ? "items-start text-left left-[6%] right-auto"
      : overlay.align === "right"
      ? "items-end text-right right-[6%] left-auto"
      : "items-center text-center left-1/2 -translate-x-1/2";

  return (
    <motion.div
      style={{ opacity, y }}
      className={`absolute top-1/2 -translate-y-1/2 flex flex-col gap-5 max-w-[640px] px-6 ${alignClass}`}
    >
      {overlay.eyebrow && (
        <span className="eyebrow text-amber-glow/90 inline-flex items-center gap-2">
          <span className="h-px w-6 bg-amber-glow/70" />
          {overlay.eyebrow}
        </span>
      )}
      <h2 className="display text-[clamp(2.2rem,5.6vw,5.5rem)] font-light text-cream text-balance">
        {overlay.title}
      </h2>
      {overlay.body && (
        <p className="max-w-[42ch] text-coffee-100/90 text-base md:text-lg leading-relaxed">
          {overlay.body}
        </p>
      )}
      {overlay.cta && (
        <a
          href={overlay.cta.href}
          className="pointer-events-auto mt-2 inline-flex items-center gap-3 rounded-full border border-cream/30 bg-cream/5 px-7 py-3.5 text-cream backdrop-blur-md transition hover:bg-cream hover:text-coffee-900 hover:border-cream"
        >
          <span className="text-sm tracking-wide">{overlay.cta.label}</span>
          <span aria-hidden="true">→</span>
        </a>
      )}
    </motion.div>
  );
}