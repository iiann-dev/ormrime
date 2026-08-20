"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const STATS = [
  { value: 18, suffix: "h", label: "Kyoto cold extraction duration" },
  { value: 5, suffix: "g", label: "Pure organic cane sugar per bottle" },
  { value: 250, suffix: "ml", label: "Heavyweight flint glass vessel" },
  { value: 90, suffix: "d", label: "Chilled shelf life without preservatives" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      id="numbers"
      ref={ref}
      className="relative bg-gradient-to-b from-coffee-950 via-coffee-900 to-coffee-950 text-cream overflow-hidden py-28 md:py-40 border-t border-cream/10"
    >
      {/* Rotating decorative geometric orbits */}
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full border border-amber-glow/10"
      />
      <motion.div
        initial={{ rotate: 360 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -left-40 -bottom-40 h-[700px] w-[700px] rounded-full border border-amber-glow/10"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p className="eyebrow text-amber-glow mb-6 inline-flex items-center gap-3">
                <span className="h-px w-8 bg-amber-glow" />
                Precision metrics
              </p>
              <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)] font-extralight leading-[1.05] text-balance mb-6">
                Measurable craft, absolute transparency.
              </h2>
              <p className="text-coffee-200/80 text-base leading-relaxed font-light">
                We believe exceptional coffee is governed by strict physics and time. Here are the uncompromised numbers behind every 250ml drop.
              </p>
            </motion.div>
          </div>

          <div className="lg:col-span-7 lg:col-start-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="rounded-3xl border border-cream/10 bg-coffee-900/60 backdrop-blur-md p-8 relative overflow-hidden group hover:border-amber-glow/40 transition-colors"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                  <span className="display text-6xl text-amber-glow font-mono">0{i+1}</span>
                </div>
                <CountUp
                  to={s.value}
                  suffix={s.suffix}
                  active={inView}
                  className="display block text-[clamp(2.8rem,4vw,4.2rem)] font-light text-cream tracking-tight mb-2"
                />
                <p className="text-sm text-coffee-200/80 leading-relaxed font-light">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CountUp({
  to,
  suffix = "",
  active,
  className = "",
}: {
  to: number;
  suffix?: string;
  active: boolean;
  className?: string;
}) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!active) return;
    const duration = 1600;
    startRef.current = null;
    const tick = (t: number) => {
      if (startRef.current === null) startRef.current = t;
      const p = Math.min(1, (t - startRef.current) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(to * eased));
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, to]);

  return (
    <span className={className}>
      {value}
      <span className="text-amber-glow">{suffix}</span>
    </span>
  );
}
