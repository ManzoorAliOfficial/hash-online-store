import { Link, Outlet } from "react-router";
import { useStore } from "../context/StoreContext";
import AdminSidebar from "../admin/components/Layout/AdminSidebar";
import Toast from "../components/Common/Toast";

export default function AdminLayout() {
  const { user, loginAsDemoAdmin, logout } = useStore();
  const isAdminDemoEnabled = import.meta.env.VITE_ENABLE_ADMIN_DEMO === "true";

  if (user?.role !== "admin")
    return (
      <main className="grid min-h-screen place-items-center bg-[#f4f7fc] p-5">
        <section className="grid w-full max-w-[440px] gap-4 rounded-2xl bg-white p-7 shadow-[0_16px_38px_rgba(15,38,82,.12)]">
          <span className="w-fit rounded-full bg-[#eaf1ff] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-[.1em] text-[#2563eb]">
            Frontend demo
          </span>
          <h1 className="text-3xl font-bold tracking-[-.05em] text-[#071a3d]">
            Admin dashboard
          </h1>
          {isAdminDemoEnabled ? (
            <>
              <p className="text-sm leading-6 text-[#71809a]">
                This preview uses browser-local data and is not protected by
                server-side authentication.
              </p>
              <button
                className="inline-flex min-h-[44px] items-center justify-center rounded-lg bg-[#2563eb] px-5 text-xs font-bold text-white transition hover:bg-[#174fcc]"
                type="button"
                onClick={() => loginAsDemoAdmin()}
              >
                Continue to admin preview
              </button>
            </>
          ) : (
            <p className="text-sm leading-6 text-[#71809a]">
              Admin is not available
            </p>
          )}
          <Link
            className="inline-flex min-h-[44px] items-center justify-center rounded-lg border border-[#dce5f3] bg-white px-5 text-xs font-bold text-[#34445f] hover:bg-[#f4f7fc]"
            to="/"
          >
            Return to storefront
          </Link>
        </section>
      </main>
    );
  return (
    <div className="grid min-h-screen grid-cols-[244px_minmax(0,1fr)] bg-[#f4f7fc] max-[800px]:grid-cols-1">
      <AdminSidebar />
      <main className="min-w-0 p-7 max-[800px]:p-4">
        <header className="mb-7 flex items-center justify-between">
          <div>
            <small className="text-[10px] font-extrabold tracking-[.14em] text-[#2563eb]">
              HASH ONLINE STORE / ADMIN PREVIEW
            </small>
            <h2 className="mt-1 text-xl font-bold tracking-[-.04em] text-[#071a3d]">
              Store management
            </h2>
          </div>
          <button
            className="rounded-full bg-[#102449] px-3 py-2 text-[11px] font-bold text-white hover:bg-[#17366c]"
            type="button"
            title="Sign out of admin preview"
            onClick={logout}
          >
            AD · Sign out
          </button>
        </header>
        <Outlet />
      </main>
      <Toast />
    </div>
  );
}
