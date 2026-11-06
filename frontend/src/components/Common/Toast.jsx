import { useEffect, useRef, useState } from "react";
export default function Toast() {
  const [message, setMessage] = useState("");
  const timer = useRef(null);
  useEffect(() => {
    const handler = (event) => {
      setMessage(event.detail);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setMessage(""), 2600);
    };
    window.addEventListener("hash-toast", handler);
    return () => {
      window.clearTimeout(timer.current);
      window.removeEventListener("hash-toast", handler);
    };
  }, []);
  return message ? (
    <div
      className="fixed bottom-5 right-5 z-[110] rounded-xl bg-[#102449] px-4 py-3 text-sm font-semibold text-white shadow-xl"
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  ) : null;
}

export const notify = (message) =>
  window.dispatchEvent(new CustomEvent("hash-toast", { detail: message }));
