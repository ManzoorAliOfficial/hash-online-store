import { Link } from "react-router";
import { ShoppingBag, ArrowRight } from "lucide-react";
export default function EmptyState({
  title = "Nothing here yet",
  message = "Items you add will show up here.",
  action = "Explore products",
  to = "/products",
}) {
  return (
    <div className="grid min-h-[260px] place-items-center rounded-xl border border-dashed border-[#cbd9ee] bg-[#f8fafd] p-8 text-center">
      <div>
        <ShoppingBag
          className="mx-auto text-[#2563eb]"
          size={32}
          aria-hidden="true"
        />
        <h3 className="mt-3 text-lg font-bold text-[#17233b]">{title}</h3>
        <p className="mt-2 max-w-[360px] text-sm leading-6 text-[#71809a]">
          {message}
        </p>
        <Link
          className="mt-5 inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc]"
          to={to}
        >
          {action}
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
