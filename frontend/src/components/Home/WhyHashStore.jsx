import { Truck, ShieldCheck, Headphones } from "lucide-react";
export default function WhyHashStore() {
  return (
    <section className="mx-auto mb-[78px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]">
      <h2 className="text-[30px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
        Shopping made simple.
      </h2>
      <div className="mt-[26px] grid grid-cols-3 gap-[35px] max-[700px]:grid-cols-1 max-[700px]:gap-3">
        {[
          [Truck, "Delivery you can rely on"],
          [ShieldCheck, "Quality comes first"],
          [Headphones, "Real help when you need it"],
        ].map(([Icon, text]) => (
          <div
            className="flex items-center gap-4 rounded-xl border border-[#edf0f5] bg-white p-[23px] max-[700px]:p-4"
            key={text}
          >
            <Icon className="size-7 shrink-0 text-[#2563eb]" />
            <div>
              <h3 className="mb-[7px] text-[13px] font-bold text-[#17233b]">
                {text}
              </h3>
              <p className="m-0 text-[11px] leading-5 text-[#7d899d]">
                Thoughtful service and dependable products make shopping easier.
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
