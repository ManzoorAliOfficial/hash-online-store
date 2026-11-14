import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { useStore } from "../../context/StoreContext";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlist, cart } = useStore();
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [wishlistAnimation, setWishlistAnimation] = useState(0);

  if (!product) return null;

  const saved = wishlist.includes(product.id);
  const inCartQty = cart.find((item) => item.id === product.id)?.qty || 0;
  const stock = Number(product.stock || 0);
  const isOutOfStock = stock <= 0;
  const canAdd = !isOutOfStock && stock > inCartQty;

  const price = Number(product.price || 0);
  const oldPrice = Number(product.oldPrice || 0);
  const hasDiscount = oldPrice > price;
  const discountPercent = hasDiscount
    ? Math.round(((oldPrice - price) / oldPrice) * 100)
    : 0;

  const badge = hasDiscount ? `-${discountPercent}%` : product.badge;

  const handleAdd = (event) => {
    event.preventDefault();
    if (canAdd) addToCart(product.id, 1, true);
  };

  const handleBuyNow = () => {
    if (canAdd && addToCart(product.id, 1, false)) navigate("/checkout");
  };

  const buttonLabel = isOutOfStock
    ? "Out of Stock"
    : canAdd
      ? "Add to Cart"
      : "Max in Cart";

  return (
    <article className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-square w-full overflow-hidden bg-[#f6f8fb]">
        <Link
          to={`/products/${product.id}`}
          aria-label={`View ${product.name}`}
          className="block size-full"
        >
          {product.image && !imageLoaded && !imageFailed && (
            <div
              className="absolute inset-0 bg-[linear-gradient(90deg,#e5e7eb_25%,#f3f4f6_50%,#e5e7eb_75%)] bg-[length:200%_100%] motion-safe:animate-shimmer motion-reduce:animate-none"
              aria-hidden="true"
            />
          )}

          {product.image && !imageFailed ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              decoding="async"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageFailed(true)}
              className={`size-full object-cover transition-[opacity,transform] duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100 ${imageLoaded ? "opacity-100" : "opacity-0"} ${isOutOfStock ? "opacity-50 grayscale" : ""}`}
            />
          ) : (
            <div className="grid size-full place-items-center text-[#b6c2d6]">
              <ShoppingBag className="size-12" aria-hidden="true" />
            </div>
          )}
        </Link>

        {badge && (
          <span
            className={`pointer-events-none absolute left-2.5 top-2.5 z-10 rounded-md px-2 py-1 text-[11px] font-bold leading-none ${
              hasDiscount
                ? "bg-accent text-white"
                : "bg-white text-brand shadow-sm"
            }`}
          >
            {badge}
          </span>
        )}

        {!isOutOfStock && stock > 0 && stock <= 5 && (
          <span className="pointer-events-none absolute left-2.5 top-10 z-10 rounded-md bg-[#fff7ed] px-2 py-1 text-[9px] font-bold text-[#c2410c] shadow-sm">
            Only {stock} left
          </span>
        )}

        {isOutOfStock && (
          <div className="pointer-events-none absolute inset-0 z-[5] grid place-items-center bg-[#0f172a]/20">
            <span className="rounded-md bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-[.08em] text-[#334155] shadow-sm">
              OUT OF STOCK
            </span>
          </div>
        )}

        <button
          type="button"
          aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={saved}
          onClick={(event) => {
            event.preventDefault();
            toggleWishlist(product.id);
              setWishlistAnimation((count) => count + 1);
          }}
          className="absolute right-2.5 top-2.5 z-10 grid size-8 place-items-center rounded-full bg-white/90 text-[#e5484d] shadow-sm transition-colors duration-200 hover:text-[#be123c] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
        >
          <Heart key={wishlistAnimation} size={15} fill={saved ? "currentColor" : "none"} className={wishlistAnimation ? "motion-safe:animate-pop motion-reduce:animate-none" : ""} />
        </button>

      </div>

      <div className="flex flex-1 flex-col gap-0.5 px-2.5 pb-2.5 pt-2.5 sm:px-3 sm:pb-3">
        <span className="text-[10px] font-medium text-[#5b6b85]">
          {product.category}
        </span>

        <h3 className="line-clamp-2 text-sm font-semibold leading-4 text-[#17233b]">
          <Link
            to={`/products/${product.id}`}
            className="transition-colors duration-200 hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          >
            {product.name}
          </Link>
        </h3>

        <div className="mt-1 flex flex-wrap items-baseline gap-x-2">
          <strong className="text-base font-bold text-[#071a3d]">
            {money(price)}
          </strong>
          {hasDiscount && (
            <del className="text-xs text-[#687891]">{money(oldPrice)}</del>
          )}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-1.5 md:grid-cols-2">
          <button
            type="button"
            onClick={handleAdd}
            disabled={!canAdd}
            className="inline-flex h-10 w-full items-center justify-center gap-1 whitespace-nowrap rounded-xl bg-accent px-1.5 text-[11px] font-semibold text-white transition-colors duration-200 hover:bg-accent-hover active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:cursor-not-allowed disabled:bg-[#e6ebf3] disabled:text-[#5b6b85] disabled:active:scale-100 min-[1100px]:px-2 min-[1100px]:text-xs"
          >
            {canAdd && <ShoppingBag size={14} />}
            <span>{buttonLabel}</span>
          </button>
          <button
            type="button"
            onClick={handleBuyNow}
            disabled={!canAdd}
            className="hidden h-10 items-center justify-center whitespace-nowrap rounded-xl bg-[#eff4ff] px-2 text-[12px] font-semibold text-brand transition-colors duration-200 hover:bg-[#dce9ff] active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50 disabled:cursor-not-allowed disabled:bg-[#f1f3f6] disabled:text-[#94a3b8] sm:text-[13px] md:inline-flex"
          >
            <span className="hidden min-[1100px]:inline">Buy Now</span>
            <span className="min-[1100px]:hidden">Buy</span>
          </button>
        </div>
      </div>
    </article>
  );
}
