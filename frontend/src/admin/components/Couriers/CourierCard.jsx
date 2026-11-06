import { Settings2, Truck } from "lucide-react";
export default function CourierCard({
  name = "Courier",
  status = "Not connected",
  onConfigure = () => {},
}) {
  return (
    <article className="flex items-center gap-3 rounded-xl border border-[#e4eaf3] bg-white p-4">
      <Truck className="text-[#2563eb]" size={24} />
      <div className="grid flex-1 gap-1">
        <b className="text-sm text-[#17233b]">{name}</b>
        <small className="text-[11px] text-[#8491a5]">{status}</small>
      </div>
      <button
        className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-[#dce5f3] px-3 text-xs font-bold text-[#2563eb] hover:bg-[#eff4ff]"
        type="button"
        onClick={onConfigure}
      >
        <Settings2 size={14} /> Configure
      </button>
    </article>
  );
}
