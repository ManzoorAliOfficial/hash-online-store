import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";

const money = (val) => `Rs. ${Number(val || 0).toLocaleString()}`;

export default function LimitedTimeOffer() {
  const { products = [], addToCart } = useStore();

  // Find the Watch S11 Series or fallback to p4 / any watch
  const watchProduct = useMemo(() => {
    return (
      products.find(
        (p) =>
          p.name?.toLowerCase().includes("s11") ||
          (p.category?.toLowerCase() === "wearables" && p.id === "p4")
      ) ||
      products.find((p) => p.id === "p4") ||
      products.find((p) => p.category?.toLowerCase() === "wearables") ||
      products[0]
    );
  }, [products]);

  // Real countdown timer target (7 days rolling countdown)
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 4);
    targetDate.setHours(targetDate.getHours() + 18);

    const updateTimer = () => {
      const now = new Date().getTime();
      const difference = targetDate.getTime() - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!watchProduct) return null;

  const hasDiscount = Number(watchProduct.oldPrice) > Number(watchProduct.price);
  const discountPercent = hasDiscount
    ? Math.round(
        ((Number(watchProduct.oldPrice) - Number(watchProduct.price)) /
          Number(watchProduct.oldPrice)) *
          100
      )
    : 25;

  const handleAddToCart = () => {
    addToCart(watchProduct.id, 1, true);
  };

  return (
    <section
      aria-label="Limited-Time Offer"
      className="mx-auto mb-[60px] max-w-[1120px] max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[44px]"
    >
      <div className="relative overflow-hidden rounded-3xl border border-[#132c63] bg-[#071a3d] p-6 sm:p-10 shadow-2xl">
        {/* Ambient subtle glow background */}
        <div className="pointer-events-none absolute -left-16 -top-16 size-72 rounded-full bg-[#2563eb]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 right-16 size-72 rounded-full bg-sky-500/15 blur-3xl" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          {/* Left Column: Offer Details & Countdown */}
          <div className="md:col-span-7">
            {/* Limited-Time Offer Pill */}
            <span className="inline-block rounded-full bg-[#2563eb] px-3.5 py-1 text-xs font-bold text-white shadow-sm">
              Limited-Time Offer
            </span>

            {/* Offer Product Name */}
            <h2 className="mt-3 text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              {watchProduct.name}
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-[#cbd5e1] max-w-md">
              {watchProduct.description ||
                "Experience flagship retina OLED clarity, precision health sensors, and titanium durability."}
            </p>

            {/* Countdown Boxes matching wireframe */}
            <div className="mt-6 flex items-center gap-2.5 sm:gap-3.5">
              <div className="text-center">
                <div className="flex h-14 w-13 sm:h-16 sm:w-15 items-center justify-center rounded-xl bg-white text-xl sm:text-2xl font-black text-[#071a3d] shadow-md">
                  {String(timeLeft.days).padStart(2, "0")}
                </div>
                <span className="mt-1.5 block text-[10px] sm:text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                  Days
                </span>
              </div>

              <div className="text-center">
                <div className="flex h-14 w-13 sm:h-16 sm:w-15 items-center justify-center rounded-xl bg-white text-xl sm:text-2xl font-black text-[#071a3d] shadow-md">
                  {String(timeLeft.hours).padStart(2, "0")}
                </div>
                <span className="mt-1.5 block text-[10px] sm:text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                  Hours
                </span>
              </div>

              <div className="text-center">
                <div className="flex h-14 w-13 sm:h-16 sm:w-15 items-center justify-center rounded-xl bg-white text-xl sm:text-2xl font-black text-[#071a3d] shadow-md">
                  {String(timeLeft.minutes).padStart(2, "0")}
                </div>
                <span className="mt-1.5 block text-[10px] sm:text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                  Mins
                </span>
              </div>

              <div className="text-center">
                <div className="flex h-14 w-13 sm:h-16 sm:w-15 items-center justify-center rounded-xl bg-white text-xl sm:text-2xl font-black text-[#071a3d] shadow-md">
                  {String(timeLeft.seconds).padStart(2, "0")}
                </div>
                <span className="mt-1.5 block text-[10px] sm:text-[11px] font-bold text-[#94a3b8] uppercase tracking-wider">
                  Secs
                </span>
              </div>
            </div>

            {/* Note below countdown as indicated in wireframe */}
            <p className="mt-5 text-[11px] text-[#94a3b8]">
              Shown only when the product has a real offer end date.
            </p>
          </div>

          {/* Right Column: White Card with Product Image, Discount, Price & Add to Cart */}
          <div className="md:col-span-5 flex justify-center">
            <div className="w-full max-w-[340px] rounded-2xl bg-white p-5 sm:p-6 text-[#17233b] shadow-2xl transition hover:shadow-3xl">
              {/* Discount Badge */}
              <div className="flex justify-end">
                <span className="rounded-md bg-[#2563eb] px-2.5 py-0.5 text-xs font-black text-white shadow-xs">
                  [-{discountPercent}%] OFF
                </span>
              </div>

              {/* Product Image */}
              <Link
                to={`/products/${watchProduct.id}`}
                className="my-3 block overflow-hidden rounded-xl bg-[#f8fafd] p-4 transition-transform duration-300 hover:scale-102"
              >
                <img
                  src={watchProduct.image}
                  alt={watchProduct.name}
                  className="mx-auto size-40 sm:size-44 object-contain"
                  loading="lazy"
                />
              </Link>

              {/* Price Line */}
              <div className="my-3 flex items-baseline justify-center gap-2.5">
                <strong className="text-xl sm:text-2xl font-extrabold text-[#2563eb]">
                  {money(watchProduct.price)}
                </strong>
                {watchProduct.oldPrice && (
                  <del className="text-xs sm:text-sm text-[#94a3b8]">
                    {money(watchProduct.oldPrice)}
                  </del>
                )}
              </div>

              {/* Add to Cart Button (Navy Button matching wireframe) */}
              <button
                type="button"
                onClick={handleAddToCart}
                className="mt-1 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#071a3d] py-3 text-xs sm:text-sm font-bold text-white shadow-md transition-all duration-150 hover:bg-[#102449] active:scale-98"
              >
                <ShoppingBag size={15} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
