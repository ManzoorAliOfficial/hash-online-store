import { useState } from "react";
import { Star, MessageSquarePlus, CheckCircle } from "lucide-react";

export default function ProductReviews({ reviews = [], onAddReview }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [submitted, setSubmitted] = useState(false);

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
    <section className="mt-8 rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 border-b border-[#edf0f5] pb-4">
        <div>
          <h2 className="text-base font-bold text-[#17233b]">
            Customer Reviews
          </h2>
          <p className="mt-0.5 text-xs text-[#8491a5]">
            {reviews.length} customer feedback entries
          </p>
        </div>
        {!open && !submitted && (
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#dce5f3] bg-white px-3 py-1.5 text-xs font-bold text-[#2563eb] transition hover:bg-[#eff4ff]"
            onClick={() => setOpen(true)}
          >
            <MessageSquarePlus size={14} /> Write a review
          </button>
        )}
      </div>

      {submitted && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-[#e9f8ed] p-3 text-xs font-bold text-[#16803b]">
          <CheckCircle size={16} /> Thank you! Your review has been submitted
          for approval.
        </div>
      )}

      {open && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 rounded-lg border border-[#e4eaf3] bg-[#f8fafd] p-4"
        >
          <h3 className="mb-3 text-xs font-bold text-[#17233b]">
            Leave your review
          </h3>
          <div className="grid gap-3">
            <div className="grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
              <label className="grid gap-1 text-xs font-semibold text-[#34445f]">
                Your name
                <input
                  name="name"
                  required
                  placeholder="e.g. Ali Khan"
                  className="h-9 rounded-md border border-[#dce5f3] bg-white px-3 text-xs outline-none focus:border-[#2563eb]"
                />
              </label>
              <label className="grid gap-1 text-xs font-semibold text-[#34445f]">
                Rating
                <div className="flex h-9 items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRating(num)}
                      className="p-1 transition hover:scale-110"
                      aria-label={`${num} star`}
                    >
                      <Star
                        size={18}
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
              Your experience
              <textarea
                name="comment"
                required
                rows="3"
                placeholder="Share your thoughts about this product..."
                className="rounded-md border border-[#dce5f3] bg-white p-2.5 text-xs outline-none focus:border-[#2563eb]"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="submit"
                className="inline-flex h-9 items-center justify-center rounded-md bg-[#2563eb] px-4 text-xs font-bold text-white transition hover:bg-[#174fcc]"
              >
                Submit review
              </button>
              <button
                type="button"
                className="inline-flex h-9 items-center justify-center rounded-md border border-[#dce5f3] bg-white px-3 text-xs font-bold text-[#52617a] transition hover:bg-[#f4f7fc]"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      )}

      {reviews.length ? (
        <div className="divide-y divide-[#edf0f5]">
          {reviews.map((review) => (
            <article
              className="py-4 first:pt-0 last:pb-0"
              key={review.id || review.date}
            >
              <div className="flex items-center justify-between">
                <b className="text-xs font-bold text-[#17233b]">
                  {review.name || review.customer || "Verified shopper"}
                </b>
                {review.date && (
                  <small className="text-[10px] text-[#8491a5]">
                    {new Date(review.date).toLocaleDateString("en-PK", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </small>
                )}
              </div>
              <div className="mt-1 flex items-center gap-1 text-xs text-[#f3a522]">
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
                <span className="ml-1 text-[11px] font-bold text-[#34445f]">
                  {review.rating || 5}/5
                </span>
              </div>
              <p className="mt-2 text-xs leading-6 text-[#71809a]">
                {review.comment || review.text || review.review}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <p className="py-2 text-xs text-[#8491a5]">
          Be the first to share your experience with this item.
        </p>
      )}
    </section>
  );
}
