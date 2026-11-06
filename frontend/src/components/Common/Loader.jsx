import { LoaderCircle } from "lucide-react";
export default function Loader({ label = "Loading" }) {
  return (
    <div
      className="flex min-h-40 items-center justify-center gap-2 text-sm text-[#52617a]"
      role="status"
      aria-label={label}
    >
      <LoaderCircle className="animate-spin text-[#2563eb]" size={24} />
      <span>{label}…</span>
    </div>
  );
}
