"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

type CuppingEntry = {
  id: string;
  taster: string;
  role: string;
  location: string;
  rating: string;
  servingMethod: string;
  verdict: string;
  notes: string[];
  keyObservation: string;
};

const ENTRIES: CuppingEntry[] = [
  {
    id: "entry-01",
    taster: "Andra Wirajaya",
    role: "Head Barista & Roaster · Temple Co.",
    location: "Ubud, Bali",
    rating: "94.5 / 100",
    servingMethod: "Served over hand-carved clear ice sphere (4°C)",
    verdict:
      "The first bottled cold brew that successfully captures the volatile aromatics of a fresh pour-over. The natural highland dairy emulsion provides unbelievable body that withstands ice dilution.",
    notes: ["Dark Cacao", "Roasted Hazelnut", "Clean Cane Sweetness"],
    keyObservation: "Zero chlorogenic bitterness degradation on the finish.",
  },
  {
    id: "entry-02",
    taster: "Mariko Tanaka",
    role: "Creative Director · Studio Muka",
    location: "Jakarta",
    rating: "96.0 / 100",
    servingMethod: "Chilled straight from the heavyweight flint glass bottle",
    verdict:
      "We stock our studio cellar with collector 6-packs for client presentations. The tactile heavy glass and that gold aluminum seal immediately signal luxury before the first sip is poured.",
    notes: ["Silky Micro-Crema", "Low Acidity", "Vanilla Pod"],
    keyObservation: "Balanced 5g cane sugar complements rather than masks.",
  },
  {
    id: "entry-03",
    taster: "Daniel Prasetyo",
    role: "Specialty Q-Grader & Coffee Judge",
    location: "Bandung",
    rating: "95.0 / 100",
    servingMethod: "Split cupping tasting glass, room rest 2 mins",
    verdict:
      "The 18-hour slow Kyoto drop technique pays off noticeably in cup clarity. It delivers rich mouthfeel without the astringent muddy sediment typical of immersion cold brews.",
    notes: ["Glacial Extraction", "Zero Sediment", "Lingering Cocoa"],
    keyObservation: "Flawless nitrogen headspace sealing preserves cellar freshness.",
  },
];

export function Testimonials() {
  const [activeId, setActiveId] = useState<string>(ENTRIES[0].id);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  const activeEntry = ENTRIES.find((e) => e.id === activeId) || ENTRIES[0];

  return (
    <section
      id="journal"
      ref={ref}
      className="relative bg-coffee-950 text-cream py-28 md:py-40 border-t border-cream/10 overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 right-1/4 h-[500px] w-[500px] rounded-full bg-amber-glow/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        {/* Section Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="eyebrow text-amber-glow mb-4 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber-glow" />
              Tasting Journal & Cupping Notes
            </p>
            <h2 className="display text-[clamp(2.5rem,5.2vw,4.8rem)] font-light leading-[1] text-balance max-w-2xl">
              Verified cupping verdicts.
            </h2>
          </div>
          <p className="text-coffee-200/70 text-sm md:text-base font-light max-w-sm leading-relaxed">
            Independent evaluations recorded by certified Q-graders, head baristas, and design leaders.
          </p>
        </div>

        {/* Cupping Interface Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Selector Column */}
          <div className="lg:col-span-5 space-y-4">
            {ENTRIES.map((entry, i) => {
              const isSelected = activeId === entry.id;
              return (
                <motion.button
                  key={entry.id}
                  onClick={() => setActiveId(entry.id)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`w-full text-left p-6 md:p-7 rounded-3xl border transition-all duration-300 relative ${
                    isSelected
                      ? "bg-coffee-900 border-amber-glow/50 shadow-2xl shadow-amber-glow/10"
                      : "bg-coffee-900/40 border-cream/10 hover:border-cream/25 hover:bg-coffee-900/70"
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="eyebrow text-xs text-amber-glow font-mono">
                      {entry.location}
                    </span>
                    <span className="font-mono text-xs text-coffee-300 font-medium">
                      {entry.rating}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-light text-cream mb-1">
                    {entry.taster}
                  </h3>
                  <p className="text-xs text-coffee-200/70 font-light">{entry.role}</p>

                  {isSelected && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-4 bottom-4 w-1.5 bg-amber-glow rounded-r-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Detailed Sheet Column */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEntry.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-cream/15 bg-gradient-to-br from-coffee-900 via-coffee-900/90 to-coffee-950 p-8 md:p-12 relative overflow-hidden shadow-2xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cream/10 mb-8">
                  <div>
                    <span className="eyebrow text-[11px] text-coffee-300 block mb-1">
                      Serving Protocol
                    </span>
                    <p className="font-mono text-xs text-amber-glow">
                      {activeEntry.servingMethod}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="eyebrow text-[11px] text-coffee-300 block mb-1">
                      Cupping Score
                    </span>
                    <span className="display text-2xl md:text-3xl text-cream font-light">
                      {activeEntry.rating}
                    </span>
                  </div>
                </div>

                <blockquote className="display text-2xl md:text-3xl lg:text-4xl font-light text-cream leading-[1.15] text-balance mb-8">
                  &ldquo;{activeEntry.verdict}&rdquo;
                </blockquote>

                <div className="mb-8">
                  <span className="eyebrow text-[10px] text-coffee-300 block mb-3 font-mono">
                    Identified Soluble Aromatics
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeEntry.notes.map((note) => (
                      <span
                        key={note}
                        className="rounded-full border border-amber-glow/30 bg-amber-glow/10 px-4 py-1.5 text-xs font-mono text-amber-glow"
                      >
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-cream/10 bg-coffee-950/60 p-5 flex items-start gap-4">
                  <span className="h-2 w-2 rounded-full bg-amber-glow mt-2 flex-shrink-0 shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
                  <div>
                    <span className="eyebrow text-[10px] text-coffee-300 block mb-1 font-mono">
                      Key Technical Observation
                    </span>
                    <p className="text-sm text-coffee-100/90 font-light leading-relaxed">
                      {activeEntry.keyObservation}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
