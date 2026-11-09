import { useState } from "react";
import WhatsAppIcon from "./WhatsAppIcon";
import { useStore } from "../../context/StoreContext";
import { openWhatsApp } from "../../utils/whatsapp";

export default function FloatingWhatsApp() {
  const { settings } = useStore();
  const [hovered, setHovered] = useState(false);

  const handleClick = () => {
    const message =
      "Assalam-o-Alaikum Hash Online Store! 👋 I have a question and need some assistance with shopping.";
    openWhatsApp(message, settings?.whatsappNumber);
  };

  return (
    <div
      className="fixed bottom-20 right-4 z-35 flex items-center gap-2 md:bottom-7 md:right-7"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Tooltip Pill */}
      <span
        className={`pointer-events-none hidden rounded-full bg-[#102449] px-3 py-1.5 text-xs font-semibold text-white shadow-lg transition-all duration-200 sm:inline-block ${
          hovered ? "translate-x-0 opacity-100" : "translate-x-2 opacity-0"
        }`}
        aria-hidden="true"
      >
        Need help? Chat with us
      </span>

      {/* Floating Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Chat with Hash Online Store on WhatsApp"
        title="Chat on WhatsApp"
        className="group relative flex size-13 cursor-pointer items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.38)] transition-all duration-200 hover:scale-108 hover:bg-[#20ba59] active:scale-95 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
      >
        {/* Subtle Pulse Aura (respects prefers-reduced-motion) */}
        <span
          className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366]/40 motion-safe:animate-ping motion-reduce:animate-none"
          aria-hidden="true"
        />

        <WhatsAppIcon className="relative z-10 size-7" />
      </button>
    </div>
  );
}
