import { useEffect, useRef, useState } from "react";

const delayClasses = {
  0: "delay-0",
  45: "delay-[45ms]",
  90: "delay-[90ms]",
  135: "delay-[135ms]",
  180: "delay-[180ms]",
  225: "delay-[225ms]",
};

export default function Reveal({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
      !("IntersectionObserver" in window)
    ) {
      setVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`${visible ? "translate-y-0 opacity-100" : "translate-y-[18px] opacity-0"} ${delayClasses[delay] || delayClasses[0]} transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.65,.3,1)] motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${className}`}
    >
      {children}
    </div>
  );
}
