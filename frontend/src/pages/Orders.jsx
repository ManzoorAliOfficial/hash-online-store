import { useMemo } from "react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import OrderCard from "../components/Orders/OrderCard";
import EmptyState from "../components/Common/EmptyState";

export default function Orders() {
  const { orders, user } = useStore();

  const customerOrders = useMemo(() => {
    if (user) {
      return orders.filter(
        (o) =>
          o.userId === user.id ||
          (user.email &&
            o.details?.email?.toLowerCase() === user.email.toLowerCase()),
      );
    }
    let guestEmail = null;
    try {
      guestEmail = sessionStorage.getItem("hash-guest-email");
    } catch {
      // ignore
    }
    if (!guestEmail) return [];
    return orders.filter(
      (o) =>
        !o.userId &&
        o.details?.email?.toLowerCase() === guestEmail.toLowerCase(),
    );
  }, [orders, user]);

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
      <PageHeading eyebrow="YOUR ACCOUNT" title="My orders">
        <p>Review your order history and track live shipment statuses.</p>
      </PageHeading>

      {customerOrders.length ? (
        <div className="space-y-3">
          {customerOrders.map((o) => (
            <OrderCard order={o} key={o.id} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No orders yet"
          message="Your placed orders and parcel tracking updates will appear here."
          action="Start shopping"
          to="/products"
        />
      )}
    </main>
  );
}
