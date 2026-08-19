"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

const STATS = [
  { value: 18, suffix: "h", label: "Kyoto drip time" },
  { value: 5, suffix: "g", label: "Cane sugar per bottle" },
  { value: 250, suffix: "ml", label: "Flint glass volume" },
  { value: 90, suffix: "d", label: "Shelf life (chilled)" },
];

export function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: true });

  return (
    <section
      id="numbers"
      ref={ref}
      className="relative bg-gradient-to-b from-coffee-950 via-coffee-900 to-coffee-950 text-cream overflow-hidden"
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border border-amber-glow/10"
      />
      <motion.div
        initial={{ rotate: 360 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
        className="pointer-events-none absolute -left-40 -bottom-40 h-[600px] w-[600px] rounded-full border border-amber-glow/10"
      />

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-40">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">
          <div className="lg:col-span-5">
            <p className="eyebrow text-amber-glow mb-6 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber-glow" />
              By the numbers
            </p>
            <h2 className="display text-[clamp(2.4rem,5vw,4.5rem)] font-extralight leading-[1] text-balance">
              Slow numbers, kept honestly.
            </h2>
          </div>

          <div className="lg:col-span-7 lg:col-start-7 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 xl:gap-x-10">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="min-w-0"
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <CountUp
                  to={s.value}
                  suffix={s.suffix}
                  active={inView}
                  className="display block text-[clamp(2.4rem,3.6vw,4.5rem)] font-extralight text-cream tracking-tight"
                />
                <p className="mt-3 text-sm text-coffee-200/70 leading-relaxed max-w-[18ch]">
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
    const duration = 1400 + Math.random() * 200;
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