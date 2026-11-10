import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function RegisterForm() {
  const { registerCustomer } = useStore();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setMessage("");

    const data = Object.fromEntries(new FormData(event.currentTarget));

    if (!termsAccepted) {
      setMessage("Please accept the Terms & Conditions to create your account.");
      return;
    }

    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match. Please verify both passwords.");
      return;
    }

    if (data.password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }

    setBusy(true);

    try {
      const result = await registerCustomer({
        name: data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
      });

      if (!result?.ok) {
        setMessage(result?.error || "Could not create account. Please try again.");
        return;
      }

      navigate("/profile");
    } catch {
      setMessage("Unable to create account right now. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="space-y-3.5" onSubmit={submit} noValidate>
      {message && (
        <div
          className="flex items-start gap-2.5 rounded-xl border border-[#fecaca] bg-[#fff1f1] p-3.5 text-xs font-semibold text-[#d14343]"
          role="alert"
        >
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-1">
        <label
          htmlFor="reg-name"
          className="block text-xs font-bold text-[#17233b]"
        >
          Full name
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
            <User size={17} />
          </div>
          <input
            id="reg-name"
            name="name"
            required
            autoComplete="name"
            placeholder="e.g. Muhammad Ali"
            className="h-11 w-full rounded-xl border border-[#dce5f3] bg-[#f8fafd] pl-10 pr-4 text-sm text-[#17233b] placeholder:text-[#94a3b8] outline-none transition duration-150 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
          />
        </div>
      </div>

      {/* Email Address */}
      <div className="space-y-1">
        <label
          htmlFor="reg-email"
          className="block text-xs font-bold text-[#17233b]"
        >
          Email address
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
            <Mail size={17} />
          </div>
          <input
            id="reg-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-11 w-full rounded-xl border border-[#dce5f3] bg-[#f8fafd] pl-10 pr-4 text-sm text-[#17233b] placeholder:text-[#94a3b8] outline-none transition duration-150 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="space-y-1">
        <label
          htmlFor="reg-phone"
          className="block text-xs font-bold text-[#17233b]"
        >
          Phone number <span className="font-normal text-[#8491a5]">(Optional)</span>
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
            <Phone size={17} />
          </div>
          <input
            id="reg-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="e.g. 0300 1234567"
            className="h-11 w-full rounded-xl border border-[#dce5f3] bg-[#f8fafd] pl-10 pr-4 text-sm text-[#17233b] placeholder:text-[#94a3b8] outline-none transition duration-150 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
          />
        </div>
      </div>

      {/* Password & Confirm Password Row on larger screens */}
      <div className="grid gap-3 sm:grid-cols-2">
        {/* Password */}
        <div className="space-y-1">
          <label
            htmlFor="reg-password"
            className="block text-xs font-bold text-[#17233b]"
          >
            Password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
              <Lock size={17} />
            </div>
            <input
              id="reg-password"
              name="password"
              type={showPassword ? "text" : "password"}
              minLength={8}
              required
              autoComplete="new-password"
              placeholder="Min. 8 characters"
              className="h-11 w-full rounded-xl border border-[#dce5f3] bg-[#f8fafd] pl-10 pr-10 text-sm text-[#17233b] placeholder:text-[#94a3b8] outline-none transition duration-150 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-[#8491a5] transition hover:text-[#2563eb]"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label
            htmlFor="reg-confirm-password"
            className="block text-xs font-bold text-[#17233b]"
          >
            Confirm password
          </label>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-[#8491a5]">
              <Lock size={17} />
            </div>
            <input
              id="reg-confirm-password"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              minLength={8}
              required
              autoComplete="new-password"
              placeholder="Repeat password"
              className="h-11 w-full rounded-xl border border-[#dce5f3] bg-[#f8fafd] pl-10 pr-10 text-sm text-[#17233b] placeholder:text-[#94a3b8] outline-none transition duration-150 focus:border-[#2563eb] focus:bg-white focus:ring-4 focus:ring-[#2563eb]/10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex cursor-pointer items-center pr-3 text-[#8491a5] transition hover:text-[#2563eb]"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Terms & Conditions Checkbox */}
      <div className="pt-1">
        <label className="flex cursor-pointer items-start gap-2 select-none">
          <input
            type="checkbox"
            name="terms"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-0.5 size-4 cursor-pointer rounded border-[#cbd5e1] text-[#2563eb] accent-[#2563eb] focus:ring-[#2563eb]"
          />
          <span className="text-xs font-medium text-[#52617a] leading-tight">
            I agree to the{" "}
            <Link
              to="/terms"
              target="_blank"
              className="cursor-pointer font-bold text-[#2563eb] transition hover:text-[#174fcc] hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              to="/terms"
              target="_blank"
              className="cursor-pointer font-bold text-[#2563eb] transition hover:text-[#174fcc] hover:underline"
            >
              Privacy Policy
            </Link>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#2563eb] px-5 text-sm font-bold text-white shadow-md shadow-[#2563eb]/20 transition-all duration-150 hover:bg-[#174fcc] hover:shadow-lg hover:shadow-[#2563eb]/25 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {busy ? (
          <>
            <Loader2 size={17} className="animate-spin" />
            <span>Creating account...</span>
          </>
        ) : (
          <>
            <span>Create Account</span>
            <ArrowRight size={16} />
          </>
        )}
      </button>

      {/* Login Link */}
      <div className="pt-1 text-center text-xs text-[#71809a]">
        Already have an account?{" "}
        <Link
          className="cursor-pointer font-bold text-[#2563eb] transition hover:text-[#174fcc] hover:underline"
          to="/login"
        >
          Sign in
        </Link>
      </div>
    </form>
  );
}
