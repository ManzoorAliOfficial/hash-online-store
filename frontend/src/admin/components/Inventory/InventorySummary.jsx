import { AlertTriangle, Boxes } from "lucide-react";
export default function InventorySummary({ products = [] }) {
  const low = products.filter((product) => Number(product.stock) < 10).length;
  const units = products.reduce(
    (sum, product) => sum + Number(product.stock || 0),
    0,
  );
  return (
    <div className="mb-5 grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
      <div className="flex items-center gap-3 rounded-lg bg-[#eff4ff] p-3">
        <Boxes className="text-[#2563eb]" size={18} />
        <span className="grid gap-0.5">
          <small className="text-[10px] text-[#52617a]">Total stock</small>
          <b className="text-sm text-[#17233b]">
            {units.toLocaleString()} units
          </b>
        </span>
      </div>
      <div className="flex items-center gap-3 rounded-lg bg-[#fff7e8] p-3">
        <AlertTriangle className="text-[#a85d00]" size={18} />
        <span className="grid gap-0.5">
          <small className="text-[10px] text-[#52617a]">
            Low stock products
          </small>
          <b className="text-sm text-[#17233b]">{low}</b>
        </span>
      </div>
    </div>
  );
}
