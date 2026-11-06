export default function ProductSpecifications({ product, items }) {
  const specs =
    items ||
    (product
      ? [
          ["Category", product.category || "Tech & Accessories"],
          ["Product ID / SKU", String(product.id || "").toUpperCase()],
          [
            "Availability",
            Number(product.stock) > 0
              ? `In stock (${product.stock} units)`
              : "Out of stock",
          ],
          [
            "Customer rating",
            `${Number(product.rating || 0).toFixed(1)} / 5 (${product.reviews || 0} reviews)`,
          ],
          ["Warranty", "Official distributor warranty where applicable"],
          ["Shipping", "Pakistan-wide standard delivery with tracking"],
          ["Return policy", "7-day replacement warranty for defective items"],
        ]
      : [
          ["Brand", "Hash Store selection"],
          ["Availability", "In stock"],
          ["Warranty", "Manufacturer warranty where applicable"],
        ]);

  return (
    <section className="mt-8 rounded-xl border border-[#e4eaf3] bg-white p-6 shadow-[0_4px_16px_rgba(16,36,73,.03)]">
      <h2 className="mb-4 text-base font-bold text-[#17233b]">
        Specifications & Details
      </h2>
      <div className="grid divide-y divide-[#edf0f5]">
        {specs.map(([label, value]) => (
          <div
            className="flex items-center justify-between gap-4 py-3 text-xs first:pt-0 last:pb-0"
            key={label}
          >
            <span className="font-medium text-[#71809a]">{label}</span>
            <b className="text-right font-semibold text-[#34445f]">{value}</b>
          </div>
        ))}
      </div>
    </section>
  );
}
