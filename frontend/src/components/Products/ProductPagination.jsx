import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductPagination({
  page = 1,
  pages = 1,
  onChange = () => {},
}) {
  const total = Math.max(1, Number(pages) || 1);
  if (total <= 1) return null;

  return (
    <nav
      className="mt-8 flex justify-center gap-1.5"
      aria-label="Product pages"
    >
      <button
        type="button"
        className="grid size-9 place-items-center rounded-lg border border-[#dce5f3] bg-white text-[#52617a] transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page <= 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {Array.from({ length: total }, (_, index) => index + 1).map((number) => (
        <button
          type="button"
          key={number}
          className={`grid size-9 place-items-center rounded-lg border text-xs font-bold transition ${
            number === page
              ? "border-[#2563eb] bg-[#2563eb] text-white"
              : "border-[#dce5f3] bg-white text-[#52617a] hover:border-[#2563eb] hover:text-[#2563eb]"
          }`}
          aria-current={number === page ? "page" : undefined}
          onClick={() => onChange(number)}
        >
          {number}
        </button>
      ))}
      <button
        type="button"
        className="grid size-9 place-items-center rounded-lg border border-[#dce5f3] bg-white text-[#52617a] transition hover:border-[#2563eb] hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-40"
        disabled={page >= total}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
