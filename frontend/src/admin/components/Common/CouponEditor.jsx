import { useState } from "react";

export default function CouponEditor({ onCreate = () => {} }) {
  const [open, setOpen] = useState(false);
  if (!open)
    return (
      <button
        className="inline-flex min-h-9 items-center justify-center rounded-lg bg-[#2563eb] px-3 text-xs font-bold text-white hover:bg-[#174fcc]"
        type="button"
        onClick={() => setOpen(true)}
      >
        Add coupon
      </button>
    );
  return (
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const data = Object.fromEntries(new FormData(event.currentTarget));
        onCreate({
          ...data,
          value: Number(data.value),
          minimumOrder: Number(data.minimumOrder || 0),
          active: true,
        });
        setOpen(false);
      }}
    >
      <input
        className="h-10 rounded-lg border border-[#dce5f3] px-3 text-xs outline-none focus:border-[#2563eb]"
        name="code"
        required
        placeholder="Coupon code"
        aria-label="Coupon code"
      />
      <input
        className="h-10 rounded-lg border border-[#dce5f3] px-3 text-xs outline-none focus:border-[#2563eb]"
        name="value"
        type="number"
        min="1"
        required
        placeholder="Discount"
        aria-label="Discount"
      />
      <button className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#2563eb] px-3 text-xs font-bold text-white hover:bg-[#174fcc]">
        Save coupon
      </button>
      <button
        className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#dce5f3] px-3 text-xs font-bold text-[#52617a] hover:bg-[#f4f7fc]"
        type="button"
        onClick={() => setOpen(false)}
      >
        Cancel
      </button>
    </form>
  );
}
