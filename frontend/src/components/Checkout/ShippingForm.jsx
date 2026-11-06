export default function ShippingForm({ onSubmit }) {
  return (
    <form
      className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit?.(Object.fromEntries(new FormData(e.currentTarget)));
      }}
    >
      <h2 className="mb-5 text-lg font-bold text-[#17233b]">
        Shipping information
      </h2>
      <div className="grid grid-cols-2 gap-4 max-[600px]:grid-cols-1">
        <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
          Full name
          <input
            className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="name"
            required
          />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
          Phone
          <input
            className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="phone"
            required
          />
        </label>
        <label className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f] max-[600px]:col-auto">
          Email
          <input
            className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            type="email"
            name="email"
            required
          />
        </label>
        <label className="col-span-full grid gap-1.5 text-xs font-semibold text-[#34445f] max-[600px]:col-auto">
          Address
          <input
            className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="address"
            required
          />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
          City
          <input
            className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="city"
            required
          />
        </label>
        <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
          Postal code
          <input
            className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
            name="postal"
          />
        </label>
        <button className="inline-flex min-h-[42px] w-fit items-center justify-center rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc]">
          Continue
        </button>
      </div>
    </form>
  );
}
