import { useState } from "react";
import { Tag, CheckCircle, AlertCircle } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function CouponBox() {
  const { applyCoupon, removeCoupon, appliedCoupon, cartTotals } = useStore();
  const [code, setCode] = useState(appliedCoupon || "");
  const [status, setStatus] = useState(null); // { ok: boolean, message: string }

  const submit = (event) => {
    event.preventDefault();
    if (!code.trim()) return;
    const result = applyCoupon(code);
    setStatus(result);
  };

  const clear = () => {
    removeCoupon();
    setCode("");
    setStatus({ ok: true, message: "Coupon removed." });
  };

  return (
    <form
      className="mt-4 rounded-xl border border-[#e4eaf3] bg-white p-4 shadow-[0_4px_16px_rgba(16,36,73,.03)]"
      onSubmit={submit}
    >
      <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold text-[#17233b]">
        <Tag size={14} className="text-[#2563eb]" />
        <span>Have a discount coupon?</span>
      </div>

      <div className="flex gap-2">
        <input
          className="h-10 min-w-0 flex-1 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs uppercase font-semibold text-[#17233b] tracking-wider outline-none transition focus:border-[#2563eb] focus:bg-white"
          value={code}
          onChange={(event) => setCode(event.target.value.toUpperCase())}
          placeholder="e.g. WELCOME10"
          aria-label="Coupon code"
        />
        {appliedCoupon ? (
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center rounded-lg border border-[#ffcaca] bg-[#fff4f4] px-4 text-xs font-bold text-[#d14343] transition hover:bg-[#ffebeb]"
            onClick={clear}
          >
            Remove
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex h-10 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white transition hover:bg-[#174fcc]"
          >
            Apply
          </button>
        )}
      </div>

      {(status?.message || (cartTotals.coupon && appliedCoupon)) && (
        <span
          className={`mt-2.5 flex items-center gap-1.5 text-[11px] font-semibold ${
            status
              ? status.ok
                ? "text-[#16803b]"
                : "text-[#d14343]"
              : "text-[#16803b]"
          }`}
          role="status"
        >
          {status ? (
            status.ok ? (
              <CheckCircle size={13} />
            ) : (
              <AlertCircle size={13} />
            )
          ) : (
            <CheckCircle size={13} />
          )}
          {status?.message || `${appliedCoupon} is applied to your order`}
        </span>
      )}
    </form>
  );
}
