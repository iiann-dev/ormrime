"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  image: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "First bottled cold brew that actually tastes like the café pour-over. The milk doesn't separate, the sweetness is perfect, and that gold cap feels like opening something special.",
    name: "Andra Wirajaya",
    role: "Head barista, Kopi Aroma",
    image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&q=85&w=800",
  },
  {
    quote:
      "I keep a 6-pack in my fridge for clients. It's the only RTD coffee I've served that doesn't taste like burnt sugar water. Clean, creamy, balanced.",
    name: "Mariko Tanaka",
    role: "Creative director, Studio Muka",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=85&w=800",
  },
  {
    quote:
      "Bought a case for a shoot wrap party. Everyone asked where to get it. That's the real test — people taste it and immediately want more.",
    name: "Daniel Prasetyo",
    role: "Producer, Jakarta",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=85&w=800",
  },
];

const AUTOPLAY_MS = 6500;

export function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (paused) return;
    timerRef.current = window.setTimeout(() => {
      setDirection(1);
      setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, AUTOPLAY_MS);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [idx, paused]);

  const go = (delta: number) => {
    setDirection(delta > 0 ? 1 : -1);
    setIdx((i) => (i + delta + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const t = TESTIMONIALS[idx];

  return (
    <section
      id="journal"
      className="relative bg-coffee-950 text-cream overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-40 min-h-[80vh] flex flex-col justify-center">
        <div className="mb-12 md:mb-16 flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p className="eyebrow text-amber-glow mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber-glow" />
              From the people who drink it
            </p>
            <h2 className="display text-[clamp(2.5rem,5.4vw,5rem)] font-extralight leading-[1] max-w-3xl text-balance">
              What drinkers say.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => go(-1)}
              aria-label="Previous testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-cream/20 transition hover:bg-cream hover:text-coffee-900"
            >
              ←
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Next testimonial"
              className="grid h-12 w-12 place-items-center rounded-full border border-cream/20 transition hover:bg-cream hover:text-coffee-900"
            >
              →
            </button>
          </div>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-7 relative min-h-[300px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.figure
                key={idx}
                custom={direction}
                initial={{ opacity: 0, x: direction > 0 ? 80 : -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -80 : 80 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <blockquote className="display text-[clamp(2rem,4.2vw,4.2rem)] font-extralight leading-[1.05] text-balance">
                  <span className="text-amber-glow/60">&ldquo;</span>
                  {t.quote}
                  <span className="text-amber-glow/60">&rdquo;</span>
                </blockquote>
                <figcaption className="mt-10 flex items-center gap-4 text-coffee-200">
                  <span className="h-px w-12 bg-cream/40" />
                  <span className="font-medium text-cream">{t.name}</span>
                  <span className="text-coffee-300">/ {t.role}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="md:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[440px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 1.06 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <img
                    src={t.image}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/60 via-transparent to-transparent" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="mt-14 flex items-center gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > idx ? 1 : -1);
                setIdx(i);
              }}
              aria-label={`Go to testimonial ${i + 1}`}
              className="relative h-1 flex-1 max-w-[120px] overflow-hidden rounded-full bg-cream/15"
            >
              {i === idx && (
                <motion.span
                  key={`fill-${idx}-${paused}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: paused ? 0 : 1 }}
                  transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                  className="absolute inset-0 origin-left bg-amber-glow"
                />
              )}
              {i < idx && (
                <span className="absolute inset-0 bg-amber-glow" />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}