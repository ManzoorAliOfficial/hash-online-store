import { useParams, Link } from "react-router";
import { Calendar, MapPin, Package } from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import Container from "../components/Layout/Container";
import EmptyState from "../components/Common/EmptyState";
import OrderTimeline from "../components/Orders/OrderTimeline";
import TrackingStatus from "../components/Orders/TrackingStatus";
import OrderSummary from "../components/Orders/OrderSummary";

const currency = (n) => `Rs. ${Number(n || 0).toLocaleString()}`;
const formatDate = (val) => {
  if (!val) return "—";
  try {
    return new Date(val).toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return String(val);
  }
};

export default function OrderDetails() {
  const { id } = useParams();
  const { orders, user } = useStore();
  const foundOrder = orders.find((item) => item.id === id);
  let guestEmail = "";
  if (!user) {
    try {
      guestEmail = sessionStorage.getItem("hash-guest-email") || "";
    } catch {
      // Guest order access is unavailable when session storage is blocked.
    }
  }
  const orderIsVisible =
    foundOrder &&
    (user?.role === "admin" ||
      (user &&
        (foundOrder.userId === user.id ||
          (user.email &&
            foundOrder.details?.email?.toLowerCase() ===
              user.email.toLowerCase()))) ||
      (!user &&
        !foundOrder.userId &&
        guestEmail &&
        foundOrder.details?.email?.toLowerCase() === guestEmail.toLowerCase()));
  const order = orderIsVisible ? foundOrder : null;

  return (
    <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
      <PageHeading
        eyebrow="ORDER TRACKING"
        title={order ? `Order #${order.id}` : "Order not found"}
      />

      {order ? (
        <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 max-[850px]:grid-cols-1">
          <section className="space-y-6">
            <div className="rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0f5] pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#8491a5]">
                      Current status:
                    </span>
                    <TrackingStatus status={order.status} />
                  </div>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-[#52617a]">
                    <Calendar size={13} className="text-[#8491a5]" />
                    Placed on {formatDate(order.date)}
                  </p>
                </div>
              </div>

              <OrderTimeline status={order.status} />

              <div className="mt-6 border-t border-[#edf0f5] pt-5">
                <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#34445f]">
                  Purchased Items ({order.items.reduce((s, i) => s + i.qty, 0)})
                </h3>
                <div className="divide-y divide-[#edf0f5]">
                  {order.items.map((x) => (
                    <div
                      className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0"
                      key={x.id}
                    >
                      <div className="flex items-center gap-3">
                        <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg bg-[#f4f7fc]">
                          {x.product?.image ? (
                            <img
                              src={x.product.image}
                              alt={x.product.name}
                              className="size-full object-contain p-1"
                            />
                          ) : (
                            <Package size={20} className="text-[#203d70]" />
                          )}
                        </div>
                        <div>
                          <Link
                            to={`/products/${x.id}`}
                            className="line-clamp-1 text-xs font-bold text-[#17233b] hover:text-[#2563eb]"
                          >
                            {x.product?.name || "Product"}
                          </Link>
                          <small className="text-[11px] text-[#8491a5]">
                            Qty: <b className="text-[#17233b]">{x.qty}</b> ×{" "}
                            {currency(x.product?.price)}
                          </small>
                        </div>
                      </div>
                      <b className="whitespace-nowrap text-xs font-bold text-[#17233b]">
                        {currency((x.product?.price || 0) * x.qty)}
                      </b>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#34445f]">
                <MapPin size={14} className="text-[#2563eb]" /> Shipping Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-xs text-[#52617a] max-[600px]:grid-cols-1">
                <div>
                  <span className="block text-[11px] text-[#8491a5]">
                    Recipient
                  </span>
                  <b className="text-[#17233b]">
                    {order.details?.name || "Guest Customer"}
                  </b>
                </div>
                <div>
                  <span className="block text-[11px] text-[#8491a5]">
                    Contact
                  </span>
                  <span className="text-[#17233b]">
                    {order.details?.phone || "—"} ·{" "}
                    {order.details?.email || "—"}
                  </span>
                </div>
                <div className="col-span-full">
                  <span className="block text-[11px] text-[#8491a5]">
                    Delivery Address
                  </span>
                  <span className="text-[#17233b]">
                    {order.details?.address || "—"}
                    {order.details?.city ? `, ${order.details.city}` : ""}
                    {order.details?.postal ? ` (${order.details.postal})` : ""}
                  </span>
                </div>
                {order.details?.notes && (
                  <div className="col-span-full">
                    <span className="block text-[11px] text-[#8491a5]">
                      Delivery Notes
                    </span>
                    <span className="italic text-[#17233b]">
                      {order.details.notes}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </section>

          <OrderSummary order={order} />
        </div>
      ) : (
        <EmptyState
          title="Order not found"
          message="We could not find an order matching that identifier."
          action="Back to my orders"
          to="/orders"
        />
      )}
    </Container>
  );
}
