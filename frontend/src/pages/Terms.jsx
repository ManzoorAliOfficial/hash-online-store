import { Link } from "react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import PageHeading from "../components/Common/PageHeading";
import Container from "../components/Layout/Container";

export default function Terms() {
  return (
    <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
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
            This frontend demo uses browser-local catalog and order data. It
            does not connect to live inventory, payment processing, or courier
            tracking services.
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
            discounts are sample data for this frontend demo and are not a live
            inventory feed.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Orders and payment
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            Checkout demonstrates Cash on Delivery (COD). Orders are stored in
            this browser only; no payment is processed. Online card checkout
            requires a connected payment provider.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Delivery and logistics
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            Courier settings in this demo are previews only. The site does not
            book shipments or provide live courier tracking. Actual delivery
            availability and transit times must be confirmed by the store.
          </p>
        </section>
        <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_2px_8px_rgba(16,36,73,.02)]">
          <h2 className="text-sm font-bold text-[#17233b]">
            Returns, replacements and customer support
          </h2>
          <p className="mt-2 text-xs leading-6 text-[#71809a]">
            The 7-day checking and replacement window shown here is sample demo
            policy text. Confirm the store’s current return policy before
            placing a real order.
          </p>
          <Link
            to="/contact"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174fcc]"
          >
            Contact support <ArrowRight size={14} />
          </Link>
        </section>
      </div>
    </Container>
  );
}
