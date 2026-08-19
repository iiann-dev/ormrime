"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { MagneticButton } from "./MagneticButton";

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const blob1Y = useTransform(scrollYProgress, [0, 1], [120, -180]);
  const blob2Y = useTransform(scrollYProgress, [0, 1], [-80, 220]);
  const blob1Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.15, 1]);
  const blob2Scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.25, 1]);
  const titleY = useTransform(scrollYProgress, [0, 1], [40, -80]);

  return (
    <section
      id="shop"
      ref={ref}
      className="relative bg-coffee-950 text-cream overflow-hidden"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          style={{ y: blob1Y, scale: blob1Scale }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[80vh] w-[80vh] rounded-full bg-amber-glow/30 blur-[120px]"
        />
        <motion.div
          style={{ y: blob2Y, scale: blob2Scale }}
          className="absolute left-[10%] top-[20%] h-[40vh] w-[40vh] rounded-full bg-coffee-400/40 blur-[100px]"
        />
        <motion.div
          style={{ y: blob1Y, scale: blob1Scale }}
          className="absolute right-[10%] bottom-[10%] h-[50vh] w-[50vh] rounded-full bg-coffee-700/60 blur-[120px]"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 grain" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-10 py-32 md:py-56 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="eyebrow text-amber-glow mb-8 inline-flex items-center gap-3 mx-auto"
        >
          <span className="h-px w-8 bg-amber-glow" />
          Reserve the next drop
          <span className="h-px w-8 bg-amber-glow" />
        </motion.p>

        <motion.h2
          style={{ y: titleY }}
          className="display text-[clamp(3rem,9vw,8.5rem)] font-extralight leading-[0.92] text-balance max-w-5xl mx-auto"
        >
          Cold coffee,<br />
          <span className="italic font-light text-amber-glow">elevated.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 max-w-xl mx-auto text-coffee-100/80 text-lg leading-relaxed"
        >
          500 bottles per batch. Nitrogen-flushed, gold-capped, chilled to 4°C.
          Ships in insulated mailers. Cancel any time — but you won&apos;t want to.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <MagneticButton
            href="#subscribe"
            className="bg-amber-glow text-coffee-950 px-9 py-4 text-base font-medium tracking-wide"
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