import { useState } from "react";
import { ArrowRight, Check, Copy, Tag } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";
import { PRIMARY_OFFER } from "../../constants/offers";
import { getMobileAccessories } from "../../utils/homeCatalog";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;

export default function PromoBanner() {
  const { products = [], coupons = [] } = useStore();
  const [copied, setCopied] = useState(false);
  const coupon = coupons.find((item) => item.code === PRIMARY_OFFER.code && item.active) || coupons.find((item) => item.active);
  const accessoryProducts = getMobileAccessories(products).filter((product) => product.image);
  const featured = accessoryProducts.find((product) => /earbud|headphone|charger|powercore/i.test(product.name || "")) || accessoryProducts[0];
  const offerLabel = coupon ? coupon.type === "percent" ? `${Number(coupon.value)}% OFF orders over ${money(coupon.minimumOrder)}` : `${money(coupon.value)} OFF orders over ${money(coupon.minimumOrder)}` : "Explore this season's collection";

  const copyCode = async () => {
    if (!coupon?.code) return;
    try {
      await navigator.clipboard.writeText(coupon.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return <section aria-labelledby="home-promo-heading" className="relative isolate overflow-hidden rounded-[26px] bg-[#102449] text-white shadow-[0_18px_40px_-28px_rgba(15,35,71,.65)] sm:rounded-[30px]">
    <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_83%_48%,rgba(42,111,214,.56),transparent_35%),linear-gradient(110deg,#102449,#173e78)]" />
    {featured?.image && <img src={featured.image} alt="" loading="lazy" decoding="async" className="absolute inset-y-0 right-0 -z-10 h-full w-[48%] object-cover opacity-45 mix-blend-luminosity sm:w-[43%]" />}
    <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#102449] via-[#102449]/95 to-transparent" />
    <div className="grid min-h-[245px] items-center gap-4 px-5 py-7 sm:min-h-[270px] sm:px-8 lg:min-h-[290px] lg:grid-cols-[1.15fr_.85fr] lg:px-10">
      <div className="max-w-[600px]">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.15em] text-blue-100"><Tag size={12} /> Special promotional offer</span>
        <h2 id="home-promo-heading" className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">Power your day, wherever it takes you.</h2>
        <p className="mt-2 max-w-lg text-xs leading-5 text-blue-100/80 sm:text-sm">Explore earbuds, chargers and everyday mobile accessories from the current collection.</p>
        {coupon && <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] text-blue-100"><button type="button" onClick={copyCode} className="inline-flex min-h-8 items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-2.5 font-medium text-white hover:bg-white/15"><span>Use code:</span><strong className="font-mono tracking-[.1em]">{coupon.code}</strong>{copied ? <Check size={12} /> : <Copy size={12} />}</button><span>{offerLabel}</span></div>}
        <Link to="/products?collection=mobile-accessories" className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-lg bg-white px-4 text-xs font-bold text-[#102449] transition hover:bg-blue-50">Explore accessories <ArrowRight size={14} /></Link>
      </div>
      {featured && <div className="relative flex h-[150px] items-center justify-center lg:h-full lg:min-h-[190px]"><div className="absolute size-32 rotate-[-7deg] rounded-[24px] bg-[#ffc928] shadow-[0_22px_38px_-20px_rgba(0,0,0,.55)] sm:size-36 lg:size-40" /><img src={featured.image} alt={featured.name} loading="lazy" decoding="async" className="relative z-10 max-h-[145px] max-w-[78%] object-contain drop-shadow-[0_20px_22px_rgba(0,0,0,.4)] lg:max-h-[210px] lg:max-w-[85%]" /><span className="absolute bottom-0 right-0 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold text-[#102449] shadow-lg lg:bottom-5 lg:right-1">{featured.name}</span></div>}
    </div>
    <p role="status" className="sr-only">{copied ? "Offer code copied." : ""}</p>
  </section>;
}
