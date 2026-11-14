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
import Container from "../components/Layout/Container";
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

  const [recentlyViewedIds, setRecentlyViewedIds] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("hash_recently_viewed") || "[]",
      );
    } catch {
      return [];
    }
  });

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
      setRecentlyViewedIds(updated);
    } catch {
      setRecentlyViewedIds((prev) =>
        [product.id, ...prev.filter((item) => item !== product.id)].slice(0, 8),
      );
    }
  }, [product?.id]);

  if (!product) {
    return (
      <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
        <PageHeading eyebrow="CATALOG" title="Product not found" />
        <EmptyState
          title="Product not available"
          message="The product you are looking for may have been removed or the link might be incorrect."
          action="Browse catalog"
          to="/products"
        />
      </Container>
    );
  }

  const productReviews = reviews.filter(
    (r) =>
      r.status === "Published" &&
      (r.productId === product.id ||
        r.product === product.name ||
        r.productName === product.name),
  );

  // Retrieve recently viewed products from state (excluding current item)
  const recentlyViewedProducts = recentlyViewedIds
    .filter((recId) => recId !== product.id)
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
    "Genuine, sealed retail stock",
    product.category?.toLowerCase() === "phones"
      ? "PTA-approved and SIM-ready"
      : "Quality-checked before dispatch",
    "Nationwide customer support",
    "Order status available in your account",
  ];

  // Frequently Asked Questions
  const faqs = [
    {
      q: "How do I place an order?",
      a: "Add the product to your cart and complete checkout, or contact the store for help ordering.",
    },
    {
      q: "When will my order arrive?",
      a: "Most major-city orders arrive in 2–3 business days. Other areas may take 3–4 business days.",
    },
    {
      q: "Where can I track my order?",
      a: "Open Orders in your account to check the latest status, or contact support with your order number.",
    },
    {
      q: "Need help choosing this product?",
      a: "Use the Contact page or message the store on WhatsApp for product assistance.",
    },
  ];

  return (
    <Container as="main" className="min-h-[55vh] py-8 pb-28 md:py-10 md:pb-16 max-[600px]:py-6 max-[600px]:pb-28">

      {/* Main Product Showcase Grid */}
      <div className="grid grid-cols-2 gap-6 lg:gap-8 max-[850px]:grid-cols-1">
        <ProductGallery product={product} />
        <div>
          <ProductInfo product={product} />
          <DeliveryInformation />
        </div>
      </div>

      {/* Product Details Tabs (Description / Specifications / Reviews / FAQ) */}
      <section className="mt-8 overflow-hidden rounded-xl border border-[#dce5f3] bg-[#f4f7fc]">
        {/* Tab Headers - Horizontally scrollable on mobile */}
        <div
          role="tablist"
          aria-label="Product details and specifications"
          onKeyDown={handleTabKeyDown}
          className="flex overflow-x-auto border-b border-[#dce5f3] bg-[#eef3fa] [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
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
                className={`flex min-w-[112px] shrink-0 flex-1 items-center justify-center gap-1.5 border-b-2 px-3 py-2.5 text-[11px] font-semibold transition-colors sm:min-w-0 sm:py-3 sm:text-xs ${
                  isActive
                    ? "border-[#2563eb] bg-[#eaf1ff] text-[#1d4ed8]"
                    : "border-transparent text-[#64748b] hover:bg-[#e7eef8] hover:text-[#17233b]"
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Panels */}
        <div className="p-4 sm:p-5">
          {/* Description Tab Panel */}
          {activeTab === "description" && (
            <div
              role="tabpanel"
              id="tabpanel-description"
              aria-labelledby="tab-description"
              tabIndex={0}
              className="space-y-4 outline-none"
            >
              <div>
                <h3 className="mb-1.5 text-sm font-bold text-[#17233b]">
                  Product Overview
                </h3>
                <p className="line-clamp-6 max-w-[82ch] text-xs leading-5 text-[#52617a]">
                  {product.description ||
                    `${product.name} details are available from our support team.`}
                </p>
              </div>

              <div>
                <h4 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-[#17233b]">
                  Key Highlights
                </h4>
                <div className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
                  {highlights.map((highlight, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2 text-xs text-[#334155]"
                    >
                      <CheckCircle2
                        size={14}
                        className="mt-0.5 shrink-0 text-[#2563eb]"
                      />
                      <span className="leading-4">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg border border-[#dce5f3] bg-[#eef3fa] p-3">
                <div className="mb-2 flex items-center gap-2">
                  <Box size={15} className="text-[#2563eb]" />
                  <h4 className="text-[11px] font-bold text-[#17233b]">
                    What's in the Box
                  </h4>
                </div>
                <ul className="grid grid-cols-1 gap-x-4 gap-y-1.5 text-[11px] text-[#475569] sm:grid-cols-2">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    <span>1 × {product.name}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    <span>Retail packaging</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    <span>User guide</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 shrink-0 rounded-full bg-[#2563eb]" />
                    <span>Warranty information</span>
                  </li>
                </ul>
              </div>

              <div className="grid grid-cols-1 gap-2 border-t border-[#dce5f3] pt-3 sm:grid-cols-3">
                <div className="flex items-center gap-2.5 rounded-lg border border-[#dce5f3] bg-[#eef3fa] p-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#e3ecfc] text-[#2563eb]">
                    <ShieldCheck size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[#17233b]">
                      Official Warranty
                    </h4>
                    <p className="mt-0.5 text-[10px] leading-4 text-[#71809a]">
                      {product.warranty || "Manufacturer coverage"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-lg border border-[#dce5f3] bg-[#eef3fa] p-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#e3ecfc] text-[#2563eb]">
                    <Banknote size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[#17233b]">
                      Cash on Delivery
                    </h4>
                    <p className="mt-0.5 text-[10px] leading-4 text-[#71809a]">
                      Pay the courier when it arrives.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 rounded-lg border border-[#dce5f3] bg-[#eef3fa] p-3">
                  <div className="grid size-8 shrink-0 place-items-center rounded-md bg-[#e3ecfc] text-[#2563eb]">
                    <RotateCcw size={16} />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold text-[#17233b]">
                      7-Day Replacement
                    </h4>
                    <p className="mt-0.5 text-[10px] leading-4 text-[#71809a]">
                      For eligible manufacturing faults.
                    </p>
                  </div>
                </div>
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
                  notify("Thanks! Your review will appear after approval.");
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
              className="space-y-2 outline-none"
            >
              <div className="mb-3">
                <h3 className="text-sm font-bold text-[#17233b]">
                  Frequently Asked Questions
                </h3>
              </div>

              <div className="space-y-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div
                      key={index}
                      className="overflow-hidden rounded-lg border border-[#dce5f3] bg-[#eef3fa] transition-colors hover:border-[#bfd4ff]"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-3 px-3 py-3 text-left text-xs font-semibold text-[#17233b] transition hover:bg-[#e7eef8]"
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
                        <div className="border-t border-[#dce5f3] bg-[#f4f7fc] px-3 py-3 text-xs leading-5 text-[#52617a]">
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

          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
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
            <span>{inStock ? "Add to Cart" : "Sold Out"}</span>
          </button>
        </div>
      </div>
    </Container>
  );
}
