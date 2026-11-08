import { Link, NavLink } from "react-router";
import { Heart, Search, ShoppingBag, UserRound, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";
import storeLogo from "../../assets/icons/Store.svg";
import AnnouncementBar from "./AnnouncementBar";
import SearchModal from "./SearchModal";

const navClass = ({ isActive }) =>
  `text-base font-semibold transition hover:text-[#2563eb] ${isActive ? "text-[#2563eb]" : "text-[#43536c]"}`;
const mobileClass = ({ isActive }) =>
  `rounded-lg px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-[#eff4ff] text-[#2563eb]" : "text-[#334560] hover:bg-[#f4f7fc] hover:text-[#2563eb]"}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { cart, wishlist, user } = useStore();
  const cartCount = cart.reduce((sum, item) => sum + Number(item.qty || 0), 0);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  return (
    <>
      <AnnouncementBar />

      <header className="sticky top-0 z-40 flex h-[70px] items-center justify-between border-b border-[#e8edf4] bg-white px-[max(calc((100vw-1690px)/2),6%)] shadow-xs max-[900px]:h-[72px] max-[600px]:px-4">
        <Link
          className="flex items-center"
          to="/"
          aria-label="Hash Online Store home"
          onClick={close}
        >
          <img
            className="h-[46px] w-auto max-w-[220px] max-[900px]:h-10 max-[600px]:h-8"
            src={storeLogo}
            alt="Hash Online Store"
          />
        </Link>

        <nav
          className="hidden items-center gap-9 lg:flex"
          aria-label="Main navigation"
        >
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>
          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>
          <a
            className="text-base font-semibold text-[#43536c] transition hover:text-[#2563eb]"
            href="/#categories"
            onClick={close}
          >
            Categories
          </a>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-4 text-[#203653] max-[900px]:gap-2.5">
          <button
            type="button"
            className="grid size-10 cursor-pointer place-items-center rounded-lg p-1 transition hover:bg-[#f4f7fc] hover:text-[#2563eb]"
            onClick={() => setSearchOpen(true)}
            aria-label="Search products"
            title="Search products (Ctrl+K)"
          >
            <Search
              className="size-5 max-[900px]:size-[18px]"
              strokeWidth={2}
            />
          </button>
          <NavLink
            to="/wishlist"
            aria-label="Wishlist"
            title="Wishlist"
            className={({ isActive }) =>
              `relative grid size-10 place-items-center rounded-lg p-1 transition hover:bg-[#f4f7fc] hover:text-[#2563eb] ${isActive ? "text-[#2563eb] bg-[#eff4ff]" : ""}`
            }
          >
            <Heart className="size-5 max-[900px]:size-[18px]" strokeWidth={2} />
            {wishlist.length > 0 && (
              <i className="absolute right-1 top-1 grid size-[18px] place-items-center rounded-full bg-[#2563eb] text-[10px] font-bold not-italic text-white">
                {wishlist.length}
              </i>
            )}
          </NavLink>
          <Link
            className="grid size-10 place-items-center rounded-lg p-1 transition hover:bg-[#f4f7fc] hover:text-[#2563eb]"
            to={user ? "/profile" : "/login"}
            aria-label="Account"
            title="Account"
          >
            <UserRound
              className="size-5 max-[900px]:size-[18px]"
              strokeWidth={2}
            />
          </Link>
          <Link
            aria-label="Cart"
            title="Cart"
            className="relative grid size-10 place-items-center rounded-lg p-1 transition hover:bg-[#f4f7fc] hover:text-[#2563eb]"
            to="/cart"
          >
            <ShoppingBag
              className="size-5 max-[900px]:size-[18px]"
              strokeWidth={2}
            />
            {cartCount > 0 && (
              <i className="absolute right-1 top-1 grid size-[18px] place-items-center rounded-full bg-[#2563eb] text-[10px] font-bold not-italic text-white">
                {cartCount}
              </i>
            )}
          </Link>
          <button
            className="grid size-10 place-items-center rounded-lg text-[#203653] hover:bg-[#f4f7fc] lg:hidden"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>

        {open && (
          <nav
            className="absolute left-0 right-0 top-full z-50 grid gap-1 border-b border-[#e4eaf3] bg-white p-4 shadow-xl lg:hidden"
            aria-label="Mobile navigation"
          >
            <NavLink to="/" end className={mobileClass} onClick={close}>
              Home
            </NavLink>
            <NavLink to="/products" className={mobileClass} onClick={close}>
              Products
            </NavLink>
            <a
              className="rounded-lg px-3 py-2.5 text-sm font-semibold text-[#334560] transition hover:bg-[#f4f7fc] hover:text-[#2563eb]"
              href="/#categories"
              onClick={close}
            >
              Categories
            </a>
            <NavLink to="/about" className={mobileClass} onClick={close}>
              About
            </NavLink>
            <NavLink to="/contact" className={mobileClass} onClick={close}>
              Contact
            </NavLink>
            <NavLink
              to={user ? "/profile" : "/login"}
              className={mobileClass}
              onClick={close}
            >
              My account
            </NavLink>
            <NavLink to="/wishlist" className={mobileClass} onClick={close}>
              Wishlist{wishlist.length > 0 && ` (${wishlist.length})`}
            </NavLink>
            <NavLink to="/cart" className={mobileClass} onClick={close}>
              Cart{cartCount > 0 && ` (${cartCount})`}
            </NavLink>
          </nav>
        )}
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
