import { useEffect, useRef, useState } from "react";

const variants = {
  "fade-up": {
    hidden: "translate-y-6",
    visible: "motion-safe:animate-fade-up",
  },
  "fade-in": {
    hidden: "",
    visible: "motion-safe:animate-fade-in",
  },
  "slide-left": {
    hidden: "-translate-x-8",
    visible: "motion-safe:animate-slide-left",
  },
  "slide-right": {
    hidden: "translate-x-8",
    visible: "motion-safe:animate-slide-right",
  },
  "zoom-in": {
    hidden: "scale-[.94]",
    visible: "motion-safe:animate-zoom-in",
  },
};

export default function Reveal({
  children,
  className = "",
  variant = "fade-up",
  delay = 0,
  index = 0,
  once = true,
  as: Element = "div",
}) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setRevealed(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.find((item) => item.target === node);
        if (!entry) return;
        setRevealed(entry.isIntersecting);
        if (once && entry.isIntersecting) observer.unobserve(node);
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    setReady(true);
    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  const animation = variants[variant] || variants["fade-up"];
  const visible = !ready || revealed;
  const staggerDelay = Math.max(0, Number(delay) || 0) + Math.max(0, Number(index) || 0) * 70;

  return (
    <Element
      ref={ref}
      style={staggerDelay ? { "--reveal-delay": `${staggerDelay}ms` } : undefined}
      className={`${visible ? `opacity-100 ${ready && revealed ? animation.visible : ""}` : `opacity-0 ${animation.hidden}`} [animation-delay:var(--reveal-delay,0ms)] motion-reduce:opacity-100 motion-reduce:transform-none motion-reduce:animate-none ${className}`}
    >
      {children}
    </Element>
  );
}
