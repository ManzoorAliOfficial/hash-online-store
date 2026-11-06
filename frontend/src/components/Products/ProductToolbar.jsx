import { Search } from "lucide-react";
export default function ProductToolbar({ value = "", onChange = () => {} }) {
  return (
    <label className="flex h-11 items-center gap-2 rounded-lg border border-[#dce5f3] bg-white px-3 text-[#71809a] shadow-sm focus-within:border-[#2563eb] focus-within:ring-2 focus-within:ring-[#2563eb]/15">
      <Search size={16} />
      <input
        className="min-w-0 flex-1 border-0 bg-transparent text-sm text-[#17233b] outline-none placeholder:text-[#9aa6b8]"
        type="search"
        aria-label="Search products"
        placeholder="Search products…"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
