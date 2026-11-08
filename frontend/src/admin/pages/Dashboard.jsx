import { Link } from "react-router";
import {
  ArrowRight,
  CircleDollarSign,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import StatCard from "../components/Dashboard/StatCard";
import DataTable from "../components/Common/DataTable";
import SalesChart from "../components/Reports/SalesChart";
import { money, date, salesSeries } from "../utils/adminHelpers";

const Stat = ({ icon, label, value }) => (
  <StatCard icon={icon} label={label} value={value} delta="Local demo data" />
);

export default function Dashboard() {
  const { orders, products, accounts } = useStore();

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
