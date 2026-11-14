import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function LoginForm() {
  const { loginCustomer } = useStore();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");
    setBusy(true);

    try {
      const data = Object.fromEntries(new FormData(event.currentTarget));
      const result = await loginCustomer({
        email: data.email,
        password: data.password,
      });

      if (!result?.ok) {
        setMessage(result?.error || "Unable to sign in. Please verify your credentials.");
        return;
      }

      navigate("/profile");
    } catch {
      setMessage("Unable to sign in right now. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="space-y-4" onSubmit={submit} noValidate>
      {message && (
        <div
          className="flex items-start gap-2.5 rounded-xl border border-[#fecaca] bg-[#fff1f1] p-3.5 text-xs font-semibold text-[#d14343]"
          role="alert"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-1.5">
        <label
          htmlFor="login-email"
          className="block text-xs font-bold text-[#17233b]"
        >
          Email address
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
            <Mail size={17} />
          </div>
          <input
            id="login-email"
            className="h-12 w-full rounded-xl border border-[#dce5f3] bg-[#f8fafd] pl-10 pr-4 text-sm text-[#17233b] placeholder:text-[#94a3b8] outline-none transition duration-150 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
            type="email"
            name="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="login-password"
            className="block text-xs font-bold text-[#17233b]"
          >
            Password
          </label>
          <Link
            className="cursor-pointer text-xs font-bold text-[#2563eb] transition hover:text-[#174fcc] hover:underline"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
            <Lock size={17} />
          </div>
          <input
            id="login-password"
            className="h-12 w-full rounded-xl border border-[#dce5f3] bg-[#f8fafd] pl-10 pr-11 text-sm text-[#17233b] placeholder:text-[#94a3b8] outline-none transition duration-150 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
            type={showPassword ? "text" : "password"}
            name="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3.5 text-[#8491a5] transition hover:text-[#2563eb]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>


      {/* Submit Button */}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 text-sm font-bold text-white shadow-md shadow-[#2563eb]/20 transition-all duration-150 hover:bg-[#174fcc] hover:shadow-lg hover:shadow-[#2563eb]/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 size={17} className="motion-safe:animate-spin motion-reduce:animate-none" />
            <span>Signing in...</span>
          </>
        ) : (
          <>
            <span>Sign In</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Register Link */}
      <div className="pt-2 text-center text-xs text-[#71809a]">
        New to Hash Store?{" "}
        <Link
          className="cursor-pointer font-bold text-[#2563eb] transition hover:text-[#174fcc] hover:underline"
          to="/register"
        >
          Create an account
        </Link>
      </div>
    </form>
  );
}
