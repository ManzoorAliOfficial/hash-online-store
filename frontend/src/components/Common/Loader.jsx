import { LoaderCircle } from "lucide-react";
export default function Loader({ label = "Loading" }) {
  return (
    <div
      className="flex min-h-140 items-center justify-center gap-2 text-sm text-[#52617a]"
      role="status"
      aria-label={label}
    >
      <LoaderCircle className="text-[#2563eb] motion-safe:animate-spin motion-reduce:animate-none" size={24} />
      <span>{label}…</span>
    </div>
  );
}
