"use client";

import { SplitTextReveal } from "./SplitTextReveal";

export function About() {
  return (
    <section
      id="origin"
      className="relative bg-coffee-950 text-cream overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-40 grid grid-cols-1 md:grid-cols-12 gap-y-12 md:gap-x-12">
        <div className="md:col-span-4">
          <p className="eyebrow text-amber-glow mb-6 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-amber-glow" />
            The bottle
          </p>
          <p className="text-coffee-200/80 text-base leading-relaxed max-w-sm">
            We bottle cold brew like it's wine. 250ml flint glass, gold aluminum cap,
            nitrogen headspace. No preservatives, no heat pasteurization — just time,
            temperature, and a flawless seal.
          </p>
        </div>

        <div className="md:col-span-8">
          <SplitTextReveal
            as="h2"
            text="Coffee deserves the same respect as fine wine — slow extraction, precise blend, sealed at peak flavor."
            className="display text-[clamp(2rem,4.4vw,4.5rem)] font-light leading-[1.05] text-balance"
          />

          <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8 max-w-3xl">
            <Pillar
              number="01"
              title="Kyoto Drip"
              body="Ice water, 18 hours, zero heat. The cleanest extraction method known to coffee."
            />
            <Pillar
              number="02"
              title="Single-Origin Milk"
              body="From one dairy in West Java. Full fat, naturally sweet, no stabilizers added."
            />
            <Pillar
              number="03"
              title="Cane Sugar Only"
              body="5g per bottle. Just enough to round the edge — never syrups, never artificial."
            />
            <Pillar
              number="04"
              title="Nitrogen Flush"
              body="Oxygen displaced before the gold cap locks. 90-day shelf life, zero preservatives."
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
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="border-t border-cream/15 pt-5">
      <p className="eyebrow text-coffee-300 mb-3">{number}</p>
      <h3 className="text-xl font-medium text-cream mb-2">{title}</h3>
      <p className="text-coffee-200/80 text-sm leading-relaxed">{body}</p>
    </div>
  );
}