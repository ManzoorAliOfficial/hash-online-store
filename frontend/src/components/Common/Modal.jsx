import { useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
export default function Modal({ open, onClose = () => {}, title, children }) {
  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open, onClose]);
  if (!open) return null;
  return createPortal(
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#071a3d]/45 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
      >
        <header className="flex items-center justify-between border-b border-[#edf0f5] px-5 py-4">
          <h2 className="text-lg font-bold text-[#17233b]" id="dialog-title">
            {title}
          </h2>
          <button
            type="button"
            className="grid size-8 place-items-center rounded-lg text-[#52617a] hover:bg-[#f4f7fc]"
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </header>
        <div className="p-5">{children}</div>
      </section>
    </div>,
    document.body,
  );
}
