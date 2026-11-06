export default function DataTable({ columns = [], rows = [], actions }) {
  if (!rows.length)
    return (
      <p className="p-6 text-center text-sm text-[#8491a5]">
        No records to show yet.
      </p>
    );
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[680px] border-separate border-spacing-0 text-left">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                className="border-b border-[#e4eaf3] bg-[#f8fafd] px-4 py-3 text-[10px] font-extrabold uppercase tracking-[.08em] text-[#71809a]"
                key={column}
              >
                {column}
              </th>
            ))}
            {actions && (
              <th className="border-b border-[#e4eaf3] bg-[#f8fafd] px-4 py-3 text-[10px] font-extrabold uppercase tracking-[.08em] text-[#71809a]">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              className="hover:bg-[#fbfcff]"
              key={row.id || row.name || index}
            >
              {columns.map((column) => (
                <td
                  className="border-b border-[#edf0f5] px-4 py-3 text-xs text-[#52617a]"
                  key={column}
                >
                  {row[column] ?? "—"}
                </td>
              ))}
              {actions && (
                <td className="border-b border-[#edf0f5] px-4 py-3">
                  {actions(row)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
