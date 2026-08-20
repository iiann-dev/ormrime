"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const FLAVOR_PROFILES = [
  {
    title: "Dark Cacao & Hazelnut",
    type: "Primary Top Notes",
    desc: "Dominant aromatics unlocked during the first 6 hours of Kyoto drip extraction. Deep cocoa nib richness with a smooth roasted nut finish.",
    intensity: "95%",
  },
  {
    title: "Velvety Dairy Emulsion",
    type: "Mouthfeel & Texture",
    desc: "Single-origin West Java milk creates a dense micro-structure that coats the tongue without leaving film or heavy dairy residue.",
    intensity: "90%",
  },
  {
    title: "Glacial Acidity Control",
    type: "Extraction Science",
    desc: "Ice-cold water prevents the thermal extraction of harsh chlorogenic acids, resulting in a naturally sweet cup with zero stomach burn.",
    intensity: "15%",
  },
  {
    title: "Clean Cane Finish",
    type: "Sweetness Balance",
    desc: "5g of pure organic cane sugar provides subtle structural warmth on the back palate without lingering syrup heaviness.",
    intensity: "40%",
  },
];

const FAQS = [
  {
    q: "How should I store Heppucfine?",
    a: "Keep strictly refrigerated at 4°C. Because we use fresh single-origin highland dairy and zero chemical preservatives, it must remain chilled from delivery to consumption. Enjoy within 90 days of the nitrogen-sealed bottling date.",
  },
  {
    q: "How is cold shipping handled?",
    a: "We ship every order in custom insulated thermal boxes lined with food-grade gel ice packs. This ensures your bottles arrive chilled to 4°C and ready to go directly into your refrigerator.",
  },
  {
    q: "Is there any added dairy stabilizer, emulsifier, or syrup?",
    a: "None whatsoever. Just pure 18-hour Kyoto cold brew coffee, fresh single-origin West Java dairy, and 5g of organic cane sugar to balance the profile.",
  },
  {
    q: "What is the recommended serving ritual?",
    a: "Gently invert the bottle twice to integrate the natural dairy cream. Serve ice-cold over a single clear ice sphere in a chilled tumbler, or enjoy directly from the flint glass bottle.",
  },
];

export function TastingNotes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="tasting"
      ref={ref}
      className="relative bg-coffee-950 text-cream py-28 md:py-40 border-t border-cream/10 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        {/* Tasting Notes / Flavor Profile Header */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-6">
            <p className="eyebrow text-amber-glow mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber-glow" />
              Sensory Evaluation
            </p>
            <h2 className="display text-[clamp(2.5rem,5.2vw,4.8rem)] font-extralight leading-[1] text-balance">
              Flavor profile & cupping notes.
            </h2>
          </div>
          <p className="lg:col-span-6 text-coffee-200/80 text-base md:text-lg font-light leading-relaxed">
            18 hours of zero-heat extraction isolates complex volatile aromatics while leaving harsh astringent acids behind in the bed.
          </p>
        </div>

        {/* Flavor Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-32">
          {FLAVOR_PROFILES.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="rounded-3xl border border-cream/10 bg-coffee-900/60 p-8 flex flex-col justify-between hover:border-amber-glow/40 transition-colors"
            >
              <div>
                <span className="eyebrow text-xs text-amber-glow block mb-2">{item.type}</span>
                <h3 className="text-xl font-light text-cream mb-4">{item.title}</h3>
                <p className="text-coffee-200/80 text-sm leading-relaxed font-light mb-8">
                  {item.desc}
                </p>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono text-coffee-300 mb-2">
                  <span>Sensory Presence</span>
                  <span className="text-amber-glow">{item.intensity}</span>
                </div>
                <div className="h-1 w-full rounded-full bg-cream/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: item.intensity } : {}}
                    transition={{ duration: 1, delay: 0.3 + i * 0.1 }}
                    className="h-full bg-amber-glow rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow text-amber-glow mb-4 inline-flex items-center gap-3">
              <span className="h-px w-6 bg-amber-glow" />
              Frequently Asked
              <span className="h-px w-6 bg-amber-glow" />
            </p>
            <h2 className="display text-[clamp(2.2rem,4.2vw,3.8rem)] font-extralight">
              Everything you need to know.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-cream/10 bg-coffee-900/80 overflow-hidden transition-colors hover:border-cream/20"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex justify-between items-center p-6 md:p-8 text-left font-light text-xl md:text-2xl text-cream hover:text-amber-glow transition"
                  >
                    <span className="pr-4">{faq.q}</span>
                    <span className="text-amber-glow text-2xl transition-transform duration-300 flex-shrink-0" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className="px-6 md:px-8 pb-8 text-coffee-200/80 text-base md:text-lg leading-relaxed border-t border-cream/5 pt-4 font-light">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
