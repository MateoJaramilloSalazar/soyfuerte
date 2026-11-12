"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackScrollDepth } from "@/lib/analytics";

const MARKS = [25, 50, 75, 100] as const;

/** Métrica de scroll depth: registra 25/50/75/100 % una vez por página visitada. */
export function ScrollDepth() {
  const pathname = usePathname();

  useEffect(() => {
    const sent = new Set<number>();
    let frame = 0;
    const check = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const pct = max <= 0 ? 100 : (window.scrollY / max) * 100;
      for (const m of MARKS) {
        if (pct >= m - 1 && !sent.has(m)) {
          sent.add(m);
          trackScrollDepth(pathname, m);
        }
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
