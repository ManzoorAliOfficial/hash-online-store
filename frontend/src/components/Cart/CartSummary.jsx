import { Link } from "react-router";
import { ArrowRight, ShieldCheck, Tag, Truck } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import WhatsAppIcon from "../Common/WhatsAppIcon";
import { buildCartMessage, openWhatsApp } from "../../utils/whatsapp";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function CartSummary() {
  const { cart, products, cartTotals, settings } = useStore();

  const threshold =
    Number(settings.freeDeliveryThreshold) > 0
      ? Number(settings.freeDeliveryThreshold)
      : 5000;

  const subtotal = cartTotals.subtotal || 0;
  const progressPercent = Math.min(100, Math.round((subtotal / threshold) * 100));
  const amountNeeded = Math.max(0, threshold - subtotal);
  const hasFreeDelivery = subtotal >= threshold;

  const isCartEmpty = !cart || cart.length === 0;

  const handleWhatsAppCartOrder = () => {
    if (isCartEmpty) return;
    const itemsWithProduct = cart
      .map((item) => ({
        ...item,
        product: products.find((p) => p.id === item.id),
      }))
      .filter((x) => x.product);

    const message = buildCartMessage(itemsWithProduct, cartTotals);
    openWhatsApp(message, settings?.whatsappNumber);
  };

  return (
    <aside className="h-fit rounded-2xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.06)]">
      <h2 className="mb-4 text-base font-bold text-[#17233b]">Order summary</h2>

      {/* Free Delivery Progress Bar */}
      <div className="mb-5 rounded-xl border border-[#edf0f5] bg-[#f8fafd] p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="flex items-center gap-1.5 font-semibold text-[#17233b]">
            <Truck
              size={14}
              className={hasFreeDelivery ? "text-[#16a34a]" : "text-[#f97316]"}
            />
            {hasFreeDelivery ? (
              <span className="font-bold text-[#16a34a]">
                FREE Delivery unlocked!
              </span>
            ) : (
              <span>
                Add <strong className="text-[#f97316]">{money(amountNeeded)}</strong> for FREE delivery
              </span>
            )}
          </span>
          <span className="text-[11px] font-bold text-[#64748b]">
            {progressPercent}%
          </span>
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

      <div className="space-y-3 text-xs">
        <p className="flex justify-between text-[#5b6981]">
          <span>Subtotal</span>
          <b className="font-semibold text-[#34445f]">
            {money(cartTotals.subtotal)}
          </b>
        </p>

        {cartTotals.discount > 0 && (
          <p className="flex justify-between font-semibold text-[#16803b]">
            <span className="flex items-center gap-1">
              <Tag size={12} /> Discount{" "}
              {cartTotals.coupon?.code ? `(${cartTotals.coupon.code})` : ""}
            </span>
            <b>− {money(cartTotals.discount)}</b>
          </p>
        )}

        <p className="flex justify-between text-[#5b6981]">
          <span>Delivery</span>
          <b className="font-semibold text-[#34445f]">
            {cartTotals.delivery === 0 ? (
              <span className="font-bold text-[#16a34a]">FREE</span>
            ) : (
              money(cartTotals.delivery)
            )}
          </b>
        </p>
      </div>

      <hr className="my-4 border-[#edf0f5]" />

      <p className="flex items-baseline justify-between text-base font-bold text-[#17233b]">
        <span>Total</span>
        <span className="text-xl font-extrabold text-[#2563eb]">
          {money(cartTotals.total)}
        </span>
      </p>

      <div className="mt-5 space-y-2.5">
        <Link
          className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-xl bg-[#f97316] px-4 text-xs font-bold text-white shadow-md transition duration-200 hover:bg-[#ea580c] active:scale-[0.98]"
          to="/checkout"
        >
          <span>Proceed to checkout</span>
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>

        {/* Order on WhatsApp Button */}
        <button
          type="button"
          disabled={isCartEmpty}
          onClick={handleWhatsAppCartOrder}
          title={
            isCartEmpty
              ? "Your cart is currently empty"
              : "Order all items in cart directly via WhatsApp"
          }
          aria-label="Order on WhatsApp"
          className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 text-xs font-bold text-white shadow-md transition duration-200 hover:bg-[#20ba59] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2"
        >
          <WhatsAppIcon className="size-4.5" />
          <span>Order on WhatsApp</span>
        </button>

        <p className="pt-2 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#71809a]">
          <ShieldCheck className="text-[#16803b]" size={14} /> 100% Secure
          Checkout Guaranteed
        </p>
      </div>
    </aside>
  );
}
