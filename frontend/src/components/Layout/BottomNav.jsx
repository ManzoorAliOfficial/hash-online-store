import { NavLink, Link } from "react-router";
import { Home, Grid, ShoppingBag, UserRound } from "lucide-react";
import { useStore } from "../../context/StoreContext";

export default function BottomNav() {
  const { cartCount, openCartDrawer, user } = useStore();

  const navClass = ({ isActive }) =>
    `flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-bold transition-colors ${
      isActive ? "text-[#2563eb]" : "text-[#64748b] hover:text-[#17233b]"
    }`;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 flex items-center border-t border-[#e2e8f0] bg-white/95 px-2 backdrop-blur-md md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.06)]"
      style={{ paddingBottom: "max(env(safe-area-inset-bottom, 0px), 6px)" }}
      aria-label="Mobile Bottom Navigation"
    >
      {/* Home */}
      <NavLink to="/" end className={navClass}>
        <Home size={20} strokeWidth={2.2} />
        <span>Home</span>
      </NavLink>

      {/* Categories / Products */}
      <NavLink to="/products" className={navClass}>
        <Grid size={20} strokeWidth={2.2} />
        <span>Products</span>
      </NavLink>

      {/* Cart (Opens Cart Drawer) */}
      <button
        type="button"
        onClick={openCartDrawer}
        className="relative flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[10px] font-bold text-[#64748b] transition-colors hover:text-[#17233b]"
        aria-label="Open Cart"
      >
        <div className="relative">
          <ShoppingBag size={20} strokeWidth={2.2} />
          {cartCount > 0 && (
            <span className="absolute -right-2 -top-1.5 grid size-4.5 place-items-center rounded-full bg-[#f97316] text-[10px] font-black text-white shadow-xs">
              {cartCount > 99 ? "99+" : cartCount}
            </span>
          )}
        </div>
        <span>Cart</span>
      </button>

      {/* Account */}
      <NavLink to={user ? "/profile" : "/login"} className={navClass}>
        <UserRound size={20} strokeWidth={2.2} />
        <span>{user ? "Account" : "Sign In"}</span>
      </NavLink>
    </nav>
  );
}
