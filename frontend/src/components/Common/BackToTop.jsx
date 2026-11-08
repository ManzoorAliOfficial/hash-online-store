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
      className="fixed bottom-6 right-6 z-40 grid size-11 cursor-pointer place-items-center rounded-full bg-[#2563eb] text-white shadow-[0_6px_20px_rgba(37,99,235,0.35)] transition-all duration-200 hover:bg-[#174fcc] hover:scale-110 active:scale-95 max-[600px]:bottom-4 max-[600px]:right-4 max-[600px]:size-10"
      aria-label="Back to top of page"
      title="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
}
