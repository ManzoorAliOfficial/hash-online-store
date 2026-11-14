import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  SlidersHorizontal,
  X,
  LayoutGrid,
  List,
  RotateCcw,
} from "lucide-react";
import { useStore } from "../context/StoreContext";
import PageHeading from "../components/Common/PageHeading";
import Container from "../components/Layout/Container";
import ProductFilters from "../components/Products/ProductFilters";
import ProductToolbar from "../components/Products/ProductToolbar";
import SortBar from "../components/Products/SortBar";
import ProductGrid from "../components/Products/ProductGrid";
import ProductPagination from "../components/Products/ProductPagination";
import AccessoriesLink from "../components/Common/AccessoriesLink";
import EmptyState from "../components/Common/EmptyState";
import {
  getAccessoryCollectionProducts,
  getAccessoryCollectionTitle,
  getMobileAccessories,
} from "../utils/homeCatalog";

export default function Products() {
  const { products, orders = [] } = useStore();
  const [params, setParams] = useSearchParams();
  const [query, setQuery] = useState(params.get("search") || params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "All");
  const [collection, setCollection] = useState(params.get("collection") || "");
  const [sort, setSort] = useState("Featured");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(400000);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(false);
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const itemsPerPage = 12;

  // Keep direct catalog links (category, collection and price bands) in sync.
  useEffect(() => {
    setCategory(params.get("category") || "All");
    setQuery(params.get("search") || params.get("q") || "");
    setCollection(params.get("collection") || "");
    const urlMin = Number(params.get("minPrice"));
    const urlMax = Number(params.get("maxPrice"));
    setMinPrice(Number.isFinite(urlMin) && params.has("minPrice") ? Math.max(0, urlMin) : 0);
    setMaxPrice(Number.isFinite(urlMax) && params.has("maxPrice") ? Math.max(0, urlMax) : 400000);
  }, [params]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
  }, [category, collection, query, sort, minPrice, maxPrice, rating, inStock]);

  const reset = () => {
    setCategory("All");
    setCollection("");
    setMinPrice(0);
    setMaxPrice(400000);
    setRating(0);
    setInStock(false);
    setQuery("");
    setParams({});
  };

  const updateCategory = (newCategory) => {
    setCategory(newCategory);
    const nextParams = new URLSearchParams(params);
    if (newCategory === "All") nextParams.delete("category");
    else nextParams.set("category", newCategory);
    if (query.trim()) nextParams.set("search", query.trim());
    else {
      nextParams.delete("search");
      nextParams.delete("q");
    }
    setParams(nextParams);
  };

  const hasActiveFilters =
    category !== "All" ||
    Boolean(collection) ||
    query.trim() !== "" ||
    minPrice > 0 ||
    maxPrice < 400000 ||
    rating > 0 ||
    inStock;

  const filtered = useMemo(() => {
    const collectionProducts = getAccessoryCollectionProducts(
      products,
      collection,
      orders,
    );
    const list = collectionProducts.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        p.name.toLowerCase().includes(query.toLowerCase()) &&
        p.price >= minPrice &&
        p.price <= maxPrice &&
        p.rating >= rating &&
        (!inStock || p.stock > 0),
    );
    if (sort === "Price: Low to high") list.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to low") list.sort((a, b) => b.price - a.price);
    if (sort === "Top rated") list.sort((a, b) => b.rating - a.rating);
    return list;
  }, [products, orders, category, collection, query, sort, minPrice, maxPrice, rating, inStock]);

  const removeParam = (name) => {
    const nextParams = new URLSearchParams(params);
    nextParams.delete(name);
    setParams(nextParams);
  };

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return filtered.slice(start, start + itemsPerPage);
  }, [filtered, page]);

  return (
    <Container as="main" className="min-h-[55vh] py-[70px] max-[600px]:py-8">
      <PageHeading eyebrow="THE COLLECTION" title={getAccessoryCollectionTitle(collection)}>
        <p>Find the right tech and everyday essentials for your day.</p>
      </PageHeading>

      {/* Mobile Filters Trigger Bar & Results Count */}
      <div className="mb-5 flex items-center justify-between gap-3 min-[850px]:hidden">
        <button
          type="button"
          onClick={() => setMobileFilterOpen(true)}
          className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#dce5f3] bg-white px-4 text-xs font-bold text-[#17233b] shadow-xs transition hover:border-[#2563eb] active:scale-95"
        >
          <SlidersHorizontal size={15} className="text-[#2563eb]" />
          <span>Filters</span>
          {hasActiveFilters && (
            <span className="size-2 rounded-full bg-[#f97316]" />
          )}
        </button>

        {/* View Mode Toggle (Mobile) */}
        <div className="flex items-center gap-1 rounded-xl border border-[#dce5f3] bg-white p-1">
          <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`grid size-8 place-items-center rounded-lg transition ${
              viewMode === "grid"
                ? "bg-[#2563eb] text-white"
                : "text-[#64748b] hover:text-[#17233b]"
            }`}
            aria-label="Grid view"
          >
            <LayoutGrid size={16} />
          </button>
          <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`grid size-8 place-items-center rounded-lg transition ${
              viewMode === "list"
                ? "bg-[#2563eb] text-white"
                : "text-[#64748b] hover:text-[#17233b]"
            }`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-[280px_minmax(0,1fr)] gap-8 max-[1100px]:grid-cols-[260px_minmax(0,1fr)] max-[850px]:grid-cols-1">
        {/* Desktop Sidebar Filters */}
        <div className="hidden min-[850px]:block">
          <ProductFilters
            category={category}
            onChange={(newCategory) => {
              updateCategory(newCategory);
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

        {/* Mobile Bottom-Sheet Drawer for Filters */}
        {mobileFilterOpen && (
          <div
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-xs min-[850px]:hidden"
            onClick={(e) => {
              if (e.target === e.currentTarget) setMobileFilterOpen(false);
            }}
          >
            <div className="flex max-h-[85vh] w-full flex-col rounded-t-3xl bg-white p-5 shadow-2xl">
              {/* Drag handle */}
              <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-[#cbd5e1]" />

              <div className="mb-4 flex items-center justify-between border-b border-[#edf0f5] pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal size={18} className="text-[#2563eb]" />
                  <h3 className="text-base font-bold text-[#17233b]">Filter Products</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="rounded-lg p-1.5 text-[#8491a5] hover:bg-[#f4f7fc] hover:text-[#17233b]"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-1">
                <ProductFilters
                  category={category}
                  onChange={(newCategory) => {
                    updateCategory(newCategory);
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

              <div className="mt-4 border-t border-[#edf0f5] pt-3">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="inline-flex min-h-[46px] w-full items-center justify-center rounded-xl bg-[#2563eb] text-sm font-bold text-white shadow-md active:scale-98"
                >
                  Apply Filters ({filtered.length} products)
                </button>
              </div>
            </div>
          </div>
        )}

        <section className="min-w-0">
          {/* Toolbar & Sort & Grid/List Toggle */}
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex-1 max-w-md">
              <ProductToolbar value={query} onChange={setQuery} />
            </div>

            <div className="flex items-center gap-3">
              <SortBar value={sort} onChange={setSort} />

              {/* View Toggle on Desktop */}
              <div className="hidden min-[850px]:flex items-center rounded-lg border border-[#dce5f3] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`grid size-8 cursor-pointer place-items-center rounded-md transition ${
                    viewMode === "grid"
                      ? "bg-[#2563eb] text-white shadow-xs"
                      : "text-[#64748b] hover:text-[#17233b]"
                  }`}
                  title="Grid view"
                >
                  <LayoutGrid size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("list")}
                  className={`grid size-8 cursor-pointer place-items-center rounded-md transition ${
                    viewMode === "list"
                      ? "bg-[#2563eb] text-white shadow-xs"
                      : "text-[#64748b] hover:text-[#17233b]"
                  }`}
                  title="List view"
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filter Chips */}
          {hasActiveFilters && (
            <div className="mb-5 flex flex-wrap items-center gap-2 rounded-xl border border-[#e8eff9] bg-[#f8fafd] p-3">
              <span className="text-[11px] font-bold text-[#64748b]">Active filters:</span>

              {collection && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#bfd4ff] bg-[#eff4ff] px-2.5 py-1 text-xs font-semibold text-[#2563eb]">
                  <span>{getAccessoryCollectionTitle(collection)}</span>
                  <button type="button" onClick={() => removeParam("collection")} className="hover:text-[#1d4ed8]" aria-label="Remove mobile accessories filter"><X size={13} /></button>
                </span>
              )}

              {category !== "All" && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#bfd4ff] bg-[#eff4ff] px-2.5 py-1 text-xs font-semibold text-[#2563eb]">
                  <span>Category: {category}</span>
                  <button
                    type="button"
                    onClick={() => {
                      updateCategory("All");
                    }}
                    className="hover:text-[#1d4ed8]"
                    aria-label="Remove category filter"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}

              {query.trim() && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#bfd4ff] bg-[#eff4ff] px-2.5 py-1 text-xs font-semibold text-[#2563eb]">
                  <span>&ldquo;{query}&rdquo;</span>
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="hover:text-[#1d4ed8]"
                    aria-label="Clear search query"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}

              {minPrice > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#bfd4ff] bg-[#eff4ff] px-2.5 py-1 text-xs font-semibold text-[#2563eb]">
                  <span>From Rs. {minPrice.toLocaleString()}</span>
                  <button type="button" onClick={() => removeParam("minPrice")} className="hover:text-[#1d4ed8]" aria-label="Remove minimum price filter"><X size={13} /></button>
                </span>
              )}

              {maxPrice < 400000 && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#bfd4ff] bg-[#eff4ff] px-2.5 py-1 text-xs font-semibold text-[#2563eb]">
                  <span>Under Rs. {maxPrice.toLocaleString()}</span>
                  <button
                    type="button"
                    onClick={() => removeParam("maxPrice")}
                    className="hover:text-[#1d4ed8]"
                    aria-label="Remove price filter"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}

              {rating > 0 && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#bfd4ff] bg-[#eff4ff] px-2.5 py-1 text-xs font-semibold text-[#2563eb]">
                  <span>★ {rating}+ Stars</span>
                  <button
                    type="button"
                    onClick={() => setRating(0)}
                    className="hover:text-[#1d4ed8]"
                    aria-label="Remove rating filter"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}

              {inStock && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#bfd4ff] bg-[#eff4ff] px-2.5 py-1 text-xs font-semibold text-[#2563eb]">
                  <span>In Stock Only</span>
                  <button
                    type="button"
                    onClick={() => setInStock(false)}
                    className="hover:text-[#1d4ed8]"
                    aria-label="Remove in-stock filter"
                  >
                    <X size={13} />
                  </button>
                </span>
              )}

              <button
                type="button"
                onClick={reset}
                className="ml-auto inline-flex items-center gap-1 text-xs font-bold text-[#e5484d] hover:underline cursor-pointer"
              >
                <RotateCcw size={12} /> Clear all
              </button>
            </div>
          )}

          {/* Results Counter */}
          <div className="mb-4 text-xs text-[#71809a]">
            Showing{" "}
            <b className="font-bold text-[#17233b]">
              {filtered.length ? (page - 1) * itemsPerPage + 1 : 0}–
              {Math.min(page * itemsPerPage, filtered.length)}
            </b>{" "}
            of <b className="font-bold text-[#17233b]">{filtered.length}</b> products
          </div>

          {filtered.length ? (
            <ProductGrid products={paginatedProducts} viewMode={viewMode} />
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
          {!collection &&
            category === "All" &&
            !query.trim() &&
            getMobileAccessories(products).length > itemsPerPage && (
              <AccessoriesLink
                totalCount={getMobileAccessories(products).length}
                visibleCount={itemsPerPage}
              />
            )}
        </section>
      </div>
    </Container>
  );
}
