import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router";
import { ArrowLeft, ArrowRight, AudioLines, Pause, Play, Star } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { getMobileAccessories } from "../../utils/homeCatalog";
import Container from "../Layout/Container";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString("en-PK")}`;
const heroBackdropUrl =
  "https://images.unsplash.com/photo-1758578070291-0c22ff555df9?auto=format&fit=crop";

export default function Hero() {
  const { products = [] } = useStore();
  const accessoryProducts = useMemo(
    () => getMobileAccessories(products).filter((product) => product.image),
    [products],
  );
  const slides = useMemo(() => {
    const accessoryPicks = accessoryProducts.filter((product) =>
      /earbud|headphone|charger|powercore|speaker|stand/i.test(product.name || ""),
    );
    const preferred = accessoryPicks.length ? accessoryPicks : accessoryProducts;
    return [...preferred].sort((a, b) => {
      const reviewDifference = Number(b.reviews || 0) - Number(a.reviews || 0);
      return reviewDifference || Number(b.rating || 0) - Number(a.rating || 0);
    }).slice(0, 4);
  }, [accessoryProducts]);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const product = slides[active];
  const prices = accessoryProducts.map((item) => Number(item.price)).filter(Number.isFinite);
  const startingPrice = prices.length ? Math.min(...prices) : Number(product?.price || 0);
  const trending = useMemo(
    () => [...accessoryProducts].sort((a, b) => Number(b.reviews || 0) - Number(a.reviews || 0)).slice(0, 4),
    [accessoryProducts],
  );
  const reviewSummary = useMemo(() => accessoryProducts.reduce((summary, item) => {
    const rating = Number(item.rating);
    const reviews = Number(item.reviews);
    if (rating > 0 && reviews > 0) {
      summary.total += reviews;
      summary.weightedRating += rating * reviews;
    }
    return summary;
  }, { total: 0, weightedRating: 0 }), [accessoryProducts]);
  const secondaryAccessory = accessoryProducts.find((item) => item.id !== product?.id && /earbud|airpods|earphone/i.test(item.name))
    || accessoryProducts.find((item) => item.id !== product?.id);

  useEffect(() => {
    if (paused || slides.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % slides.length), 6000);
    return () => window.clearInterval(timer);
  }, [paused, slides.length]);

  if (!product) {
    return <section className="w-full bg-white">
      <Container className="py-14">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-[#2563eb]">HASH ONLINE STORE</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-[#102449]">Upgrade your everyday<br />experience.</h1>
      <Link to="/products?collection=mobile-accessories" className="mt-6 inline-flex rounded-full bg-[#2563eb] px-5 py-3 text-sm font-bold text-white">Shop accessories</Link>
      </Container>
    </section>;
  }

  const next = () => setActive((current) => (current + 1) % slides.length);
  const previous = () => setActive((current) => (current - 1 + slides.length) % slides.length);
  const featuredHref = "/products?collection=mobile-accessories";

  return <section
    aria-label="Featured products"
    aria-roledescription="carousel"
    className="relative w-full overflow-hidden bg-[#f0f5fc]"
    onMouseEnter={() => setPaused(true)}
    onMouseLeave={() => setPaused(false)}
    onFocus={() => setPaused(true)}
    onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false); }}
  >
    <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
      <img
        src={`${heroBackdropUrl}&w=1920&q=78`}
        srcSet={`${heroBackdropUrl}&w=640&q=72 640w, ${heroBackdropUrl}&w=960&q=74 960w, ${heroBackdropUrl}&w=1440&q=76 1440w, ${heroBackdropUrl}&w=1920&q=78 1920w`}
        sizes="(max-width: 90rem) 100vw, 90rem"
        alt=""
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute left-1/2 top-0 h-full w-full max-w-site -translate-x-1/2 object-cover object-[68%_center] opacity-40"
      />
      <div className="absolute left-1/2 top-0 h-full w-full max-w-site -translate-x-1/2 bg-[linear-gradient(100deg,rgba(245,248,253,.92)_0%,rgba(245,248,253,.78)_46%,rgba(245,248,253,.92)_100%)]" />
    </div>
    <Container className="relative z-10 grid min-h-[440px] items-center gap-1 pb-5 pt-7 sm:min-h-[470px] sm:pb-6 lg:min-h-[390px] lg:grid-cols-[1.1fr_1fr] lg:gap-6 lg:pb-8 lg:pt-4">
      <div className="relative z-10 max-w-[530px]">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#e4ebf5] bg-white/90 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.13em] text-[#2563eb]">
          <span className="size-1.5 shrink-0 rounded-full bg-emerald-500" />
          Mobile accessories for every day
          <span className="font-medium normal-case tracking-normal text-[#64748b]">· &nbsp;From {money(startingPrice)}</span>
        </p>

        <h1 className="mt-4 text-[clamp(2.55rem,5.4vw,4.25rem)] font-semibold leading-[.91] tracking-[-.06em] text-[#17233f] lg:mt-3 lg:text-[2.5rem]">
          <><span className="block">Upgrade your</span><span className="block text-[#2563eb]">everyday experience.</span></>
        </h1>

        <p className="mt-4 max-w-[390px] text-[11px] leading-[1.7] text-[#71809a] sm:text-xs lg:mt-3">
          Explore earbuds, chargers and useful accessories for life on the move.
        </p>

        <div className="mt-4 flex flex-wrap gap-2.5 lg:mt-3">
          <Link to={featuredHref} className="inline-flex min-h-10 items-center gap-2 rounded-lg bg-[#2563eb] px-4 text-[11px] font-bold text-white transition hover:bg-[#1d4ed8]">
            Shop accessories<ArrowRight size={14} />
          </Link>
          <a href="#home-categories" className="inline-flex min-h-10 items-center rounded-lg border border-[#dce5f3] bg-white/85 px-4 text-[11px] font-semibold text-[#334560] hover:border-[#a9c2e8]">
            Explore categories
          </a>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1.5 text-[9px] text-[#64748b] sm:text-[10px] lg:mt-3">
          {(reviewSummary.total > 0 || Number(product.rating) > 0) && <>
            <span className="inline-flex items-center gap-1 font-bold text-[#334560]"><Star size={11} fill="currentColor" className="text-amber-400" />{(reviewSummary.total ? reviewSummary.weightedRating / reviewSummary.total : Number(product.rating)).toFixed(1)}/5 <span className="font-normal text-[#94a3b8]">sample catalog rating</span></span>
            <span className="hidden text-[#cbd5e1] sm:inline">·</span>
            <span className="inline-flex items-center gap-0.5 text-amber-400" aria-label={`${(reviewSummary.total ? reviewSummary.weightedRating / reviewSummary.total : Number(product.rating)).toFixed(1)} out of 5 stars`}>
              {Array.from({ length: 5 }, (_, index) => <Star key={index} size={10} fill="currentColor" />)}
            </span>
            <span className="text-[#94a3b8]">({(reviewSummary.total || Number(product.reviews || 0)).toLocaleString("en-PK")} sample reviews · demo data)</span>
          </>}
          {trending.length > 0 && <>
            <span className="hidden text-[#cbd5e1] sm:inline">·</span>
            <span className="font-semibold text-[#334560]">Trending:</span>
            {trending.map((item, index) => <Link key={item.id} to={`/products/${item.id}`} className={`${index > 2 ? "hidden lg:inline-flex" : "inline-flex"} rounded-full border border-[#e6ebf3] bg-white/85 px-2 py-1 text-[8px] font-medium hover:border-[#bfd3f5] hover:text-[#2563eb]`}>{item.name}</Link>)}
          </>}
        </div>
      </div>

      <div className="relative mx-auto mt-1 flex h-[190px] w-full max-w-[490px] items-center justify-center sm:h-[240px] lg:mt-0 lg:h-[260px] lg:justify-self-center">
        <div className="absolute left-1/2 top-1/2 size-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#dce8fa]/85 sm:size-[235px] lg:size-[270px]" aria-hidden="true" />
        <div className="absolute left-1/2 top-1/2 z-10 h-[158px] w-[126px] -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white sm:h-[205px] sm:w-[165px] lg:h-[238px] lg:w-[190px]" aria-hidden="true" />
        <img key={product.id} src={product.image} alt={product.name} fetchPriority="high" decoding="async" className="relative z-20 h-[158px] w-[126px] rounded-[20px] object-cover motion-safe:animate-zoom-in motion-reduce:animate-none sm:h-[205px] sm:w-[165px] lg:h-[238px] lg:w-[190px]" />

        {secondaryAccessory?.image && <div className="absolute bottom-[4%] right-[14%] z-30 size-[58px] overflow-hidden rounded-full border-[3px] border-white bg-white sm:right-[16%] sm:size-[72px] lg:right-[17%] lg:size-[82px]">
          <img src={secondaryAccessory.image} alt="" loading="lazy" decoding="async" className="size-full object-cover" />
        </div>}

        <div className="absolute right-0 top-0 z-30 flex items-center gap-2 rounded-xl border border-white bg-white/95 px-3 py-2">
          <span className="grid size-6 place-items-center rounded-lg bg-[#eff5ff] text-[#2563eb]"><AudioLines size={13} /></span>
          <span><span className="block text-[7px] font-bold uppercase tracking-wider text-[#2563eb]">Everyday accessories</span><span className="mt-0.5 block text-[9px] font-bold text-[#102449]">From {money(startingPrice)}</span></span>
        </div>
      </div>

      <div className="relative z-30 mt-1 flex items-center justify-between lg:absolute lg:bottom-4 lg:left-12 lg:right-12">
        <span className="text-[9px] font-medium text-[#64748b]">Mobile accessory picks</span>
        <div className="flex items-center gap-1.5">
          <span className="mr-2 hidden text-[9px] font-semibold text-[#334560] sm:inline">{product.name}</span>
          {slides.length > 1 && <>
            <div className="mr-1 flex items-center gap-1" aria-label="Choose featured product">{slides.map((item, index) => <button key={item.id} type="button" onClick={() => setActive(index)} aria-label={`Show ${item.name}`} aria-current={active === index ? "true" : undefined} className={`h-1.5 rounded-full transition-all ${index === active ? "w-5 bg-[#2563eb]" : "w-1.5 bg-[#b8c7dc] hover:bg-[#6e8ebc]"}`} />)}</div>
            <button type="button" onClick={previous} aria-label="Previous slide" className="grid size-7 place-items-center rounded-full border border-[#d7e1ef] bg-white text-[#334560] hover:text-[#2563eb]"><ArrowLeft size={12} /></button>
            <button type="button" onClick={next} aria-label="Next slide" className="grid size-7 place-items-center rounded-full border border-[#d7e1ef] bg-white text-[#334560] hover:text-[#2563eb]"><ArrowRight size={12} /></button>
            <button type="button" onClick={() => setPaused((value) => !value)} aria-label={paused ? "Resume slide autoplay" : "Pause slide autoplay"} className="grid size-7 place-items-center rounded-full border border-[#d7e1ef] bg-white text-[#334560] hover:text-[#2563eb]">{paused ? <Play size={11} /> : <Pause size={11} />}</button>
          </>}
        </div>
      </div>
    </Container>
  </section>;
}
