"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";

/**
 * MagneticButton — wrapper that subtly pulls its inner element toward the
 * cursor when hovered. Inner ref is the visible pill; outer ref is the hit
 * area (larger so the pull feels generous).
 */
export function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  ariaLabel,
  strength = 0.35,
}: {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
  strength?: number;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;

    const onMove = (e: MouseEvent) => {
      const r = outer.getBoundingClientRect();
      targetX = (e.clientX - (r.left + r.width / 2)) * strength;
      targetY = (e.clientY - (r.top + r.height / 2)) * strength;
    };
    const tick = () => {
      curX += (targetX - curX) * 0.18;
      curY += (targetY - curY) * 0.18;
      inner.style.transform = `translate(${curX}px, ${curY}px)`;
      targetX *= 0.92;
      targetY *= 0.92;
      raf = requestAnimationFrame(tick);
    };

    if (hovered) {
      outer.addEventListener("mousemove", onMove);
      raf = requestAnimationFrame(tick);
      return () => {
        outer.removeEventListener("mousemove", onMove);
        cancelAnimationFrame(raf);
      };
    } else {
      // ease back
      const reset = () => {
        curX += (0 - curX) * 0.18;
        curY += (0 - curY) * 0.18;
        inner.style.transform = `translate(${curX}px, ${curY}px)`;
        if (Math.abs(curX) > 0.1 || Math.abs(curY) > 0.1) {
          raf = requestAnimationFrame(reset);
        }
      };
      raf = requestAnimationFrame(reset);
      return () => cancelAnimationFrame(raf);
    }
  }, [hovered, strength]);

  const Tag: React.ElementType = href ? motion.a : motion.button;
  const props = href ? { href } : { onClick, type: "button" as const };

  return (
    <div
      ref={outerRef}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="inline-block"
    >
      <Tag
        {...props}
        aria-label={ariaLabel}
        whileTap={{ scale: 0.97 }}
        className={`relative inline-flex items-center justify-center rounded-full will-change-transform ${className}`}
      >
        <div ref={innerRef} className="will-change-transform">
          {children}
        </div>
      </Tag>
    </div>
  );
}