import { ArrowRight, Headphones, Smartphone } from "lucide-react";
import { Link } from "react-router";
export default function PromoBanner() {
  return (
    <section className="relative mx-auto mb-[75px] flex min-h-[270px] max-w-[1120px] justify-between overflow-hidden rounded-[17px] bg-[#15366e] px-[7%] py-[42px] text-white max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px] max-[600px]:min-h-0 max-[600px]:px-6 max-[600px]:py-8">
      <div className="relative z-[1]">
        <span className="text-[10px] font-extrabold tracking-[.14em] text-[#a9c6ff]">
          A LITTLE UPGRADE GOES A LONG WAY
        </span>
        <h2 className="my-[11px] text-[33px] font-bold leading-[1.1] tracking-[-.04em] max-[600px]:text-[27px]">
          Make room for
          <br />
          something better.
        </h2>
        <p className="text-xs text-[#d1ddf4]">
          Fresh tech finds are waiting. Discover your next everyday essential.
        </p>
        <Link
          className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-[17px] py-[13px] text-xs font-bold text-[#17366c] transition hover:-translate-y-0.5 hover:shadow-lg"
          to="/products"
        >
          Explore the collection <ArrowRight size={15} />
        </Link>
      </div>
      <div className="relative grid w-[40%] place-items-center max-[600px]:absolute max-[600px]:-right-10 max-[600px]:-bottom-6 max-[600px]:w-40 max-[600px]:opacity-50">
        <Headphones className="size-28 drop-shadow-[0_15px_20px_#0004]" />
        <Smartphone className="absolute -bottom-2.5 right-[15%] size-[85px] rotate-[-13deg]" />
      </div>
    </section>
  );
}
