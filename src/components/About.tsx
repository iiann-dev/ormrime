"use client";

import { SplitTextReveal } from "./SplitTextReveal";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });

  return (
    <section
      id="origin"
      ref={ref}
      className="relative bg-coffee-950 text-cream overflow-hidden py-28 md:py-40"
    >
      {/* Ambient background lighting */}
      <div className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-amber-glow/5 blur-[140px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-x-12 relative z-10">
        <div className="md:col-span-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-amber-glow mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber-glow" />
              The Vessel & Craft
            </p>
            <p className="text-coffee-200/80 text-base leading-relaxed max-w-sm mb-8">
              We bottle cold brew with the reverence of fine wine. 250ml heavyweight flint glass, custom gold aluminum cap, and a pure nitrogen headspace. Zero artificial preservatives, zero heat pasteurization.
            </p>
            <div className="p-6 rounded-2xl border border-cream/10 bg-coffee-900/60 backdrop-blur-md">
              <p className="eyebrow text-xs text-amber-glow mb-2">Cellar Note</p>
              <p className="text-sm text-coffee-100/90 leading-relaxed font-light">
                &ldquo;Each batch rests for exactly 18 hours at 4°C before nitrogen flushing locks in the volatile aromatics.&rdquo;
              </p>
            </div>
          </motion.div>
        </div>

        <div className="md:col-span-8">
          <SplitTextReveal
            as="h2"
            text="Coffee deserves the uncompromising respect of fine wine — slow extraction, precise single-origin dairy, sealed at peak flavor."
            className="display text-[clamp(2.2rem,4.6vw,4.8rem)] font-light leading-[1.05] text-balance mb-16"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
            <Pillar
              number="01"
              title="18-Hour Kyoto Drip"
              body="Ice-cold water filtered drop by drop through medium-dark single-origin grounds. Zero heat means zero chlorogenic acids or bitter astringency."
              delay={0.1}
            />
            <Pillar
              number="02"
              title="Single-Origin Dairy"
              body="Sourced exclusively from a single highland dairy in West Java. Rich butterfat emulsion that coats the palate and holds ice dilution perfectly."
              delay={0.2}
            />
            <Pillar
              number="03"
              title="Pure Cane Sugar"
              body="Exactly 5g of organic raw cane sugar per bottle. Just enough to round the high notes — never syrups, never artificial sweeteners."
              delay={0.3}
            />
            <Pillar
              number="04"
              title="Nitrogen Headspace"
              body="Oxygen is entirely purged before the gold aluminum cap locks down. Guarantees 90 days of pristine chilled freshness."
              delay={0.4}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function Pillar({
  number,
  title,
  body,
  delay,
}: {
  number: string;
  title: string;
  body: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-2xl border border-cream/10 bg-coffee-900/40 hover:bg-coffee-900/80 p-8 transition-all duration-500 hover:border-amber-glow/30"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="eyebrow text-amber-glow">{number}</span>
        <span className="h-1.5 w-1.5 rounded-full bg-amber-glow/40 transition-transform duration-300 group-hover:scale-150 group-hover:bg-amber-glow" />
      </div>
      <h3 className="text-xl md:text-2xl font-light text-cream mb-3">
        {title}
      </h3>
      <p className="text-coffee-200/80 text-sm leading-relaxed font-light">
        {body}
      </p>
    </motion.div>
  );
}
