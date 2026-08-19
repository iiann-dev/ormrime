"use client";

import { motion } from "motion/react";

const FOOTER_LINKS = [
  {
    heading: "Shop",
    links: [
      { label: "Heppucfine 6-pack", href: "#" },
      { label: "Single bottle", href: "#" },
      { label: "Subscription", href: "#" },
      { label: "Corporate gifting", href: "#" },
    ],
  },
  {
    heading: "Learn",
    links: [
      { label: "Our extraction", href: "#" },
      { label: "The journal", href: "#" },
      { label: "FAQ", href: "#" },
      { label: "Recycling program", href: "#" },
    ],
  },
  {
    heading: "Studio",
    links: [
      { label: "Our story", href: "#" },
      { label: "Visit the lab", href: "#" },
      { label: "Wholesale", href: "#" },
      { label: "Press kit", href: "#" },
    ],
  },
];

export function Footer() {
  return (
    <footer id="contact" className="relative bg-coffee-950 text-cream overflow-hidden border-t border-cream/10">
      <div className="mx-auto max-w-7xl px-6 md:px-10 pt-24 pb-12">
        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="display font-black tracking-[-0.05em] leading-[0.85] text-[clamp(4rem,18vw,16rem)] text-cream/95 mb-16 md:mb-24"
        >
          ORMRIME<span className="text-amber-glow">.</span>
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-12 gap-10 md:gap-8 mb-16">
          <div className="col-span-2 md:col-span-4">
            <p className="eyebrow text-amber-glow mb-4">Find us</p>
            <address className="not-italic text-cream/90 leading-relaxed">
              Jl. Sriwedari No. 4<br />
              Ubud, Bali 80571<br />
              Indonesia
            </address>
            <p className="mt-6 text-cream/70">
              hello@ormrime.co
              <br />
              +62 811 2200 8841
            </p>
          </div>

          {FOOTER_LINKS.map((col) => (
            <div key={col.heading} className="md:col-span-2">
              <p className="eyebrow text-amber-glow mb-4">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-cream/85 hover:text-amber-glow transition"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="col-span-2 md:col-span-2">
            <p className="eyebrow text-amber-glow mb-4">Follow</p>
            <ul className="space-y-3">
              {["Instagram", "TikTok", "LinkedIn", "YouTube"].map((s) => (
                <li key={s}>
                  <a
                    href="#"
                    className="text-cream/85 hover:text-amber-glow transition inline-flex items-center gap-1.5"
                  >
                    {s} <span className="text-xs">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-cream/15 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-sm text-cream/55">
          <p>© 2026 ORMRIME Studio. Cold brew bottled with intention in Bali.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-cream transition">Privacy</a>
            <a href="#" className="hover:text-cream transition">Terms</a>
            <a href="#" className="hover:text-cream transition">Shipping</a>
          </div>
        </div>
      </div>
    </footer>
  );
}