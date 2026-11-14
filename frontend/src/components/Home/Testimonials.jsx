import { useMemo } from "react";
import { CheckCircle2, Star } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";
import { isMobileAccessory } from "../../utils/homeCatalog";

const formatDate = (value) => {
  const date = new Date(value);
  return Number.isFinite(date.getTime())
    ? date.toLocaleDateString("en-PK", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "";
};

const initialsFor = (name) =>
  String(name || "Customer")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");

export default function Testimonials() {
  const { reviews = [], products = [] } = useStore();
  const verifiedReviews = useMemo(() => {
    const productById = new Map(products.map((product) => [product.id, product]));
    return reviews
      .filter((review) => {
        const product = productById.get(review.productId);
        return (
          review.status === "Published" &&
          review.verifiedPurchase === true &&
          isMobileAccessory(product) &&
          String(review.text || "").trim() &&
          String(review.name || "").trim()
        );
      })
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0))
      .slice(0, 3);
  }, [products, reviews]);

  return (
    <section aria-labelledby="home-reviews-heading">
      <div className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#2563eb]">
          ✦ &nbsp;Customer feedback
        </p>
        <h2
          id="home-reviews-heading"
          className="mt-2 text-2xl font-semibold tracking-tight text-[#0f2347] sm:text-3xl"
        >
          Customer reviews
        </h2>
      </div>
      {verifiedReviews.length ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 sm:gap-4">
        {verifiedReviews.map((review) => {
          const product = products.find((item) => item.id === review.productId);
          const rating = Math.min(5, Math.max(1, Number(review.rating) || 0));
          const date = formatDate(review.date);
          return (
            <article
              key={review.id}
              className="flex min-h-[190px] flex-col rounded-2xl border border-[#e5ebf4] bg-white p-4 shadow-[0_8px_24px_-22px_rgba(15,35,71,.28)] sm:p-5"
            >
              <div className="flex items-center justify-between gap-2">
                <div
                  className="flex items-center gap-0.5 text-amber-500"
                  aria-label={`${rating} out of 5 stars`}
                >
                  {Array.from({ length: rating }, (_, index) => (
                    <Star key={index} size={13} fill="currentColor" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[9px] font-semibold text-emerald-700">
                  <CheckCircle2 size={11} /> Verified buyer
                </span>
              </div>
              <p className="mt-4 flex-1 text-xs leading-5 text-[#53627a] sm:text-[13px]">
                “{review.text}”
              </p>
              <div className="mt-4 flex items-center gap-2.5 border-t border-[#edf0f5] pt-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-full bg-[#eff4ff] text-[10px] font-bold text-[#2563eb]">
                  {initialsFor(review.name)}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <b className="truncate text-[11px] font-bold text-[#17233b]">
                      {review.name}
                    </b>
                    {date && (
                      <time
                        dateTime={review.date}
                        className="shrink-0 text-[9px] text-[#8491a5]"
                      >
                        {date}
                      </time>
                    )}
                  </div>
                  <span className="mt-0.5 block truncate text-[9px] font-semibold text-[#2563eb]">
                    Purchased: {review.productName || product?.name}
                  </span>
                </div>
              </div>
            </article>
          );
        })}
        </div>
      ) : (
        <div className="rounded-2xl border border-[#e5ebf4] bg-white p-5 sm:p-6">
          <p className="text-sm font-semibold text-[#17233b]">
            No verified accessory reviews to show yet.
          </p>
          <p className="mt-1.5 text-xs leading-5 text-[#64748b]">
            Reviews will appear here after the store verifies the purchase.
          </p>
          <Link
            to="/products?collection=mobile-accessories"
            className="mt-4 inline-flex min-h-10 items-center rounded-lg bg-[#eff4ff] px-4 text-xs font-bold text-[#2563eb] transition hover:bg-[#dce9ff]"
          >
            Explore accessories
          </Link>
        </div>
      )}
    </section>
  );
}
