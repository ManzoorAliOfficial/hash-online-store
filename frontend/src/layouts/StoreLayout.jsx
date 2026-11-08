import { Outlet } from "react-router";
import Navbar from "../components/Layout/Navbar";
import Footer from "../components/Layout/Footer";
import Toast from "../components/Common/Toast";
import BackToTop from "../components/Common/BackToTop";
export default function StoreLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-[#f5f8fd]">
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <Toast />
      <BackToTop />
    </div>
  );
}
