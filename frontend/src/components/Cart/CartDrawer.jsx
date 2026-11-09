import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import {
  X,
  ShoppingBag,
  ArrowRight,
  Plus,
  Minus,
  Trash2,
  Truck,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import WhatsAppIcon from "../Common/WhatsAppIcon";
import { buildCartMessage, openWhatsApp } from "../../utils/whatsapp";

const money = (val) => `Rs. ${Number(val || 0).toLocaleString()}`;

export default function CartDrawer() {
  const {
    cart,
    products,
    cartTotals,
    setQty,
    removeFromCart,
    cartDrawerOpen,
    closeCartDrawer,
    settings,
  } = useStore();

  const navigate = useNavigate();
  const drawerRef = useRef(null);

  // Focus trap & Escape key listener
  useEffect(() => {
    if (!cartDrawerOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeCartDrawer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [cartDrawerOpen, closeCartDrawer]);

  if (!cartDrawerOpen) return null;

  const threshold =
    Number(settings.freeDeliveryThreshold) > 0
      ? Number(settings.freeDeliveryThreshold)
      : 5000;

  const subtotal = cartTotals.subtotal || 0;
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));
  const amountNeeded = Math.max(0, threshold - subtotal);
  const hasFreeDelivery = subtotal >= threshold;

  const cartItemsWithDetails = cart
    .map((item) => {
      const product = products.find((p) => p.id === item.id);
      if (!product) return null;
      return { ...item, product };
    })
    .filter(Boolean);

  const handleCheckout = () => {
    closeCartDrawer();
    navigate("/checkout");
  };

  const handleViewCart = () => {
    closeCartDrawer();
    navigate("/cart");
  };

  const handleWhatsAppOrder = () => {
    const msg = buildCartMessage(cartItemsWithDetails, cartTotals);
    closeCartDrawer();
    openWhatsApp(msg, settings?.whatsappNumber);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-xs transition-opacity duration-300"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeCartDrawer();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      <div
        ref={drawerRef}
        className="relative flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#edf0f5] px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-[#2563eb]" />
            <h2 className="text-base font-bold text-[#17233b]">
              Your Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
            </h2>
          </div>
          <button
            type="button"
            onClick={closeCartDrawer}
            className="grid size-9 cursor-pointer place-items-center rounded-lg text-[#64748b] transition hover:bg-[#f1f5f9] hover:text-[#17233b]"
            aria-label="Close cart drawer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Free Delivery Progress Bar */}
        <div className="border-b border-[#edf0f5] bg-[#f8fafd] px-5 py-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-[#17233b]">
              <Truck size={14} className={hasFreeDelivery ? "text-[#16a34a]" : "text-[#f97316]"} />
              {hasFreeDelivery ? (
                <span className="font-bold text-[#16a34a]">You have unlocked FREE Delivery!</span>
              ) : (
                <span>
                  Add <strong className="text-[#f97316]">{money(amountNeeded)}</strong> more for FREE delivery
                </span>
              )}
            </span>
            <span className="text-[11px] font-bold text-[#64748b]">{progressPercent}%</span>
          </div>

          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[#e2e8f0]">
            <div
              className={`h-full rounded-full transition-all duration-500 ease-out ${
                hasFreeDelivery ? "bg-[#16a34a]" : "bg-[#f97316]"
              }`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5">
          {cartItemsWithDetails.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 grid size-16 place-items-center rounded-2xl bg-[#eff4ff] text-[#2563eb]">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-base font-bold text-[#17233b]">Your cart is empty</h3>
              <p className="mt-1 max-w-[240px] text-xs text-[#71809a]">
                Explore our catalog of hand-picked gadgets, audio and accessories.
              </p>
              <button
                type="button"
                onClick={() => {
                  closeCartDrawer();
                  navigate("/products");
                }}
                className="mt-6 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#2563eb] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1d4ed8] active:scale-95"
              >
                <span>Start Shopping</span>
                <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <div className="divide-y divide-[#edf0f5]">
              {cartItemsWithDetails.map(({ id, qty, product }) => {
                const itemTotal = Number(product.price) * qty;
                return (
                  <div key={id} className="flex gap-3.5 py-4 first:pt-0 last:pb-0">
                    {/* Item Image */}
                    <div className="size-20 shrink-0 overflow-hidden rounded-xl border border-[#edf0f5] bg-[#f8fafc]">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        <div className="grid size-full place-items-center text-xs font-bold text-[#94a3b8]">
                          Hash
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <Link
                            to={`/products/${product.id}`}
                            onClick={closeCartDrawer}
                            className="truncate text-xs font-bold text-[#17233b] hover:text-[#2563eb]"
                          >
                            {product.name}
                          </Link>
                          <button
                            type="button"
                            onClick={() => removeFromCart(id)}
                            className="text-[#94a3b8] transition hover:text-[#e5484d]"
                            aria-label={`Remove ${product.name}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <span className="text-[11px] font-semibold text-[#8793a7]">
                          {product.category}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Stepper */}
                        <div className="inline-flex items-center rounded-lg border border-[#e2e8f0] bg-white">
                          <button
                            type="button"
                            onClick={() => setQty(id, qty - 1)}
                            className="grid size-7 cursor-pointer place-items-center text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#17233b]"
                            aria-label="Decrease quantity"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#17233b]">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => setQty(id, qty + 1)}
                            disabled={qty >= product.stock}
                            className="grid size-7 cursor-pointer place-items-center text-[#64748b] transition hover:bg-[#f8fafc] hover:text-[#17233b] disabled:cursor-not-allowed disabled:opacity-40"
                            aria-label="Increase quantity"
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <span className="text-xs font-extrabold text-[#17233b]">
                            {money(itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Summary & Checkout CTA */}
        {cartItemsWithDetails.length > 0 && (
          <div className="border-t border-[#edf0f5] bg-white p-5 shadow-lg">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#64748b]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#17233b]">{money(cartTotals.subtotal)}</span>
              </div>
              {cartTotals.discount > 0 && (
                <div className="flex justify-between text-[#16a34a]">
                  <span>Discount</span>
                  <span className="font-semibold">-{money(cartTotals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-[#64748b]">
                <span>Delivery</span>
                <span className="font-semibold text-[#17233b]">
                  {cartTotals.delivery === 0 ? (
                    <span className="font-bold text-[#16a34a]">FREE</span>
                  ) : (
                    money(cartTotals.delivery)
                  )}
                </span>
              </div>
              <div className="flex items-baseline justify-between border-t border-[#edf0f5] pt-2 text-sm font-extrabold text-[#17233b]">
                <span>Total</span>
                <span className="text-base text-[#2563eb]">{money(cartTotals.total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={handleCheckout}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#f97316] py-3 text-sm font-bold text-white shadow-md transition hover:bg-[#ea580c] active:scale-98"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#20ba59] active:scale-98"
              >
                <WhatsAppIcon className="size-4" />
                <span>Order on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleViewCart}
                className="w-full rounded-xl border border-[#e2e8f0] py-2 text-xs font-bold text-[#475569] transition hover:bg-[#f8fafc] hover:text-[#17233b]"
              >
                View Full Cart
              </button>
            </div>

            <div className="mt-3 flex items-center justify-center gap-2 text-[10px] text-[#94a3b8]">
              <ShieldCheck size={13} className="text-[#16a34a]" />
              <span>Safe & Secure Checkout • Cash on Delivery</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
