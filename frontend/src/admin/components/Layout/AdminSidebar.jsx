import { Link, NavLink } from "react-router";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Tags,
  Truck,
  Boxes,
  Star,
  TicketPercent,
  ChartNoAxesCombined,
  Settings,
  Store,
  Mail,
} from "lucide-react";
import storeMark from "../../../assets/icons/hash-online-store-mark.svg";

const links = [
  ["Dashboard", "/admin", LayoutDashboard],
  ["Products", "/admin/products", Package],
  ["Categories", "/admin/categories", Tags],
  ["Orders", "/admin/orders", ShoppingCart],
  ["Customers", "/admin/customers", Users],
  ["Messages", "/admin/messages", Mail],
  ["Couriers", "/admin/couriers", Truck],
  ["Inventory", "/admin/inventory", Boxes],
  ["Reviews", "/admin/reviews", Star],
  ["Coupons", "/admin/coupons", TicketPercent],
  ["Reports", "/admin/reports", ChartNoAxesCombined],
  ["Settings", "/admin/settings", Settings],
];

export default function AdminSidebar() {
  return (
    <aside className="sticky top-0 flex h-screen flex-col gap-1 bg-[#102449] px-3 py-5 text-[#b9c9e8] max-[800px]:relative max-[800px]:h-auto max-[800px]:flex-row max-[800px]:flex-wrap max-[800px]:items-center">
      <Link
        to="/admin"
        className="mb-5 flex items-center gap-2 px-2 text-white max-[800px]:mb-0 max-[800px]:mr-auto"
        aria-label="Hash Online Store admin"
      >
        <img className="size-8" src={storeMark} alt="" />{" "}
        <span className="text-base font-bold">
          Hash <b className="text-[#8bb6ff]">Admin</b>
        </span>
      </Link>
      <small className="mb-2 px-2 text-[9px] font-bold tracking-[.12em] text-[#7292c7] max-[800px]:hidden">
        STORE MANAGEMENT
      </small>
      {links.map(([label, to, Icon]) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/admin"}
          className={({ isActive }) =>
            `flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold transition max-[800px]:px-2.5 max-[800px]:py-2 ${isActive ? "bg-[#2563eb] text-white shadow-lg shadow-[#071a3d]/25" : "text-[#b9c9e8] hover:bg-white/10 hover:text-white"}`
          }
        >
          <Icon size={17} aria-hidden="true" />
          <span>{label}</span>
        </NavLink>
      ))}
      <Link
        className="mt-auto flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-semibold text-[#b9c9e8] hover:bg-white/10 hover:text-white max-[800px]:mt-0"
        to="/"
      >
        <Store size={17} /> Back to store
      </Link>
    </aside>
  );
}
