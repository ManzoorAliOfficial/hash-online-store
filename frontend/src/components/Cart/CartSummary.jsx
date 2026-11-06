import { Link } from "react-router";
import { ArrowRight, ShieldCheck, Tag } from "lucide-react";
import { useStore } from "../../context/StoreContext";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function CartSummary() {
  const { cartTotals } = useStore();

  return (
    <aside className="h-fit rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.06)]">
      <h2 className="mb-4 text-base font-bold text-[#17233b]">Order summary</h2>

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
            {cartTotals.delivery ? money(cartTotals.delivery) : "Free"}
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

      <div className="mt-5">
        <Link
          className="group inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white transition duration-200 hover:bg-[#174fcc] active:scale-[0.99]"
          to="/checkout"
        >
          Proceed to checkout
          <ArrowRight
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
        <p className="mt-3.5 flex items-center justify-center gap-1.5 text-[11px] font-medium text-[#71809a]">
          <ShieldCheck className="text-[#16803b]" size={14} /> 100% Secure
          Checkout Guaranteed
        </p>
      </div>
    </aside>
  );
}
