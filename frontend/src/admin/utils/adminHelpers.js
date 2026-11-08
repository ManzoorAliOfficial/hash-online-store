export const money = (amount) => "Rs. " + Number(amount || 0).toLocaleString();

export const date = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-PK", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

export function salesSeries(orders) {
  const entries = Array.from({ length: 12 }, (_, index) => {
    const month = new Date();
    month.setMonth(month.getMonth() - 11 + index, 1);
    const amount = (orders || [])
      .filter((order) => {
        const d = new Date(order.date);
        return (
          d.getFullYear() === month.getFullYear() &&
          d.getMonth() === month.getMonth() &&
          order.status !== "Cancelled"
        );
      })
      .reduce((sum, order) => sum + Number(order.total || 0), 0);
    return {
      label: month.toLocaleDateString("en", { month: "short" }),
      amount,
    };
  });
  const max = Math.max(1, ...entries.map((entry) => entry.amount));
  return {
    months: entries.map((entry) => entry.label),
    values: entries.map((entry) =>
      entry.amount ? Math.max(4, Math.round((entry.amount / max) * 100)) : 0,
    ),
  };
}
