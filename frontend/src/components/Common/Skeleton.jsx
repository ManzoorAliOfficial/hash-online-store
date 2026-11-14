export default function Skeleton({ count = 8, type = "grid" }) {
  const shimmer = "bg-[linear-gradient(90deg,#e5e7eb_25%,#f3f4f6_50%,#e5e7eb_75%)] bg-[length:200%_100%] motion-safe:animate-shimmer motion-reduce:animate-none";

  if (type === "row") {
    return (
      <div className="flex flex-col gap-3" aria-label="Loading content">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl border border-[#edf0f5] bg-white p-4"
          >
            <div className={`size-16 shrink-0 rounded-lg ${shimmer}`} />
            <div className="flex-1 space-y-2">
              <div className={`h-4 w-1/3 rounded ${shimmer}`} />
              <div className={`h-3 w-1/4 rounded ${shimmer}`} />
            </div>
            <div className={`h-6 w-16 rounded ${shimmer}`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid w-full grid-cols-2 gap-3 sm:gap-4 md:grid-cols-[repeat(auto-fill,minmax(220px,1fr))]"
      aria-label="Loading products"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          className="flex flex-col overflow-hidden rounded-2xl border border-[#edf0f5] bg-white"
          key={index}
        >
          <div className={`aspect-[4/5] w-full ${shimmer}`} />
          <div className="grid gap-2.5 p-3 sm:p-4">
            <div className={`h-2.5 w-1/3 rounded ${shimmer}`} />
            <div className={`h-4 w-3/4 rounded ${shimmer}`} />
            <div className={`h-3 w-1/2 rounded ${shimmer}`} />
            <div className={`mt-2 h-8 w-full rounded-lg ${shimmer}`} />
          </div>
        </div>
      ))}
    </div>
  );
}
