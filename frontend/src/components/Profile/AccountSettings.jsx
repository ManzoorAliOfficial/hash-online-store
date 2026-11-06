import { useState } from "react";
import { useStore } from "../../context/StoreContext";

export default function AccountSettings() {
  const { changePassword } = useStore();
  const [message, setMessage] = useState("");
  const [ok, setOk] = useState(false);
  const submit = async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));
    if (data.newPassword !== data.confirmPassword) {
      setOk(false);
      setMessage("The new passwords do not match.");
      return;
    }
    const result = await changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    });
    setOk(result.ok);
    setMessage(result.ok ? "Demo account password updated." : result.error);
    if (result.ok) event.currentTarget.reset();
  };
  return (
    <form
      id="account-settings"
      className="grid gap-4 rounded-xl border border-[#e4eaf3] bg-white p-5 shadow-[0_8px_24px_rgba(16,36,73,.04)]"
      onSubmit={submit}
    >
      <h2 className="text-lg font-bold text-[#17233b]">Account settings</h2>
      <p className="text-xs text-[#8491a5]">
        This demo stores account data in this browser only.
      </p>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Current password
        <input
          className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="currentPassword"
          type="password"
          required
          autoComplete="current-password"
        />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        New password
        <input
          className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="newPassword"
          type="password"
          minLength="8"
          required
          autoComplete="new-password"
        />
      </label>
      <label className="grid gap-1.5 text-xs font-semibold text-[#34445f]">
        Confirm new password
        <input
          className="h-10 rounded-lg border border-[#dce5f3] px-3 text-sm font-normal outline-none focus:border-[#2563eb]"
          name="confirmPassword"
          type="password"
          minLength="8"
          required
          autoComplete="new-password"
        />
      </label>

      <button className="inline-flex min-h-[42px] w-fit items-center justify-center rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc]">
        Update password
      </button>

      {message && (
        <p
          className={`text-xs ${ok ? "text-[#16803b]" : "text-[#d14343]"}`}
          role="status"
        >
          {message}
        </p>
      )}
    </form>
  );
}
