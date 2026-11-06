import { useEffect, useState } from "react";
import { MapPin, PackageCheck, ShieldCheck, Truck, X } from "lucide-react";

const STORAGE_KEY = "announcement-bar-dismissed";

const ITEMS = [
  { icon: PackageCheck, text: "Quality products" },
  { icon: Truck, text: "Fast delivery" },
  { icon: ShieldCheck, text: "Trusted shopping" },
  { icon: MapPin, text: "Pakistan-wide delivery", lgOnly: true },
];

// One load sequence: items fade in one after another. Skipped for reduced motion.
const css = `
@media (prefers-reduced-motion: no-preference) {
  @keyframes ab-in {
    from { opacity: 0; transform: translateY(4px); }
    to   { opacity: 1; transform: none; }
  }
  .ab-in { animation: ab-in 600ms cubic-bezier(.22,1,.36,1) both; }
}
`;

function readDismissed() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(readDismissed);
  const [open, setOpen] = useState(false);

  // Slide the bar open once after mount
  useEffect(() => {
    if (dismissed) return;
    const id = requestAnimationFrame(() => setOpen(true));
    return () => cancelAnimationFrame(id);
  }, [dismissed]);

  const onCollapsed = (e) => {
    if (e.target !== e.currentTarget || open) return;
    setDismissed(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* storage unavailable, bar simply returns on reload */
    }
  };

  if (dismissed) return null;

  return (
    <div
      role="region"
      aria-label="Store announcement"
      className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.22,1,.36,1)] motion-reduce:transition-none"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      onTransitionEnd={onCollapsed}
    >
      <style>{css}</style>

      <div className="relative min-h-0 overflow-hidden border-b border-white/10 bg-[#102449] text-[#dce8ff]">
        <div className="mx-auto flex min-h-[40px] max-w-7xl items-center justify-center px-12 py-2">
          {/* Small screens: the plain tagline */}
          <p className="text-center text-xs font-medium leading-snug tracking-[.02em] md:hidden">
            Quality products. Fast delivery. Trusted shopping.
          </p>

          {/* md and up: structured row with dividers */}
          <ul className="hidden items-center md:flex">
            {ITEMS.map(({ icon: Icon, text, lgOnly }, i) => (
              <li
                key={text}
                className={`ab-in items-center gap-2 px-6 text-[13px] font-medium tracking-[.01em] first:pl-0 last:pr-0 ${
                  i > 0 ? "border-l border-white/15" : ""
                } ${lgOnly ? "hidden lg:flex" : "flex"} ${
                  lgOnly ? "text-[#9db8e7]" : ""
                }`}
                style={{ animationDelay: `${300 + i * 90}ms` }}
              >
                <Icon size={15} className="shrink-0 text-[#9db8e7]" aria-hidden="true" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Dismiss announcement"
          className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-[#9db8e7] transition-colors hover:bg-white/10 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9db8e7]"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}