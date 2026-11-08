import { ShieldCheck, Truck, PackageOpen } from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import EmptyState from "../components/Common/EmptyState";
import CartItems from "../components/Cart/CartItems";
import CartSummary from "../components/Cart/CartSummary";
import CouponBox from "../components/Cart/CouponBox";

export default function Cart() {
  const { cart } = useStore();
  const totalCount = cart.reduce((s, x) => s + x.qty, 0);

  if (!cart.length) {
    return (
      <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
        <PageHeading eyebrow="YOUR BAG" title="Your cart" />
        <EmptyState
          title="Your cart is empty"
          message="Find something useful in our collection and add it to your cart."
          action="Shop now"
          to="/products"
        />
      </main>
    );
  }

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
      <PageHeading eyebrow="YOUR BAG" title="Your cart">
        <p>
          {totalCount} {totalCount === 1 ? "item" : "items"} ready for checkout.
        </p>
      </PageHeading>

      <div className="mb-6 grid grid-cols-3 rounded-xl border border-[#e4eaf3] bg-white p-4 shadow-[0_4px_16px_rgba(16,36,73,.03)] max-[600px]:grid-cols-1 max-[600px]:gap-3">
        <span className="flex items-center justify-center gap-2 text-xs font-semibold text-[#52617a]">
          <ShieldCheck size={16} className="text-[#2563eb]" /> Secure checkout
        </span>
        <span className="flex items-center justify-center gap-2 text-xs font-semibold text-[#52617a]">
          <Truck size={16} className="text-[#2563eb]" /> Pakistan-wide delivery
        </span>
        <span className="flex items-center justify-center gap-2 text-xs font-semibold text-[#52617a]">
          <PackageOpen size={16} className="text-[#2563eb]" /> Track every order
        </span>
      </div>

      <div className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 max-[850px]:grid-cols-1">
        <div>
          <CartItems />
          <CouponBox />
        </div>
        <CartSummary />
      </div>
    </main>
  );
}
