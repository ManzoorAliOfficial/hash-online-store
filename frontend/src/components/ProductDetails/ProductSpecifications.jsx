export default function ProductSpecifications({ product, items }) {
  const specs =
    items ||
    (product
      ? [
          ["Product Model", product.name || "Genuine Model", true],
          [
            "Category",
            product.category
              ? product.category.charAt(0).toUpperCase() +
                product.category.slice(1)
              : "Tech & Gadgets",
            false,
          ],
          ["Item SKU / ID", String(product.id || "").toUpperCase(), false],
          [
            "Condition",
            "100% Brand New, Sealed Box",
            true,
          ],
          [
            "Availability",
            Number(product.stock) > 0
              ? `In Stock (${product.stock} units available)`
              : "Temporarily Out of Stock",
            true,
          ],
          [
            "Customer Rating",
            `${Number(product.rating || 0).toFixed(1)} / 5.0 (${product.reviews || 0} customer reviews)`,
            false,
          ],
          [
            "Warranty Coverage",
            product.warranty || "12 Months Official Brand Warranty",
            true,
          ],
          [
            "Return / Replacement",
            "7-Day Replacement Guarantee for manufacturing defects",
            true,
          ],
          [
            "Payment Methods",
            "Cash on Delivery (COD) & Online Bank Transfer",
            true,
          ],
          [
            "Delivery Nationwide",
            "2-3 Business Days with live tracking across Pakistan",
            false,
          ],
        ]
      : [
          ["Brand Status", "Hash Store Genuine Selection", true],
          ["Availability", "In Stock", true],
          ["Condition", "Brand New Sealed", true],
          ["Warranty", "Official Brand Warranty", true],
          ["Guarantee", "7-Day Replacement Guarantee", true],
        ]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-base font-bold text-[#17233b]">
            Technical Specifications & Details
          </h3>
          <p className="text-xs text-[#71809a]">
            Verified manufacturer and warranty specifications
          </p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eff4ff] px-2.5 py-1 text-[11px] font-bold text-[#2563eb]">
          <span className="size-1.5 rounded-full bg-[#2563eb]" />
          Verified Genuine
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#e2e8f0] shadow-2xs">
        <table className="w-full border-collapse text-left text-xs">
          <tbody>
            {specs.map(([label, value, isImportant], index) => {
              const isEven = index % 2 === 0;
              return (
                <tr
                  key={label}
                  className={`border-b border-[#edf0f5] last:border-b-0 transition-colors ${
                    isEven ? "bg-[#f8fafd]" : "bg-white"
                  } hover:bg-[#eff4ff]/40`}
                >
                  <th
                    scope="row"
                    className={`w-2/5 sm:w-1/3 py-3 px-4 font-medium text-[#475569] ${
                      isImportant ? "font-bold text-[#17233b]" : ""
                    }`}
                  >
                    {label}
                  </th>
                  <td
                    className={`py-3 px-4 text-[#334155] ${
                      isImportant ? "font-bold text-[#0f172a]" : ""
                    }`}
                  >
                    {value}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
