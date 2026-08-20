"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";

const BENTO = [
  {
    id: "feature",
    span: "md:col-span-7 md:row-span-2",
    type: "feature",
    image: "https://plus.unsplash.com/premium_photo-1719997502959-fab1242f11ae?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    eyebrow: "Signature release",
    title: "Heppucfine — Cold Brew Latte",
    body: "Slow-steeped 18 hours, blended with single-origin milk. Creamy, low-sugar, absolute zero artificial additives. Housed in 250ml heavyweight flint glass with a gold aluminum seal.",
    tag: "Limited 500 bottles per batch",
  },
  {
    id: "method",
    span: "md:col-span-5",
    type: "image",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=85&w=800",
    eyebrow: "Cold extraction",
    title: "Glacial 18-Hour Kyoto Drip",
  },
  {
    id: "ritual",
    span: "md:col-span-5",
    type: "quote",
    eyebrow: "Serving ritual",
    title: "Shake gently, pop the gold cap, pour over clear ice — or sip ice-cold straight from the bottle.",
    body: "Engineered to taste pristine at exactly 4°C. No brewer, no scale, no waiting.",
  },
  {
    id: "roast",
    span: "md:col-span-7",
    type: "image-wide",
    image: "https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&q=85&w=1200",
    eyebrow: "Roasted for ice",
    title: "Custom medium-dark roast profile calibrated specifically for ice dilution — rich, sweet, and velvety to the final drop.",
  },
  {
    id: "sourcing",
    span: "md:col-span-6",
    type: "info",
    eyebrow: "Single-origin integrity",
    title: "West Highland Dairy Partner",
    body: "We partner directly with a single family-run dairy farm in West Java. Grass-fed cattle producing rich milk with natural sweetness that requires zero emulsifiers.",
  },
  {
    id: "seal",
    span: "md:col-span-6",
    type: "info",
    eyebrow: "Hermetic preservation",
    title: "Nitrogen Flush Technology",
    body: "Before applying the gold aluminum cap, each bottle is injected with food-grade nitrogen to purge oxygen and lock in volatile roasting aromatics for 90 days.",
  },
];

export function Bento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.12, once: true });

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-coffee-950 text-cream overflow-hidden py-28 md:py-40 border-t border-cream/10"
    >
      {/* Background glow accents */}
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-amber-glow/5 blur-[150px]" />

      <div className="mx-auto max-w-7xl px-6 md:px-10 relative z-10">
        <div className="mb-16 md:mb-20 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p className="eyebrow text-amber-glow mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber-glow" />
              The craft architecture
            </p>
            <h2 className="display text-[clamp(2.5rem,5.2vw,5rem)] font-extralight leading-[1] max-w-3xl text-balance">
              Five uncompromising choices.
            </h2>
          </div>
          <p className="text-coffee-200/80 max-w-sm text-base leading-relaxed font-light">
            Every ORMRIME bottle represents an unbroken chain of deliberate choices: from the glacial drop rate to the hermetic nitrogen seal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(240px,auto)] gap-4 md:gap-5">
          {BENTO.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden rounded-3xl border border-cream/10 bg-coffee-900 ${card.span}`}
            >
              <BentoCard card={card} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BentoCard({ card }: { card: (typeof BENTO)[number] }) {
  if (card.type === "feature") {
    return (
      <div className="relative h-full min-h-[460px] md:min-h-[560px]">
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-8 md:p-12">
          <p className="eyebrow text-amber-glow mb-4">{card.eyebrow}</p>
          <h3 className="display text-3xl md:text-5xl font-light mb-4 max-w-lg text-balance">
            {card.title}
          </h3>
          <p className="text-coffee-100/80 text-base md:text-lg leading-relaxed max-w-lg mb-6 font-light">
            {card.body}
          </p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-glow/40 bg-amber-glow/10 px-4 py-1.5 text-xs font-mono text-amber-glow">
            {card.tag}
          </span>
        </div>
      </div>
    );
  }

  if (card.type === "image" || card.type === "image-wide") {
    return (
      <div className="relative h-full min-h-[280px]">
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/85 via-coffee-950/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-8">
          <p className="eyebrow text-cream/80 mb-3">{card.eyebrow}</p>
          <h3 className="display text-2xl md:text-3xl font-light max-w-md text-balance">
            {card.title}
          </h3>
        </div>
      </div>
    );
  }

  if (card.type === "quote") {
    return (
      <div className="relative h-full min-h-[280px] flex flex-col justify-center p-8 md:p-10 bg-gradient-to-br from-coffee-900 to-coffee-950 border border-cream/10">
        <p className="eyebrow text-amber-glow mb-5">{card.eyebrow}</p>
        <blockquote className="display text-2xl md:text-3xl font-extralight leading-[1.1] text-balance mb-4">
          &ldquo;{card.title}&rdquo;
        </blockquote>
        <p className="text-coffee-200/70 text-sm leading-relaxed font-light">
          {card.body}
        </p>
      </div>
    );
  }

  // info
  return (
    <div className="relative h-full min-h-[280px] flex flex-col justify-between p-8 md:p-10 bg-gradient-to-br from-coffee-900/90 to-coffee-950 border border-cream/10">
      <div>
        <p className="eyebrow text-amber-glow mb-4">{card.eyebrow}</p>
        <h3 className="display text-2xl md:text-3xl font-light mb-3 text-balance">
          {card.title}
        </h3>
        <p className="text-coffee-200/80 text-sm leading-relaxed font-light">
          {card.body}
        </p>
      </div>
      <div className="mt-6 flex items-center gap-2 text-xs font-mono text-amber-glow">
        <span>ORMRIME STANDARD</span>
        <span className="h-px w-8 bg-amber-glow/50" />
      </div>
    </div>
  );
}
