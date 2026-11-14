import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ArrowRight,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  CheckCircle,
  AlertCircle,
  Check,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import WhatsAppIcon from "../Common/WhatsAppIcon";
import { buildProductMessage, openWhatsApp } from "../../utils/whatsapp";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

const defaultColors = [
  { name: "Space Gray", hex: "#4b5563" },
  { name: "Silver", hex: "#e2e8f0" },
  { name: "Midnight Blue", hex: "#1e3a8a" },
];

const defaultStorage = [
  { label: "128 GB", offset: 0 },
  { label: "256 GB", offset: 25000 },
  { label: "512 GB", offset: 55000 },
];

export default function ProductInfo({ product }) {
  const { addToCart, settings } = useStore();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [selectedColor, setSelectedColor] = useState(defaultColors[0].name);
  const [selectedStorage, setSelectedStorage] = useState(defaultStorage[0]);

  if (!product) return null;

  const isTechItem =
    product.category === "Phones" || product.category === "Laptops";
  const effectivePrice = isTechItem
    ? product.price + selectedStorage.offset
    : product.price;

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

  const handleWhatsAppOrder = () => {
    if (!inStock) return;
    const msg = buildProductMessage(product, qty, {
      price: effectivePrice,
      color: selectedColor,
      storage: isTechItem ? selectedStorage.label : null,
    });
    openWhatsApp(msg, settings?.whatsappNumber);
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
          ({product.reviews || 0} review entries in the demo catalog)
        </span>
      </div>

      <div className="my-3 flex items-baseline gap-3">
        <strong className="text-2xl font-extrabold text-[#17233b]">
          {money(effectivePrice)}
        </strong>
        {Number(product.oldPrice) > Number(product.price) && (
          <del className="text-sm font-medium text-[#a3adbb]">
            {money(product.oldPrice + (isTechItem ? selectedStorage.offset : 0))}
          </del>
        )}
      </div>

      {/* Color Swatches */}
      <div className="mt-3 border-t border-[#edf0f5] pt-3">
        <div className="mb-2 flex items-center justify-between text-xs font-bold text-[#34445f]">
          <span>Color: <span className="font-normal text-[#71809a]">{selectedColor}</span></span>
        </div>
        <div className="flex items-center gap-2.5">
          {defaultColors.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setSelectedColor(c.name)}
              className={`relative grid size-8 place-items-center rounded-full border-2 transition-all ${
                selectedColor === c.name
                  ? "border-[#2563eb] scale-110 shadow-xs"
                  : "border-transparent hover:scale-105"
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
              aria-label={c.name}
            >
              {selectedColor === c.name && (
                <Check
                  size={14}
                  className={c.name === "Silver" ? "text-gray-800" : "text-white"}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Storage / Configuration (for Tech items) */}
      {isTechItem && (
        <div className="mt-3">
          <div className="mb-2 text-xs font-bold text-[#34445f]">
            Configuration / Storage:
          </div>
          <div className="flex flex-wrap gap-2">
            {defaultStorage.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => setSelectedStorage(opt)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-bold transition ${
                  selectedStorage.label === opt.label
                    ? "border-[#2563eb] bg-[#eff4ff] text-[#2563eb]"
                    : "border-[#dce5f3] bg-white text-[#52617a] hover:border-[#bfd4ff]"
                }`}
              >
                {opt.label}
                {opt.offset > 0 && ` (+${money(opt.offset)})`}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="my-3 flex items-center gap-2">
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
        <div className="mb-4 flex items-center gap-3">
          <span className="text-xs font-bold text-[#34445f]">Quantity:</span>
          <div className="flex h-10 items-center rounded-lg border border-[#dce5f3] bg-white">
            <button
              type="button"
              className="grid size-9 cursor-pointer place-items-center text-[#52617a] transition hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30"
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
              className="grid size-9 cursor-pointer place-items-center text-[#52617a] transition hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30"
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
          className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#f97316] px-3 text-sm font-bold text-white transition hover:bg-[#ea580c] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          <ShoppingBag className="shrink-0" size={17} /> Add to Cart
        </button>
        <button
          type="button"
          className="inline-flex min-h-[44px] cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-[#2563eb] px-3 text-sm font-bold text-white transition hover:bg-[#1d4ed8] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
          disabled={!inStock}
          onClick={handleBuyNow}
        >
          Buy Now <ArrowRight size={17} />
        </button>
      </div>

      {/* WhatsApp Quick Order CTA */}
      <div className="mt-2">
        <button
          type="button"
          disabled={!inStock}
          onClick={handleWhatsAppOrder}
          title={
            inStock
              ? "Order directly on WhatsApp"
              : "This product is currently out of stock"
          }
          aria-label="Order on WhatsApp"
          className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-[#25D366] px-5 text-sm font-bold text-white transition duration-200 hover:bg-[#20ba59] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          <WhatsAppIcon className="size-5" />
          <span>Order on WhatsApp</span>
        </button>
      </div>
    </section>
  );
}
