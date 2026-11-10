import { useState } from "react";
import { ArrowRight, Mail, Gift, CheckCircle2 } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { PRIMARY_OFFER } from "../../constants/offers";

export default function Newsletter() {
  const { subscribe } = useStore();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const submit = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    if (subscribe(email)) {
      setMessage(PRIMARY_OFFER.successMessage);
      setSuccess(true);
      event.currentTarget.reset();
    } else {
      setMessage("Please enter a valid email address.");
      setSuccess(false);
    }
  };

  return (
    <section
      aria-label="Newsletter sign up"
      className="mx-auto mb-[75px] max-w-[1120px] rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c1f44] via-[#102449] to-[#0a1835] px-8 py-10 text-white shadow-[0_16px_40px_rgba(16,36,73,0.12)] sm:px-12 sm:py-12 max-[900px]:mx-[5%] max-[600px]:mx-4 max-[600px]:mb-[52px] max-[600px]:p-6"
    >
      <div className="grid grid-cols-[1.2fr_1fr] items-center gap-8 max-[850px]:grid-cols-1 max-[850px]:gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs font-extrabold tracking-[.14em] text-[#a9c6ff]">
            <Gift size={13} className="text-[#60a5fa]" />
            <span>WELCOME REWARD</span>
          </div>
          {/* Changed h3 to h2 */}
          <h2 className="mt-3 text-2xl font-extrabold tracking-[-.04em] text-white sm:text-3xl max-[600px]:text-xl">
            {PRIMARY_OFFER.headline}
          </h2>
          <p className="mt-2 text-xs leading-relaxed text-[#c6d5ee] sm:text-sm">
            Subscribe to our newsletter for exclusive weekly product drops,
            secret flash sales, and verified tech guides across Pakistan.
          </p>
        </div>

        <div>
          <form
            className="flex flex-col gap-2.5 sm:flex-row"
            onSubmit={submit}
          >
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
                <Mail size={16} />
              </div>
              <input
                className="h-12 w-full rounded-xl border border-white/20 bg-white/95 pl-10 pr-4 text-xs font-medium text-[#17233b] placeholder:text-[#8491a5] outline-none transition focus:border-[#7dafff] focus:bg-white focus:ring-4 focus:ring-[#7dafff]/30"
                name="email"
                type="email"
                required
                placeholder="Enter your email address"
                aria-label="Email address"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-6 text-xs font-bold text-white shadow-md shadow-[#2563eb]/20 transition hover:bg-[#174a93] active:scale-98"
            >
              <span>Subscribe</span>
              <ArrowRight size={15} />
            </button>
          </form>

          {message && (
            <div
              className={`mt-3 flex items-center gap-2 text-xs font-semibold ${
                success ? "text-[#86efac]" : "text-[#fca5a5]"
              }`}
              role="status"
            >
              {success && <CheckCircle2 size={15} className="shrink-0" />}
              <span>{message}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
