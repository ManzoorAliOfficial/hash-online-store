const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function OrderSummary({ order }) {
  if (!order) return null;
  const items = order.items || [];

  return (
    <aside className="h-fit rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.06)]">
      <h2 className="mb-4 text-base font-bold text-[#17233b]">
        Payment summary
      </h2>

      <div className="mb-4 max-h-[260px] divide-y divide-[#edf0f5] overflow-y-auto pr-1">
        {items.map((item) => (
          <div
            className="flex items-center justify-between gap-3 py-2.5 text-xs text-[#5b6981] first:pt-0 last:pb-0"
            key={item.id}
          >
            <span className="line-clamp-1 flex-1 font-medium text-[#34445f]">
              {item.product?.name || "Product"}{" "}
              <span className="font-bold text-[#2563eb]">× {item.qty}</span>
            </span>
            <b className="whitespace-nowrap font-semibold text-[#17233b]">
              {money((item.product?.price || 0) * item.qty)}
            </b>
          </div>
        ))}
      </div>

      <div className="space-y-2.5 border-t border-[#edf0f5] pt-3 text-xs">
        <p className="flex justify-between text-[#5b6981]">
          <span>Subtotal</span>
          <b className="font-semibold text-[#34445f]">
            {money(order.subtotal)}
          </b>
        </p>

        {order.discount > 0 && (
          <p className="flex justify-between font-semibold text-[#16803b]">
            <span>Discount {order.coupon ? `(${order.coupon})` : ""}</span>
            <b>− {money(order.discount)}</b>
          </p>
        )}

        <p className="flex justify-between text-[#5b6981]">
          <span>Delivery</span>
          <b className="font-semibold text-[#34445f]">
            {order.delivery ? money(order.delivery) : "Free"}
          </b>
        </p>
      </div>

      <hr className="my-4 border-[#edf0f5]" />

      <p className="flex items-baseline justify-between text-base font-bold text-[#17233b]">
        <span>Total Paid</span>
        <span className="text-lg font-bold text-[#2563eb]">
          {money(order.total)}
        </span>
      </p>

      {order.details?.payment && (
        <div className="mt-4 rounded-lg bg-[#f8fafd] p-2.5 text-center text-[11px] font-semibold text-[#52617a]">
          Payment Method:{" "}
          <span className="text-[#17233b]">
            {order.details.payment === "cod"
              ? "Cash on Delivery (COD)"
              : "Online Payment"}
          </span>
        </div>
      )}
    </aside>
  );
}
