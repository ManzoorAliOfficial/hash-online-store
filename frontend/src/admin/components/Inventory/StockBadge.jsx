export default function StockBadge({ stock = 0 }) {
  const quantity = Number(stock || 0);
  const tone = quantity === 0 ? "red" : quantity < 10 ? "amber" : "green";
  const label =
    quantity === 0 ? "Out of stock" : quantity < 10 ? "Low stock" : "In stock";
  return (
    <span
      className={`inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${tone === "red" ? "bg-[#fff1f1] text-[#d14343]" : tone === "amber" ? "bg-[#fff1d9] text-[#a85d00]" : "bg-[#e9f8ed] text-[#16803b]"}`}
    >
      {label} · {quantity}
    </span>
  );
}
