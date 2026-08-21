"use client";

import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Spring smooth the scroll progress to eliminate jank & lag
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 20,
    restDelta: 0.001,
  });

  const blob1Y = useTransform(smoothProgress, [0, 1], [80, -120]);
  const blob2Y = useTransform(smoothProgress, [0, 1], [-60, 140]);
  const titleY = useTransform(smoothProgress, [0, 1], [30, -50]);

  return (
    <section
      id="shop"
      ref={ref}
      className="relative bg-coffee-950 text-cream overflow-hidden"
    >
      {/* Background ambient lighting with will-change-transform */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <motion.div
          style={{ y: blob1Y }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-amber-glow/20 blur-[100px] will-change-transform"
        />
        <motion.div
          style={{ y: blob2Y }}
          className="absolute left-[15%] top-[25%] h-[350px] w-[350px] rounded-full bg-coffee-500/25 blur-[90px] will-change-transform"
        />
        <motion.div
          style={{ y: blob1Y }}
          className="absolute right-[15%] bottom-[15%] h-[400px] w-[400px] rounded-full bg-coffee-700/40 blur-[100px] will-change-transform"
        />
      </div>

      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-32 md:py-52 text-center z-10">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow text-amber-glow mb-8 inline-flex items-center gap-3 mx-auto"
        >
          <span className="h-px w-8 bg-amber-glow" />
          Reserve the next drop
          <span className="h-px w-8 bg-amber-glow" />
        </motion.p>

        <motion.h2
          style={{ y: titleY }}
          className="display text-[clamp(3rem,8.5vw,8rem)] font-extralight leading-[0.94] text-balance max-w-5xl mx-auto will-change-transform"
        >
          Cold coffee,<br />
          <span className="italic font-light text-amber-glow">elevated.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl mx-auto text-coffee-100/80 text-base md:text-lg leading-relaxed font-light"
        >
          500 bottles per batch. Nitrogen-flushed, gold-capped, chilled to 4°C.
          Ships in insulated mailers. Cancel any time — but you won&apos;t want to.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            href="#subscribe"
            className="bg-amber-glow text-coffee-950 px-9 py-4 text-base font-medium tracking-wide shadow-lg shadow-amber-glow/10 hover:shadow-amber-glow/20 transition-shadow"
          >
            <span>Pre-order 6-pack</span>
            <span className="ml-2">→</span>
          </MagneticButton>

          <MagneticButton
            href="#single"
            className="bg-transparent text-cream border border-cream/30 px-9 py-4 text-base hover:bg-cream/10"
          >
            <span>Single bottle</span>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
