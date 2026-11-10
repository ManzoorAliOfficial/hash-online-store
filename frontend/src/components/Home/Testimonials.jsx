import { Star, CheckCircle2, Sparkles } from "lucide-react";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section
      aria-label="Customer reviews"
      className="mx-auto mb-[76px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]"
    >
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-extrabold tracking-[.14em] text-[#2563eb]">
            <Sparkles size={13} className="text-[#2563eb]" />
            <span>COMMUNITY PROOF</span>
          </div>
          <h2 className="mt-1.5 text-[28px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Trusted by tech lovers nationwide
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#71809a]">
            Real feedback and ratings from verified buyers across Pakistan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 max-[900px]:grid-cols-1">
        {testimonials.map((review) => (
          <article
            className="flex flex-col justify-between rounded-2xl border border-[#e5ecf6] bg-white p-6 shadow-[0_4px_16px_rgba(23,35,59,0.03)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563eb] hover:shadow-[0_12px_28px_rgba(37,99,235,0.08)]"
            key={review.name}
          >
            <div>
              {/* Stars & Verified Badge */}
              <div className="flex items-center justify-between">
                <div
                  className="flex gap-1 text-[#f3a522]"
                  aria-label={`${review.rating} out of 5 stars`}
                >
                  {Array.from({ length: review.rating }, (_, index) => (
                    <Star key={index} size={15} fill="currentColor" />
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 rounded-md bg-[#e9f8ed] px-2.5 py-0.5 text-xs font-bold text-[#16803b]">
                  <CheckCircle2 size={13} /> Verified Buyer
                </span>
              </div>

              {/* Review Text */}
              <p className="my-4 text-xs leading-6 text-[#536079] sm:text-sm">
                “{review.quote}”
              </p>
            </div>

            {/* Author with Avatar Initials */}
            <div className="flex items-center gap-3 border-t border-[#edf0f5] pt-3.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-full bg-[#eff4ff] text-xs font-bold text-[#2563eb]">
                {review.initials}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <b className="truncate text-xs font-bold text-[#17233b]">
                    {review.name}
                  </b>
                  <span className="text-xs text-[#8491a5]">{review.city}</span>
                </div>
                <span className="block truncate text-xs font-semibold text-[#2563eb]">
                  Purchased: {review.product}
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
