import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { SlidersHorizontal, X } from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import ProductFilters from "../components/Products/ProductFilters";
import ProductToolbar from "../components/Products/ProductToolbar";
import SortBar from "../components/Products/SortBar";
import ProductGrid from "../components/Products/ProductGrid";
import ProductPagination from "../components/Products/ProductPagination";
import EmptyState from "../components/Common/EmptyState";

export default function Products() {
  const { products } = useStore();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("search") || params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [sort, setSort] = useState("Featured");
  const [maxPrice, setMaxPrice] = useState(400000);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const itemsPerPage = 12;

  // Sync category & search if URL parameters change
  useEffect(() => {
    const urlCategory = params.get("category");
    if (urlCategory) setCategory(urlCategory);
    const urlSearch = params.get("search") || params.get("q");
    if (urlSearch !== null && urlSearch !== undefined) setQuery(urlSearch);
  }, [params]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [category, query, sort, maxPrice, rating, inStock]);

  const reset = () => {
    setCategory("All");
    setMaxPrice(400000);
    setRating(0);
    setInStock(false);
    setQuery("");
    setParams({});
  };

  const filtered = useMemo(() => {
    const list = products.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        p.price <= maxPrice &&
        p.rating >= rating &&
        (!inStock || p.stock > 0),
    );
    if (sort === "Price: Low to high") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to low") list.sort((a, b) => b.price - a.price);
    if (sort === "Top rated") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, category, query, sort, maxPrice, rating, inStock]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  return (
    <main className="mx-auto min-h-[55vh] w-full max-w-[1690px] px-0 py-[70px] max-[1750px]:px-8 max-[900px]:px-[5%] max-[600px]:px-4 max-[600px]:py-8">
      <PageHeading eyebrow="THE COLLECTION" title="Our products">
        <p>Find the right tech and everyday essentials for your day.</p>
      </PageHeading>

      {/* Mobile Filters Trigger Bar */}
      <div className="mb-5 hidden items-center justify-between gap-3 max-[850px]:flex">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#dce5f3] bg-white px-4 text-xs font-bold text-[#17233b] shadow-xs active:scale-95"
        >
          <SlidersHorizontal size={15} className="text-[#2563eb]" />
          <span>Filters ({category !== "All" ? category : "All"})</span>
        </button>
        <span className="text-xs text-[#71809a]">
          <b className="text-[#17233b]">{filtered.length}</b> products found
        </span>
      </div>

      <div className="grid grid-cols-[320px_minmax(0,1fr)] gap-8 max-[1100px]:grid-cols-[260px_minmax(0,1fr)] max-[850px]:grid-cols-1">
        {/* Desktop Sidebar */}
        <div className="max-[850px]:hidden">
          <ProductFilters
            category={category}
            onChange={(newCategory) => {
              setCategory(newCategory);
              setParams(newCategory === "All" ? {} : { category: newCategory });
            }}
            maxPrice={maxPrice}
            onMaxPrice={setMaxPrice}
            rating={rating}
            onRating={setRating}
            inStock={inStock}
            onInStock={setInStock}
            onReset={reset}
          />
        </div>

        {/* Mobile Slide-Over Drawer */}
        {mobileFilterOpen && (
          <div
            className="fixed inset-0 z-50 flex bg-[#071a3d]/40 backdrop-blur-xs min-[850px]:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileFilterOpen(false);
            }}
          >
            <div className="flex h-full w-[85%] max-w-[340px] flex-col overflow-y-auto bg-white p-5 shadow-2xl">
              <div className="mb-4 flex items-center justify-between border-b border-[#edf0f5] pb-3">
                <h3 className="text-sm font-bold text-[#17233b]">Filters</h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-lg p-1 text-[#8491a5] hover:bg-[#f4f7fc] hover:text-[#17233b]"
                >
                  <X size={18} />
                </button>
              </div>
              <ProductFilters
                category={category}
                onChange={(newCategory) => {
                  setCategory(newCategory);
                  setParams(newCategory === "All" ? {} : { category: newCategory });
                }}
                maxPrice={maxPrice}
                onMaxPrice={setMaxPrice}
                rating={rating}
                onRating={setRating}
                inStock={inStock}
                onInStock={setInStock}
                onReset={reset}
              />
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="mt-4 inline-flex min-h-[42px] w-full items-center justify-center rounded-lg bg-[#2563eb] text-xs font-bold text-white shadow-xs"
              >
                Apply Filters ({filtered.length} products)
              </button>
            </div>
          </div>
        )}

        <section className="min-w-0">
          <div className="mb-6 grid grid-cols-[minmax(0,1fr)_260px] gap-4 max-[700px]:grid-cols-1">
            <ProductToolbar value={query} onChange={setQuery} />
            <SortBar value={sort} onChange={setSort} />
          </div>

          <div className="mb-6 text-sm text-[#71809a]">
            Showing{" "}
            <b className="font-bold text-[#17233b]">
              {filtered.length ? (page - 1) * itemsPerPage + 1 : 0}–
              {Math.min(page * itemsPerPage, filtered.length)}
            </b>{" "}
            of <b className="font-bold text-[#17233b]">{filtered.length}</b> products
          </div>

          {filtered.length ? (
            <ProductGrid products={paginatedProducts} />
          ) : (
            <EmptyState
              title="No products found"
              message="Try changing your search keywords or resetting your filter criteria."
              action="Reset filters"
              to="/products"
            />
          )}

          <ProductPagination
            page={page}
            pages={totalPages}
            onChange={(newPage) => {
              setPage(newPage);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </section>
      </div>
    </main>
  );
}
