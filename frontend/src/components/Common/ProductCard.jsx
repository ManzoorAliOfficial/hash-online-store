import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Gamepad2,
  Cable,
  Star,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

const icons = {
  phone: Smartphone,
  audio: Headphones,
  laptop: Laptop,
  watch: Watch,
  gaming: Gamepad2,
  accessory: Cable,
};
const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, cart } = useStore();
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);
  if (!product) return null;
  const Icon = icons[product.icon] || ShoppingBag;
  const saved = wishlist.includes(product.id);
  const quantity = cart.find((item) => item.id === product.id)?.qty || 0;
  const available = Number(product.stock || 0) > quantity;
  const hasDiscount = Number(product.oldPrice) > Number(product.price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.oldPrice) - Number(product.price)) /
          Number(product.oldPrice)) *
          100,
      )
    : 0;
  const buyNow = () => {
    if (addToCart(product.id)) navigate("/checkout");
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-[#edf0f5] bg-white transition-all duration-200 hover:-translate-y-1 hover:border-[#bfd4ff] hover:shadow-[0_14px_30px_rgba(16,36,73,0.08)]">
      <div className="relative grid h-[180px] w-full place-items-center overflow-hidden bg-[#f8fafc]">
        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
          className="grid size-full place-items-center"
        >
          {product.image && !imageFailed ? (
            <img
              className="h-full w-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <Icon
              className="size-[82px] text-[#203d70] drop-shadow-[0_12px_10px_#17233b17] transition-transform duration-300 group-hover:scale-105"
              aria-hidden="true"
            />
          )}
        </Link>
        {hasDiscount ? (
          <span className="absolute left-2.5 top-2.5 inline-flex h-9 items-center justify-center rounded-lg border border-[#d2f0da] bg-[#e9f8ed] px-2.5 text-[11px] font-bold tracking-wide text-[#16803b] shadow-xs">
            {discountPercent}% OFF
          </span>
        ) : product.badge ? (
          <span className="absolute left-2.5 top-2.5 inline-flex h-9 items-center justify-center rounded-lg border border-[#dbe7ff] bg-white/95 px-2.5 text-[10px] font-bold tracking-wider uppercase text-[#2563eb] shadow-xs backdrop-blur-xs">
            {product.badge}
          </span>
        ) : null}
        <button
          type="button"
          className={`absolute right-2.5 top-2.5 grid size-9 cursor-pointer place-items-center rounded-lg border border-[#e8eff9] bg-white shadow-xs transition hover:scale-105 hover:border-[#cbd9f1] active:scale-95 ${saved ? "text-[#e5484d]" : "text-[#66758e] hover:text-[#e5484d]"}`}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={() => toggleWishlist(product.id)}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-[14px]">
        <small className="text-[10px] font-bold uppercase tracking-wider text-[#8793a7]">
          {product.category}
        </small>
        <h3 className="my-[6px] line-clamp-1 text-[13px] font-bold text-[#17233b]">
          <Link
            className="transition hover:text-[#2563eb]"
            to={`/products/${product.id}`}
          >
            {product.name}
          </Link>
        </h3>
        <div
          className="flex items-center gap-1 text-[11px] text-[#f3a522]"
          aria-label={`${product.rating || 0} out of 5 stars`}
        >
          <Star size={13} fill="currentColor" />
          <b>{Number(product.rating || 0).toFixed(1)}</b>
          <span className="text-[#98a2b2]">
            ({Number(product.reviews || 0)})
          </span>
        </div>
        <div className="my-2.5 flex items-baseline gap-[7px]">
          <strong className="text-[14px] font-bold text-[#17233b]">
            {money(product.price)}
          </strong>
          {Number(product.oldPrice) > Number(product.price) && (
            <del className="text-[11px] text-[#a3adbb]">
              {money(product.oldPrice)}
            </del>
          )}
        </div>
        {!available && (
          <small className="mb-2 block text-[10px] font-semibold text-[#d14343]">
            {product.stock ? "Stock limit reached" : "Out of stock"}
          </small>
        )}
        <div className="mt-auto grid grid-cols-2 gap-2 pt-2">
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#dbe7ff] bg-[#eff4ff] px-2 text-[11px] font-bold text-[#2563eb] transition hover:bg-[#dce9ff] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!available}
            onClick={() => addToCart(product.id)}
          >
            <ShoppingBag size={13} className="shrink-0" />
            <span className="truncate">Add to Cart</span>
          </button>
          <button
            type="button"
            className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#2563eb] px-2 text-[11px] font-bold text-white transition hover:bg-[#174fcc] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={!available}
            onClick={buyNow}
          >
            <span className="truncate">Shop Now</span>
            <ArrowRight size={13} className="shrink-0" />
          </button>
        </div>
      </div>
    </article>
  );
}
