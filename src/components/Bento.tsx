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
    body: "Slow-steeped 18h, blended with single-origin milk. Creamy, low-sugar, no additives. 250ml glass bottle, gold cap.",
    tag: "Limited 500 bottles / drop",
  },
  {
    id: "method",
    span: "md:col-span-5",
    type: "image",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=85&w=800",
    eyebrow: "Cold extraction",
    title: "18-Hour Kyoto Drip",
  },
  {
    id: "ritual",
    span: "md:col-span-5",
    type: "quote",
    eyebrow: "Drink cold",
    title: "Shake, pop, pour over ice — or sip straight from the bottle.",
    body: "Best served at 4°C. No brewer, no scale, no wait. Premium coffee, ready when you are.",
  },
  {
    id: "roast",
    span: "md:col-span-7",
    type: "image-wide",
    image: "https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&q=85&w=1200",
    eyebrow: "Roasted for cold",
    title: "Medium-dark profile built for ice dilution — stays sweet, never watery.",
  },
  {
    id: "visit",
    span: "md:col-span-6",
    type: "cta",
    eyebrow: "Stockists",
    title: "Find Heppucfine at select cafés and concept stores in Bali & Jakarta.",
    cta: "Locate a shop",
  },
  {
    id: "journal",
    span: "md:col-span-6",
    type: "image-square",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=85&w=800",
    eyebrow: "From the lab",
    title: "Why we nitrogen-flush every bottle before the gold cap goes on.",
  },
];

export function Bento() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.15, once: true });

  return (
    <section
      id="process"
      ref={ref}
      className="relative bg-coffee-950 text-cream overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-28 md:py-40">
        <div className="mb-16 md:mb-20 flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p className="eyebrow text-amber-glow mb-5 inline-flex items-center gap-3">
              <span className="h-px w-8 bg-amber-glow" />
              The process
            </p>
            <h2 className="display text-[clamp(2.5rem,5.2vw,5rem)] font-extralight leading-[1] max-w-3xl text-balance">
              Five small choices, repeated with care.
            </h2>
          </div>
          <p className="text-coffee-200/80 max-w-sm text-base leading-relaxed">
            Every ORMRIME bottle is the result of five decisions: how we brew,
            how we blend, how we bottle, how we seal, and how it reaches you cold.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(220px,auto)] gap-4 md:gap-5">
          {BENTO.map((card, i) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative overflow-hidden rounded-2xl border border-cream/10 bg-coffee-900 ${card.span}`}
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
      <div className="relative h-full min-h-[420px] md:min-h-[520px]">
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950 via-coffee-950/40 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-7 md:p-10">
          <p className="eyebrow text-amber-glow mb-4">{card.eyebrow}</p>
          <h3 className="display text-3xl md:text-5xl font-light mb-4 max-w-md text-balance">
            {card.title}
          </h3>
          <p className="text-coffee-100/80 text-base leading-relaxed max-w-md mb-4">
            {card.body}
          </p>
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-glow/40 bg-amber-glow/10 px-3 py-1 text-xs text-amber-glow">
            {card.tag}
          </span>
        </div>
      </div>
    );
  }

  if (card.type === "image" || card.type === "image-wide" || card.type === "image-square") {
    return (
      <div className="relative h-full min-h-[260px]">
        <img
          src={card.image}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-950/85 via-coffee-950/30 to-transparent" />
        <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
          <p className="eyebrow text-cream/80 mb-3">{card.eyebrow}</p>
          <h3 className="display text-2xl md:text-3xl font-light max-w-sm text-balance">
            {card.title}
          </h3>
        </div>
      </div>
    );
  }

  if (card.type === "quote") {
    return (
      <div className="relative h-full min-h-[260px] flex flex-col justify-center p-7 md:p-10 grain">
        <p className="eyebrow text-amber-glow mb-5">{card.eyebrow}</p>
        <blockquote className="display text-2xl md:text-4xl font-extralight leading-[1.05] text-balance mb-5">
          &ldquo;{card.title}&rdquo;
        </blockquote>
        <p className="text-coffee-200/70 text-sm leading-relaxed max-w-sm">
          {card.body}
        </p>
      </div>
    );
  }

  // cta
  return (
    <div className="relative h-full min-h-[260px] flex flex-col justify-between p-7 md:p-10 bg-gradient-to-br from-coffee-700 to-coffee-900">
      <div>
        <p className="eyebrow text-amber-glow mb-4">{card.eyebrow}</p>
        <h3 className="display text-2xl md:text-3xl font-light max-w-sm text-balance">
          {card.title}
        </h3>
      </div>
      <a
        href="#contact"
        className="group/btn mt-8 inline-flex w-fit items-center gap-3 rounded-full bg-cream px-5 py-3 text-coffee-900 transition hover:bg-amber-glow"
      >
        <span className="text-sm">{card.cta}</span>
        <span className="transition-transform group-hover/btn:translate-x-1">→</span>
      </a>
    </div>
  );
}