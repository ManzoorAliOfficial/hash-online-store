import { Link, NavLink } from "react-router";
import { Heart, Search, ShoppingBag, UserRound, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useStore } from "../../context/StoreContext";
import storeLogo from "../../assets/icons/Store.svg";
import AnnouncementBar from "./AnnouncementBar";
import SearchModal from "./SearchModal";
import Container from "./Container";

const navClass = ({ isActive }) =>
  `text-base font-semibold transition hover:text-[#2563eb] ${isActive ? "text-[#2563eb]" : "text-[#43536c]"}`;
const mobileClass = ({ isActive }) =>
  `rounded-lg px-3 py-2.5 text-sm font-semibold transition ${isActive ? "bg-[#eff4ff] text-[#2563eb]" : "text-[#334560] hover:bg-[#f4f7fc] hover:text-[#2563eb]"}`;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount, wishlist, user, openCartDrawer } = useStore();
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 10);
    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    return () => window.removeEventListener("scroll", updateScrollState);
  }, []);

  return (
    <>
      <AnnouncementBar />

      <header className={`sticky top-0 z-40 h-[70px] w-full border-b border-[#e8edf4] transition-[box-shadow,background-color] duration-200 max-[900px]:h-[72px] ${scrolled ? "bg-white/95 shadow-md backdrop-blur" : "bg-white shadow-xs"}`}>
        <Container className="flex h-full items-center justify-between">
        <Link
          className="flex items-center"
          to="/"
          aria-label="Hash Online Store home"
          onClick={close}
        >
          <img
            className="h-[46px] w-auto max-w-[220px] max-[900px]:h-10 max-[600px]:h-8 max-[380px]:h-7 max-[380px]:max-w-[100px]"
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
          <NavLink
            className={navClass}
            to="/products"
            onClick={close}
          >
            Categories
          </NavLink>
          <NavLink to="/about" className={navClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-4 text-[#203653] max-[900px]:gap-2.5 max-[380px]:gap-1">
          <button
            type="button"
            className="grid size-10 cursor-pointer place-items-center rounded-lg p-1 transition hover:bg-[#f4f7fc] hover:text-[#2563eb] max-[380px]:size-8"
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
              `relative grid size-10 place-items-center rounded-lg p-1 transition hover:bg-[#f4f7fc] hover:text-[#2563eb] max-[380px]:size-8 ${isActive ? "text-[#2563eb] bg-[#eff4ff]" : ""}`
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
            className="grid size-10 place-items-center rounded-lg p-1 transition hover:bg-[#f4f7fc] hover:text-[#2563eb] max-[380px]:size-8"
            to={user ? "/profile" : "/login"}
            aria-label="Account"
            title="Account"
          >
            <UserRound
              className="size-5 max-[900px]:size-[18px]"
              strokeWidth={2}
            />
          </Link>
          <button
            type="button"
            onClick={openCartDrawer}
            aria-label="Cart"
            title="Cart"
            className="relative grid size-10 cursor-pointer place-items-center rounded-lg p-1 transition hover:bg-[#f4f7fc] hover:text-[#2563eb] max-[380px]:size-8"
          >
            <ShoppingBag
              className="size-5 max-[900px]:size-[18px]"
              strokeWidth={2}
            />
            {cartCount > 0 && (
              <i key={cartCount} className="absolute right-1 top-1 grid size-[18px] place-items-center rounded-full bg-[#f97316] text-[10px] font-black not-italic text-white shadow-xs motion-safe:animate-pop motion-reduce:animate-none">
                {cartCount > 99 ? "99+" : cartCount}
              </i>
            )}
          </button>
          <button
            className="grid size-10 place-items-center rounded-lg text-[#203653] hover:bg-[#f4f7fc] lg:hidden max-[380px]:size-8"
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="size-5 max-[380px]:size-4" /> : <Menu className="size-5 max-[380px]:size-4" />}
          </button>
        </div>

        <nav
            className={`absolute left-0 right-0 top-full z-50 grid gap-1 border-b border-[#e4eaf3] bg-white p-4 shadow-xl transition-[transform,opacity,visibility] duration-200 ease-out lg:hidden ${open ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none -translate-y-2 opacity-0"} motion-reduce:transition-none`}
            aria-label="Mobile navigation"
            aria-hidden={!open}
            inert={!open}
          >
            <NavLink to="/" end className={mobileClass} onClick={close}>
              Home
            </NavLink>
            <NavLink to="/products" className={mobileClass} onClick={close}>
              Products
            </NavLink>
            <NavLink to="/products" className={mobileClass} onClick={close}>
              Categories
            </NavLink>
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
            <button
              type="button"
              onClick={() => {
                close();
                openCartDrawer();
              }}
              className="flex items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-[#334560] transition hover:bg-[#f4f7fc] hover:text-[#2563eb]"
            >
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="rounded-full bg-[#f97316] px-2 py-0.5 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
        </nav>
        </Container>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
