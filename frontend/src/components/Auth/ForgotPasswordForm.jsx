import { useState } from "react";
import { Link } from "react-router";
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setBusy(true);
    // Simulate network delay for realistic, smooth UX feedback
    await new Promise((resolve) => setTimeout(resolve, 600));
    setBusy(false);
    setSent(true);
  };

  return (
    <div className="w-full">
      {sent ? (
        <div className="space-y-5">
          <div className="rounded-2xl border border-[#d2f0da] bg-[#e9f8ed] p-5">
            <div className="flex items-start gap-3.5">
              <div className="grid size-9 shrink-0 place-items-center rounded-xl bg-[#16803b] text-white shadow-xs">
                <CheckCircle2 size={20} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-[#0e5c27]">
                  Reset instructions sent!
                </h3>
                <p className="text-xs leading-relaxed text-[#1b6b33]">
                  We sent password reset instructions to{" "}
                  <strong className="font-semibold text-[#0e5c27]">{email}</strong>.
                  Please check your inbox and spam folder.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-[#e8eff9] bg-[#f8fafd] p-4 text-xs text-[#52617a]">
            <p className="leading-relaxed">
              Didn't receive an email? Double-check that your email was spelled
              correctly, or request another link below.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-1">
            <button
              type="button"
              onClick={() => {
                setSent(false);
                setEmail("");
              }}
              className="inline-flex min-h-[46px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#dce5f3] bg-white px-5 text-xs font-bold text-[#17233b] transition hover:bg-[#f4f7fc] hover:border-[#cbd9f1] active:scale-[0.99]"
            >
              Send another reset link
            </button>

            <Link
              to="/login"
              className="inline-flex min-h-[44px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl text-xs font-bold text-[#2563eb] transition hover:text-[#174fcc]"
            >
              <ArrowLeft size={15} /> Back to Sign In
            </Link>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {error && (
            <div
              className="flex items-start gap-2.5 rounded-xl border border-[#fecaca] bg-[#fff1f1] p-3.5 text-xs font-semibold text-[#d14343]"
              role="alert"
            >
              <AlertCircle size={16} className="mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-1.5">
            <label
              htmlFor="forgot-email"
              className="block text-xs font-bold text-[#17233b]"
            >
              Email address
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
                <Mail size={17} />
              </div>
              <input
                id="forgot-email"
                type="email"
                name="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="h-12 w-full rounded-xl border border-[#dce5f3] bg-[#f8fafd] pl-10 pr-4 text-sm text-[#17233b] placeholder:text-[#94a3b8] outline-none transition duration-150 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
              />
            </div>
            <p className="text-[11px] text-[#71809a]">
              We will send you a secure link to reset your account password.
            </p>
          </div>

          <button
            type="submit"
            disabled={busy}
            className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 text-sm font-bold text-white shadow-md shadow-[#2563eb]/20 transition-all duration-150 hover:bg-[#174fcc] hover:shadow-lg hover:shadow-[#2563eb]/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? (
              <>
                <Loader2 size={17} className="animate-spin" />
                <span>Sending instructions...</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <div className="pt-2 text-center">
            <Link
              to="/login"
              className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-bold text-[#2563eb] transition hover:text-[#174fcc] hover:underline"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </Link>
          </div>
        </form>
      )}
    </div>
  );
}
