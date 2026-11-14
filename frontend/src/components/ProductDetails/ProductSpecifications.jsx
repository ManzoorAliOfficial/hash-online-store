export default function ProductSpecifications({ product, items }) {
  const rawSpecs = product?.specifications || product?.specs || {};
  const extraSpecs = Array.isArray(rawSpecs)
    ? rawSpecs
        .map((item) =>
          Array.isArray(item)
            ? [item[0], item[1], Boolean(item[2])]
            : [item?.label, item?.value, Boolean(item?.important)],
        )
        .filter(([label, value]) => label && value != null && value !== "")
    : rawSpecs && typeof rawSpecs === "object"
      ? Object.entries(rawSpecs).map(([label, value]) => [label, value, false])
      : [];
  const specs = items || (product
    ? [
        ["Product", product.name || "—", true],
        ["Category", product.category || "—", false],
        ["Product ID", String(product.id || "").toUpperCase() || "—", false],
        [
          "Availability",
          Number(product.stock) > 0
            ? `${product.stock} in stock`
            : "Out of stock",
          true,
        ],
        ...extraSpecs,
      ].slice(0, 10)
    : []);

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-bold text-[#17233b]">Product specifications</h3>

      <div className="overflow-x-auto rounded-lg border border-[#dce5f3]">
        <table className="w-full border-collapse text-left text-xs">
          <tbody>
            {specs.map(([label, value, isImportant], index) => {
              const isEven = index % 2 === 0;
              return (
                <tr
                  key={label}
                  className={`border-b border-[#dce5f3] last:border-b-0 transition-colors ${
                    isEven ? "bg-[#f4f7fc]" : "bg-[#eef3fa]"
                  } hover:bg-[#eaf1ff]`}
                >
                  <th
                    scope="row"
                    className={`w-2/5 py-2.5 px-3 font-medium text-[#475569] sm:w-1/3 sm:px-4 ${
                      isImportant ? "font-bold text-[#17233b]" : ""
                    }`}
                  >
                    {label}
                  </th>
                  <td
                    className={`py-2.5 px-3 text-[#334155] sm:px-4 ${
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
