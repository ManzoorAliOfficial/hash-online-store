import {
  CircleDollarSign,
  Download,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";
import StatCard from "../components/Dashboard/StatCard";
import SalesChart from "../components/Reports/SalesChart";
import { money, salesSeries } from "../utils/adminHelpers";

const Stat = ({ icon, label, value }) => (
  <StatCard icon={icon} label={label} value={value} delta="Local demo data" />
);

export default function Reports() {
  const { orders, accounts } = useStore();
  const totalRevenue = orders
    .filter((order) => order.status !== "Cancelled")
    .reduce((sum, order) => sum + Number(order.total || 0), 0);
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
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-[#dce5f3] bg-white px-3 text-xs font-bold text-[#52617a] hover:bg-[#f4f7fc]"
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
