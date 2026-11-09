import { Link } from "react-router";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function EmptyState({
  title = "Nothing here yet",
  message = "Items you add will show up here.",
  action = "Explore products",
  to = "/products",
  icon: CustomIcon = ShoppingBag,
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#dce5f3] bg-[#f8fafd] p-8 text-center transition-all">
      <div className="relative mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#eff4ff] text-[#2563eb] shadow-xs">
        <CustomIcon size={30} strokeWidth={2} />
      </div>

      <h3 className="text-lg font-bold text-[#17233b]">{title}</h3>
      <p className="mt-1.5 max-w-[360px] text-xs sm:text-sm leading-relaxed text-[#71809a]">
        {message}
      </p>

      {action && to && (
        <Link
          className="mt-6 inline-flex min-h-[42px] cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 text-xs font-bold text-white shadow-xs transition hover:bg-[#1d4ed8] active:scale-95"
          to={to}
        >
          <span>{action}</span>
          <ArrowRight size={15} />
        </Link>
      )}
    </div>
  );
}
