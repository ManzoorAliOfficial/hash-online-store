import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  ArrowRight,
  MapPin,
  CheckCircle2,
  Package,
  Truck,
  Copy,
  Check,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import CheckoutSteps from "../components/Checkout/CheckoutSteps";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import CheckoutSummary from "../components/Checkout/OrderSummary";
import { notify } from "../components/Common/Toast";

const currency = (n) => `Rs. ${Number(n || 0).toLocaleString()}`;

// Pakistani mobile format: 03XX-XXXXXXX or 03XXXXXXXXX or +923XXXXXXXXX
const PK_PHONE_REGEX = /^((\+92)|(0092)|(92)|0)?(3[0-9]{2})[- ]?([0-9]{7})$/;

export default function Checkout() {
  const { cart, products, placeOrder, cartTotals, user, addresses } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  // Address fields state
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: "",
    email: user?.email || "",
    address: "",
    city: "",
    postal: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const userAddresses = addresses.filter(
    (a) => a.userId === (user?.id || "guest"),
  );

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear inline error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const applySavedAddress = (text) => {
    const parts = text.split(",").map((s) => s.trim());
    if (parts.length >= 2) {
      const city = parts[parts.length - 1];
      const address = parts.slice(0, parts.length - 1).join(", ");
      setFormData((prev) => ({ ...prev, address, city }));
    } else {
      setFormData((prev) => ({ ...prev, address: text }));
    }
    setErrors((prev) => ({ ...prev, address: "", city: "" }));
    notify("Saved address applied.");
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required";
    }

    const cleanPhone = formData.phone.trim();
    if (!cleanPhone) {
      newErrors.phone = "Phone number is required";
    } else if (!PK_PHONE_REGEX.test(cleanPhone)) {
      newErrors.phone =
        "Enter a valid Pakistani mobile number (e.g. 0300-1234567 or 03001234567)";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Street address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required (e.g. Lahore, Karachi, Islamabad)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const items = cart
    .map((x) => ({ ...x, product: products.find((p) => p.id === x.id) }))
    .filter((x) => x.product);

  const submit = (e) => {
    e.preventDefault();

    if (!validate()) {
      notify("Please fill all required fields correctly.");
      return;
    }

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
      if (formData.email) {
        try {
          sessionStorage.setItem(
            "hash-guest-email",
            formData.email.trim().toLowerCase(),
          );
        } catch {
          // ignore if sessionStorage is unavailable
        }
      }
      setPlacedOrder(result.order);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      notify(result?.error || "Unable to place order. Please check stock.");
    }
  };

  const handleCopyOrderId = () => {
    if (!placedOrder?.id) return;
    navigator.clipboard.writeText(placedOrder.id);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  // ORDER SUCCESS SCREEN
  if (placedOrder) {
    return (
      <main className="mx-auto min-h-[60vh] w-full max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="overflow-hidden rounded-3xl border border-[#e2e8f0] bg-white p-6 sm:p-10 shadow-xl text-center">
          {/* Animated Green Checkmark */}
          <div className="mx-auto mb-6 relative flex size-20 items-center justify-center rounded-full bg-[#e9f8ed] text-[#16a34a] shadow-inner">
            <div className="absolute inset-0 rounded-full bg-[#16a34a]/15 animate-ping" />
            <CheckCircle2 size={44} className="relative z-10 animate-bounce" strokeWidth={2.5} />
          </div>

          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e9f8ed] px-3.5 py-1 text-xs font-bold text-[#16a34a]">
            Order Confirmed
          </span>

          <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#17233b]">
            Thank you for your order!
          </h1>
          <p className="mt-2 text-xs sm:text-sm text-[#64748b] max-w-md mx-auto">
            We have received your order and are dispatching it with express courier service.
          </p>

          {/* Order ID Pill */}
          <div className="my-6 inline-flex items-center gap-3 rounded-2xl border border-[#dce5f3] bg-[#f8fafd] px-4 py-2.5">
            <span className="text-xs font-semibold text-[#64748b]">Order ID:</span>
            <code className="text-sm font-extrabold text-[#17233b]">
              #{placedOrder.id}
            </code>
            <button
              type="button"
              onClick={handleCopyOrderId}
              className="inline-flex cursor-pointer items-center gap-1 rounded-md bg-white border border-[#cbd5e1] px-2 py-0.5 text-[11px] font-bold text-[#475569] hover:bg-[#eff4ff] hover:text-[#2563eb]"
              title="Copy Order ID"
            >
              {copiedId ? (
                <>
                  <Check size={12} className="text-[#16a34a]" /> Copied
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </button>
          </div>

          {/* Delivery & Address Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left my-6">
            <div className="rounded-2xl border border-[#edf0f5] bg-[#fafbfc] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#17233b] mb-1">
                <Truck size={15} className="text-[#2563eb]" /> Estimated Delivery
              </div>
              <p className="text-xs text-[#64748b]">
                2 - 3 Business Days via Express Courier
              </p>
              <span className="mt-2 inline-block text-[11px] font-semibold text-[#16a34a]">
                Doorstep Delivery across Pakistan
              </span>
            </div>

            <div className="rounded-2xl border border-[#edf0f5] bg-[#fafbfc] p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#17233b] mb-1">
                <MapPin size={15} className="text-[#2563eb]" /> Shipping Details
              </div>
              <p className="text-xs text-[#17233b] font-semibold">
                {placedOrder.customerName || formData.name}
              </p>
              <p className="text-xs text-[#64748b] truncate">
                {placedOrder.shippingAddress || formData.address}, {placedOrder.city || formData.city}
              </p>
              <p className="text-[11px] text-[#64748b]">
                Phone: {placedOrder.phone || formData.phone}
              </p>
            </div>
          </div>

          {/* Summary Box */}
          <div className="rounded-2xl border border-[#edf0f5] bg-[#f8fafd] p-4 sm:p-5 text-left mb-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#64748b] mb-3">
              Order Summary ({placedOrder.items?.length || 0} items)
            </h3>
            <div className="divide-y divide-[#edf0f5]">
              {(placedOrder.items || []).map((it, idx) => (
                <div key={idx} className="flex justify-between items-center py-2 text-xs">
                  <span className="text-[#334155] font-medium truncate max-w-[240px]">
                    {it.product?.name || `Product #${it.id}`} × {it.qty}
                  </span>
                  <span className="font-bold text-[#17233b]">
                    {currency(Number(it.product?.price || 0) * Number(it.qty))}
                  </span>
                </div>
              ))}
            </div>
            <div className="border-t border-[#e2e8f0] mt-3 pt-3 flex justify-between items-baseline text-sm font-extrabold text-[#17233b]">
              <span>Total Paid / Payable</span>
              <span className="text-base text-[#2563eb]">{currency(placedOrder.total)}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to={`/orders/${placedOrder.id}`}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#1d4ed8] active:scale-95"
            >
              <Package size={15} />
              <span>Track Order Live</span>
            </Link>
            <Link
              to="/products"
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-xl border border-[#cbd5e1] bg-white px-6 py-3 text-xs font-bold text-[#334155] transition hover:bg-[#f8fafc] active:scale-95"
            >
              <ShoppingBag size={15} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // STANDARD CHECKOUT FORM
  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
      <PageHeading eyebrow="SECURE CHECKOUT" title="Checkout">
        <p>Review your shipping address and complete your order.</p>
      </PageHeading>

      <CheckoutSteps step={1} />

      <form
        onSubmit={submit}
        noValidate
        className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 max-[850px]:grid-cols-1"
      >
        <section className="space-y-6">
          <div className="rounded-2xl border border-[#e4eaf3] bg-white p-5 sm:p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
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
              {/* Full Name */}
              <div className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                <label htmlFor="checkout-name">Full name *</label>
                <input
                  id="checkout-name"
                  className={`h-10 rounded-lg border bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:bg-white ${
                    errors.name
                      ? "border-[#ef4444] focus:border-[#ef4444] bg-[#fef2f2]"
                      : "border-[#dce5f3] focus:border-[#2563eb]"
                  }`}
                  name="name"
                  value={formData.name}
                  onChange={handleFieldChange}
                  required
                  autoComplete="name"
                  placeholder="e.g. Muhammad Ali"
                />
                {errors.name && (
                  <span className="flex items-center gap-1 text-[11px] text-[#ef4444]">
                    <AlertCircle size={12} /> {errors.name}
                  </span>
                )}
              </div>

              {/* Pakistani Phone */}
              <div className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                <label htmlFor="checkout-phone">Phone number * (Pakistani Mobile)</label>
                <input
                  id="checkout-phone"
                  className={`h-10 rounded-lg border bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:bg-white ${
                    errors.phone
                      ? "border-[#ef4444] focus:border-[#ef4444] bg-[#fef2f2]"
                      : "border-[#dce5f3] focus:border-[#2563eb]"
                  }`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleFieldChange}
                  required
                  type="tel"
                  autoComplete="tel"
                  placeholder="0300-1234567"
                />
                {errors.phone ? (
                  <span className="flex items-center gap-1 text-[11px] text-[#ef4444]">
                    <AlertCircle size={12} /> {errors.phone}
                  </span>
                ) : (
                  <span className="text-[10px] text-[#8491a5]">
                    Format: 03XX-XXXXXXX (used for courier delivery SMS & call)
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f]">
                <label htmlFor="checkout-email">Email address *</label>
                <input
                  id="checkout-email"
                  className={`h-10 rounded-lg border bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:bg-white ${
                    errors.email
                      ? "border-[#ef4444] focus:border-[#ef4444] bg-[#fef2f2]"
                      : "border-[#dce5f3] focus:border-[#2563eb]"
                  }`}
                  name="email"
                  value={formData.email}
                  onChange={handleFieldChange}
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                />
                {errors.email && (
                  <span className="flex items-center gap-1 text-[11px] text-[#ef4444]">
                    <AlertCircle size={12} /> {errors.email}
                  </span>
                )}
              </div>

              {/* Street Address */}
              <div className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f]">
                <label htmlFor="checkout-address">Street address *</label>
                <input
                  id="checkout-address"
                  className={`h-10 rounded-lg border bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:bg-white ${
                    errors.address
                      ? "border-[#ef4444] focus:border-[#ef4444] bg-[#fef2f2]"
                      : "border-[#dce5f3] focus:border-[#2563eb]"
                  }`}
                  name="address"
                  value={formData.address}
                  onChange={handleFieldChange}
                  required
                  autoComplete="street-address"
                  placeholder="House #, Street #, Sector / Block, Area"
                />
                {errors.address && (
                  <span className="flex items-center gap-1 text-[11px] text-[#ef4444]">
                    <AlertCircle size={12} /> {errors.address}
                  </span>
                )}
              </div>

              {/* City */}
              <div className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                <label htmlFor="checkout-city">City *</label>
                <input
                  id="checkout-city"
                  className={`h-10 rounded-lg border bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:bg-white ${
                    errors.city
                      ? "border-[#ef4444] focus:border-[#ef4444] bg-[#fef2f2]"
                      : "border-[#dce5f3] focus:border-[#2563eb]"
                  }`}
                  name="city"
                  value={formData.city}
                  onChange={handleFieldChange}
                  required
                  autoComplete="address-level2"
                  placeholder="e.g. Lahore, Karachi, Islamabad"
                />
                {errors.city && (
                  <span className="flex items-center gap-1 text-[11px] text-[#ef4444]">
                    <AlertCircle size={12} /> {errors.city}
                  </span>
                )}
              </div>

              {/* Postal code */}
              <div className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                <label htmlFor="checkout-postal">Postal code (optional)</label>
                <input
                  id="checkout-postal"
                  className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="postal"
                  value={formData.postal}
                  onChange={handleFieldChange}
                  autoComplete="postal-code"
                  placeholder="e.g. 54000"
                />
              </div>

              {/* Notes */}
              <div className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f]">
                <label htmlFor="checkout-notes">Delivery instructions (optional)</label>
                <textarea
                  id="checkout-notes"
                  className="rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 py-2 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="notes"
                  value={formData.notes}
                  onChange={handleFieldChange}
                  rows="2"
                  placeholder="Nearby landmark or preferred delivery time"
                />
              </div>
            </div>
          </div>

          <PaymentMethod value={payment} onChange={setPayment} />

          {/* Place Order Button in Orange Accent */}
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#f97316] px-5 text-sm font-bold text-white shadow-md transition hover:bg-[#ea580c] active:scale-[0.98] disabled:opacity-60"
          >
            {submitting
              ? "Placing order..."
              : `Confirm Order · ${currency(cartTotals.total)}`}{" "}
            <ArrowRight size={16} />
          </button>
        </section>

        <CheckoutSummary items={items} totals={cartTotals} />
      </form>
    </main>
  );
}
