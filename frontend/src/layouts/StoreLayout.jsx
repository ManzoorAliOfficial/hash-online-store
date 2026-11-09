import { Outlet } from "react-router";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Toast from "../components/Common/Toast";
import CartDrawer from "../components/Cart/CartDrawer";
import BottomNav from "../components/Layout/BottomNav";
import FloatingWhatsApp from "../components/Common/FloatingWhatsApp";

export default function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8fd] pb-16 md:pb-0">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <CartDrawer />
      <FloatingWhatsApp />
      <Toast />
    </div>
  );
}
