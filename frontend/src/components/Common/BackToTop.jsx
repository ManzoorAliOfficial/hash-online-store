import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="fixed bottom-36 right-4.5 z-30 grid size-10.5 cursor-pointer place-items-center rounded-full bg-[#102449] text-white shadow-lg transition-all duration-200 hover:bg-[#2563eb] hover:scale-110 active:scale-95 md:bottom-23 md:right-7.5 md:size-11"
      aria-label="Back to top of page"
      title="Back to top"
    >
      <ArrowUp size={18} />
    </button>
  );
}
