import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useStore } from "../../context/StoreContext";
export default function LoginForm() {
  const { loginCustomer } = useStore();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
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
        setMessage(result?.error || "Unable to sign in. Please try again.");
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
    <form className="grid gap-4" onSubmit={submit}>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Email address
        <input
          className="h-11 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
        />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Password
        <input
          className="h-11 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          type="password"
          name="password"
          required
          autoComplete="current-password"
          placeholder="Your password"
        />
      </label>
      <Link
        className="w-fit text-xs font-semibold text-[#2563eb] hover:text-[#174fcc]"
        to="/forgot-password"
      >
        Forgot password?
      </Link>
      <button
        className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={busy}
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
      {message && (
        <p className="text-xs text-[#d14343]" role="alert">
          {message}
        </p>
      )}
      <p className="text-xs text-[#71809a]">
        New to Hash Store?{" "}
        <Link className="font-bold text-[#2563eb]" to="/register">
          Create an account
        </Link>
      </p>
    </form>
  );
}
