import { useState, useMemo } from "react";
import { Star, MessageSquarePlus, CheckCircle, MessageSquare } from "lucide-react";

export default function ProductReviews({ reviews = [], onAddReview }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

  // Calculate rating summary
  const summary = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return { average: 0, total: 0, distribution: [0, 0, 0, 0, 0] };
    }
    let totalScore = 0;
    const counts = [0, 0, 0, 0, 0]; // 1, 2, 3, 4, 5 stars

    reviews.forEach((r) => {
      const star = Math.min(Math.max(Math.round(Number(r.rating) || 5), 1), 5);
      totalScore += star;
      counts[star - 1] += 1;
    });

    return {
      average: (totalScore / reviews.length).toFixed(1),
      total: reviews.length,
      distribution: counts.map((count) =>
        Math.round((count / reviews.length) * 100)
      ),
    };
  }, [reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    if (onAddReview) {
      onAddReview({
        name: data.name,
        rating: Number(rating),
        text: data.comment,
        date: new Date().toISOString(),
      });
      setSubmitted(true);
      setOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0f5] pb-4">
        <div>
          <h3 className="text-base font-bold text-[#17233b]">
            Customer Reviews & Feedback
          </h3>
          <p className="mt-0.5 text-xs text-[#8491a5]">
            {reviews.length > 0
              ? `Based on ${reviews.length} verified customer ${
                  reviews.length === 1 ? "review" : "reviews"
                }`
              : "No reviews submitted yet"}
          </p>
        </div>
        {!open && !submitted && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#dce5f3] bg-white px-3.5 py-2 text-xs font-bold text-[#2563eb] shadow-2xs transition hover:bg-[#eff4ff] active:scale-98"
            onClick={() => setOpen(true)}
          >
            <MessageSquarePlus size={15} /> Write a Review
          </button>
        )}
      </div>

      {submitted && (
        <div className="flex items-center gap-2 rounded-xl bg-[#e9f8ed] p-4 text-xs font-bold text-[#16803b] border border-[#bbf0cb]">
          <CheckCircle size={18} /> Thank you! Your review has been submitted
          successfully.
        </div>
      )}

      {/* Write Review Form */}
      {open && (
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#dce5f3] bg-[#f8fafd] p-5 shadow-2xs"
        >
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold text-[#17233b]">
              Share Your Experience
            </h4>
            <span className="text-[11px] text-[#64748b]">
              Your feedback helps fellow shoppers
            </span>
          </div>

          <div className="grid gap-3.5">
            <div className="grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
              <label className="grid gap-1 text-xs font-semibold text-[#34445f]">
                Your Name
                <input
                  name="name"
                  required
                  placeholder="e.g. Muhammad Ali"
                  className="h-9 rounded-lg border border-[#dce5f3] bg-white px-3 text-xs outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
                />
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[#34445f]">
                Overall Rating
                <div className="flex h-9 items-center gap-1.5 rounded-lg border border-[#dce5f3] bg-white px-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      className="p-1 transition hover:scale-110"
                      aria-label={`${num} star`}
                    >
                      <Star
                        size={17}
                        className={
                          num <= rating
                            ? "fill-[#f3a522] text-[#f3a522]"
                            : "text-[#cbd5e1]"
                        }
                      />
                    </button>
                  ))}
                  <span className="ml-1 text-xs font-bold text-[#17233b]">
                    {rating}/5
                  </span>
                </div>
              </label>
            </div>
            <label className="grid gap-1 text-xs font-semibold text-[#34445f]">
              Your Review
              <textarea
                name="comment"
                required
                rows="3"
                placeholder="Tell us what you liked about the build quality, sound, battery, or delivery..."
                className="rounded-lg border border-[#dce5f3] bg-white p-3 text-xs outline-none transition focus:border-[#2563eb] focus:ring-2 focus:ring-[#2563eb]/10"
              />
            </label>
            <div className="flex items-center gap-2 pt-1">
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white transition hover:bg-[#1d4ed8] active:scale-98"
              >
                Submit Review
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[#dce5f3] bg-white px-3.5 text-xs font-bold text-[#52617a] transition hover:bg-[#f4f7fc]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Rating Summary Bar when reviews exist */}
      {reviews.length > 0 && (
        <div className="grid grid-cols-1 gap-6 rounded-xl border border-[#e2e8f0] bg-[#f8fafd] p-5 sm:grid-cols-12 sm:items-center">
          {/* Average Score */}
          <div className="flex flex-col items-center justify-center text-center sm:col-span-4 sm:border-r sm:border-[#e2e8f0]">
            <span className="text-4xl font-extrabold text-[#17233b]">
              {summary.average}
            </span>
            <div className="mt-1.5 flex items-center gap-1 text-[#f3a522]">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={
                    i < Math.round(Number(summary.average))
                      ? "fill-[#f3a522] text-[#f3a522]"
                      : "text-[#cbd5e1]"
                  }
                />
              ))}
            </div>
            <p className="mt-1 text-xs font-medium text-[#64748b]">
              Based on {summary.total} verified {summary.total === 1 ? "rating" : "ratings"}
            </p>
          </div>

          {/* Star Distribution Progress Bars */}
          <div className="space-y-1.5 sm:col-span-8 sm:pl-2">
            {[5, 4, 3, 2, 1].map((starNum) => {
              const pct = summary.distribution[starNum - 1] || 0;
              return (
                <div key={starNum} className="flex items-center gap-2 text-xs">
                  <span className="flex w-12 items-center gap-1 font-semibold text-[#475569]">
                    {starNum} <Star size={11} className="fill-[#f3a522] text-[#f3a522]" />
                  </span>
                  <div className="h-2 flex-1 overflow-hidden rounded-full bg-[#e2e8f0]">
                    <div
                      className="h-full rounded-full bg-[#2563eb] transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <span className="w-9 text-right text-[11px] font-medium text-[#64748b]">
                    {pct}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Reviews List or Empty State */}
      {reviews.length > 0 ? (
        <div className="divide-y divide-[#edf0f5]">
          {reviews.map((review) => (
            <article
              className="py-4 first:pt-2 last:pb-0"
              key={review.id || review.date || Math.random()}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid size-7 place-items-center rounded-full bg-[#eff4ff] text-xs font-bold text-[#2563eb]">
                    {(review.name || review.customer || "V").charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <b className="text-xs font-bold text-[#17233b]">
                      {review.name || review.customer || "Verified Shopper"}
                    </b>
                    <span className="ml-2 inline-flex items-center gap-1 rounded bg-[#e9f8ed] px-1.5 py-0.5 text-[10px] font-semibold text-[#16803b]">
                      Verified Purchase
                    </span>
                  </div>
                </div>
                {review.date && (
                  <time className="text-xs text-[#8491a5]">
                    {new Date(review.date).toLocaleDateString("en-PK", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </time>
                )}
              </div>
              <div className="mt-2 flex items-center gap-1 text-xs text-[#f3a522]">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    size={13}
                    className={
                      i < (review.rating || 5)
                        ? "fill-[#f3a522] text-[#f3a522]"
                        : "text-[#cbd5e1]"
                    }
                  />
                ))}
                <span className="ml-1 text-xs font-bold text-[#34445f]">
                  {review.rating || 5}/5
                </span>
              </div>
              <p className="mt-2 text-xs leading-6 text-[#475569]">
                {review.comment || review.text || review.review}
              </p>
            </article>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[#cbd5e1] bg-[#f8fafd] py-10 px-4 text-center">
          <div className="grid size-12 place-items-center rounded-full bg-[#eff4ff] text-[#2563eb] shadow-2xs">
            <MessageSquare size={22} />
          </div>
          <h4 className="mt-3 text-sm font-bold text-[#17233b]">
            No reviews yet
          </h4>
          <p className="mt-1 text-xs text-[#64748b] max-w-sm">
            Be the first to review this product and help other Pakistani shoppers make the right choice!
          </p>
          {!open && !submitted && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#2563eb] px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-[#1d4ed8] active:scale-98"
            >
              <MessageSquarePlus size={15} /> Be the first to review this product
            </button>
          )}
        </div>
      )}
    </div>
  );
}
