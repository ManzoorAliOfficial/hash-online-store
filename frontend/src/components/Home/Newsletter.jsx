import { useState } from "react";
import { ArrowRight, CheckCircle2, Gift, Mail } from "lucide-react";
import { useStore } from "../../context/StoreContext";
import { PRIMARY_OFFER } from "../../constants/offers";

export default function Newsletter() {
  const { subscribe } = useStore();
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const email = new FormData(event.currentTarget).get("email");
    const saved = subscribe(email);
    setSuccess(saved);
    setMessage(saved ? "Thanks — your email is saved for this store demo." : "Please enter a valid email address.");
    if (saved) event.currentTarget.reset();
  };
  return <section aria-labelledby="home-newsletter-heading" className="rounded-[24px] border border-white/10 bg-gradient-to-br from-[#102449] via-[#0e2144] to-[#091832] px-5 py-7 text-white shadow-[0_18px_44px_-30px_rgba(15,35,71,.7)] sm:rounded-[28px] sm:px-8 sm:py-9 lg:px-10">
    <div className="grid items-center gap-6 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
      <div><span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[.15em] text-blue-100"><Gift size={12} /> Welcome reward</span><h2 id="home-newsletter-heading" className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">{PRIMARY_OFFER.headline}*</h2><p className="mt-2 max-w-lg text-xs leading-5 text-blue-100/75">Subscribe for product updates and store offers. *Offer terms apply.</p></div>
      <div><form onSubmit={submit} className="flex flex-col gap-2.5 sm:flex-row"><label className="flex min-h-11 min-w-0 flex-1 items-center gap-2.5 rounded-lg border border-white/15 bg-white px-3.5 text-[#64748b] focus-within:ring-2 focus-within:ring-blue-300"><span className="sr-only">Email address</span><Mail size={15} className="shrink-0" /><input name="email" type="email" autoComplete="email" required placeholder="Enter your email address" className="min-w-0 flex-1 bg-transparent text-xs text-[#17233b] outline-none placeholder:text-[#8491a5]" /></label><button type="submit" className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#1d4ed8]">Subscribe <ArrowRight size={14} /></button></form>{message && <p role="status" className={`mt-2 flex items-center gap-1.5 text-[10px] ${success ? "text-emerald-200" : "text-rose-200"}`}>{success && <CheckCircle2 size={12} />}{message}</p>}<p className="mt-2 text-[9px] text-blue-100/55">Email is saved locally in this demo; no email campaign service is connected.</p></div>
    </div>
  </section>;
}
