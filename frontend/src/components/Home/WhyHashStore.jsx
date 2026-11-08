import { Truck, ShieldCheck, CreditCard, Headphones, Sparkles } from "lucide-react";

const assurances = [
  {
    icon: Truck,
    title: "Express Pakistan Delivery",
    description: "Same-day dispatch in Lahore, Karachi & Islamabad. Fast 2-3 day doorstep delivery nationwide.",
  },
  {
    icon: ShieldCheck,
    title: "100% Genuine & Authentic",
    description: "Every item is 100% original, brand-sealed, and covered by official manufacturer warranty.",
  },
  {
    icon: CreditCard,
    title: "Cash on Delivery & Secure Pay",
    description: "Pay conveniently in cash upon parcel arrival or choose instant, 256-bit encrypted card checkout.",
  },
  {
    icon: Headphones,
    title: "Dedicated Human Support",
    description: "Friendly customer assistance available 7 days a week on WhatsApp and email for any questions.",
  },
];

export default function WhyHashStore() {
  return (
    <section
      aria-label="Why choose Hash Online Store"
      className="mx-auto mb-[78px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
            <Sparkles size={13} className="text-[#2563eb]" />
            <span>THE HASH STORE STANDARD</span>
          </div>
          <h2 className="mt-1.5 text-[28px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Shopping made simple, reliable & fast.
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 max-[1020px]:grid-cols-2 max-[600px]:grid-cols-1 max-[600px]:gap-3">
        {assurances.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className="group flex flex-col justify-between rounded-2xl border border-[#e5ecf6] bg-white p-5 shadow-[0_4px_16px_rgba(23,35,59,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-[0_12px_28px_rgba(37,99,235,0.09)]"
            >
              <div>
                <div className="mb-4 grid size-11 place-items-center rounded-xl bg-[#eff4ff] text-[#2563eb] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2563eb] group-hover:text-white">
                  <Icon size={22} />
                </div>
                <h3 className="mb-2 text-sm font-bold text-[#17233b] transition-colors group-hover:text-[#2563eb]">
                  {item.title}
                </h3>
                <p className="text-xs leading-relaxed text-[#71809a]">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
