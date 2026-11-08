import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { Search, X, ArrowRight, Star } from "lucide-react";
import { useStore } from "../../context/StoreContext";

const money = (val) => `Rs. ${Number(val || 0).toLocaleString()}`;

export default function SearchModal({ open, onClose }) {
  const { products } = useStore();
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
      const handleKeyDown = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    } else {
      setQuery("");
    }
  }, [open, onClose]);

  if (!open) return null;

  const results = query.trim()
    ? products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase()) ||
            p.description.toLowerCase().includes(query.toLowerCase()),
        )
        .slice(0, 6)
    : products.slice(0, 4); // show trending/recent picks

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onClose();
      navigate(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-[#071a3d]/40 p-4 pt-16 backdrop-blur-xs transition-opacity"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-2xl overflow-hidden rounded-2xl border border-[#e4eaf3] bg-white shadow-2xl transition-all">
        {/* Search Input Bar */}
        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-[#edf0f5] px-5 py-4"
        >
          <Search size={20} className="text-[#2563eb]" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search phones, audio, laptops, gaming gear…"
            className="flex-1 bg-transparent text-sm font-medium text-[#17233b] placeholder:text-[#94a3b8] outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-[#94a3b8] hover:text-[#17233b]"
              aria-label="Clear query"
            >
              <X size={16} />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#dce5f3] bg-[#f8fafd] px-2.5 py-1 text-xs font-bold text-[#52617a] transition hover:bg-[#eff4ff] hover:text-[#2563eb]"
          >
            Esc
          </button>
        </form>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          <div className="mb-2.5 px-2 text-[11px] font-bold uppercase tracking-wider text-[#8491a5]">
            {query.trim()
              ? `Results (${results.length})`
              : "Popular & Trending Picks"}
          </div>

          {results.length > 0 ? (
            <div className="divide-y divide-[#edf0f5]">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  className="flex items-center justify-between gap-3 rounded-xl p-2.5 transition hover:bg-[#f5f8fd]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="grid size-12 shrink-0 place-items-center overflow-hidden rounded-lg border border-[#eef2f8] bg-[#f8fafc]">
                      {product.image ? (
                        <img
                          src={product.image}
                          alt={product.name}
                          className="size-full object-contain p-1"
                        />
                      ) : (
                        <Search size={18} className="text-[#203d70]" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <h4 className="truncate text-xs font-bold text-[#17233b]">
                        {product.name}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-[#8491a5]">
                        <span>{product.category}</span>
                        <span>·</span>
                        <span className="flex items-center gap-0.5 text-[#f59e0b]">
                          <Star size={11} fill="currentColor" />
                          {product.rating || "4.8"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-extrabold text-[#2563eb]">
                      {money(product.price)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-[#8491a5]">
              No products found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>

        {/* Footer */}
        {query.trim() && results.length > 0 && (
          <div className="border-t border-[#edf0f5] bg-[#f8fafd] px-5 py-3 text-right">
            <button
              type="button"
              onClick={handleSubmit}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2563eb] hover:underline"
            >
              View all results for &ldquo;{query}&rdquo; <ArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
