import { RotateCcw } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function ProductFilters({
  category = "All",
  onChange,
  maxPrice = 400000,
  maxAvailable = 400000,
  onMaxPrice,
  rating = 0,
  onRating,
  inStock = false,
  onInStock,
  onReset = () => {},
}) {
  const { categories } = useStore();

  return (
    <aside className="h-fit rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
      <div className="mb-5 flex items-center justify-between border-b border-[#edf0f5] pb-4">
        <h2 className="text-sm font-bold tracking-tight text-[#17233b]">
          Filter products
        </h2>
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-bold text-[#2563eb] transition hover:bg-[#eff4ff] hover:text-[#174fcc]"
          onClick={onReset}
        >
          <RotateCcw size={12} /> Reset
        </button>
      </div>

      <fieldset className="mb-5 grid gap-2 border-0 border-b border-[#edf0f5] pb-5">
        <legend className="mb-3 text-xs font-bold text-[#34445f]">
          Category
        </legend>
        <div className="grid gap-2">
          {["All", ...categories].map((item) => (
            <label
              className="flex cursor-pointer items-center gap-2.5 text-xs text-[#52617a] transition hover:text-[#17233b]"
              key={item}
            >
              <input
                className="size-3.5 accent-[#2563eb]"
                type="radio"
                name="product-category"
                checked={category === item}
                onChange={() => onChange?.(item)}
              />
              <span
                className={category === item ? "font-bold text-[#2563eb]" : ""}
              >
                {item}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset className="mb-5 border-0 border-b border-[#edf0f5] pb-5">
        <legend className="mb-3 text-xs font-bold text-[#34445f]">
          Maximum price
        </legend>
        <input
          className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#e2e8f0] accent-[#2563eb]"
          type="range"
          min="0"
          max={maxAvailable}
          step="5000"
          value={maxPrice}
          onChange={(event) => onMaxPrice?.(Number(event.target.value))}
        />
        <div className="mt-2.5 flex justify-between text-[11px] text-[#8491a5]">
          <span>Rs. 0</span>
          <b className="font-bold text-[#2563eb]">
            Rs. {Number(maxPrice).toLocaleString()}
          </b>
        </div>
      </fieldset>

      <fieldset className="mb-5 border-0 border-b border-[#edf0f5] pb-5">
        <legend className="mb-3 text-xs font-bold text-[#34445f]">
          Minimum rating
        </legend>
        <select
          className="h-10 w-full rounded-lg border border-[#dce5f3] bg-white px-3 text-xs font-medium text-[#34445f] outline-none transition focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb]"
          value={rating}
          onChange={(event) => onRating?.(Number(event.target.value))}
        >
          <option value="0">Any rating</option>
          <option value="4">4 stars and up</option>
          <option value="4.5">4.5 stars and up</option>
        </select>
      </fieldset>

      <label className="flex cursor-pointer items-center gap-2.5 text-xs font-medium text-[#34445f] transition hover:text-[#17233b]">
        <input
          className="size-4 rounded accent-[#2563eb]"
          type="checkbox"
          checked={inStock}
          onChange={(event) => onInStock?.(event.target.checked)}
        />
        <span>In stock only</span>
      </label>
    </aside>
  );
}
