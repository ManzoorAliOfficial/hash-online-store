const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function OrderSummary({ items = [], totals, delivery = 1500 }) {
  const subtotal = totals
    ? totals.subtotal
    : items.reduce((s, x) => s + (x.product?.price || 0) * x.qty, 0);
  const deliveryFee = totals ? totals.delivery : delivery;
  const discount = totals ? totals.discount : 0;
  const total = totals
    ? totals.total
    : Math.max(0, subtotal - discount + deliveryFee);

  return (
    <aside className="h-fit rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.06)]">
      <h2 className="mb-4 text-base font-bold text-[#17233b]">Order summary</h2>
      <div className="mb-4 max-h-[260px] divide-y divide-[#edf0f5] overflow-y-auto pr-1">
        {items.map((x) => (
          <div
            className="flex items-center justify-between gap-3 py-2.5 text-xs text-[#5b6981] first:pt-0 last:pb-0"
            key={x.id}
          >
            <span className="line-clamp-1 flex-1 font-medium text-[#34445f]">
              {x.product?.name}{" "}
              <span className="font-bold text-[#2563eb]">× {x.qty}</span>
            </span>
            <b className="whitespace-nowrap font-semibold text-[#17233b]">
              {money((x.product?.price || 0) * x.qty)}
            </b>
          </div>
        ))}
      </div>

      <div className="space-y-2.5 border-t border-[#edf0f5] pt-3 text-xs">
        <p className="flex justify-between text-[#5b6981]">
          <span>Subtotal</span>
          <b className="font-semibold text-[#34445f]">{money(subtotal)}</b>
        </p>

        {discount > 0 && (
          <p className="flex justify-between font-semibold text-[#16803b]">
            <span>
              Discount {totals?.coupon?.code ? `(${totals.coupon.code})` : ""}
            </span>
            <b>− {money(discount)}</b>
          </p>
        )}

        <p className="flex justify-between text-[#5b6981]">
          <span>Delivery</span>
          <b className="font-semibold text-[#34445f]">
            {deliveryFee ? money(deliveryFee) : "Free"}
          </b>
        </p>
      </div>

      <hr className="my-4 border-[#edf0f5]" />

      <p className="flex items-baseline justify-between text-base font-bold text-[#17233b]">
        <span>Total</span>
        <span className="text-lg text-[#2563eb]">{money(total)}</span>
      </p>
    </aside>
  );
}
