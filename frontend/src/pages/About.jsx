import { Link } from "react-router";
import { ArrowRight, ShieldCheck, ShoppingBag, Truck } from "lucide-react";
import PageHeading from "../components/Common/PageHeading";

export default function About() {
  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
      <PageHeading eyebrow="OUR STORY" title="About Hash Online Store">
        <p>Quality Products. Fast Delivery. Trusted Shopping.</p>
      </PageHeading>

      <div className="grid grid-cols-2 gap-8 max-[800px]:grid-cols-1">
        <div className="rounded-xl border border-[#e4eaf3] bg-white p-7 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
          <h2 className="text-2xl font-bold tracking-[-.04em] text-[#17233b]">
            Good products, made easy to find.
          </h2>
          <p className="mt-4 text-sm leading-7 text-[#71809a]">
            Hash Online Store brings together useful technology and everyday
            accessories with a focus on transparent information, dependable
            service, and a delightful shopping experience.
          </p>
          <p className="mt-4 text-sm leading-7 text-[#71809a]">
            We aim to make choosing, ordering and receiving quality gadgets and
            gear feel straightforward and seamless from start to finish.
          </p>
          <div className="my-6 grid grid-cols-2 gap-3 max-[500px]:grid-cols-1">
            <div className="grid gap-1.5 rounded-lg bg-[#f4f7fc] p-4">
              <ShieldCheck className="size-5 text-[#2563eb]" />
              <b className="text-xs font-bold text-[#17233b]">Our promise</b>
              <small className="text-[11px] leading-4 text-[#71809a]">
                Authentic products and honest customer service.
              </small>
            </div>
            <div className="grid gap-1.5 rounded-lg bg-[#f4f7fc] p-4">
              <Truck className="size-5 text-[#2563eb]" />
              <b className="text-xs font-bold text-[#17233b]">Our mission</b>
              <small className="text-[11px] leading-4 text-[#71809a]">
                Fast, secure courier delivery across Pakistan.
              </small>
            </div>
          </div>
          <Link
            className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc] active:scale-[0.99]"
            to="/products"
          >
            Explore collection <ShoppingBag size={15} /> <ArrowRight size={15} />
          </Link>
        </div>
        <div className="overflow-hidden rounded-xl border border-[#e4eaf3] shadow-[0_4px_16px_rgba(16,36,73,.05)]">
          <img
            className="h-full min-h-[330px] w-full object-cover transition duration-300 hover:scale-105"
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&h=1000&q=85"
            alt="Modern retail shop interior"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </main>
  );
}
