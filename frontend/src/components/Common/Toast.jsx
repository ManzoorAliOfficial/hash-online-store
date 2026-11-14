import { useEffect, useRef, useState } from "react";
export default function Toast() {
  const [message, setMessage] = useState("");
  const [closing, setClosing] = useState(false);
  const timer = useRef(null);
  const exitTimer = useRef(null);
  useEffect(() => {
    const handler = (event) => {
      setMessage(event.detail);
      setClosing(false);
      window.clearTimeout(timer.current);
      window.clearTimeout(exitTimer.current);
      timer.current = window.setTimeout(() => {
        setClosing(true);
        exitTimer.current = window.setTimeout(() => setMessage(""), 300);
      }, 2600);
    };
    window.addEventListener("hash-toast", handler);
    return () => {
      window.clearTimeout(timer.current);
      window.clearTimeout(exitTimer.current);
      window.removeEventListener("hash-toast", handler);
    };
  }, []);
  return message ? (
    <div
      data-state={closing ? "closed" : "open"}
      className="fixed bottom-5 right-5 z-[110] rounded-xl bg-[#102449] px-4 py-3 text-sm font-semibold text-white shadow-xl transition-[transform,opacity] duration-300 ease-out data-[state=closed]:translate-y-3 data-[state=closed]:opacity-0 data-[state=open]:translate-y-0 data-[state=open]:opacity-100 motion-reduce:transition-none"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  ) : null;
}

export const notify = (message) =>
  window.dispatchEvent(new CustomEvent("hash-toast", { detail: message }));
