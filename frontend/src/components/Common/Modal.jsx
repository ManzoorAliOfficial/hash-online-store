import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
export default function Modal({ open, onClose = () => {}, title, children }) {
  const [mounted, setMounted] = useState(open);
  const [presentOpen, setPresentOpen] = useState(false);
  const dialogRef = useRef(null);
  const returnFocusRef = useRef(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = window.requestAnimationFrame(() => setPresentOpen(true));
      return () => window.cancelAnimationFrame(frame);
    }

    setPresentOpen(false);
    const timer = window.setTimeout(() => setMounted(false), 300);
    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    returnFocusRef.current = document.activeElement;
  }, [open]);

  useEffect(() => {
    if (!open || !mounted) return undefined;
    const dialog = dialogRef.current;
    const getFocusable = () =>
      dialog?.querySelectorAll(
        'a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex]:not([tabindex="-1"])',
      ) || [];
    const firstFrame = window.requestAnimationFrame(() => {
      (getFocusable()[0] || dialog)?.focus({ preventScroll: true });
    });
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = getFocusable();
      if (!focusable.length) {
        event.preventDefault();
        dialog?.focus();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && (document.activeElement === first || !dialog?.contains(document.activeElement))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog?.contains(document.activeElement))) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(firstFrame);
      document.removeEventListener("keydown", handleKeyDown);
      const returnFocus = returnFocusRef.current;
      if (returnFocus instanceof HTMLElement && returnFocus.isConnected) {
        returnFocus.focus({ preventScroll: true });
      }
    };
  }, [open, mounted]);
  if (!mounted) return null;
  return createPortal(
    <div
      data-state={presentOpen ? "open" : "closed"}
      aria-hidden={!presentOpen}
      inert={!presentOpen}
      className="fixed inset-0 z-[100] grid place-items-center bg-[#071a3d]/45 p-4 transition-opacity duration-300 data-[state=closed]:pointer-events-none data-[state=closed]:opacity-0 data-[state=open]:opacity-100 motion-reduce:transition-none"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        ref={dialogRef}
        data-state={presentOpen ? "open" : "closed"}
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl transition-transform duration-300 ease-out data-[state=closed]:translate-x-full data-[state=open]:translate-x-0 motion-reduce:transition-none"
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
