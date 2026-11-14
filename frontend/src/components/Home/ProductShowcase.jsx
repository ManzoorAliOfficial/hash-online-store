import { useEffect, useMemo, useState } from "react";
import { ArrowRight, Eye, Star, X } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";
import ProductCard from "../Common/ProductCard";
import Reveal from "../Common/Reveal";
import AccessoriesLink from "../Common/AccessoriesLink";
import {
  getAccessoryCollectionProducts,
  getProductCreationTime,
  getMobileAccessories,
} from "../../utils/homeCatalog";

const tabs = ["Best Sellers", "Handpicked", "New Arrivals"];

function QuickView({ product, onClose }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  useEffect(() => {
    if (!product) return undefined;
    const handleKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [product, onClose]);
  if (!product) return null;
  const saved = wishlist.includes(product.id);
  const outOfStock = Number(product.stock) <= 0;
  return <div className="fixed inset-0 z-[80] grid place-items-center bg-[#071a3d]/55 p-4 backdrop-blur-sm motion-safe:animate-fade-in motion-reduce:animate-none" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section role="dialog" aria-modal="true" aria-labelledby="quick-view-title" className="relative grid max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl motion-safe:animate-zoom-in motion-reduce:animate-none sm:grid-cols-2">
      <button type="button" onClick={onClose} aria-label="Close quick view" className="absolute right-3 top-3 z-10 grid size-10 place-items-center rounded-full bg-white/90 text-[#334155] shadow-sm"><X size={18} /></button>
      <div className="grid min-h-[260px] place-items-center bg-[#f4f7fc] p-6 sm:min-h-[420px]">{product.image && <img src={product.image} alt={product.name} className="max-h-[360px] max-w-full object-contain" />}</div>
      <div className="flex flex-col justify-center p-6 sm:p-8"><p className="text-xs font-bold uppercase tracking-[.16em] text-[#2563eb]">{product.category}</p><h2 id="quick-view-title" className="mt-3 text-2xl font-semibold tracking-tight text-[#0f2347]">{product.name}</h2>{product.rating > 0 && <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-[#475569]"><Star size={15} fill="currentColor" className="text-amber-400" /> {Number(product.rating).toFixed(1)} <span className="text-[#94a3b8]">({product.reviews || 0} reviews)</span></p>}<p className="mt-5 text-sm leading-6 text-[#64748b]">{product.description || "Explore product details and availability."}</p><div className="mt-7 grid gap-3"><button type="button" disabled={outOfStock} onClick={() => { addToCart(product.id, 1, true); onClose(); }} className="min-h-12 rounded-xl bg-[#2563eb] px-5 text-sm font-bold text-white hover:bg-[#1d4ed8] disabled:bg-slate-300">{outOfStock ? "Out of stock" : "Add to Cart"}</button><button type="button" onClick={() => toggleWishlist(product.id)} aria-pressed={saved} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-[#dbe3ef] text-sm font-semibold text-[#334155] hover:border-[#b8cae8]">{saved ? "Saved to wishlist" : "Add to wishlist"}</button><Link to={`/products/${product.id}`} onClick={onClose} className="pt-1 text-center text-sm font-semibold text-[#2563eb]">View full product details</Link></div></div>
    </section>
  </div>;
}

export default function ProductShowcase() {
  const { products = [], orders = [] } = useStore();
  const [activeTab, setActiveTab] = useState("Best Sellers");
  const [quickProduct, setQuickProduct] = useState(null);
  const accessories = useMemo(() => getMobileAccessories(products), [products]);
  const bestSellers = useMemo(
    () => getAccessoryCollectionProducts(products, "best-selling-accessories", orders),
    [products, orders],
  );
  const popular = useMemo(
    () => getAccessoryCollectionProducts(products, "popular-accessories", orders),
    [products, orders],
  );
  const hasSalesData = bestSellers.length > 0;
  const hasHandpicked = accessories.some((product) => Boolean(product.featured));
  const hasDatedArrivals = accessories.some(
    (product) => getProductCreationTime(product) !== null,
  );
  const visibleTabs = tabs.filter((tab) =>
    tab === "Best Sellers" ||
    (tab === "Handpicked" && hasHandpicked) ||
    (tab === "New Arrivals" && hasDatedArrivals),
  );
  const selected = useMemo(() => {
    if (activeTab === "Best Sellers") return hasSalesData ? bestSellers : popular;
    if (activeTab === "New Arrivals") {
      return accessories
        .filter((product) => getProductCreationTime(product) !== null)
        .sort((a, b) => getProductCreationTime(b) - getProductCreationTime(a));
    }
    if (activeTab === "Handpicked") {
      return getAccessoryCollectionProducts(products, "featured-accessories", orders);
    }
    return hasSalesData ? bestSellers : popular;
  }, [activeTab, accessories, bestSellers, popular, products, orders, hasSalesData]);
  const visible = selected.slice(0, 8);
  const collection = activeTab === "Handpicked"
    ? "featured-accessories"
    : activeTab === "New Arrivals"
      ? "new-arrivals-accessories"
      : hasSalesData ? "best-selling-accessories" : "popular-accessories";
  const sectionTitle = activeTab === "Best Sellers"
    ? hasSalesData ? "Best Selling Mobile Accessories" : "Popular Mobile Accessories"
    : activeTab === "Handpicked"
      ? "Handpicked Mobile Accessories"
      : "New Mobile Accessories";
  if (!visible.length) return null;

  return <section aria-labelledby="home-featured-heading">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-[#e2e8f0] pb-4 sm:mb-7">
      <div><p className="text-[11px] font-bold uppercase tracking-[.18em] text-[#2563eb]">Customer favorites</p><h2 id="home-featured-heading" className="mt-2 text-2xl font-semibold tracking-tight text-[#0f2347] sm:text-3xl"><Link to={`/products?collection=${collection}`} className="rounded-sm transition-colors hover:text-[#2563eb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb]">{sectionTitle}</Link></h2><p className="mt-2 text-sm text-[#64748b]">{activeTab === "Best Sellers" ? hasSalesData ? "Ranked from store order data." : "Audio, charging and wearable accessories from the current catalog." : activeTab === "Handpicked" ? "Selected accessories from the store catalog." : "Recently added accessories from the current catalog."}</p></div>
      <div className="flex w-full gap-2 overflow-x-auto pt-1 sm:w-auto sm:pt-0" role="group" aria-label="Featured product collections">
        {visibleTabs.map((tab) => <button key={tab} type="button" aria-pressed={activeTab === tab} onClick={() => setActiveTab(tab)} className={`inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-[11px] font-bold transition ${activeTab === tab ? "bg-[#2563eb] text-white shadow-sm" : "border border-[#e2e8f0] bg-white text-[#52617a] hover:border-[#b9cdf4] hover:text-[#2563eb]"}`}>
          {tab === "Best Sellers" ? <Star size={13} /> : tab === "New Arrivals" ? <ArrowRight size={13} /> : <span aria-hidden="true">✦</span>}{tab === "Best Sellers" && !hasSalesData ? "Popular" : tab}
        </button>)}
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
      {visible.map((product, index) => <Reveal as="div" index={index} key={product.id} className="group/quick relative min-w-0"><ProductCard product={product} /><button type="button" onClick={() => setQuickProduct(product)} aria-label={`Quick view ${product.name}`} title="Quick view" className="absolute right-3 top-12 z-10 grid size-9 place-items-center rounded-full border border-white/80 bg-white/95 text-[#334155] shadow-md transition-colors duration-200 hover:bg-[#2563eb] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 md:opacity-0 md:group-hover/quick:opacity-100 md:focus-visible:opacity-100"><Eye size={16} /></button></Reveal>)}
    </div>
    <AccessoriesLink
      collection={collection}
      totalCount={selected.length}
      visibleCount={visible.length}
    />
    <QuickView product={quickProduct} onClose={() => setQuickProduct(null)} />
  </section>;
}
