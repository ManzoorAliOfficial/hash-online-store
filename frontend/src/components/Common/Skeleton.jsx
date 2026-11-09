export default function Skeleton({ count = 8, type = "grid" }) {
  if (type === "row") {
    return (
      <div className="flex flex-col gap-3" aria-label="Loading content">
        {Array.from({ length: count }, (_, index) => (
          <div
            key={index}
            className="flex items-center gap-4 rounded-xl border border-[#edf0f5] bg-white p-4"
          >
            <div className="size-16 shrink-0 animate-pulse rounded-lg bg-[#eef2f8]" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-[#eef2f8]" />
              <div className="h-3 w-1/4 animate-pulse rounded bg-[#eef2f8]" />
            </div>
            <div className="h-6 w-16 animate-pulse rounded bg-[#eef2f8]" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="mx-auto grid w-full max-w-[1120px] grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-4"
      aria-label="Loading products"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          className="flex flex-col overflow-hidden rounded-2xl border border-[#edf0f5] bg-white"
          key={index}
        >
          <div className="aspect-[4/5] w-full animate-pulse bg-[#eef2f8]" />
          <div className="grid gap-2.5 p-3 sm:p-4">
            <div className="h-2.5 w-1/3 animate-pulse rounded bg-[#eef2f8]" />
            <div className="h-4 w-3/4 animate-pulse rounded bg-[#eef2f8]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-[#eef2f8]" />
            <div className="mt-2 h-8 w-full animate-pulse rounded-lg bg-[#eef2f8]" />
          </div>
        </div>
      ))}
    </div>
  );
}
