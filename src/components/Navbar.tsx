"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const NAV_LINKS = [
  { label: "Origin", href: "#origin" },
  { label: "Process", href: "#process" },
  { label: "Flavor", href: "#tasting" },
  { label: "Shop", href: "#shop" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com/ormrime" },
  { label: "Are.na", href: "https://are.na/ormrime" },
  { label: "Spotify", href: "https://open.spotify.com/user/ormrime" },
];

const CONTACTS = [
  { label: "hello@ormrime.co", href: "mailto:hello@ormrime.co" },
  { label: "+62 811 2200 8841", href: "tel:+6281122008841" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when open
  useEffect(() => {
    const lenis = (window as unknown as { __lenis?: { stop: () => void; start: () => void } }).__lenis;
    if (open) {
      document.body.style.overflow = "hidden";
      lenis?.stop();
    } else {
      document.body.style.overflow = "";
      lenis?.start();
    }
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open]);

  // Esc closes
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6, ease: [0.65, 0, 0.35, 1] }}
        className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 mix-blend-difference"
      >
        <a
          href="#top"
          className="font-black tracking-tighter text-cream text-2xl md:text-3xl"
          aria-label="ORMRIME home"
        >
          ORMRIME<span className="text-amber-glow">.</span>
        </a>

        <button
          onClick={() => setOpen((v) => !v)}
          className="group relative flex items-center gap-3 text-cream"
          aria-expanded={open}
          aria-controls="fullscreen-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <span className="eyebrow hidden md:inline">
            {open ? "Close" : "Menu"}
          </span>
          <span className="relative block h-9 w-9">
            <motion.span
              animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-cream"
            />
            <motion.span
              animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
              transition={{ duration: 0.4 }}
              className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 bg-cream"
            />
          </span>
        </button>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <FullscreenMenu onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

function FullscreenMenu({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      id="fullscreen-menu"
      initial={{ y: "-100%" }}
      animate={{ y: 0 }}
      exit={{ y: "-100%" }}
      transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-30 bg-coffee-950 text-cream"
    >
      <div
        data-lenis-prevent
        className="flex h-full flex-col justify-between px-6 md:px-10 py-24 overflow-y-auto"
      >
        <ul className="flex flex-col gap-1 md:gap-2 pt-12">
          {NAV_LINKS.map((link, i) => (
            <li key={link.href} className="overflow-hidden">
              <motion.a
                href={link.href}
                onClick={onClose}
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                exit={{ y: "-110%" }}
                transition={{
                  delay: 0.18 + i * 0.05,
                  duration: 0.7,
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="group block py-1 md:py-2"
              >
                <span className="display block text-[clamp(3rem,9vw,8rem)] font-extralight leading-[0.92] tracking-tight">
                  {link.label.split("").map((char, j) => (
                    <motion.span
                      key={j}
                      initial={{ y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        delay: 0.18 + i * 0.05 + j * 0.018,
                        duration: 0.7,
                        ease: [0.76, 0, 0.24, 1],
                      }}
                      className="inline-block group-hover:text-amber-glow transition-colors duration-500"
                      style={{ transitionDelay: `${j * 12}ms` }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </motion.span>
                  ))}
                  <span className="inline-block w-3 md:w-4 align-middle text-amber-glow opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    ↗
                  </span>
                </span>
              </motion.a>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 border-t border-cream/15 pt-8">
          <div>
            <h3 className="eyebrow text-coffee-300 mb-4">Find us</h3>
            <ul className="space-y-2 text-cream/90">
              <li>Jl. Sriwedari No. 4</li>
              <li>Ubud, Bali 80571</li>
              <li>Indonesia</li>
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-coffee-300 mb-4">Contact</h3>
            <ul className="space-y-2">
              {CONTACTS.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className="text-cream/90 hover:text-amber-glow transition"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="eyebrow text-coffee-300 mb-4">Follow</h3>
            <ul className="space-y-2">
              {SOCIALS.map((s) => (
                <li key={s.href}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-cream/90 hover:text-amber-glow transition"
                  >
                    {s.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
}