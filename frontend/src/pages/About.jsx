import { Link } from "react-router";
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Target,
  Truck,
} from "lucide-react";
import PageHeading from "../components/Common/PageHeading";
import Container from "../components/Layout/Container";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Our promise",
    text: "100% authentic products and honest customer service.",
  },
  {
    icon: Target,
    title: "Our mission",
    text: "Make online shopping in Pakistan simple, safe and reliable.",
  },
];

const reasons = [
  {
    icon: BadgeCheck,
    title: "Quality checked",
    text: "Every item is checked before it is dispatched.",
  },
  {
    icon: Truck,
    title: "Fast delivery",
    text: "Secure courier delivery to cities across Pakistan.",
  },
  {
    icon: Headphones,
    title: "Friendly support",
    text: "Quick help with orders, returns and product questions.",
  },
];

export default function About() {
  return (
    <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
      <PageHeading eyebrow="OUR STORY" title="About Hash Online Store">
        <p>Quality Products. Fast Delivery. Trusted Shopping.</p>
      </PageHeading>

      <div className="grid grid-cols-2 gap-8 max-[800px]:grid-cols-1">
        <div className="rounded-xl border border-[#e4eaf3] bg-white p-7 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
          <h2 className="text-2xl font-bold tracking-[-.04em] text-[#17233b]">
            Discover Better. Choose Smarter. Shop Easier.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#71809a]">
            Hash Online Store is your destination for useful technology and
            everyday accessories. We focus on clear product information,
            dependable service and a smooth shopping experience.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#71809a]">
            From browsing and ordering to doorstep delivery, we make every step
            straightforward so you can shop with confidence.
          </p>

          <div className="my-6 grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="grid gap-1.5 rounded-lg bg-[#f4f7fc] p-4"
              >
                <Icon className="size-5 text-[#2563eb]" />
                <b className="text-xs font-bold text-[#17233b]">{title}</b>
                <small className="text-[11px] leading-4 text-[#71809a]">
                  {text}
                </small>
              </div>
            ))}
          </div>

          <ul className="mb-6 grid gap-3">
            {reasons.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex items-start gap-3">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-[#eaf1ff]">
                  <Icon className="size-4 text-[#2563eb]" />
                </span>
                <div>
                  <b className="block text-xs font-bold text-[#17233b]">
                    {title}
                  </b>
                  <span className="text-[11px] leading-4 text-[#71809a]">
                    {text}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <Link
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc] active:scale-[0.99]"
            to="/products"
          >
            Explore collection <ArrowRight size={15} />
          </Link>
        </div>

        <div className="overflow-hidden rounded-xl border border-[#e4eaf3] shadow-[0_4px_16px_rgba(16,36,73,.05)]">
          <img
            className="h-full min-h-[330px] w-full object-cover transition duration-300 hover:scale-105"
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&h=1000&q=85"
            alt="Online shopping with delivery packages and a laptop"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </Container>
  );
}