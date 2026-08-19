"use client";

import { useRef } from "react";
import { useScroll, useTransform, motion } from "motion/react";

/**
 * SplitTextReveal
 * ─────────────────────────────────────────────
 * Splits the input text into characters wrapped in spans, each animated
 * up from below as scroll progress passes a scrub range.
 */
export function SplitTextReveal({
  text,
  className = "",
  scrollOffset = ["start 0.9", "start 0.3"],
  as: Tag = "p",
  delay = 0,
}: {
  text: string;
  className?: string;
  scrollOffset?: [string, string];
  as?: "p" | "h1" | "h2" | "h3" | "div";
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: scrollOffset as ["start 0.9", "start 0.3"],
  });

  const words = text.split(" ");

  return (
    <div ref={ref} className={className}>
      <Tag className="block">
        {words.map((word, wi) => {
          const start = wi / words.length;
          const end = start + 1 / words.length;
          return (
            <span key={wi} className="word mr-[0.25em]">
              <Word progress={scrollYProgress} start={start} end={end} delay={delay}>
                {word}
              </Word>
            </span>
          );
        })}
      </Tag>
    </div>
  );
}

function Word({
  children,
  progress,
  start,
  end,
  delay,
}: {
  children: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
  delay: number;
}) {
  const chars = children.split("");
  return (
    <>
      {chars.map((c, i) => {
        const localStart = start + ((end - start) * i) / chars.length * 0.5;
        const localEnd = Math.min(1, localStart + (end - start) / chars.length);
        return (
          <Char
            key={i}
            char={c}
            progress={progress}
            start={localStart + delay}
            end={localEnd + delay}
          />
        );
      })}
    </>
  );
}

function Char({
  char,
  progress,
  start,
  end,
}: {
  char: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  start: number;
  end: number;
}) {
  const y = useTransform(progress, [start, end], ["110%", "0%"]);
  return (
    <span className="word">
      <motion.span className="char" style={{ y }}>
        {char === " " ? "\u00A0" : char}
      </motion.span>
    </span>
  );
}