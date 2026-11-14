import { useState } from "react";
import { MapPin, Trash2 } from "lucide-react";
import { useStore } from "../../context/StoreContext";
export default function AddressBook() {
  const { addresses, user, addAddress, deleteAddress } = useStore();
  const [value, setValue] = useState("");
  const [message, setMessage] = useState("");
  const mine = addresses.filter(
    (address) => address.userId === (user?.id || "guest"),
  );
  const submit = (event) => {
    event.preventDefault();
    if (addAddress(value)) {
      setValue("");
      setMessage("Address saved in this browser.");
    } else {
      setMessage("Enter an address before saving.");
    }
  };
  return (
    <section className="rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]">
      <h2 className="mb-4 text-lg font-bold text-[#17233b]">Saved addresses</h2>
      {mine.length ? (
        mine.map((address) => (
          <div
            className="flex items-center gap-2 border-b border-[#edf0f5] py-3 text-xs text-[#52617a]"
            key={address.id}
          >
            <MapPin className="shrink-0 text-[#2563eb]" size={16} />
            <span className="flex-1">{address.text}</span>
            <button
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#d14343] hover:text-[#ae2d35]"
              type="button"
              onClick={() => deleteAddress(address.id)}
              aria-label="Remove address"
            >
              <Trash2 size={14} /> Remove
            </button>
          </div>
        ))
      ) : (
        <p className="mb-4 text-xs text-[#8491a5]">
          Save an address to speed up your next checkout.
        </p>
      )}
      <form className="mt-4 flex gap-2 max-[500px]:flex-col" onSubmit={submit}>
        <input
          className="h-10 min-w-0 flex-1 rounded-lg border border-[#dce5f3] px-3 text-sm outline-none focus:border-[#2563eb]"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          required
          placeholder="House, street, area, city"
          aria-label="New address"
          onFocus={() => setMessage("")}
        />
        <button className="inline-flex min-h-10 items-center justify-center rounded-lg border border-[#dce5f3] bg-white px-4 text-xs font-bold text-[#2563eb] transition hover:bg-[#eff4ff]">
          Add address
        </button>
      </form>
      {message && <p className="mt-2 text-xs text-[#52617a]" role="status">{message}</p>}
    </section>
  );
}
