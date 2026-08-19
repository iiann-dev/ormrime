"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * Preload overlay for the sequence frames. Reports 0..1 progress so the user
 * sees movement while we stream images. Hides once everything is cached.
 */
export function Loader() {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Reduced-motion users skip the loader to keep things snappy.
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setLoaded(true);
      return;
    }

    let cancelled = false;
    const FRAME_COUNT = 240;
    const cache: HTMLImageElement[] = [];

    const preload = (i: number): Promise<void> =>
      new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = `/sequence/ezgif-frame-${String(i).padStart(3, "0")}.webp`;
        cache[i] = img;
      });

    (async () => {
      // Warm first 12 sequentially so progress feels alive
      for (let i = 1; i <= 12 && !cancelled; i++) {
        await preload(i);
        setProgress(i / FRAME_COUNT);
      }
      // Then fan out the rest in parallel batches
      const batches: number[][] = [];
      for (let i = 13; i <= FRAME_COUNT; i += 12) {
        batches.push(
          Array.from({ length: Math.min(12, FRAME_COUNT - i + 1) }, (_, k) => i + k)
        );
      }
      for (const batch of batches) {
        if (cancelled) return;
        await Promise.all(batch.map(preload));
        setProgress(Math.min(1, batch[batch.length - 1] / FRAME_COUNT));
      }
      if (!cancelled) {
        setProgress(1);
        // Small settle delay so the bar fills visibly
        setTimeout(() => {
          if (!cancelled) setLoaded(true);
        }, 280);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!loaded) return;
    // Remove from DOM after the fade-out
    const t = setTimeout(() => setShow(false), 700);
    return () => clearTimeout(t);
  }, [loaded]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: loaded ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          className="loader"
          data-loaded={loaded}
        >
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 1.6, repeat: Infinity }}
                className="eyebrow text-coffee-200"
              >
                ORMRIME
              </motion.span>
              <span className="h-3 w-px bg-coffee-200/40" />
              <span className="eyebrow text-coffee-300">
                {Math.round(progress * 100).toString().padStart(3, "0")}
              </span>
            </div>

            <div
              className="loader-bar"
              style={{ "--progress": progress } as React.CSSProperties}
            />

            <span className="eyebrow text-coffee-300/60">
              {loaded ? "Ready" : "Brewing the experience"}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}