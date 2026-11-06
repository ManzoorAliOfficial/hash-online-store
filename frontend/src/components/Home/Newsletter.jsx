import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { useStore } from "../../context/StoreContext";
export default function Newsletter() {
  const { subscribe } = useStore();
  const [message, setMessage] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    setMessage(
      subscribe(email)
        ? "Thanks for subscribing."
        : "Please enter your email address.",
    );
    if (email) event.currentTarget.reset();
  };
  return (
    <form
      className="mx-auto mb-[75px] grid max-w-[1120px] grid-cols-[1fr_minmax(190px,300px)_auto] items-center gap-3 rounded-2xl bg-[#102449] px-[7%] py-8 text-white max-[900px]:mx-[5%] max-[700px]:grid-cols-1 max-[600px]:mx-4 max-[600px]:mb-[52px]"
      onSubmit={submit}
    >
      <div>
        <span className="text-[10px] font-extrabold tracking-[.14em] text-[#a9c6ff]">
          THE HASH STORE EDIT
        </span>
        <h3 className="mt-2 text-[25px] font-bold tracking-[-.04em]">
          Good things, delivered.
        </h3>
        <p className="mt-1 text-xs text-[#c6d5ee]">
          Get product news and special offers in your inbox.
        </p>
      </div>
      <input
        className="h-11 w-full rounded-lg border border-white/20 bg-white px-3 text-xs text-[#17233b] outline-none ring-0 placeholder:text-[#8491a5] focus:border-[#7dafff] focus:ring-2 focus:ring-[#7dafff]/35"
        name="email"
        type="email"
        required
        placeholder="Email address"
        aria-label="Email address"
      />
      <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#1f55cf]">
        Subscribe <ArrowRight size={15} />
      </button>
      {message && (
        <span role="status" className="col-span-full text-xs text-[#b6d2ff]">
          {message}
        </span>
      )}
    </form>
  );
}
