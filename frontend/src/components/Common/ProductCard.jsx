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
  Flame,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import WhatsAppIcon from "./WhatsAppIcon";
import { buildProductMessage, openWhatsApp } from "../../utils/whatsapp";

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
  const { addToCart, toggleWishlist, wishlist, cart, settings } = useStore();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  if (!product) return null;

  const Icon = icons[product.icon] || ShoppingBag;
  const saved = wishlist.includes(product.id);
  const quantity = cart.find((item) => item.id === product.id)?.qty || 0;
  const stockCount = Number(product.stock || 0);
  const isOutOfStock = stockCount <= 0;
  const available = stockCount > quantity && !isOutOfStock;
  const isLowStock = stockCount > 0 && stockCount <= 10;

  const hasDiscount = Number(product.oldPrice) > Number(product.price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(product.oldPrice) - Number(product.price)) /
          Number(product.oldPrice)) *
          100,
      )
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (available) {
      addToCart(product.id, 1, true);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (addToCart(product.id, 1, false)) {
      navigate("/checkout");
    }
  };

  const handleWhatsAppOrder = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    const msg = buildProductMessage(product, 1);
    openWhatsApp(msg, settings?.whatsappNumber);
  };

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#edf0f5] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#cbd9f1] hover:shadow-[0_14px_30px_rgba(16,36,73,0.1)]">
      {/* 4/5 Aspect Ratio Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#f8fafc]">
        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
          className="relative block size-full"
        >
          {/* Skeleton while loading */}
          {!imageLoaded && !imageFailed && (
            <div
              className="absolute inset-0 animate-pulse bg-[#eef2f8]"
              aria-hidden="true"
            />
          )}

          {product.image && !imageFailed ? (
            <img
              className={`size-full object-cover transition-all duration-300 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <div className="grid size-full place-items-center bg-[#f1f5f9]">
              <Icon
                className="size-16 text-[#203d70]/40 transition-transform duration-300 group-hover:scale-105"
                aria-hidden="true"
              />
            </div>
          )}
        </Link>

        {/* Out of Stock Overlay */}
        {isOutOfStock && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/45 backdrop-blur-[1px]">
            <span className="rounded-lg bg-white/95 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#17233b] shadow-md">
              Out of Stock
            </span>
          </div>
        )}

        {/* Top Badges (Discount / Stock Status) */}
        <div className="absolute left-2.5 top-2.5 z-10 flex flex-col gap-1 pointer-events-none">
          {hasDiscount && (
            <span className="inline-flex items-center rounded-md bg-[#f97316] px-2 py-0.5 text-[10px] sm:text-[11px] font-black text-white shadow-xs">
              -{discountPercent}%
            </span>
          )}
          {isLowStock && !isOutOfStock && (
            <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/95 px-2 py-0.5 text-[10px] font-bold text-white shadow-xs backdrop-blur-xs">
              <Flame size={11} /> Only {stockCount} left
            </span>
          )}
          {!hasDiscount && !isLowStock && product.badge && (
            <span className="inline-flex items-center rounded-md border border-[#dbe7ff] bg-white/95 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#2563eb] shadow-xs backdrop-blur-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Wishlist Button (Stays Top-Right) */}
        <button
          type="button"
          className={`absolute right-2.5 top-2.5 z-10 grid size-8.5 cursor-pointer place-items-center rounded-lg border border-[#e8eff9] bg-white/95 shadow-xs backdrop-blur-xs transition-all duration-200 hover:scale-105 hover:border-[#cbd9f1] active:scale-95 ${
            saved
              ? "text-[#e5484d]"
              : "text-[#66758e] hover:text-[#e5484d]"
          }`}
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
        >
          <Heart size={16} fill={saved ? "currentColor" : "none"} />
        </button>

        {/* Desktop Quick actions slide-up on hover */}
        {!isOutOfStock && (
          <div className="pointer-events-none absolute inset-x-2.5 bottom-2.5 z-10 hidden sm:flex items-center gap-1.5 translate-y-3 opacity-0 transition-all duration-250 ease-out group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={!available}
              className="inline-flex flex-1 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-[#f97316] py-2 px-2 text-xs font-bold text-white shadow-lg transition-all hover:bg-[#ea580c] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <ShoppingBag size={14} className="shrink-0" />
              <span className="truncate">{available ? "Add to Cart" : "In Cart"}</span>
            </button>
            <button
              type="button"
              onClick={handleWhatsAppOrder}
              disabled={isOutOfStock}
              title={isOutOfStock ? "Out of stock" : "Order on WhatsApp"}
              aria-label="Order on WhatsApp"
              className="grid size-8.5 shrink-0 cursor-pointer place-items-center rounded-xl bg-[#25D366] text-white shadow-lg transition-all hover:bg-[#20ba59] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <WhatsAppIcon className="size-4" />
            </button>
          </div>
        )}
      </div>

      {/* Card Body Info */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        {/* Category */}
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#8793a7]">
          <span>{product.category}</span>
          {isLowStock && !isOutOfStock && (
            <span className="text-[#f97316] font-extrabold sm:hidden">
              Only {stockCount} left
            </span>
          )}
        </div>

        {/* Product Title */}
        <h3 className="my-1.5 line-clamp-1 text-xs sm:text-[13px] font-bold text-[#17233b]">
          <Link
            className="transition hover:text-[#2563eb]"
            to={`/products/${product.id}`}
          >
            {product.name}
          </Link>
        </h3>

        {/* Rating and Reviews */}
        <div
          className="flex items-center gap-1.5 text-[11px] text-[#f3a522]"
          aria-label={`${product.rating || 0} out of 5 stars`}
        >
          <div className="flex items-center gap-0.5">
            <Star size={12} fill="currentColor" />
            <b className="font-bold text-[#17233b]">
              {Number(product.rating || 0).toFixed(1)}
            </b>
          </div>
          <span className="text-[10px] text-[#98a2b2]">
            ({Number(product.reviews || 0)})
          </span>
        </div>

        {/* Price & Strikethrough */}
        <div className="my-2 flex flex-wrap items-baseline gap-2">
          <strong className="text-sm sm:text-base font-extrabold text-[#17233b]">
            {money(product.price)}
          </strong>
          {hasDiscount && (
            <del className="text-xs text-[#a3adbb]">
              {money(product.oldPrice)}
            </del>
          )}
        </div>

        {/* Stock warning status */}
        {!available && !isOutOfStock && (
          <small className="mb-2 block text-[10px] font-semibold text-[#d14343]">
            Limit reached in cart
          </small>
        )}

        {/* Bottom CTA Buttons (Primary Orange Add to Cart on mobile, Shop Now option) */}
        <div className="mt-auto pt-1">
          <div className="grid grid-cols-2 gap-1.5 sm:hidden">
            <button
              type="button"
              className="inline-flex h-8.5 cursor-pointer items-center justify-center gap-1 rounded-lg bg-[#f97316] px-1 text-[11px] font-bold text-white shadow-xs transition hover:bg-[#ea580c] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!available}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={13} className="shrink-0" />
              <span className="truncate">Add</span>
            </button>
            <button
              type="button"
              className="inline-flex h-8.5 cursor-pointer items-center justify-center gap-1 rounded-lg border border-[#dbe7ff] bg-[#eff4ff] px-1 text-[11px] font-bold text-[#2563eb] transition hover:bg-[#dce9ff] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!available}
              onClick={handleBuyNow}
            >
              <span className="truncate">Buy</span>
              <ArrowRight size={13} className="shrink-0" />
            </button>
          </div>

          <div className="hidden sm:grid sm:grid-cols-2 gap-2">
            <button
              type="button"
              className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-[#f97316] px-2 text-[11px] font-bold text-white shadow-2xs transition hover:bg-[#ea580c] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!available}
              onClick={handleAddToCart}
            >
              <ShoppingBag size={13} className="shrink-0" />
              <span className="truncate">Add to Cart</span>
            </button>
            <button
              type="button"
              className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#dbe7ff] bg-[#eff4ff] px-2 text-[11px] font-bold text-[#2563eb] transition hover:bg-[#dce9ff] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={!available}
              onClick={handleBuyNow}
            >
              <span className="truncate">Buy Now</span>
              <ArrowRight size={13} className="shrink-0" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
