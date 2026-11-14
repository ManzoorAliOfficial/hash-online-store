import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Toast from "../components/Common/Toast";
import CartDrawer from "../components/Cart/CartDrawer";
import BottomNav from "../components/Layout/BottomNav";
import FloatingWhatsApp from "../components/Common/FloatingWhatsApp";
import Reveal from "../components/Common/Reveal";

export default function StoreLayout() {
  const { pathname } = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8fd] pb-16 md:pb-0">
      <Navbar />
      <main key={pathname} className="flex-1 motion-safe:animate-fade-in motion-reduce:animate-none">
        <Outlet />
      </main>
      <Reveal><Footer /></Reveal>
      <BottomNav />
      <CartDrawer />
      <FloatingWhatsApp />
      <Toast />
    </div>
  );
}
