import { Link, useNavigate, useParams, useSearchParams } from "react-router";
import { useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Truck,
  ShieldCheck,
  PackageOpen,
  MapPin,
  Mail,
  Phone,
  ShoppingBag,
  UserRound,
  Heart,
  Package,
  Settings,
  LogOut,
  Calendar,
  CreditCard,
  FileText,
  Sparkles,
  Star,
  RotateCcw,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import storeMark from "../../assets/icons/hash-online-store-mark.svg";
import ProductFilters from "../Products/ProductFilters";
import ProductGrid from "../Products/ProductGrid";
import ProductToolbar from "../Products/ProductToolbar";
import SortBar from "../Products/SortBar";
import ProductPagination from "../Products/ProductPagination";
import ProductGallery from "../ProductDetails/ProductGallery";
import ProductInfo from "../ProductDetails/ProductInfo";
import ProductSpecifications from "../ProductDetails/ProductSpecifications";
import RelatedProducts from "../ProductDetails/RelatedProducts";
import ProductReviews from "../ProductDetails/ProductReviews";
import DeliveryInformation from "../ProductDetails/DeliveryInformation";
import CartItems from "../Cart/CartItems";
import CartSummary from "../Cart/CartSummary";
import CouponBox from "../Cart/CouponBox";
import WishlistGrid from "../Wishlist/WishlistGrid";
import OrderCard from "../Orders/OrderCard";
import OrderTimeline from "../Orders/OrderTimeline";
import TrackingStatus from "../Orders/TrackingStatus";
import OrderSummary from "../Orders/OrderSummary";
import CheckoutSteps from "../Checkout/CheckoutSteps";
import PaymentMethod from "../Checkout/PaymentMethod";
import CheckoutSummary from "../Checkout/OrderSummary";
import LoginForm from "../Auth/LoginForm";
import RegisterForm from "../Auth/RegisterForm";
import ForgotPasswordForm from "../Auth/ForgotPasswordForm";
import ProfileInfo from "../Profile/ProfileInfo";
import AddressBook from "../Profile/AddressBook";
import AccountSettings from "../Profile/AccountSettings";
import EmptyState from "./EmptyState";
import { notify } from "./Toast";

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

function Heading({
  eyebrow = "HASH ONLINE STORE",
  title,
  children,
  compact = false,
}) {
  return (
    <div className={compact ? "mb-6" : "mb-10 max-[600px]:mb-7"}>
      <span className="text-[11px] font-extrabold uppercase tracking-[.14em] text-[#2563eb]">
        {eyebrow}
      </span>
      <h1
        className={
          compact
            ? "mt-2 text-[30px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-[24px]"
            : "mt-3 text-[48px] font-extrabold leading-tight tracking-[-.055em] text-[#071a3d] max-[900px]:text-[38px] max-[600px]:text-[28px]"
        }
      >
        {title}
      </h1>
      {children && (
        <div
          className={
            compact
              ? "mt-2 max-w-[480px] text-xs leading-6 text-[#71809a]"
              : "mt-3 max-w-[680px] text-base leading-7 text-[#71809a] max-[600px]:text-xs max-[600px]:leading-6"
          }
        >
          {children}
        </div>
      )}
    </div>
  );
}

function Products() {
  const { products } = useStore();
  const [params] = useSearchParams();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("Featured");
  const [maxPrice, setMaxPrice] = useState(400000);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(false);

  const reset = () => {
    setCategory("All");
    setMaxPrice(400000);
    setRating(0);
    setInStock(false);
    setQuery("");
  };

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        p.price <= maxPrice &&
        p.rating >= rating &&
        (!inStock || p.stock > 0),
    );
    if (sort === "Price: Low to high") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to low") list.sort((a, b) => b.price - a.price);
    if (sort === "Top rated") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, query, sort, maxPrice, rating, inStock]);

  return (
    <>
      <Heading eyebrow="THE COLLECTION" title="Our products">
        <p>Find the right tech and everyday essentials for your day.</p>
      </Heading>
      <div className="grid grid-cols-[320px_minmax(0,1fr)] gap-8 max-[1100px]:grid-cols-[260px_minmax(0,1fr)] max-[850px]:grid-cols-1">
        <ProductFilters
          category={category}
          onChange={setCategory}
          maxPrice={maxPrice}
          onMaxPrice={setMaxPrice}
          rating={rating}
          onRating={setRating}
          inStock={inStock}
          onInStock={setInStock}
          onReset={reset}
        />
        <section className="min-w-0">
          <div className="mb-6 grid grid-cols-[minmax(0,1fr)_260px] gap-4 max-[700px]:grid-cols-1">
            <ProductToolbar value={query} onChange={setQuery} />
            <SortBar value={sort} onChange={setSort} />
          </div>
          <div className="mb-6 text-sm text-[#71809a]">
            Showing{" "}
            <b className="font-bold text-[#17233b]">{filtered.length}</b>{" "}
            products
          </div>
          {filtered.length ? (
            <ProductGrid products={filtered} />
          ) : (
            <EmptyState
              title="No products found"
              message="Try changing your search keywords or resetting your filter criteria."
              action="Reset filters"
              to="/products"
            />
          )}
          <ProductPagination page={1} pages={1} />
        </section>
      </div>
    </>
  );
}

function Detail() {
  const { id } = useParams();
  const { products, reviews, saveReview } = useStore();
  const product = products.find((x) => x.id === id);

  if (!product) {
    return (
      <>
        <Heading eyebrow="CATALOG" title="Product not found" />
        <EmptyState
          title="Product not available"
          message="The product you are looking for may have been removed or the link might be incorrect."
          action="Browse catalog"
          to="/products"
        />
      </>
    );
  }

  const productReviews = reviews.filter(
    (r) =>
      r.productId === product.id ||
      r.product === product.name ||
      r.productName === product.name,
  );

  return (
    <>
      <Heading eyebrow={product.category} title={product.name}>
        <p>{product.description}</p>
      </Heading>
      <div className="grid grid-cols-2 gap-10 max-[800px]:grid-cols-1">
        <ProductGallery product={product} />
        <div>
          <ProductInfo product={product} />
          <DeliveryInformation />
        </div>
      </div>
      <ProductSpecifications product={product} />


      <ProductReviews
        reviews={productReviews}
        onAddReview={(newReview) => {
          saveReview({
            ...newReview,
            productId: product.id,
            productName: product.name,
          });
          notify("Review submitted successfully!");
        }}
      />
      <RelatedProducts product={product} />
    </>
  );
}

function Cart() {
  const { cart } = useStore();
  const totalCount = cart.reduce((s, x) => s + x.qty, 0);

  if (!cart.length) {
    return (
      <>
        <Heading eyebrow="YOUR BAG" title="Your cart" />
        <EmptyState
          title="Your cart is empty"
          message="Find something useful in our collection and add it to your cart."
          action="Shop now"
          to="/products"
        />
      </>
    );
  }

  return (
    <>
      <Heading eyebrow="YOUR BAG" title="Your cart">
        <p>
          {totalCount} {totalCount === 1 ? "item" : "items"} ready for checkout.
        </p>
      </Heading>
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
    </>
  );
}

function Checkout() {
  const { cart, products, placeOrder, cartTotals } = useStore();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");
  const [submitting, setSubmitting] = useState(false);

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
    const details = Object.fromEntries(new FormData(e.currentTarget));
    details.payment = payment;

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
    <>
      <Heading eyebrow="SECURE CHECKOUT" title="Checkout">
        <p>Review your shipping address and complete your order.</p>
      </Heading>
      <CheckoutSteps step={1} />
      <form
        onSubmit={submit}
        className="grid grid-cols-[minmax(0,1fr)_340px] gap-6 max-[850px]:grid-cols-1"
      >
        <section className="space-y-6">
          <div className="rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
            <h2 className="mb-4 text-base font-bold text-[#17233b]">
              Shipping address
            </h2>
            <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
              <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
                Full name *
                <input
                  className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="name"
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
                  autoComplete="postal-code"
                  placeholder="e.g. 54000"
                />
              </label>
              <label className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f]">
                Delivery instructions (optional)
                <textarea
                  className="rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 py-2 text-xs font-normal outline-none transition focus:border-[#2563eb] focus:bg-white"
                  name="notes"
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
    </>
  );
}

function Wishlist() {
  const { wishlist } = useStore();
  return (
    <>
      <Heading eyebrow="SAVED FOR LATER" title="Your wishlist" />
      <WishlistGrid />
      {!wishlist.length && (
        <EmptyState
          title="Your wishlist is empty"
          message="Tap the heart icon on any product card to save it here for later."
          action="Explore products"
          to="/products"
        />
      )}
    </>
  );
}

function Orders() {
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
    return orders.filter((o) => !o.userId);
  }, [orders, user]);

  return (
    <>
      <Heading eyebrow="YOUR ACCOUNT" title="My orders">
        <p>Review your order history and track live shipment statuses.</p>
      </Heading>
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
    </>
  );
}

function OrderDetails() {
  const { id } = useParams();
  const { orders } = useStore();
  const order = orders.find((x) => x.id === id);

  return (
    <>
      <Heading
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
    </>
  );
}

function Profile() {
  const { user, setUser, updateProfile } = useStore();
  const [activeSection, setActiveSection] = useState("profile");

  if (!user) {
    return (
      <>
        <Heading eyebrow="YOUR ACCOUNT" title="Sign in to your account">
          <p>
            Sign in to manage saved details, view purchase history and update
            preferences.
          </p>
        </Heading>
        <LoginForm />
      </>
    );
  }

  const selectSection = (section) => (event) => {
    event.preventDefault();
    setActiveSection(section);
  };

  const signOut = () => {
    setUser(null);
    notify("You have been signed out.");
  };

  return (
    <>
      <Heading eyebrow="YOUR ACCOUNT" title="My account">
        <p>
          Manage profile information, saved delivery addresses and account
          security.
        </p>
      </Heading>

      {/* Mobile section tabs */}
      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 sm:hidden">
        <button
          type="button"
          onClick={() => setActiveSection("profile")}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${activeSection === "profile" ? "bg-[#2563eb] text-white" : "bg-white text-[#52617a] border border-[#dce5f3]"}`}
        >
          Profile
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("addresses")}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${activeSection === "addresses" ? "bg-[#2563eb] text-white" : "bg-white text-[#52617a] border border-[#dce5f3]"}`}
        >
          Addresses
        </button>
        <button
          type="button"
          onClick={() => setActiveSection("settings")}
          className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-bold transition ${activeSection === "settings" ? "bg-[#2563eb] text-white" : "bg-white text-[#52617a] border border-[#dce5f3]"}`}
        >
          Settings
        </button>
      </div>

      <div className="grid grid-cols-[220px_minmax(0,1fr)] gap-5 max-[760px]:grid-cols-1">
        <aside className="grid h-fit gap-1 rounded-xl border border-[#e4eaf3] bg-white p-3 shadow-[0_4px_16px_rgba(16,36,73,.03)] max-[760px]:hidden">
          <div className="mb-2 grid justify-items-center border-b border-[#edf0f5] px-3 pb-4 pt-1">
            <div className="mb-2 grid size-12 place-items-center rounded-full bg-[#eff4ff] text-[#2563eb]">
              <UserRound size={22} />
            </div>
            <b className="text-xs font-bold text-[#17233b]">{user.name}</b>
            <small className="mt-0.5 max-w-full truncate text-[10px] text-[#8491a5]">
              {user.email}
            </small>
          </div>
          <a
            href="#profile-information"
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition ${
              activeSection === "profile"
                ? "bg-[#eaf1ff] text-[#2563eb]"
                : "text-[#52617a] hover:bg-[#f4f7fc]"
            }`}
            onClick={selectSection("profile")}
          >
            <UserRound size={15} /> Profile information
          </a>
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold text-[#52617a] hover:bg-[#f4f7fc]"
            to="/orders"
          >
            <Package size={15} /> My orders
          </Link>
          <Link
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold text-[#52617a] hover:bg-[#f4f7fc]"
            to="/wishlist"
          >
            <Heart size={15} /> Wishlist
          </Link>
          <a
            href="#saved-addresses"
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition ${
              activeSection === "addresses"
                ? "bg-[#eaf1ff] text-[#2563eb]"
                : "text-[#52617a] hover:bg-[#f4f7fc]"
            }`}
            onClick={selectSection("addresses")}
          >
            <MapPin size={15} /> Saved addresses
          </a>
          <a
            href="#account-settings"
            className={`flex items-center gap-2 rounded-lg px-3 py-2.5 text-[11px] font-semibold transition ${
              activeSection === "settings"
                ? "bg-[#eaf1ff] text-[#2563eb]"
                : "text-[#52617a] hover:bg-[#f4f7fc]"
            }`}
            onClick={selectSection("settings")}
          >
            <Settings size={15} /> Password & Security
          </a>
          <button
            type="button"
            className="mt-2 flex items-center gap-2 rounded-lg border-t border-[#edf0f5] px-3 pt-3 text-left text-[11px] font-semibold text-[#d14343] transition hover:bg-[#fff1f1]"
            onClick={signOut}
          >
            <LogOut size={15} /> Sign out
          </button>
        </aside>

        <section className="min-w-0" aria-live="polite">
          {activeSection === "profile" && (
            <ProfileInfo user={user} onSave={updateProfile} />
          )}
          {activeSection === "addresses" && (
            <div id="saved-addresses">
              <AddressBook />
            </div>
          )}
          {activeSection === "settings" && (
            <div id="account-settings">
              <AccountSettings />
            </div>
          )}
        </section>
      </div>
    </>
  );
}

function Account({ mode }) {
  const contentMap = {
    login: {
      eyebrow: "WELCOME BACK",
      title: "Sign in to your account",
      subtitle: "Access your saved addresses, track pending orders, and manage your wishlist.",
      heroBadge: "CUSTOMER PORTAL",
      heroTitle: "Shopping, made simple.",
      heroDesc: "Welcome back to Hash Online Store. Experience genuine tech and rapid delivery across Pakistan.",
    },
    register: {
      eyebrow: "NEW CUSTOMER",
      title: "Create an account",
      subtitle: "Join Hash Online Store to enjoy faster checkout, real-time tracking, and exclusive discounts.",
      heroBadge: "EXCLUSIVE ACCESS",
      heroTitle: "Good finds start right here.",
      heroDesc: "Create an account today and join thousands of tech lovers enjoying verified products and reliable service.",
    },
    forgot: {
      eyebrow: "ACCOUNT SUPPORT",
      title: "Forgot password?",
      subtitle: "Enter the email associated with your account and we will send you password reset instructions.",
      heroBadge: "SECURE RECOVERY",
      heroTitle: "Account recovery made simple.",
      heroDesc: "Regain quick and safe access to your orders, addresses, and Hash Online Store account profile.",
    },
  };

  const current = contentMap[mode] || contentMap.login;

  return (
    <div className="grid min-h-[620px] grid-cols-[1fr_1.2fr] overflow-hidden rounded-3xl border border-[#e4eaf3] bg-white shadow-[0_20px_50px_rgba(16,36,73,.08)] max-[900px]:grid-cols-1">
      {/* Left Column: Brand Hero & Trust Showcase */}
      <section className="relative flex flex-col justify-between overflow-hidden bg-gradient-to-br from-[#091b42] via-[#0f2e69] to-[#07173b] p-8 sm:p-10 lg:p-12 text-white max-[900px]:min-h-[300px]">
        {/* Decorative soft glow orbs */}
        <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-[#2563eb]/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -right-20 size-72 rounded-full bg-[#3b82f6]/20 blur-3xl" />

        {/* Top Header & Brand Tag */}
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] font-extrabold tracking-[0.14em] text-[#a9c6ff] backdrop-blur-md">
            <Sparkles size={13} className="text-[#60a5fa]" />
            <span>{current.heroBadge}</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold leading-tight tracking-[-0.04em] text-white sm:text-4xl max-[600px]:text-2xl">
            {current.heroTitle}
          </h2>

          <p className="mt-3 max-w-[360px] text-xs leading-relaxed text-[#cad8f3] sm:text-sm">
            {current.heroDesc}
          </p>
        </div>

        {/* Middle Feature Highlights */}
        <div className="relative z-10 my-7 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2563eb]/40 text-[#93c5fd]">
              <Truck size={17} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Express Pakistan-Wide Delivery</h4>
              <p className="text-[11px] text-[#a9c6ff]">Safe doorstep delivery with live parcel tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2563eb]/40 text-[#93c5fd]">
              <ShieldCheck size={17} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">100% Genuine & Authentic Tech</h4>
              <p className="text-[11px] text-[#a9c6ff]">Verified imports with official product warranty</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-xs transition hover:bg-white/10">
            <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#2563eb]/40 text-[#93c5fd]">
              <RotateCcw size={17} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">7-Day Easy Return Guarantee</h4>
              <p className="text-[11px] text-[#a9c6ff]">Hassle-free returns and replacement support</p>
            </div>
          </div>
        </div>

        {/* Bottom Rating & Return Link */}
        <div className="relative z-10 space-y-4 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-xs">
            <div className="flex text-[#f59e0b]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={14} fill="currentColor" />
              ))}
            </div>
            <span className="font-semibold text-[#cad8f3]">
              Rated 4.9/5 by 25,000+ happy shoppers
            </span>
          </div>

          <Link
            to="/"
            className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#a9c6ff] transition hover:text-white"
          >
            <ArrowLeft size={14} /> Return to storefront
          </Link>
        </div>
      </section>

      {/* Right Column: Form Area */}
      <section className="flex flex-col justify-center p-8 sm:p-10 lg:p-12">
        <div className="mb-6">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#17233b] hover:opacity-90">
            <img className="size-7 object-contain" src={storeMark} alt="Hash Store" />
            <span>Hash Online Store</span>
            <span className="rounded-md bg-[#eff4ff] px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#2563eb]">
              Official
            </span>
          </Link>

          <div className="mt-4">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.14em] text-[#2563eb]">
              {current.eyebrow}
            </span>
            <h1 className="mt-1 text-2xl font-extrabold tracking-[-0.03em] text-[#071a3d] sm:text-3xl">
              {current.title}
            </h1>
            <p className="mt-1.5 text-xs text-[#71809a] sm:text-sm">
              {current.subtitle}
            </p>
          </div>
        </div>

        {mode === "login" ? (
          <LoginForm />
        ) : mode === "register" ? (
          <RegisterForm />
        ) : (
          <ForgotPasswordForm />
        )}
      </section>
    </div>
  );
}

function Contact() {
  const { saveMessage } = useStore();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    saveMessage({
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    });
    e.currentTarget.reset();
    setSent(true);
    notify("Thank you! Your message has been sent to our team.");
  };

  return (
    <>
      <Heading eyebrow="WE’RE HERE TO HELP" title="Get in touch">
        <p>
          Questions about an item or order? Send us a message and our team will
          be glad to assist you.
        </p>
      </Heading>
      <div className="grid grid-cols-[.85fr_1.15fr] gap-6 max-[800px]:grid-cols-1">
        <div className="grid gap-4 rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
          <div className="flex items-start gap-3.5">
            <div className="grid size-9 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
              <MapPin size={18} />
            </div>
            <div className="grid gap-0.5">
              <b className="text-xs font-bold text-[#17233b]">Main Office</b>
              <small className="text-xs text-[#71809a]">
                SadiqAbad, Punjab, Pakistan
              </small>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="grid size-9 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
              <Mail size={18} />
            </div>
            <div className="grid gap-0.5">
              <b className="text-xs font-bold text-[#17233b]">Email Support</b>
              <small className="text-xs text-[#71809a]">
                support@hashstore.pk
              </small>
            </div>
          </div>
          <div className="flex items-start gap-3.5">
            <div className="grid size-9 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
              <Phone size={18} />
            </div>
            <div className="grid gap-0.5">
              <b className="text-xs font-bold text-[#17233b]">
                Call Assistance
              </b>
              <small className="text-xs text-[#71809a]">
                Monday – Saturday · 9:00 AM – 6:00 PM
              </small>
            </div>
          </div>
          <div className="mt-2 grid min-h-[160px] place-items-center rounded-xl bg-[radial-gradient(circle_at_50%_40%,#d8e7ff,#eef3fb_62%)] p-4 text-center text-[#2563eb]">
            <MapPin size={28} />
            <span className="mt-2 text-xs font-bold uppercase tracking-wider text-[#102449]">
              Hash Online Store Pakistan
            </span>
          </div>
        </div>

        <form
          className="grid gap-4 rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]"
          onSubmit={handleSubmit}
        >
          <h2 className="text-base font-bold text-[#17233b]">
            Send us a message
          </h2>
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            Your name *
            <input
              name="name"
              className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs outline-none transition focus:border-[#2563eb] focus:bg-white"
              required
              placeholder="e.g. Bilal Ahmed"
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            Email address *
            <input
              name="email"
              className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs outline-none transition focus:border-[#2563eb] focus:bg-white"
              required
              type="email"
              placeholder="you@example.com"
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            Subject *
            <input
              name="subject"
              className="h-10 rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 text-xs outline-none transition focus:border-[#2563eb] focus:bg-white"
              required
              placeholder="Inquiry regarding product or order"
            />
          </label>
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            How can we help? *
            <textarea
              name="message"
              className="rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-3 py-2 text-xs outline-none transition focus:border-[#2563eb] focus:bg-white"
              required
              rows="4"
              placeholder="Tell us what you need help with..."
            />
          </label>
          <button
            type="submit"
            className="inline-flex min-h-[42px] w-fit items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-6 text-xs font-bold text-white transition hover:bg-[#174fcc] active:scale-[0.99]"
          >
            Send message <ArrowRight size={15} />
          </button>
          {sent && (
            <p className="rounded-lg bg-[#e9f8ed] p-3 text-xs font-semibold text-[#16803b]">
              Thank you! Your message has been received. Our team will get back
              to you shortly.
            </p>
          )}
        </form>
      </div>
    </>
  );
}

function About() {
  return (
    <>
      <Heading eyebrow="OUR STORY" title="About Hash Online Store">
        <p>Quality Products. Fast Delivery. Trusted Shopping.</p>
      </Heading>
      <div className="grid grid-cols-2 gap-8 max-[800px]:grid-cols-1">
        <div className="rounded-xl border border-[#e4eaf3] bg-white p-7 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
          <h2 className="text-2xl font-bold tracking-[-.04em] text-[#17233b]">
            Good products, made easy to find.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#71809a]">
            Hash Online Store brings together useful technology and everyday
            accessories with a focus on transparent information, dependable
            service, and a delightful shopping experience.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#71809a]">
            We aim to make choosing, ordering and receiving quality gadgets and
            gear feel straightforward and seamless from start to finish.
          </p>
          <div className="my-6 grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
            <div className="grid gap-1.5 rounded-lg bg-[#f4f7fc] p-4">
              <ShieldCheck className="size-5 text-[#2563eb]" />
              <b className="text-xs font-bold text-[#17233b]">Our promise</b>
              <small className="text-[11px] leading-4 text-[#71809a]">
                Authentic products and honest customer service.
              </small>
            </div>
            <div className="grid gap-1.5 rounded-lg bg-[#f4f7fc] p-4">
              <Truck className="size-5 text-[#2563eb]" />
              <b className="text-xs font-bold text-[#17233b]">Our mission</b>
              <small className="text-[11px] leading-4 text-[#71809a]">
                Fast, secure courier delivery across Pakistan.
              </small>
            </div>
          </div>
          <Link
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc] active:scale-[0.99]"
            to="/products"
          >
            Explore collection <ShoppingBag size={15} />{" "}
            <ArrowRight size={15} />
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#e4eaf3] shadow-[0_4px_16px_rgba(16,36,73,.05)]">
          <img
            className="h-full min-h-[330px] w-full object-cover transition duration-300 hover:scale-105"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=1000&q=85"
            alt="Modern retail shop interior"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </>
  );
}

function Terms() {
  return (
    <>
      <Heading eyebrow="STORE INFORMATION" title="Terms & Conditions">
        <p>
          A clear overview of how Hash Online Store policies and orders work.
        </p>
      </Heading>
      <div className="mb-6 flex gap-4 rounded-xl border border-[#bfd4ff] bg-[#eff4ff] p-5 text-[#34445f]">
        <ShieldCheck className="size-6 shrink-0 text-[#2563eb]" />
        <div>
          <b className="text-sm font-bold text-[#17233b]">
            Storefront & ordering notice
          </b>
          <p className="mt-1.5 text-xs leading-6 text-[#52617a]">
            Hash Online Store provides an authentic collection of consumer
            technology and lifestyle accessories. All orders are processed with
            verified parcel tracking and transparent delivery status updates.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Products and pricing
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            Product descriptions, prices in PKR, stock counts, and promotional
            discounts reflect current store inventory and are updated in real
            time.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Orders and payment
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            Cash on Delivery (COD) is available nationwide. Online credit/debit
            card checkout will be supported directly via secure payment
            gateways.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Delivery and logistics
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            Deliveries are handled by licensed domestic courier partners (TCS,
            Leopards, Trax, M&P). Standard transit times range between 2 to 4
            business days.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Returns, replacements and customer support
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            We provide a 7-day checking and replacement window for any
            manufacturer defects or transit damage. Please contact our support
            team for prompt resolution.
          </p>
          <Link
            to="/contact"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174fcc]"
          >
            Contact support <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </>
  );
}

export default function StorePage({ view }) {
  let content;
  switch (view) {
    case "products":
      content = <Products />;
      break;
    case "details":
      content = <Detail />;
      break;
    case "cart":
      content = <Cart />;
      break;
    case "checkout":
      content = <Checkout />;
      break;
    case "wishlist":
      content = <Wishlist />;
      break;
    case "orders":
      content = <Orders />;
      break;
    case "orderDetails":
      content = <OrderDetails />;
      break;
    case "profile":
      content = <Profile />;
      break;
    case "login":
    case "register":
    case "forgot":
      content = <Account mode={view} />;
      break;
    case "contact":
      content = <Contact />;
      break;
    case "about":
      content = <About />;
      break;
    case "terms":
      content = <Terms />;
      break;
    default:
      content = <Heading title="Page not found" />;
  }

  const authView = view === "login" || view === "register" || view === "forgot";
  return (
    <main
      className={
        authView
          ? "mx-auto min-h-[55vh] w-full max-w-[1120px] px-4 py-12 max-[600px]:py-7"
          : "mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8"
      }
    >
      {content}
    </main>
  );
}
