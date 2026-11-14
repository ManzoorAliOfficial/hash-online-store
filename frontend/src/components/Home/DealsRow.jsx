import { useEffect, useMemo, useState } from "react";
import { Clock3, Flame } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../Common/ProductCard";
import Reveal from "../Common/Reveal";
import AccessoriesLink from "../Common/AccessoriesLink";
import { getAccessoryCollectionProducts } from "../../utils/homeCatalog";

function useOfferClock(endAt) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!endAt) return undefined;
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, [endAt]);
  if (!endAt) return null;
  const remaining = Math.max(0, new Date(endAt).getTime() - now);
  const hours = Math.floor(remaining / 3_600_000);
  const minutes = Math.floor((remaining % 3_600_000) / 60_000);
  const seconds = Math.floor((remaining % 60_000) / 1000);
  return { remaining, label: `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` };
}

export default function DealsRow() {
  const { products = [] } = useStore();
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(timer);
  }, []);
  const deals = useMemo(
    () => getAccessoryCollectionProducts(products, "accessory-deals", [], now),
    [products, now],
  );
  const visible = deals.slice(0, 4);
  const nextEnd = useMemo(() => deals.filter((product) => Number(product.stock) > 0).map((product) => product.offerEndsAt).filter((date) => date && Number.isFinite(new Date(date).getTime()) && new Date(date).getTime() > Date.now()).sort((a, b) => new Date(a) - new Date(b))[0] || null, [deals]);
  const clock = useOfferClock(nextEnd);

  if (!deals.length) return null;
  return (
    <section aria-labelledby="home-deals-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 sm:mb-8">
        <div><div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.16em] text-[#f97316]"><Flame size={13} /> Special discounts</div><h2 id="home-deals-heading" className="mt-2 text-2xl font-semibold tracking-tight text-[#0f2347] sm:text-3xl"><Link to="/products?collection=accessory-deals" className="rounded-sm transition-colors hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]">Limited-Time Accessory Deals</Link></h2><p className="mt-2 max-w-xl text-sm leading-6 text-[#64748b]">Discounted audio and accessories from current store pricing.</p></div>
        <div className="flex items-center gap-3">
          {clock?.remaining > 0 && <div className="flex items-center gap-2 rounded-xl bg-[#fff7ed] px-3 py-2 text-[#c2410c]"><Clock3 size={15} /><div><span className="block text-[9px] font-bold uppercase tracking-wider">Offer ends in</span><time className="font-mono text-sm font-bold tabular-nums" dateTime={nextEnd}>{clock.label}</time></div></div>}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
        {visible.map((product, index) => <Reveal key={product.id} index={index} className="min-w-0"><ProductCard product={product} /></Reveal>)}
      </div>
      <AccessoriesLink
        collection="accessory-deals"
        totalCount={deals.length}
        visibleCount={visible.length}
      />
    </section>
  );
}
