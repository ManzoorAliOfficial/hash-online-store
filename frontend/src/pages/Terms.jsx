import { Link } from "react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import PageHeading from "../components/Common/PageHeading";

export default function Terms() {
  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
      <PageHeading eyebrow="STORE INFORMATION" title="Terms & Conditions">
        <p>
          A clear overview of how Hash Online Store policies and orders work.
        </p>
      </PageHeading>

      <div className="mb-6 flex gap-4 rounded-xl border border-[#bfd4ff] bg-[#eff4ff] p-5 text-[#34445f]">
        <ShieldCheck className="size-6 shrink-0 text-[#2563eb]" />
        <div>
          <b className="text-sm font-bold text-[#17233b]">
            Storefront & ordering notice
          </b>
          <p className="mt-1.5 text-xs leading-6 text-[#52617a]">
            Hash Online Store provides an authentic collection of consumer
            technology and lifestyle accessories. All orders are processed with
            verified parcel tracking and transparent delivery status updates.
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Products and pricing
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            Product descriptions, prices in PKR, stock counts, and promotional
            discounts reflect current store inventory and are updated in real
            time.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Orders and payment
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            Cash on Delivery (COD) is available nationwide. Online credit/debit
            card checkout will be supported directly via secure payment
            gateways.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Delivery and logistics
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            Deliveries are handled by licensed domestic courier partners (TCS,
            Leopards, Trax, M&P). Standard transit times range between 2 to 4
            business days.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Returns, replacements and customer support
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            We provide a 7-day checking and replacement window for any
            manufacturer defects or transit damage. Please contact our support
            team for prompt resolution.
          </p>
          <Link
            to="/contact"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174fcc]"
          >
            Contact support <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </main>
  );
}
