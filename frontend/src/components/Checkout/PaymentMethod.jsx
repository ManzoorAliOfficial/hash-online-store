import { Banknote, CreditCard } from "lucide-react";

export default function PaymentMethod({ value = "cod", onChange }) {
  return (
    <fieldset className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
      <legend className="mb-4 text-base font-bold text-[#17233b]">
        Payment method
      </legend>
      <div className="grid gap-3">
        <label
          className={`flex cursor-pointer items-start gap-3 rounded-lg border p-3.5 text-xs font-semibold transition ${
            value === "cod"
              ? "border-[#2563eb] bg-[#eff4ff]/40 text-[#17233b]"
              : "border-[#dce5f3] bg-white text-[#34445f] hover:border-[#bfd4ff]"
          }`}
        >
          <input
            type="radio"
            name="paymentMethod"
            className="mt-0.5 size-4 accent-[#2563eb]"
            checked={value === "cod"}
            onChange={() => onChange?.("cod")}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <Banknote size={16} className="text-[#2563eb]" />
              <span>Cash on delivery (COD)</span>
            </div>
            <p className="mt-1 text-[11px] font-normal text-[#8491a5]">
              Pay securely in cash when your package is delivered to your
              doorstep.
            </p>
          </div>
        </label>

        <label className="flex cursor-not-allowed items-start gap-3 rounded-lg border border-[#edf0f5] bg-[#fafbfc] p-3.5 text-xs text-[#8491a5]">
          <input
            type="radio"
            name="paymentMethod"
            disabled
            className="mt-0.5 size-4"
            checked={value === "online"}
            onChange={() => onChange?.("online")}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-[#94a3b8]" />
              <span>Credit / Debit Card / Online Payment</span>
              <span className="rounded-full bg-[#fff1d9] px-2 py-0.5 text-[10px] font-bold text-[#a85d00]">
                Coming soon
              </span>
            </div>
            <p className="mt-1 text-[11px] font-normal text-[#94a3b8]">
              Online payment gateways will be available upon official store
              launch.
            </p>
          </div>
        </label>
      </div>
    </fieldset>
  );
}
