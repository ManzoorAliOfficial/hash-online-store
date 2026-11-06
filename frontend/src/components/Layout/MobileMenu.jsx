import { NavLink } from "react-router";
import { X } from "lucide-react";
export default function MobileMenu({ open = false, onClose = () => {} }) {
  if (!open) return null;
  const close = () => onClose();
  const linkClass = ({ isActive }) =>
    `rounded-lg px-3 py-3 text-sm font-semibold transition ${isActive ? "bg-[#eff4ff] text-[#2563eb]" : "text-[#334560] hover:bg-[#f4f7fc] hover:text-[#2563eb]"}`;
  return (
    <div
      className="fixed inset-0 z-50 bg-[#071a3d]/35 p-4 sm:hidden"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <nav
        className="ml-auto grid w-full max-w-[300px] gap-1 rounded-2xl bg-white p-3 shadow-2xl"
        aria-label="Mobile navigation"
      >
        <button
          type="button"
          className="mb-2 ml-auto grid size-9 place-items-center rounded-lg text-[#334560] hover:bg-[#f4f7fc]"
          onClick={close}
          aria-label="Close menu"
        >
          <X size={20} />
        </button>
        <NavLink to="/" end className={linkClass} onClick={close}>
          Home
        </NavLink>
        <NavLink to="/products" className={linkClass} onClick={close}>
          Products
        </NavLink>
        <a
          className="rounded-lg px-3 py-3 text-sm font-semibold text-[#334560] hover:bg-[#f4f7fc] hover:text-[#2563eb]"
          href="/#categories"
          onClick={close}
        >
          Categories
        </a>
        <NavLink to="/about" className={linkClass} onClick={close}>
          About
        </NavLink>
        <NavLink to="/contact" className={linkClass} onClick={close}>
          Contact
        </NavLink>
      </nav>
    </div>
  );
}
