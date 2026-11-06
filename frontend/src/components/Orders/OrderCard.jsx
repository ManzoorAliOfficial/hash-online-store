import { Link } from "react-router";
import Badge from "../Common/Badge";
import { ArrowRight } from "lucide-react";

const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;
const formatDate = (value) => {
  if (!value) return "—";
  try {
    return new Date(value).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(value);
  }
};

export default function OrderCard({ order }) {
  if (!order) return null;
  const count = (order.items || []).reduce(
    (sum, item) => sum + Number(item.qty || 0),
    0,
  );

  return (
    <Link
      className="group mb-3 flex items-center justify-between gap-4 rounded-xl border border-[#e4eaf3] bg-white p-4 shadow-[0_4px_16px_rgba(16,36,73,.03)] transition duration-200 hover:-translate-y-0.5 hover:border-[#bfd4ff] hover:shadow-[0_8px_24px_rgba(16,36,73,.08)] max-[600px]:flex-col max-[600px]:items-stretch max-[600px]:gap-3"
      to={`/orders/${order.id}`}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2.5">
          <b className="truncate text-sm font-bold text-[#17233b] group-hover:text-[#2563eb]">
            Order #{order.id}
          </b>
          <Badge status={order.status} />
        </div>
        <small className="mt-1 block text-[11px] text-[#8491a5]">
          {formatDate(order.date)} · {count} item{count === 1 ? "" : "s"}
        </small>
      </div>

      <div className="flex items-center justify-between gap-4 max-[600px]:border-t max-[600px]:border-[#edf0f5] max-[600px]:pt-2.5">
        <b className="text-sm font-bold text-[#17233b]">{money(order.total)}</b>
        <span className="grid size-7 place-items-center rounded-lg text-[#2563eb] transition group-hover:bg-[#eff4ff] group-hover:translate-x-0.5">
          <ArrowRight size={16} />
        </span>
      </div>
    </Link>
  );
}
