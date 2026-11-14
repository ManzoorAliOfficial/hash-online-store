import { MapPin, ShieldCheck, Truck } from "lucide-react";
export default function DeliveryInformation() {
  return (
    <div className="mt-4 grid gap-2 rounded-lg border border-[#dce5f3] bg-[#f4f7fc] p-3">
      <p className="flex items-center gap-2 text-xs text-[#52617a]">
        <Truck className="text-[#2563eb]" size={17} /> Delivery available across
        Pakistan
      </p>
      <p className="flex items-center gap-2 text-xs text-[#52617a]">
        <ShieldCheck className="text-[#2563eb]" size={17} /> Secure payment and
        trusted checkout
      </p>
      <p className="flex items-center gap-2 text-xs text-[#52617a]">
        <MapPin className="text-[#2563eb]" size={17} /> Delivery cost shown
        at checkout
      </p>
    </div>
  );
}
