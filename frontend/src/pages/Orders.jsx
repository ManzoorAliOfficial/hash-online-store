import { useMemo } from "react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import Container from "../components/Layout/Container";
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
    <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
      <PageHeading eyebrow="YOUR ACCOUNT" title="My orders">
        <p>Review your order history and current order statuses.</p>
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
          message="Your placed orders will appear here. Live courier tracking requires store integration."
          action="Start shopping"
          to="/products"
        />
      )}
    </Container>
  );
}
