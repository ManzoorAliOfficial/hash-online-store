import { Link } from "react-router";
import { ArrowRight, CircleHelp, House, ShoppingBag } from "lucide-react";
import Container from "../components/Layout/Container";

export default function NotFound({ admin = false }) {
  if (admin)
    return (
      <section className="grid min-h-[60vh] place-items-center p-8 text-center">
        <div>
          <span className="text-7xl font-black tracking-[-.1em] text-[#dce9ff]">
            404
          </span>
          <div className="mx-auto mt-3 grid size-14 place-items-center rounded-full bg-[#eff4ff] text-[#2563eb]">
            <CircleHelp size={26} />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#17233b]">
            Page not found
          </h1>
          <p className="mt-2 text-sm text-[#71809a]">
            The admin page you’re looking for may have moved or may not exist.
          </p>
          <div className="mt-5 flex justify-center gap-2">
            <Link
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white"
              to="/admin"
            >
              <House size={16} /> Admin dashboard
            </Link>
            <Link
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-[#dce5f3] bg-white px-4 text-xs font-bold text-[#34445f]"
              to="/"
            >
              <ShoppingBag size={16} /> View storefront
            </Link>
          </div>
        </div>
      </section>
    );
  return (
    <Container as="main" className="grid min-h-[65vh] place-items-center py-10">
      <section className="grid w-full max-w-3xl grid-cols-[.8fr_1.2fr] overflow-hidden rounded-2xl border border-[#e4eaf3] bg-white shadow-[0_18px_45px_rgba(16,36,73,.08)] max-[700px]:grid-cols-1">
        <div
          className="relative grid min-h-[320px] place-items-center overflow-hidden bg-[radial-gradient(circle_at_50%_40%,#dce9ff,#eef3fb_65%)]"
          aria-hidden="true"
        >
          <span className="text-8xl font-black tracking-[-.1em] text-[#2563eb]">
            404
          </span>
          <div className="absolute grid size-16 place-items-center rounded-full bg-white text-[#2563eb] shadow-lg">
            <ShoppingBag size={42} />
          </div>
          <span className="absolute size-48 rounded-full border border-[#8ab4ff]/40" />
          <span className="absolute size-64 rounded-full border border-[#8ab4ff]/25" />
        </div>
        <div className="p-9 max-[600px]:p-6">
          <span className="text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
            HASH ONLINE STORE
          </span>
          <h1 className="mt-2 text-[33px] font-bold tracking-[-.05em] text-[#071a3d]">
            Oops! Page not found
          </h1>
          <p className="mt-3 text-sm leading-6 text-[#71809a]">
            The page you’re looking for may be outdated, or the address may have
            changed. Let’s get you back to something good.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <Link
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-4 text-xs font-bold text-white"
              to="/"
            >
              <House size={16} /> Back to home
            </Link>
            <Link
              className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-[#dce5f3] bg-white px-4 text-xs font-bold text-[#34445f]"
              to="/products"
            >
              Browse products <ArrowRight size={16} />
            </Link>
          </div>
          <Link
            className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] hover:text-[#174fcc]"
            to="/contact"
          >
            <CircleHelp size={15} /> Need help? Contact our team
          </Link>
        </div>
      </section>
    </Container>
  );
}
