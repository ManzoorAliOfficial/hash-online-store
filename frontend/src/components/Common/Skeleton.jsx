export default function Skeleton({ count = 4 }) {
  return (
    <div
      className="grid grid-cols-4 gap-[17px] max-[980px]:grid-cols-3 max-[700px]:grid-cols-2 max-[430px]:grid-cols-1"
      aria-label="Loading products"
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          className="overflow-hidden rounded-xl border border-[#edf0f5] bg-white"
          key={index}
        >
          <div className="h-[175px] animate-pulse bg-[#eef2f8]" />
          <div className="grid gap-3 p-[14px]">
            <div className="h-3 w-3/4 animate-pulse rounded bg-[#eef2f8]" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-[#eef2f8]" />
          </div>
        </div>
      ))}
    </div>
  );
}
