const statuses = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned",
];
export default function OrderStatusSelect({
  value = "Pending",
  onChange = () => {},
}) {
  return (
    <select
      className="h-8 rounded-md border border-[#dce5f3] bg-white px-2 text-[11px] font-semibold text-[#34445f] outline-none focus:border-[#2563eb]"
      aria-label="Order status"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {statuses.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
