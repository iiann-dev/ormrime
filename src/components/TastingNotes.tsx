"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

const NOTES = [
  { label: "Aroma", value: "Dark Cacao & Roasted Hazelnut" },
  { label: "Body", value: "Velvety, Creamy, Zero Chalkiness" },
  { label: "Acidity", value: "Extremely Low (Kyoto Drip)" },
  { label: "Finish", value: "Clean, Sweet Cane, Lingering Cocoa" },
];

const FAQS = [
  {
    q: "How should I store Heppucfine?",
    a: "Keep refrigerated at 4°C. Because we use single-origin milk and zero preservatives, it must stay chilled. Enjoy within 90 days of bottling.",
  },
  {
    q: "How is it shipped?",
    a: "We ship in insulated thermal mailers with gel ice packs to ensure your bottles arrive chilled and ready to put straight into the fridge.",
  },
  {
    q: "Is there any added dairy stabilizer or artificial sweetener?",
    a: "None. Just pure single-origin West Java dairy and exactly 5g of organic cane sugar per bottle to balance the 18-hour Kyoto extraction.",
  },
];

export function TastingNotes() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.2, once: true });
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section
      id="tasting"
      ref={ref}
      className="relative bg-coffee-950 text-cream py-28 md:py-40 border-t border-cream/10"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Tasting Notes / Flavor Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-28 md:mb-36">
          <div className="lg:col-span-5">
            <p className="eyebrow text-amber-glow mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber-glow" />
              Flavor profile
            </p>
            <h2 className="display text-[clamp(2.5rem,5vw,4.5rem)] font-extralight leading-[1] text-balance mb-6">
              Tasting notes in every drop.
            </h2>
            <p className="text-coffee-200/80 text-base leading-relaxed">
              Steeped for 18 hours without heat, our cold brew unlocks smooth, chocolatey undertones without the bitter acids of hot extraction.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {NOTES.map((note, i) => (
              <motion.div
                key={note.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="rounded-2xl border border-cream/10 bg-coffee-900 p-6 md:p-8"
              >
                <p className="eyebrow text-amber-glow mb-2">{note.label}</p>
                <p className="text-xl md:text-2xl font-light text-cream">{note.value}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="eyebrow text-amber-glow mb-4 inline-flex items-center gap-3">
              <span className="h-px w-6 bg-amber-glow" />
              Got questions?
              <span className="h-px w-6 bg-amber-glow" />
            </p>
            <h2 className="display text-[clamp(2rem,4vw,3.5rem)] font-extralight">
              Frequently asked.
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-cream/10 bg-coffee-900 overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex justify-between items-center p-6 md:p-8 text-left font-light text-xl md:text-2xl text-cream hover:text-amber-glow transition"
                  >
                    <span>{faq.q}</span>
                    <span className="text-amber-glow text-2xl transition-transform duration-300" style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}>
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 md:px-8 pb-8 text-coffee-200/80 text-base leading-relaxed border-t border-cream/5 pt-4">
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
