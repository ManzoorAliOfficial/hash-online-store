export default function CheckoutSteps({ step = 1 }) {
  return (
    <div className="mb-7 grid grid-cols-3 gap-3">
      {["Shipping", "Payment", "Review"].map((s, i) => (
        <div
          className={`flex items-center gap-2 border-b-2 pb-3 text-xs font-bold ${i + 1 <= step ? "border-[#2563eb] text-[#2563eb]" : "border-[#e4eaf3] text-[#9aa6b8]"}`}
          key={s}
        >
          <b
            className={`grid size-6 place-items-center rounded-full text-[11px] ${i + 1 <= step ? "bg-[#2563eb] text-white" : "bg-[#edf0f5] text-[#71809a]"}`}
          >
            {i + 1}
          </b>
          <span>{s}</span>
        </div>
      ))}
    </div>
  );
}
