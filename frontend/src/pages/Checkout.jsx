import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, MapPin } from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import CheckoutSummary from "../components/Checkout/OrderSummary";
import { notify } from "../components/Common/Toast";

const currency = (n) => `Rs. ${Number(n || 0).toLocaleString()}`;

export default function Checkout() {
  const { cart, products, placeOrder, cartTotals, user, addresses } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);

  // Address fields state (auto-populated if user is logged in)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
    address: "",
    city: "",
    postal: "",
    notes: "",
  });

  const userAddresses = addresses.filter(
    (a) => a.userId === (user?.id || "guest"),
  );

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applySavedAddress = (text) => {
    // E.g. "House 12, Street 4, Gulberg, Lahore"
    const parts = text.split(",").map((s) => s.trim());
    if (parts.length >= 2) {
      const city = parts[parts.length - 1];
      const address = parts.slice(0, parts.length - 1).join(", ");
      setFormData((prev) => ({ ...prev, address, city }));
    } else {
      setFormData((prev) => ({ ...prev, address: text }));
    }
    notify("Saved address applied.");
  };

  const items = cart
    .map((x) => ({ ...x, product: products.find((p) => p.id === x.id) }))
    .filter((x) => x.product);

  const submit = (e) => {
    e.preventDefault();
    if (!items.length) {
      notify("Your cart is empty.");
      navigate("/products");
      return;
    }
    setSubmitting(true);
    const details = { ...formData, payment };

    const result = placeOrder(details);
    setSubmitting(false);

    if (result && result.ok && result.order) {
      notify("Order placed successfully!");
      navigate(`/orders/${result.order.id}`);
    } else {
      notify(result?.error || "Unable to place order. Please check stock.");
    }
  };

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
      <PageHeading eyebrow="SECURE CHECKOUT" title="Checkout">
        <p>Review your shipping address and complete your order.</p>
      </PageHeading>

      <CheckoutSteps step={1} />

      <form
        onSubmit={submit}
        className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 max-[850px]:grid-cols-1"
      >
        <section className="space-y-6">
          <div className="rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-base font-bold text-[#17233b]">
                Shipping address
              </h2>
              {userAddresses.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-[#2563eb]">
                  <MapPin size={13} />
                  <span className="font-semibold text-[#52617a]">Saved:</span>
                  {userAddresses.map((addr) => (
                    <button
                      key={addr.id}
                      type="button"
                      onClick={() => applySavedAddress(addr.text)}
                      className="rounded-md border border-[#bfd4ff] bg-[#eff4ff] px-2 py-0.5 text-[11px] font-bold text-[#2563eb] transition hover:bg-[#2563eb] hover:text-white"
                      title={addr.text}
                    >
                      {addr.text.slice(0, 18)}…
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                Full name *
                <input
                  className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="name"
                  value={formData.name}
                  onChange={handleFieldChange}
                  required
                  autoComplete="name"
                  placeholder="Your full name"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                Phone number *
                <input
                  className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="phone"
                  value={formData.phone}
                  onChange={handleFieldChange}
                  required
                  type="tel"
                  autoComplete="tel"
                  placeholder="03XX XXXXXXX"
                />
              </label>
              <label className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f]">
                Email address *
                <input
                  className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
              </label>
              <label className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f]">
                Street address *
                <input
                  className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="address"
                  value={formData.address}
                  onChange={handleFieldChange}
                  required
                  autoComplete="street-address"
                  placeholder="House #, street, block, sector"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                City *
                <input
                  className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="city"
                  value={formData.city}
                  onChange={handleFieldChange}
                  required
                  autoComplete="address-level2"
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                />
              </label>
              <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                Postal code (optional)
                <input
                  className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="postal"
                  value={formData.postal}
                  onChange={handleFieldChange}
                  autoComplete="postal-code"
                  placeholder="e.g. 54000"
                />
              </label>
              <label className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f]">
                Delivery instructions (optional)
                <textarea
                  className="rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 py-2 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="notes"
                  value={formData.notes}
                  onChange={handleFieldChange}
                  rows="2"
                  placeholder="Nearby landmark or delivery preference"
                />
              </label>
            </div>
          </div>

          <PaymentMethod value={payment} onChange={setPayment} />

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc] active:scale-[0.99] disabled:opacity-60"
          >
            {submitting
              ? "Placing order..."
              : `Place order · ${currency(cartTotals.total)}`}{" "}
            <ArrowRight size={16} />
          </button>
        </section>

        <CheckoutSummary items={items} totals={cartTotals} />
      </form>
    </main>
  );
}
