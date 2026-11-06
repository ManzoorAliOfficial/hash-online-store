import { MapPin, ShieldCheck, Truck } from "lucide-react";
export default function DeliveryInformation() {
  return (
    <div className="mt-5 grid gap-2 rounded-xl border border-[#e4eaf3] bg-white p-4">
      <p className="flex items-center gap-2 text-xs text-[#52617a]">
        <Truck className="text-[#2563eb]" size={17} /> Delivery available across
        Pakistan
      </p>
      <p className="flex items-center gap-2 text-xs text-[#52617a]">
        <ShieldCheck className="text-[#2563eb]" size={17} /> Secure payment and
        trusted checkout
      </p>
      <p className="flex items-center gap-2 text-xs text-[#52617a]">
        <MapPin className="text-[#2563eb]" size={17} /> Delivery estimate shown
        at checkout
      </p>
    </div>
  );
}
