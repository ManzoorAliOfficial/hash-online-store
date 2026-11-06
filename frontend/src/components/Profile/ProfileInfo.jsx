import { useState } from "react";
export default function ProfileInfo({ user = {}, onSave = () => {} }) {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const submit = (event) => {
    event.preventDefault();
    const form = Object.fromEntries(new FormData(event.currentTarget));
    const result = onSave({
      name: String(form.name || "").trim(),
      email: String(form.email || "").trim(),
    });
    setError(!result?.ok);
    setMessage(
      result?.ok
        ? "Profile saved in this browser."
        : result?.error || "Profile could not be saved.",
    );
  };
  return (
    <form
      id="profile-information"
      className="grid gap-4 rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]"
      onSubmit={submit}
    >
      <h2 className="text-lg font-bold text-[#17233b]">Profile information</h2>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Full name
        <input
          className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="name"
          required
          defaultValue={user.name || ""}
          autoComplete="name"
        />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Email address
        <input
          className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="email"
          type="email"
          required
          defaultValue={user.email || ""}
          autoComplete="email"
        />
      </label>
      <button className="inline-flex min-h-[42px] w-fit items-center justify-center rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc]">
        Save profile
      </button>
      {message && (
        <p
          className={`text-xs ${error ? "text-[#d14343]" : "text-[#16803b]"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
