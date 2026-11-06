export default function SortBar({ value = "Featured", onChange = () => {} }) {
  return (
    <label className="flex h-11 items-center gap-2 rounded-lg border border-[#dce5f3] bg-white px-3 text-xs text-[#71809a] shadow-sm transition focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/15">
      <span className="whitespace-nowrap font-medium text-[#52617a]">
        Sort by:
      </span>
      <select
        className="min-w-0 flex-1 cursor-pointer bg-transparent text-xs font-bold text-[#17233b] outline-none"
        aria-label="Sort products"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {[
          "Featured",
          "Top rated",
          "Price: Low to high",
          "Price: High to low",
        ].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
