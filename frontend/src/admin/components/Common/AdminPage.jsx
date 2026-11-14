import { useEffect, useState } from "react";
import { Link } from "react-router";
import {
  ArrowRight,
  CircleDollarSign,
  Download,
  Eye,
  Package,
  Pencil,
  Plus,
  Search,
  ShoppingCart,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useStore } from "../../../context/StoreContext";
import StatCard from "../Dashboard/StatCard";
import DataTable from "./DataTable";
import SalesChart from "../Reports/SalesChart";
import OrderStatusSelect from "../Orders/OrderStatusSelect";
import StockBadge from "../Inventory/StockBadge";
import CustomerSummary from "../Customers/CustomerSummary";
import InventorySummary from "../Inventory/InventorySummary";
import Modal from "../../../components/Common/Modal";
import { notify } from "../../../components/Common/Toast";

const money = (amount) => "Rs. " + Number(amount || 0).toLocaleString();
const date = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-PK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";
const Stat = ({ icon, label, value }) => (
  <StatCard icon={icon} label={label} value={value} delta="Local demo data" />
);
function salesSeries(orders) {
  const entries = Array.from({ length: 12 }, (_, index) => {
    const month = new Date();
    month.setMonth(month.getMonth() - 11 + index, 1);
    const amount = orders
      .filter((order) => {
        const d = new Date(order.date);
        return (
          d.getFullYear() === month.getFullYear() &&
          d.getMonth() === month.getMonth() &&
          order.status !== "Cancelled"
        );
      })
      .reduce((sum, order) => sum + Number(order.total || 0), 0);
    return {
      label: month.toLocaleDateString("en", { month: "short" }),
      amount,
    };
  });
  const max = Math.max(1, ...entries.map((entry) => entry.amount));
  return {
    months: entries.map((entry) => entry.label),
    values: entries.map((entry) =>
      entry.amount ? Math.max(4, Math.round((entry.amount / max) * 100)) : 0,
    ),
  };
}
function Field({
  label,
  name,
  value,
  type = "text",
  required = false,
  ...props
}) {
  return (
    <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
      {label}
      <input
        className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
        name={name}
        type={type}
        defaultValue={value ?? ""}
        required={required}
        {...props}
      />
    </label>
  );
}
function ProductForm({ product, categories, onSave, onClose }) {
  const submit = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    onSave({
      ...data,
      price: Number(data.price),
      oldPrice: Number(data.oldPrice || 0),
      stock: Number(data.stock),
      rating: Number(data.rating || 0),
      reviews: Number(data.reviews || 0),
      trending: data.trending === "on",
      offerEndsAt: data.offerEndsAt || "",
    });
  };
  return (
    <form className="grid gap-5" onSubmit={submit}>
      <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
        <Field
          label="Product name"
          name="name"
          value={product?.name}
          required
        />
        <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
          Category
          <select
            className="h-10 rounded-lg border border-[#dce5f3] bg-white px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="category"
            defaultValue={product?.category || categories[0] || "Accessories"}
          >
            {categories.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <Field
          label="Price (PKR)"
          name="price"
          type="number"
          min="0"
          value={product?.price}
          required
        />
        <Field
          label="Old price (optional)"
          name="oldPrice"
          type="number"
          min="0"
          value={product?.oldPrice}
        />
        <Field
          label="Offer ends at (optional)"
          name="offerEndsAt"
          type="datetime-local"
          value={product?.offerEndsAt?.slice?.(0, 16)}
        />
        <Field
          label="Stock quantity"
          name="stock"
          type="number"
          min="0"
          value={product?.stock ?? 0}
          required
        />
        <label className="flex min-h-10 items-center gap-2 text-xs font-semibold text-[#34445f]">
          <input
            type="checkbox"
            name="trending"
            defaultChecked={Boolean(product?.trending || product?.isTrending)}
            className="size-4 accent-[#2563eb]"
          />
          Mark as trending
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
          Icon
          <select
            className="h-10 rounded-lg border border-[#dce5f3] bg-white px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="icon"
            defaultValue={product?.icon || "accessory"}
          >
            {["phone", "audio", "laptop", "watch", "gaming", "accessory"].map(
              (item) => (
                <option key={item}>{item}</option>
              ),
            )}
          </select>
        </label>
        <Field
          label="Image URL (optional)"
          name="image"
          type="url"
          value={product?.image}
        />
        <Field
          label="Rating"
          name="rating"
          type="number"
          min="0"
          max="5"
          step="0.1"
          value={product?.rating ?? 0}
        />
        <label className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f] max-[600px]:col-auto">
          Description
          <textarea
            className="rounded-lg border border-[#dce5f3] px-3 py-2 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="description"
            rows="3"
            defaultValue={product?.description || ""}
          />
        </label>
      </div>
      <div className="flex gap-2">
        <button className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white hover:bg-[#174fcc]">
          Save product
        </button>
        <button
          type="button"
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#dce5f3] px-4 text-xs font-bold text-[#52617a] hover:bg-[#f4f7fc]"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
function Dashboard({ orders, products, accounts }) {
  const revenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
  const series = salesSeries(orders);
  const rows = orders.slice(0, 5).map((order) => ({
    id: order.id,
    customer: order.details?.name || "Guest",
    date: date(order.date),
    total: money(order.total),
    status: order.status,
  }));
  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-[-.05em] text-[#071a3d]">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-[#71809a]">
            Live overview from the local storefront demo.
          </p>
        </div>
        <span className="rounded-full bg-[#eaf1ff] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#2563eb]">
          Frontend demo
        </span>
      </div>
      <div className="mb-6 grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[500px]:grid-cols-1">
        <Stat
          icon={CircleDollarSign}
          label="Order revenue"
          value={money(revenue)}
        />
        <Stat icon={ShoppingCart} label="Orders" value={orders.length} />
        <Stat
          icon={Users}
          label="Registered accounts"
          value={accounts.length}
        />
        <Stat icon={Package} label="Catalog products" value={products.length} />
      </div>
      <section className="mb-6 rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]">
        <header className="mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#17233b]">Sales overview</h2>
            <p className="mt-1 text-xs text-[#8491a5]">
              Order revenue by month
            </p>
          </div>
        </header>
        {orders.length ? (
          <SalesChart values={series.values} months={series.months} />
        ) : (
          <p className="p-6 text-center text-sm text-[#8491a5]">
            Demo sales appear here after placing an order.
          </p>
        )}
      </section>
      <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]">
        <header className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#17233b]">Recent orders</h2>
            <p className="mt-1 text-xs text-[#8491a5]">
              Latest local demo orders
            </p>
          </div>
          <Link
            to="/admin/orders"
            className="inline-flex items-center gap-1 text-xs font-bold text-[#2563eb] hover:text-[#174fcc]"
          >
            View orders <ArrowRight size={13} />
          </Link>
        </header>
        <DataTable
          columns={["id", "customer", "date", "total", "status"]}
          rows={rows}
        />
      </section>
    </>
  );
}
function AdminPageContent({ page = "Dashboard" }) {
  const store = useStore();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    renameCategory,
    deleteCategory,
    orders,
    updateOrderStatus,
    accounts,
    coupons,
    saveCoupon,
    deleteCoupon,
    reviews,
    updateReview,
    messages,
    deleteMessage,
    couriers,
    updateCourier,
    updateStock,
    settings,
    updateSettings,
  } = store;
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const normalized = query.trim().toLowerCase();
  useEffect(() => setCurrentPage(1), [normalized]);
  const matches = (value) =>
    JSON.stringify(value).toLowerCase().includes(normalized);
  const notice = (message) => notify(message);
  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
  if (page === "Dashboard")
    return (
      <Dashboard orders={orders} products={products} accounts={accounts} />
    );

  if (page === "Settings") {
    return (
      <>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-[-.05em] text-[#071a3d]">
            Settings
          </h1>
          <p className="mt-1 text-sm text-[#71809a]">
            Update preferences used in the storefront demo.
          </p>
        </div>
        <form
          className="grid max-w-3xl grid-cols-2 gap-4 rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)] max-[600px]:grid-cols-1"
          onSubmit={(event) => {
            event.preventDefault();
            const d = Object.fromEntries(new FormData(event.currentTarget));
            updateSettings({
              storeName: d.storeName.trim(),
              supportEmail: d.supportEmail.trim(),
              supportPhone: d.supportPhone.trim(),
              whatsappNumber: d.whatsappNumber.trim(),
              instagramUrl: d.instagramUrl.trim(),
              twitterUrl: d.twitterUrl.trim(),
              linkedinUrl: d.linkedinUrl.trim(),
              currency: d.currency,
              deliveryFee: Number(d.deliveryFee),
              freeDeliveryThreshold: Number(d.freeDeliveryThreshold || 0),
            });
            notice("Store settings saved in this browser.");
          }}
        >
          <h2 className="col-span-full text-lg font-bold text-[#17233b] max-[600px]:col-auto">
            Store information
          </h2>
          <Field
            label="Store name"
            name="storeName"
            value={settings.storeName}
            required
          />
          <Field
            label="Support email"
            name="supportEmail"
            type="email"
            value={settings.supportEmail}
            required
          />
          <Field
            label="Contact phone"
            name="supportPhone"
            type="tel"
            value={settings.supportPhone}
          />
          <Field
            label="WhatsApp number (international format)"
            name="whatsappNumber"
            type="tel"
            value={settings.whatsappNumber}
          />
          <Field
            label="Instagram profile URL"
            name="instagramUrl"
            type="url"
            value={settings.instagramUrl}
          />
          <Field
            label="X / Twitter profile URL"
            name="twitterUrl"
            type="url"
            value={settings.twitterUrl}
          />
          <Field
            label="LinkedIn profile URL"
            name="linkedinUrl"
            type="url"
            value={settings.linkedinUrl}
          />
          <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
            Currency
            <select
              className="h-10 rounded-lg border border-[#dce5f3] bg-white px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
              name="currency"
              defaultValue={settings.currency}
            >
              <option>PKR</option>
            </select>
          </label>
          <Field
            label="Delivery fee (PKR)"
            name="deliveryFee"
            type="number"
            min="0"
            value={settings.deliveryFee}
            required
          />
          <Field
            label="Free delivery threshold (0 disables)"
            name="freeDeliveryThreshold"
            type="number"
            min="0"
            value={settings.freeDeliveryThreshold}
          />
          <button className="inline-flex min-h-10 w-fit items-center justify-center rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white hover:bg-[#174fcc]">
            Save changes
          </button>
        </form>
      </>
    );
  }
  if (page === "Reports") {
    const series = salesSeries(orders);
    return (
      <>
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-[-.05em] text-[#071a3d]">
              Reports
            </h1>
            <p className="mt-1 text-sm text-[#71809a]">
              Sales totals calculated from this browser’s demo orders.
            </p>
          </div>
          <button
            className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#dce5f3] px-3 text-xs font-bold text-[#52617a] hover:bg-[#f4f7fc]"
            onClick={() => window.print()}
          >
            <Download size={15} /> Print report
          </button>
        </div>
        <div className="mb-6 grid grid-cols-4 gap-4 max-[1100px]:grid-cols-2 max-[500px]:grid-cols-1">
          <Stat
            icon={CircleDollarSign}
            label="Order revenue"
            value={money(totalRevenue)}
          />
          <Stat icon={ShoppingCart} label="Orders" value={orders.length} />
          <Stat
            icon={Package}
            label="Average order"
            value={money(orders.length ? totalRevenue / orders.length : 0)}
          />
          <Stat icon={Users} label="Accounts" value={accounts.length} />
        </div>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]">
          <header className="mb-4">
            <div>
              <h2 className="text-lg font-bold text-[#17233b]">
                Monthly revenue
              </h2>
              <p className="mt-1 text-xs text-[#8491a5]">
                Based on local demo orders
              </p>
            </div>
          </header>
          {orders.length ? (
            <SalesChart values={series.values} months={series.months} tall />
          ) : (
            <p className="p-6 text-center text-sm text-[#8491a5]">
              No sales yet. Place a demo order to populate this report.
            </p>
          )}
        </section>
      </>
    );
  }

  let title = page;
  let description = "Manage records stored in this browser demo.";
  let columns = [];
  let rows = [];
  let actions = null;
  let addAction = null;
  if (page === "Products" || page === "Inventory") {
    const inventory = page === "Inventory";
    description = inventory
      ? "Adjust stock quantities in the shared storefront catalog."
      : "Manage products displayed across the storefront.";
    const list = products.filter(matches);
    columns = inventory
      ? ["name", "category", "price", "stock", "status"]
      : ["name", "category", "price", "stock", "rating", "availability"];
    rows = list.map((item) =>
      inventory
        ? {
            id: item.id,
            name: item.name,
            category: item.category,
            price: money(item.price),
            stock: item.stock,
            status: <StockBadge stock={item.stock} />,
          }
        : {
            id: item.id,
            name: item.name,
            category: item.category,
            price: money(item.price),
            stock: item.stock,
            source: item,
            rating: item.rating || "—",
            availability: item.stock ? (
              <span className="inline-flex rounded-full bg-[#e9f8ed] px-2 py-1 text-[10px] font-bold text-[#16803b]">
                Active
              </span>
            ) : (
              <span className="inline-flex rounded-full bg-[#fff1d9] px-2 py-1 text-[10px] font-bold text-[#a85d00]">
                Out of stock
              </span>
            ),
          },
    );
    actions = (item) =>
      inventory ? (
        <form
          className="flex items-center gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            updateStock(
              item.id,
              Number(new FormData(event.currentTarget).get("stock")),
            );
            notice("Stock updated.");
          }}
        >
          <input
            className="h-8 w-16 rounded-md border border-[#dce5f3] px-2 text-xs outline-none focus:border-[#2563eb]"
            name="stock"
            type="number"
            min="0"
            defaultValue={item.stock}
            aria-label={"Stock for " + item.name}
          />
          <button className="inline-flex h-8 items-center justify-center rounded-md border border-[#dce5f3] px-2 text-[10px] font-bold text-[#2563eb] hover:bg-[#eff4ff]">
            Save
          </button>
        </form>
      ) : (
        <div className="flex gap-1">
          <button
            className="grid size-8 place-items-center rounded-md text-[#2563eb] hover:bg-[#eff4ff]"
            title="Edit product"
            aria-label="Edit product"
            onClick={() => setModal({ type: "product", value: item.source })}
          >
            <Pencil size={15} />
          </button>
          <button
            className="grid size-8 place-items-center rounded-md text-[#d14343] hover:bg-[#fff1f1]"
            title="Delete product"
            aria-label="Delete product"
            onClick={() => setModal({ type: "delete-product", value: item })}
          >
            <Trash2 size={15} />
          </button>
        </div>
      );
    if (!inventory)
      addAction = () => setModal({ type: "product", value: null });
  } else if (page === "Categories") {
    description = "Organize the products in your store.";
    rows = categories.filter(matches).map((name) => ({
      id: name,
      name,
      products: products.filter((item) => item.category === name).length,
      visibility: "Visible",
    }));
    columns = ["name", "products", "visibility"];
    actions = (row) => (
      <div className="flex gap-1">
        <button
          className="grid size-8 place-items-center rounded-md text-[#2563eb] hover:bg-[#eff4ff]"
          title="Rename category"
          aria-label="Rename category"
          onClick={() => setModal({ type: "category", value: row.name })}
        >
          <Pencil size={15} />
        </button>
        <button
          className="grid size-8 place-items-center rounded-md text-[#d14343] hover:bg-[#fff1f1]"
          title="Delete category"
          aria-label="Delete category"
          onClick={() => {
            if (deleteCategory(row.name)) notice("Category deleted.");
            else notice("Move or delete products in this category first.");
          }}
        >
          <Trash2 size={15} />
        </button>
      </div>
    );
    addAction = () => setModal({ type: "category", value: "" });
  } else if (page === "Orders") {
    description = "Update demo order fulfillment statuses.";
    rows = orders.filter(matches).map((order) => ({
      id: order.id,
      source: order,
      customer: order.details?.name || "Guest",
      email: order.details?.email || "—",
      date: date(order.date),
      items: order.items.reduce((sum, item) => sum + item.qty, 0),
      total: money(order.total),
      status: (
        <OrderStatusSelect
          value={order.status}
          onChange={(value) => updateOrderStatus(order.id, value)}
        />
      ),
    }));
    columns = ["id", "customer", "email", "date", "items", "total", "status"];
    actions = (order) => (
      <button
        className="inline-flex min-h-8 items-center justify-center gap-1.5 rounded-md border border-[#dce5f3] px-2 text-[10px] font-bold text-[#2563eb] hover:bg-[#eff4ff]"
        onClick={() => setModal({ type: "order", value: order.source })}
      >
        <Eye size={14} /> Details
      </button>
    );
  } else if (page === "Customers") {
    description = "Registered demo accounts and guest checkout contacts.";
    const data = new Map(
      accounts.map((account) => [
        account.email,
        {
          name: account.name,
          email: account.email,
          registered: true,
          orders: [],
        },
      ]),
    );
    orders.forEach((order) => {
      const email = order.details?.email?.toLowerCase();
      if (email) {
        const customer = data.get(email) || {
          name: order.details?.name || "Guest",
          email,
          registered: false,
          orders: [],
        };
        customer.orders.push(order);
        data.set(email, customer);
      }
    });
    rows = [...data.values()].filter(matches).map((customer) => ({
      id: customer.email,
      name: <CustomerSummary customer={customer} />,
      email: customer.email,
      account: customer.registered ? "Registered" : "Guest",
      orders: customer.orders.length,
      spent: money(
        customer.orders
          .filter((order) => order.status !== "Cancelled")
          .reduce((sum, order) => sum + Number(order.total || 0), 0),
      ),
    }));
    columns = ["name", "email", "account", "orders", "spent"];
  } else if (page === "Couriers") {
    description =
      "Preview configuration only. Real courier connections require backend credentials.";
    rows = store.couriers.filter(matches).map((item) => ({
      id: item.id,
      name: item.name,
      service: "COD and tracking",
      status: item.enabled ? "Preview enabled" : "Not connected",
    }));
    columns = ["name", "service", "status"];
    actions = (item) => (
      <button
        className="inline-flex min-h-8 items-center justify-center rounded-md border border-[#dce5f3] px-2 text-[10px] font-bold text-[#2563eb] hover:bg-[#eff4ff]"
        onClick={() => {
          updateCourier(item.id, { enabled: !item.enabled });
          notice(
            item.name + " preview setting changed. No shipment was booked.",
          );
        }}
      >
        {item.enabled ? "Disable preview" : "Preview setup"}
      </button>
    );
  } else if (page === "Reviews") {
    description = "Moderate review records saved in the demo.";
    rows = reviews.filter(matches).map((review) => ({
      id: review.id,
      customer: review.name || review.customer || "Customer",
      product: review.productName || review.product || "—",
      rating: review.rating + " / 5",
      review: review.text || review.review,
      status: (
        <select
          className="h-8 rounded-md border border-[#dce5f3] bg-white px-2 text-[11px] font-semibold text-[#34445f] outline-none focus:border-[#2563eb]"
          aria-label="Review visibility"
          value={review.status}
          onChange={(event) =>
            updateReview(review.id, { status: event.target.value })
          }
        >
          <option>Pending</option>
          <option>Published</option>
          <option>Hidden</option>
        </select>
      ),
    }));
    columns = ["customer", "product", "rating", "review", "status"];
  } else if (page === "Coupons") {
    description = "Coupons here apply to cart discounts in the frontend demo.";
    rows = coupons.filter(matches).map((item) => ({
      id: item.id,
      source: item,
      code: item.code,
      discount: item.type === "percent" ? item.value + "%" : money(item.value),
      minimum: money(item.minimumOrder),
      status: item.active ? "Active" : "Inactive",
    }));
    columns = ["code", "discount", "minimum", "status"];
    actions = (item) => (
      <div className="flex gap-1">
        <button
          className="grid size-8 place-items-center rounded-md text-[#2563eb] hover:bg-[#eff4ff]"
          title="Edit coupon"
          aria-label="Edit coupon"
          onClick={() => setModal({ type: "coupon", value: item.source })}
        >
          <Pencil size={15} />
        </button>
        <button
          className="grid size-8 place-items-center rounded-md text-[#d14343] hover:bg-[#fff1f1]"
          title="Delete coupon"
          aria-label="Delete coupon"
          onClick={() => deleteCoupon(item.id)}
        >
          <Trash2 size={15} />
        </button>
      </div>
    );
    addAction = () => setModal({ type: "coupon", value: null });
  } else if (page === "Messages") {
    description = "Customer contact form entries saved in this browser.";
    rows = messages.filter(matches).map((item) => ({
      id: item.id,
      source: item,
      name: item.name,
      email: item.email,
      subject: item.subject,
      date: date(item.date),
    }));
    columns = ["name", "email", "subject", "date"];
    actions = (item) => (
      <div className="flex gap-1">
        <button
          className="grid size-8 place-items-center rounded-md text-[#2563eb] hover:bg-[#eff4ff]"
          title="Read message"
          aria-label="Read message"
          onClick={() => setModal({ type: "message", value: item.source })}
        >
          <Eye size={15} />
        </button>
        <button
          className="grid size-8 place-items-center rounded-md text-[#d14343] hover:bg-[#fff1f1]"
          title="Delete message"
          aria-label="Delete message"
          onClick={() => deleteMessage(item.id)}
        >
          <Trash2 size={15} />
        </button>
      </div>
    );
  } else
    return (
      <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]">
        <h1 className="text-xl font-bold text-[#17233b]">{page}</h1>
        <p className="mt-2 text-sm text-[#71809a]">Admin page not found.</p>
      </section>
    );

  const pageSize = 10;
  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));
  const activePage = Math.min(currentPage, pageCount);
  const firstVisible = rows.length ? (activePage - 1) * pageSize + 1 : 0;
  const visibleRows = rows.slice(firstVisible - 1, activePage * pageSize);

  const isProduct = modal?.type === "product";
  const isCategory = modal?.type === "category";
  const isCoupon = modal?.type === "coupon";
  const saveCouponForm = (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    saveCoupon({
      ...data,
      id: modal.value?.id,
      value: Number(data.value),
      minimumOrder: Number(data.minimumOrder || 0),
      active: data.active === "on",
    });
    setModal(null);
    notice("Coupon saved and ready for cart demo.");
  };

  return (
    <>
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-[-.05em] text-[#071a3d]">
            {title}
          </h1>
          <p className="mt-1 text-sm text-[#71809a]">{description}</p>
        </div>
        {addAction && (
          <button
            className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-3 text-xs font-bold text-white hover:bg-[#174fcc]"
            onClick={addAction}
          >
            <Plus size={15} /> Add{" "}
            {page === "Products"
              ? "product"
              : page === "Categories"
                ? "category"
                : "coupon"}
          </button>
        )}
      </div>
      <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]">
        {page === "Inventory" && <InventorySummary products={products} />}
        <header className="mb-4 flex items-center justify-between gap-4 max-[600px]:items-start max-[600px]:flex-col">
          <div>
            <h2 className="text-lg font-bold text-[#17233b]">{title} list</h2>
            <p className="mt-1 text-xs text-[#8491a5]">
              {rows.length} records · saved in this browser
            </p>
          </div>
          <label className="flex h-10 w-full max-w-[260px] items-center gap-2 rounded-lg border border-[#dce5f3] px-3 text-[#71809a] max-[600px]:max-w-none">
            <Search size={15} />
            <input
              className="min-w-0 flex-1 bg-transparent text-xs text-[#17233b] outline-none"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={"Search " + title.toLowerCase()}
            />
          </label>
        </header>
        <DataTable columns={columns} rows={visibleRows} actions={actions} />
        {pageCount > 1 && (
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-[#edf0f5] pt-4 max-[500px]:flex-col max-[500px]:items-stretch">
            <p className="text-xs text-[#71809a]" aria-live="polite">
              Showing {firstVisible}–{Math.min(activePage * pageSize, rows.length)} of {rows.length}
            </p>
            <nav
              className="flex items-center justify-end gap-2 max-[500px]:justify-between"
              aria-label={`${title} pages`}
            >
              <button
                type="button"
                className="min-h-9 rounded-lg border border-[#dce5f3] px-3 text-xs font-semibold text-[#52617a] hover:bg-[#f4f7fc] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setCurrentPage(activePage - 1)}
                disabled={activePage <= 1}
              >
                Previous
              </button>
              <span className="min-w-20 text-center text-xs font-semibold text-[#52617a]" aria-current="page">
                Page {activePage} of {pageCount}
              </span>
              <button
                type="button"
                className="min-h-9 rounded-lg border border-[#dce5f3] px-3 text-xs font-semibold text-[#52617a] hover:bg-[#f4f7fc] disabled:cursor-not-allowed disabled:opacity-50"
                onClick={() => setCurrentPage(activePage + 1)}
                disabled={activePage >= pageCount}
              >
                Next
              </button>
            </nav>
          </div>
        )}
      </section>
      <Modal
        open={isProduct}
        onClose={() => setModal(null)}
        title={modal?.value ? "Edit product" : "Add product"}
      >
        <ProductForm
          product={modal?.value}
          categories={categories}
          onClose={() => setModal(null)}
          onSave={(data) => {
            if (modal.value) updateProduct(modal.value.id, data);
            else addProduct(data);
            setModal(null);
            notice("Product saved to the storefront catalog.");
          }}
        />
      </Modal>
      <Modal
        open={isCategory}
        onClose={() => setModal(null)}
        title={modal?.value ? "Rename category" : "Add category"}
      >
        <form
          className="grid gap-5"
          onSubmit={(event) => {
            event.preventDefault();
            const name = new FormData(event.currentTarget).get("name");
            const ok = modal.value
              ? renameCategory(modal.value, name)
              : addCategory(name);
            if (!ok) {
              notice("Enter a unique category name.");
              return;
            }
            setModal(null);
            notice("Category saved.");
          }}
        >
          <Field
            label="Category name"
            name="name"
            value={modal?.value || ""}
            required
          />
          <div className="flex gap-2">
            <button className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white hover:bg-[#174fcc]">
              Save category
            </button>
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#dce5f3] px-4 text-xs font-bold text-[#52617a] hover:bg-[#f4f7fc]"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        open={isCoupon}
        onClose={() => setModal(null)}
        title={modal?.value ? "Edit coupon" : "Create coupon"}
      >
        <form className="grid gap-5" onSubmit={saveCouponForm}>
          <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
            <Field
              label="Coupon code"
              name="code"
              value={modal?.value?.code}
              required
            />
            <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
              Discount type
              <select
                className="h-10 rounded-lg border border-[#dce5f3] bg-white px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
                name="type"
                defaultValue={modal?.value?.type || "percent"}
              >
                <option value="percent">Percent</option>
                <option value="fixed">Fixed amount (PKR)</option>
              </select>
            </label>
            <Field
              label="Discount value"
              name="value"
              type="number"
              min="1"
              value={modal?.value?.value}
              required
            />
            <Field
              label="Minimum order (PKR)"
              name="minimumOrder"
              type="number"
              min="0"
              value={modal?.value?.minimumOrder || 0}
            />
            <label className="flex items-center gap-2 text-xs font-semibold text-[#34445f]">
              Active
              <input
                className="size-4 accent-[#2563eb]"
                type="checkbox"
                name="active"
                defaultChecked={modal?.value ? modal.value.active : true}
              />
            </label>
          </div>
          <div className="flex gap-2">
            <button className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white hover:bg-[#174fcc]">
              Save coupon
            </button>
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#dce5f3] px-4 text-xs font-bold text-[#52617a] hover:bg-[#f4f7fc]"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
      <Modal
        open={modal?.type === "delete-product"}
        onClose={() => setModal(null)}
        title="Delete product"
      >
        <p className="text-sm leading-6 text-[#52617a]">
          Remove {modal?.value?.name} from the storefront? Saved cart and
          wishlist entries will also be cleared.
        </p>
        <div className="mt-5 flex gap-2">
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-lg bg-[#d14343] px-4 text-xs font-bold text-white hover:bg-[#b12f36]"
            onClick={() => {
              deleteProduct(modal.value.id);
              setModal(null);
              notice("Product deleted.");
            }}
          >
            Delete product
          </button>
          <button
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#dce5f3] px-4 text-xs font-bold text-[#52617a] hover:bg-[#f4f7fc]"
            onClick={() => setModal(null)}
          >
            Cancel
          </button>
        </div>
      </Modal>
      <Modal
        open={modal?.type === "order"}
        onClose={() => setModal(null)}
        title={"Order Details #" + (modal?.value?.id || "")}
      >
        {modal?.value && (
          <div className="space-y-4 text-xs text-[#34445f]">
            <div className="rounded-xl border border-[#e4eaf3] bg-[#f8fafd] p-4">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-[#71809a]">
                Customer Information
              </span>
              <p className="mt-1 font-bold text-[#17233b]">
                {modal.value.details?.name || "Guest Customer"}
              </p>
              <p className="mt-0.5 text-[#52617a]">
                {modal.value.details?.email} · {modal.value.details?.phone}
              </p>
              <p className="mt-1.5 border-t border-[#e2e8f0] pt-1.5 text-[#52617a]">
                <b className="text-[#17233b]">Delivery:</b>{" "}
                {modal.value.details?.address}, {modal.value.details?.city}
                {modal.value.details?.postal
                  ? ` (${modal.value.details.postal})`
                  : ""}
              </p>
            </div>

            <div className="rounded-xl border border-[#e4eaf3] p-4">
              <span className="mb-2 block text-[11px] font-bold uppercase tracking-wider text-[#71809a]">
                Order Items
              </span>
              <div className="divide-y divide-[#edf0f5]">
                {(Array.isArray(modal.value.items) ? modal.value.items : []).map(
                  (item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-2 first:pt-0 last:pb-0"
                    >
                      <div>
                        <b className="text-[#17233b]">{item.product?.name}</b>
                        <small className="block text-[#8491a5]">
                          Qty: {item.qty} × {money(item.product?.price)}
                        </small>
                      </div>
                      <b className="text-[#17233b]">
                        {money((item.product?.price || 0) * item.qty)}
                      </b>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-3 flex justify-between border-t border-[#e2e8f0] pt-2 text-sm font-bold text-[#17233b]">
                <span>Total Amount:</span>
                <span className="text-[#2563eb]">{money(modal.value.total)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
      <Modal
        open={modal?.type === "message"}
        onClose={() => setModal(null)}
        title={modal?.value?.subject || "Customer message"}
      >
        {modal?.value && (
          <>
            <p>
              <b>{modal.value.name}</b> · {modal.value.email}
            </p>
            <p>{modal.value.message}</p>
            <small>{date(modal.value.date)}</small>
          </>
        )}
      </Modal>
    </>
  );
}

export default function AdminPage({ page = "Dashboard" }) {
  return <AdminPageContent key={page} page={page} />;
}
