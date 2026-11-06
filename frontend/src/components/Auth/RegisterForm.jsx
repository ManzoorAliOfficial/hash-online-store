import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useStore } from "../../context/StoreContext";
export default function RegisterForm() {
  const { registerCustomer } = useStore();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const submit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.password !== data.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }
    const result = await registerCustomer({
      name: data.name,
      email: data.email,
      password: data.password,
    });
    if (!result.ok) {
      setMessage(result.error);
      return;
    }
    navigate("/profile");
  };
  return (
    <form className="grid gap-4" onSubmit={submit}>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Full name
        <input
          className="h-11 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="name"
          required
          autoComplete="name"
        />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Email address
        <input
          className="h-11 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="email"
          type="email"
          required
          autoComplete="email"
        />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Password
        <input
          className="h-11 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="password"
          type="password"
          minLength="8"
          required
          autoComplete="new-password"
        />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Confirm password
        <input
          className="h-11 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="confirmPassword"
          type="password"
          minLength="8"
          required
          autoComplete="new-password"
        />
      </label>
      <button className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc]">
        Create account
      </button>
      {message && (
        <p className="text-xs text-[#d14343]" role="alert">
          {message}
        </p>
      )}
      <p className="text-xs text-[#71809a]">
        Already have an account?{" "}
        <Link className="font-bold text-[#2563eb]" to="/login">
          Sign in
        </Link>
      </p>
    </form>
  );
}
