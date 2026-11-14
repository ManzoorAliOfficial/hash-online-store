import { ArrowRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router";

export default function AccessoriesLink({
  className = "",
  collection = "mobile-accessories",
  totalCount,
  visibleCount,
}) {
  if (
    Number.isFinite(totalCount) &&
    Number.isFinite(visibleCount) &&
    totalCount <= visibleCount
  ) {
    return null;
  }

  return (
    <div className={`mt-6 flex justify-center ${className}`}>
      <Link
        to={`/products?collection=${encodeURIComponent(collection)}`}
        className="group inline-flex min-h-12 w-full items-center justify-center gap-3 rounded-full bg-[#eff4ff] px-4 py-2 text-xs font-bold text-[#2563eb] shadow-[0_8px_24px_-16px_rgba(37,99,235,0.45)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#e7efff] hover:shadow-[0_12px_28px_-14px_rgba(37,99,235,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2563eb] focus-visible:ring-offset-2 sm:w-auto sm:px-6 sm:text-sm motion-reduce:transform-none motion-reduce:transition-none"
      >
        <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#eff4ff] text-[#2563eb] sm:size-9">
          <ShoppingBag size={17} aria-hidden="true" />
        </span>
        <span>Explore All</span>
        <ArrowRight
          size={14}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
          aria-hidden="true"
        />
      </Link>
    </div>
  );
}
