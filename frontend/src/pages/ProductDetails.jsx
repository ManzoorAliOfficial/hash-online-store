import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  FileText,
  ListFilter,
  MessageSquare,
  HelpCircle,
  CheckCircle2,
  Box,
  ShieldCheck,
  RotateCcw,
  Banknote,
  ChevronDown,
  ShoppingBag,
  History,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import EmptyState from "../components/Common/EmptyState";
import ProductGallery from "../components/ProductDetails/ProductGallery";
import ProductInfo from "../components/ProductDetails/ProductInfo";
import DeliveryInformation from "../components/ProductDetails/DeliveryInformation";
import ProductSpecifications from "../components/ProductDetails/ProductSpecifications";
import ProductReviews from "../components/ProductDetails/ProductReviews";
import RelatedProducts from "../components/ProductDetails/RelatedProducts";
import ProductCard from "../components/Common/ProductCard";
import WhatsAppIcon from "../components/Common/WhatsAppIcon";
import { buildProductMessage, openWhatsApp } from "../utils/whatsapp";
import { notify } from "../components/Common/Toast";

const money = (val) => `Rs. ${Number(val || 0).toLocaleString()}`;

export default function ProductDetails() {
  const { id } = useParams();
  const { products, reviews, saveReview, addToCart, settings } = useStore();
  const product = products.find((x) => x.id === id);
  const [activeTab, setActiveTab] = useState("description");
  const [openFaq, setOpenFaq] = useState(null);

  // Recently Viewed persistence in localStorage
  useEffect(() => {
    if (!product?.id) return;
    try {
      const stored = JSON.parse(
        localStorage.getItem("hash_recently_viewed") || "[]",
      );
      const filtered = stored.filter((item) => item !== product.id);
      const updated = [product.id, ...filtered].slice(0, 8);
      localStorage.setItem("hash_recently_viewed", JSON.stringify(updated));
    } catch {
      // localStorage disabled or private browsing
    }
  }, [product?.id]);

  if (!product) {
    return (
      <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
        <PageHeading eyebrow="CATALOG" title="Product not found" />
        <EmptyState
          title="Product not available"
          message="The product you are looking for may have been removed or the link might be incorrect."
          action="Browse catalog"
          to="/products"
        />
      </main>
    );
  }

  const productReviews = reviews.filter(
    (r) =>
      r.productId === product.id ||
      r.product === product.name ||
      r.productName === product.name,
  );

  // Retrieve recently viewed products from localStorage (excluding current item)
  let recentlyViewedIds = [];
  try {
    recentlyViewedIds = JSON.parse(
      localStorage.getItem("hash_recently_viewed") || "[]",
    ).filter((item) => item !== product.id);
  } catch {
    recentlyViewedIds = [];
  }
  const recentlyViewedProducts = recentlyViewedIds
    .map((recId) => products.find((p) => p.id === recId))
    .filter(Boolean)
    .slice(0, 4);

  const inStock = Number(product.stock || 0) > 0;

  // Tabs definitions
  const tabs = [
    { id: "description", label: "Description", icon: FileText },
    { id: "specifications", label: "Specifications", icon: ListFilter },
    {
      id: "reviews",
      label:
        productReviews.length > 0
          ? `Reviews (${productReviews.length})`
          : "Reviews",
      icon: MessageSquare,
    },
    { id: "faq", label: "FAQ", icon: HelpCircle },
  ];

  // Keyboard navigation for WAI-ARIA tabs pattern
  const handleTabKeyDown = (e) => {
    const tabIds = tabs.map((t) => t.id);
    const currentIndex = tabIds.indexOf(activeTab);

    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex = (currentIndex + 1) % tabIds.length;
      setActiveTab(tabIds[nextIndex]);
      document.getElementById(`tab-${tabIds[nextIndex]}`)?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex = (currentIndex - 1 + tabIds.length) % tabIds.length;
      setActiveTab(tabIds[prevIndex]);
      document.getElementById(`tab-${tabIds[prevIndex]}`)?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      setActiveTab(tabIds[0]);
      document.getElementById(`tab-${tabIds[0]}`)?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      setActiveTab(tabIds[tabIds.length - 1]);
      document.getElementById(`tab-${tabIds[tabIds.length - 1]}`)?.focus();
    }
  };

  // Dynamic Key Highlights based on product details
  const highlights = [
    "100% Genuine Sealed Stock sourced directly from certified suppliers",
    product.warranty || "12 Months Official Brand Warranty with hassle-free claim support",
    product.category?.toLowerCase() === "phones"
      ? "Official PTA Approved / SIM-ready with genuine IMEI registration"
      : "Rigorous multi-point quality checked before dispatch",
    "Cash on Delivery (COD) available across 200+ cities in Pakistan",
    "7-Day Replacement Guarantee for any technical or manufacturing fault",
    "Swift express courier delivery with live tracking SMS notifications",
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: "Are products 100% genuine and authentic?",
      a: "Yes, absolutely! At Hash Online Store, every single item is guaranteed 100% genuine, brand-new, and sealed in its original manufacturer packaging. We do not sell cloned or refurbished products.",
    },
    {
      q: "How does Cash on Delivery (COD) work?",
      a: "With Cash on Delivery, you don't pay anything in advance. Once the courier delivers your package to your doorstep, you inspect the external parcel seal and hand the cash to the courier rider.",
    },
    {
      q: "What is the 7-Day Replacement Guarantee?",
      a: "If you encounter any manufacturing defect or technical hardware issue within 7 days of receiving your item, our support team will promptly arrange a hassle-free replacement.",
    },
    {
      q: "How long does shipping take across Pakistan?",
      a: "Orders for major cities (Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad) typically arrive within 2-3 business days. Delivery to other cities and regional areas takes 3-4 business days.",
    },
  ];

  const handleWhatsAppInquiry = () => {
    const pageUrl = typeof window !== "undefined" ? window.location.href : "";
    const msg = `Assalam-o-Alaikum Hash Online Store! I have a question about this product:\n\n*${product.name}*\nPrice: ${money(product.price)}\nLink: ${pageUrl}\n\nPlease share more details.`;
    openWhatsApp(msg, settings?.whatsappNumber);
  };

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8 pb-28 md:pb-16">
      <PageHeading eyebrow={product.category} title={product.name}>
        <p>{product.description}</p>
      </PageHeading>

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-2 gap-8 lg:gap-12 max-[850px]:grid-cols-1">
        <ProductGallery product={product} />
        <div>
          <ProductInfo product={product} />
          <DeliveryInformation />
        </div>
      </div>

      {/* Product Details Tabs (Description / Specifications / Reviews / FAQ) */}
      <section className="mt-12 overflow-hidden rounded-2xl border border-[#e4eaf3] bg-white shadow-sm">
        {/* Tab Headers - Horizontally scrollable on mobile */}
        <div
          role="tablist"
          aria-label="Product details and specifications"
          onKeyDown={handleTabKeyDown}
          className="flex border-b border-[#edf0f5] bg-[#f8fafd] overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                type="button"
                aria-selected={isActive}
                aria-controls={`tabpanel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 min-w-[125px] flex-1 items-center justify-center gap-2 border-b-2 py-3.5 px-4 text-xs font-bold transition-all sm:min-w-0 sm:py-4 sm:text-sm ${
                  isActive
                    ? "border-[#2563eb] bg-white text-[#2563eb] shadow-2xs"
                    : "border-transparent text-[#64748b] hover:bg-[#eff4ff]/60 hover:text-[#17233b]"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="p-6 sm:p-8">
          {/* Description Tab Panel */}
          {activeTab === "description" && (
            <div
              role="tabpanel"
              id="tabpanel-description"
              aria-labelledby="tab-description"
              tabIndex={0}
              className="space-y-6 outline-none"
            >
              {/* Product Overview Description with max-w-[70ch] */}
              <div>
                <h3 className="mb-2 text-base font-bold text-[#17233b]">
                  Product Overview
                </h3>
                <p className="max-w-[70ch] text-sm leading-7 text-[#52617a]">
                  {product.description ||
                    `${product.name} offers premium performance, robust construction, and modern engineering.`}{" "}
                  Engineered to meet rigorous standards with authentic components, reliable battery life, and complete coverage under manufacturer warranty.
                </p>
              </div>

              {/* Warranty Banner Line */}
              <div className="flex items-center gap-2.5 rounded-xl border border-[#bfdbfe] bg-[#eff6ff] p-3.5 text-xs text-[#1e40af]">
                <ShieldCheck size={18} className="shrink-0 text-[#2563eb]" />
                <span>
                  <strong className="font-bold">Official Warranty:</strong>{" "}
                  {product.warranty || "12 Months Official Brand Warranty"} with nationwide repair, replacement, and customer claim support.
                </span>
              </div>

              {/* Key Highlights (2-column grid) */}
              <div className="pt-2">
                <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-[#17233b]">
                  Key Highlights
                </h4>
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-[#334155]"
                    >
                      <CheckCircle2
                        size={15}
                        className="mt-0.5 shrink-0 text-[#2563eb]"
                      />
                      <span className="leading-5">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* What's in the Box List */}
              <div className="rounded-xl border border-[#edf0f5] bg-[#f8fafd] p-4.5">
                <div className="mb-2.5 flex items-center gap-2">
                  <Box size={16} className="text-[#2563eb]" />
                  <h4 className="text-xs font-bold text-[#17233b]">
                    What's in the Box
                  </h4>
                </div>
                <ul className="grid grid-cols-1 gap-2 text-xs text-[#475569] sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    <span>1x {product.name} (Sealed Retail Box)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    <span>1x Certified Fast Charging Cable / Adapter</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    <span>1x Quick User Guide & Safety Manual</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    <span>1x Official Warranty Certificate & Serial Card</span>
                  </li>
                </ul>
              </div>

              {/* Product-Aware Feature Cards (Warranty, COD, 7-Day Replacement Guarantee) */}
              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-[#edf0f5] sm:grid-cols-3">
                <div className="flex items-start gap-3 rounded-xl bg-[#f8fafd] p-4 border border-[#edf0f5]">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17233b]">
                      Official Warranty
                    </h4>
                    <p className="mt-0.5 text-xs text-[#71809a] leading-5">
                      {product.warranty || "12-Month"} manufacturer coverage for peace of mind.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#f8fafd] p-4 border border-[#edf0f5]">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
                    <Banknote size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17233b]">
                      Cash on Delivery
                    </h4>
                    <p className="mt-0.5 text-xs text-[#71809a] leading-5">
                      Pay safely at your doorstep after inspecting the sealed parcel.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#f8fafd] p-4 border border-[#edf0f5]">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
                    <RotateCcw size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17233b]">
                      7-Day Replacement Guarantee
                    </h4>
                    <p className="mt-0.5 text-xs text-[#71809a] leading-5">
                      Prompt replacement policy for any technical hardware defect.
                    </p>
                  </div>
                </div>
              </div>

              {/* Ask on WhatsApp about this product Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleWhatsAppInquiry}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#22c55e]/30 bg-[#f0fdf4] px-4 py-2.5 text-xs font-bold text-[#15803d] shadow-2xs transition hover:bg-[#22c55e] hover:text-white active:scale-98"
                >
                  <WhatsAppIcon className="size-4" />
                  <span>Ask on WhatsApp about this product</span>
                </button>
              </div>
            </div>
          )}

          {/* Specifications Tab Panel */}
          {activeTab === "specifications" && (
            <div
              role="tabpanel"
              id="tabpanel-specifications"
              aria-labelledby="tab-specifications"
              tabIndex={0}
              className="outline-none"
            >
              <ProductSpecifications product={product} />
            </div>
          )}

          {/* Reviews Tab Panel */}
          {activeTab === "reviews" && (
            <div
              role="tabpanel"
              id="tabpanel-reviews"
              aria-labelledby="tab-reviews"
              tabIndex={0}
              className="outline-none"
            >
              <ProductReviews
                reviews={productReviews}
                onAddReview={(newReview) => {
                  saveReview({
                    ...newReview,
                    productId: product.id,
                    productName: product.name,
                  });
                  notify("Review submitted successfully!");
                }}
              />
            </div>
          )}

          {/* FAQ Accordion Tab Panel */}
          {activeTab === "faq" && (
            <div
              role="tabpanel"
              id="tabpanel-faq"
              aria-labelledby="tab-faq"
              tabIndex={0}
              className="space-y-3 outline-none"
            >
              <div className="mb-4">
                <h3 className="text-base font-bold text-[#17233b]">
                  Frequently Asked Questions
                </h3>
                <p className="text-xs text-[#71809a]">
                  Everything you need to know about purchasing, warranty, and delivery
                </p>
              </div>

              <div className="space-y-2.5">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-xl border border-[#e2e8f0] bg-white transition-colors hover:border-[#cbd5e1]"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-3 p-4 text-left text-xs font-bold text-[#17233b] transition hover:bg-[#f8fafd]"
                        aria-expanded={isOpen}
                      >
                        <span>{faq.q}</span>
                        <ChevronDown
                          size={16}
                          className={`shrink-0 text-[#64748b] transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#2563eb]" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="border-t border-[#edf0f5] bg-[#f8fafd] p-4 text-xs leading-6 text-[#52617a]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Recently Viewed Products Row */}
      {recentlyViewedProducts.length > 0 && (
        <section className="mt-14">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History size={18} className="text-[#2563eb]" />
              <h2 className="text-xl font-bold text-[#17233b]">
                Recently Viewed
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold text-[#2563eb] hover:underline"
            >
              Browse more
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
            {recentlyViewedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      <RelatedProducts product={product} />

      {/* Mobile Sticky Bottom "Add to Cart" Bar */}
      <div
        className="fixed bottom-14 left-0 right-0 z-30 flex items-center justify-between border-t border-[#e2e8f0] bg-white/95 px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur-md md:hidden"
        style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 8px)" }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="size-11 shrink-0 overflow-hidden rounded-lg border border-[#e2e8f0] bg-[#f8fafd]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="size-full object-contain p-0.5"
              />
            ) : (
              <div className="grid size-full place-items-center text-[10px] font-bold text-[#94a3b8]">
                Hash
              </div>
            )}
          </div>
          <div className="min-w-0">
            <h4 className="truncate text-xs font-bold text-[#17233b]">
              {product.name}
            </h4>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-xs font-black text-[#f97316]">
                {money(product.price)}
              </strong>
              {Number(product.oldPrice) > Number(product.price) && (
                <del className="text-[10px] text-[#94a3b8]">
                  {money(product.oldPrice)}
                </del>
              )}
            </div>
          </div>
        </div>

        <div className="ml-3 flex items-center gap-2 shrink-0">
          <button
            type="button"
            disabled={!inStock}
            onClick={() => {
              const msg = buildProductMessage(product, 1);
              openWhatsApp(msg, settings?.whatsappNumber);
            }}
            title={inStock ? "Order on WhatsApp" : "Out of stock"}
            aria-label="Order on WhatsApp"
            className="grid size-9.5 place-items-center rounded-xl bg-[#25D366] text-white shadow-sm transition hover:bg-[#20ba59] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <WhatsAppIcon className="size-4.5" />
          </button>
          <button
            type="button"
            disabled={!inStock}
            onClick={() => addToCart(product.id, 1, true)}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-xl bg-[#f97316] px-3.5 py-2 text-xs font-extrabold text-white shadow-md transition hover:bg-[#ea580c] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ShoppingBag size={14} />
            <span>{inStock ? "Add" : "Sold Out"}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
