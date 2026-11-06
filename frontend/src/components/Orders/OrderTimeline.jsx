const stages = ["Pending", "Confirmed", "Processing", "Shipped", "Delivered"];

export default function OrderTimeline({ status = "Pending" }) {
  if (status === "Cancelled" || status === "Returned") {
    return (
      <div className="my-5 rounded-lg border border-[#ffd4d4] bg-[#fff1f1] px-4 py-3 text-xs font-bold text-[#d14343]">
        Order has been {status.toLowerCase()}. If you have questions, please
        contact our support team.
      </div>
    );
  }

  const current = Math.max(0, stages.indexOf(status));

  return (
    <div className="my-6" aria-label={`Order status: ${status}`}>
      <div className="grid grid-cols-5 gap-1">
        {stages.map((stage, index) => {
          const isDone = index <= current;
          return (
            <div
              key={stage}
              className={`relative flex flex-col items-center pt-7 text-center text-[10px] font-bold ${
                isDone ? "text-[#2563eb]" : "text-[#9aa6b8]"
              }`}
            >
              {/* Connector line */}
              <span
                className={`absolute left-0 right-0 top-2.5 h-0.5 ${
                  index === 0 ? "left-1/2" : ""
                } ${index === stages.length - 1 ? "right-1/2" : ""} ${
                  isDone ? "bg-[#2563eb]" : "bg-[#e4eaf3]"
                }`}
              />

              {/* Dot */}
              <span
                className={`absolute top-0 z-10 size-5 rounded-full border-4 border-white shadow-2xs transition-colors duration-200 ${
                  isDone ? "bg-[#2563eb]" : "bg-[#dce5f3]"
                }`}
              />

              <span className="truncate max-w-full">{stage}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
