import { Star } from "lucide-react";
const reviews = [
  {
    name: "Ayesha K.",
    city: "Lahore",
    quote:
      "The order arrived quickly, was carefully packed, and matched the product details.",
  },
  {
    name: "Hamza R.",
    city: "Karachi",
    quote:
      "A smooth shopping experience and helpful updates from checkout to delivery.",
  },
  {
    name: "Sara M.",
    city: "Islamabad",
    quote: "Great selection and an easy way to find the tech I needed.",
  },
];
export default function Testimonials() {
  return (
    <section className="mx-auto mb-[76px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px]">
      <div className="mb-6">
        <div>
          <span className="text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
            SHOPPER STORIES
          </span>
          <h2 className="mt-2 text-[30px] font-bold tracking-[-.05em] text-[#071a3d] max-[600px]:text-2xl">
            Trusted by our community
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-[17px] max-[700px]:grid-cols-1">
        {reviews.map((review) => (
          <article
            className="rounded-xl border border-[#edf0f5] bg-white p-6 shadow-[0_8px_24px_rgba(16,36,73,.04)]"
            key={review.name}
          >
            <div
              className="flex gap-1 text-[#f3a522]"
              aria-label="5 out of 5 stars"
            >
              {Array.from({ length: 5 }, (_, index) => (
                <Star key={index} size={15} fill="currentColor" />
              ))}
            </div>
            <p className="my-4 text-[13px] leading-6 text-[#536079]">
              “{review.quote}”
            </p>
            <b className="block text-xs text-[#17233b]">{review.name}</b>
            <small className="text-[10px] text-[#8491a5]">{review.city}</small>
          </article>
        ))}
      </div>
    </section>
  );
}
