import { useState, useEffect } from "react";
import { useParams, Link } from "react-router";
import {
  FileText,
  ListFilter,
  MessageSquare,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Truck,
  CheckCircle,
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

      {/* Product Details Tabs (Description / Specifications / Reviews) */}
      <section className="mt-12 overflow-hidden rounded-2xl border border-[#e4eaf3] bg-white shadow-sm">
        {/* Tab Headers */}
        <div className="flex border-b border-[#edf0f5] bg-[#f8fafd]">
          <button
            type="button"
            onClick={() => setActiveTab("description")}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-4 px-4 text-xs font-bold transition-all sm:text-sm ${
              activeTab === "description"
                ? "border-[#2563eb] bg-white text-[#2563eb]"
                : "border-transparent text-[#64748b] hover:text-[#17233b]"
            }`}
          >
            <FileText size={16} />
            <span>Description</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("specifications")}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-4 px-4 text-xs font-bold transition-all sm:text-sm ${
              activeTab === "specifications"
                ? "border-[#2563eb] bg-white text-[#2563eb]"
                : "border-transparent text-[#64748b] hover:text-[#17233b]"
            }`}
          >
            <ListFilter size={16} />
            <span>Specifications</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`flex flex-1 items-center justify-center gap-2 border-b-2 py-4 px-4 text-xs font-bold transition-all sm:text-sm ${
              activeTab === "reviews"
                ? "border-[#2563eb] bg-white text-[#2563eb]"
                : "border-transparent text-[#64748b] hover:text-[#17233b]"
            }`}
          >
            <MessageSquare size={16} />
            <span>Reviews ({productReviews.length})</span>
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="p-6 sm:p-8">
          {activeTab === "description" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-[#17233b] mb-2">
                  Product Overview
                </h3>
                <p className="text-sm leading-7 text-[#52617a]">
                  {product.description} Built to the highest standards with genuine components, rigorous quality testing, and backed by manufacturer warranty.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-[#edf0f5]">
                <div className="flex items-start gap-3 rounded-xl bg-[#f8fafd] p-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17233b]">100% Genuine</h4>
                    <p className="text-[11px] text-[#71809a] mt-0.5">
                      Direct from verified suppliers with official warranty.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#f8fafd] p-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
                    <Truck size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17233b]">Express Courier</h4>
                    <p className="text-[11px] text-[#71809a] mt-0.5">
                      Safe 2-3 day doorstep transit with tracking SMS.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-[#f8fafd] p-4">
                  <div className="grid size-10 shrink-0 place-items-center rounded-lg bg-[#eff4ff] text-[#2563eb]">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17233b]">7-Day Checking</h4>
                    <p className="text-[11px] text-[#71809a] mt-0.5">
                      Hassle-free replacement for any hardware defects.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "specifications" && (
            <ProductSpecifications product={product} />
          )}

          {activeTab === "reviews" && (
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
