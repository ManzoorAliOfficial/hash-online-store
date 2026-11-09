import { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Gamepad2,
  Cable,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  X,
} from "lucide-react";

const icons = {
  phone: Smartphone,
  audio: Headphones,
  laptop: Laptop,
  watch: Watch,
  gaming: Gamepad2,
  accessory: Cable,
};

// Curated high-resolution pictures for each product
const productGalleries = {
  p2: [
    "https://images.unsplash.com/photo-1733556046403-2d090cf359a3?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  p1: [
    "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  p3: [
    "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  p4: [
    "https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  p5: [
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  p6: [
    "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  p7: [
    "https://images.unsplash.com/photo-1602323460270-4caefc261548?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&h=700&q=85",
  ],
};

const categoryGalleries = {
  Phones: [
    "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1512054502232-10a0a035d672?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  Audio: [
    "https://images.unsplash.com/photo-1733556046403-2d090cf359a3?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  Laptops: [
    "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  Wearables: [
    "https://images.unsplash.com/photo-1624096104992-9b4fa3a279dd?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  Gaming: [
    "https://images.unsplash.com/photo-1602323460270-4caefc261548?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&h=700&q=85",
  ],
  Accessories: [
    "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&h=700&q=85",
    "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&h=700&q=85",
  ],
};

export function getProductImages(product) {
  if (!product) return [];
  const list = [];

  if (Array.isArray(product.images) && product.images.length > 0) {
    product.images.forEach((img) => {
      if (img && typeof img === "string" && !list.includes(img)) list.push(img);
    });
    if (list.length >= 2) return list;
  }

  if (product.image && !list.includes(product.image)) {
    list.unshift(product.image);
  }

  const specific = productGalleries[product.id];
  if (specific) {
    specific.forEach((img) => {
      if (!list.includes(img)) list.push(img);
    });
  }

  const cat =
    categoryGalleries[product.category] ||
    categoryGalleries[product.icon] ||
    categoryGalleries.Accessories;
  if (cat) {
    cat.forEach((img) => {
      if (list.length < 5 && !list.includes(img)) list.push(img);
    });
  }

  return list;
}

export default function ProductGallery({ product }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const thumbnailRefs = useRef([]);
  const mainImageRef = useRef(null);

  const images = getProductImages(product);

  useEffect(() => {
    setSelectedIndex(0);
    setFailed(false);
  }, [product?.id]);

  useEffect(() => {
    if (thumbnailRefs.current[selectedIndex]) {
      thumbnailRefs.current[selectedIndex].scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    }
  }, [selectedIndex]);

  const Icon = icons[product?.icon] || Smartphone;
  const currentImage = images[selectedIndex] || product?.image;

  const prevImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    setFailed(false);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    setFailed(false);
  };

  const handleMouseMove = (e) => {
    if (!mainImageRef.current) return;
    const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - left) / width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - top) / height) * 100));
    setMousePos({ x, y });
  };

  return (
    <div className="flex flex-row items-start gap-3 sm:gap-3.5">
      {/* Left: Vertical Thumbnails */}
      {images.length > 1 && (
        <div
          className="no-scrollbar flex flex-col gap-2 shrink-0 sm:gap-2.5 max-h-[430px] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden max-[600px]:max-h-[290px] max-[600px]:gap-1.5"
          role="region"
          aria-label="Product thumbnails"
        >
          {images.map((img, index) => {
            const isActive = index === selectedIndex;
            return (
              <button
                key={index}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                type="button"
                onClick={() => {
                  setSelectedIndex(index);
                  setFailed(false);
                }}
                className={`group relative size-[64px] sm:size-[72px] shrink-0 cursor-pointer overflow-hidden rounded-xl border-2 bg-white p-1 transition-all duration-150 max-[600px]:size-[50px] ${
                  isActive
                    ? "border-[#2563eb] shadow-md ring-2 ring-[#2563eb]/20 scale-102"
                    : "border-[#e4eaf3] opacity-80 hover:border-[#93bbf8] hover:opacity-100"
                }`}
                aria-label={`View picture ${index + 1} of ${images.length}`}
                aria-current={isActive ? "true" : undefined}
              >
                <img
                  src={img}
                  alt={`${product?.name || "Product"} thumbnail ${index + 1}`}
                  className="size-full object-contain transition-transform duration-200 group-hover:scale-105"
                  loading="lazy"
                />
              </button>
            );
          })}
        </div>
      )}

      {/* Right: Main Product Image View with Zoom on Hover */}
      <div
        ref={mainImageRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={handleMouseMove}
        className="relative flex min-h-[380px] sm:min-h-[440px] flex-1 min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-6 max-[600px]:min-h-[290px] max-[600px]:p-4 select-none cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
        title="Hover to zoom, click for full-screen view"
      >
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 top-1/2 z-20 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[#e4eaf3] bg-white/90 text-[#34445f] shadow-md backdrop-blur-xs transition hover:bg-white hover:scale-110 active:scale-95"
              aria-label="Previous image"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 z-20 grid size-9 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-[#e4eaf3] bg-white/90 text-[#34445f] shadow-md backdrop-blur-xs transition hover:bg-white hover:scale-110 active:scale-95"
              aria-label="Next image"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Display Current Picture with Hover Zoom */}
        {currentImage && !failed ? (
          <div className="relative flex size-full items-center justify-center overflow-hidden">
            <img
              key={currentImage}
              className="max-h-[360px] max-w-full object-contain drop-shadow-[0_25px_24px_#17233b22] transition-transform duration-200 ease-out max-[600px]:max-h-[240px]"
              style={{
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                transform: isHovered ? "scale(1.85)" : "scale(1)",
              }}
              src={currentImage}
              alt={`${product?.name || "Product"} - view ${selectedIndex + 1}`}
              fetchPriority="high"
              onError={() => setFailed(true)}
            />
            <span className="pointer-events-none absolute bottom-2 left-2 flex items-center gap-1 rounded-md bg-white/85 px-2 py-0.5 text-[10px] font-bold text-[#17233b] shadow-xs backdrop-blur-xs">
              <ZoomIn size={12} /> Hover to zoom · Click to expand
            </span>
          </div>
        ) : (
          <Icon
            className="text-[#203d70]"
            size={140}
            strokeWidth={1.1}
            aria-hidden="true"
          />
        )}

        {/* Picture Count Pill */}
        {images.length > 1 && (
          <span className="pointer-events-none absolute bottom-3 right-3 rounded-md bg-[#17233b]/75 px-2.5 py-1 text-[11px] font-bold text-white shadow-xs backdrop-blur-xs">
            {selectedIndex + 1} / {images.length}
          </span>
        )}
      </div>

      {/* Full-Screen Lightbox Modal */}
      {lightboxOpen && currentImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={(e) => {
            if (e.target === e.currentTarget) setLightboxOpen(false);
          }}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 cursor-pointer"
            aria-label="Close zoom preview"
          >
            <X size={22} />
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 grid size-12 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/25 cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="flex max-h-[85vh] max-w-[90vw] items-center justify-center">
            <img
              src={currentImage}
              alt={product?.name}
              className="max-h-[85vh] max-w-[90vw] object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      )}
    </div>
  );
}
