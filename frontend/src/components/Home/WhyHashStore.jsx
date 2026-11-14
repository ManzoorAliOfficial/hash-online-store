import { BadgeCheck, CreditCard, Headset, Truck } from "lucide-react";
import { Link } from "react-router";

const benefits = [
  { icon: Truck, title: "Pakistan-wide delivery", copy: "Delivery options are available across the country." },
  { icon: BadgeCheck, title: "Clear product details", copy: "Review descriptions, prices and stock before ordering." },
  { icon: CreditCard, title: "Cash on delivery", copy: "Pay for your order when it reaches you." },
  { icon: Headset, title: "Dedicated support", copy: "Reach our team when you need a hand." },
];

export default function WhyHashStore() {
  return <section aria-labelledby="home-trust-heading" className="py-1">
    <div className="mb-6"><p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#2563eb]">✦ &nbsp;The HASH store standard</p><h2 id="home-trust-heading" className="mt-2 text-2xl font-semibold tracking-tight text-[#0f2347] sm:text-3xl">Technology Made Simple. Shopping Made Smarter</h2></div>
    <div className="grid auto-rows-fr gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {benefits.map(({ icon: Icon, title, copy }) => <article key={title} className="flex h-full flex-col rounded-2xl border border-[#e5ebf4] bg-white p-2 sm:p-3"><div className="flex items-center gap-1.5"><span className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#eaf1ff] text-[#2563eb]"><Icon size={18} /></span><h3 className="min-w-0 whitespace-nowrap text-xs font-semibold leading-4 tracking-tight text-[#0f2347]">{title}</h3></div><p className="mt-1 text-xs leading-4 text-[#64748b]">{copy}</p></article>)}
    </div>
    <div className="mt-4 text-right"><Link to="/contact" className="inline-flex items-center gap-2 text-xs font-semibold text-[#2563eb]">Need help? Contact us <Headset size={14} /></Link></div>
  </section>;
}
