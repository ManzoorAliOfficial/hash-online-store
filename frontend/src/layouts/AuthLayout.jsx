import { Link, Outlet } from "react-router";
import storeLogo from "../assets/icons/hash-online-store-logo.svg";
export default function AuthLayout() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f8fd] p-5">
      <section className="w-full max-w-[430px] rounded-2xl border border-[#e4eaf3] bg-white p-7 shadow-[0_18px_45px_rgba(16,36,73,.12)]">
        <Link to="/" className="mb-7 flex justify-center">
          <img
            className="h-11 w-auto"
            src={storeLogo}
            alt="Hash Online Store"
          />
        </Link>
        <Outlet />
      </section>
    </main>
  );
}
