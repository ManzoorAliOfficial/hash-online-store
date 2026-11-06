import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function ProductInfo({ product }) {
  const { addToCart } = useStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const inStock = Number(product.stock || 0) > 0;
  const maxQty = Math.max(1, Number(product.stock || 1));

  const increment = () => setQty((prev) => Math.min(maxQty, prev + 1));
  const decrement = () => setQty((prev) => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    if (addToCart(product.id, qty)) {
      setQty(1);
    }
  };

  const handleBuyNow = () => {
    if (addToCart(product.id, qty)) {
      navigate("/checkout");
    }
  };

  return (
    <section className="flex flex-col">
      <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">
        {product.category}
      </span>
      <h1 className="mt-2 text-[32px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-[26px]">
        {product.name}
      </h1>

      <div className="mt-3 flex items-center gap-2 text-xs">
        <div
          className="flex items-center gap-1 text-[#f3a522]"
          aria-label={`${product.rating || 0} out of 5 stars`}
        >
          <Star size={16} fill="currentColor" />
          <b className="font-bold text-[#17233b]">
            {Number(product.rating || 0).toFixed(1)}
          </b>
        </div>
        <span className="text-[#8491a5]">·</span>
        <span className="text-[#8491a5] font-medium">
          ({product.reviews || 0} verified customer reviews)
        </span>
      </div>

      <div className="my-5 flex items-baseline gap-3">
        <strong className="text-2xl font-extrabold text-[#17233b]">
          {money(product.price)}
        </strong>
        {Number(product.oldPrice) > Number(product.price) && (
          <del className="text-sm font-medium text-[#a3adbb]">
            {money(product.oldPrice)}
          </del>
        )}
      </div>

      <p className="text-sm leading-7 text-[#71809a]">{product.description}</p>

      <div className="my-4 flex items-center gap-2">
        {inStock ? (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9f8ed] px-3 py-1 text-xs font-bold text-[#16803b]">
            <CheckCircle size={14} /> In Stock ({product.stock} available)
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#fff1f1] px-3 py-1 text-xs font-bold text-[#d14343]">
            <AlertCircle size={14} /> Currently Out of Stock
          </span>
        )}
      </div>

      {inStock && (
        <div className="mb-5 flex items-center gap-3">
          <span className="text-xs font-bold text-[#34445f]">Quantity:</span>
          <div className="flex h-10 items-center rounded-lg border border-[#dce5f3] bg-white">
            <button
              type="button"
              className="grid size-9 place-items-center text-[#52617a] transition hover:text-[#2563eb] disabled:opacity-30"
              onClick={decrement}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-9 text-center text-xs font-bold text-[#17233b]">
              {qty}
            </span>
            <button
              type="button"
              className="grid size-9 place-items-center text-[#52617a] transition hover:text-[#2563eb] disabled:opacity-30"
              onClick={increment}
              disabled={qty >= maxQty}
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-2.5 sm:grid-cols-2">
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#eff4ff] px-5 text-xs font-bold text-[#2563eb] transition hover:bg-[#dce9ff] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingBag size={16} /> Add to Cart
        </button>
        <button
          type="button"
          className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
          disabled={!inStock}
          onClick={handleBuyNow}
        >
          Shop Now <ArrowRight size={16} />
        </button>
      </div>

      <Link
        className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174fcc]"
        to="/products"
      >
        ← Continue shopping
      </Link>
    </section>
  );
}
