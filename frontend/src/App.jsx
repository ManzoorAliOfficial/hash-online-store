import { lazy, Suspense, useLayoutEffect } from "react";
import { Routes, Route, useLocation } from "react-router";
import { StoreProvider } from "./context/StoreContext";
import StoreLayout from "./layouts/StoreLayout";
import AdminLayout from "./layouts/AdminLayout";
import Loader from "./components/Common/Loader";

// Storefront Pages (Code-split via dynamic import)
const Home = lazy(() => import("./pages/Home"));
const Products = lazy(() => import("./pages/Products"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Checkout = lazy(() => import("./pages/Checkout"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Orders = lazy(() => import("./pages/Orders"));
const OrderDetails = lazy(() => import("./pages/OrderDetails"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const Terms = lazy(() => import("./pages/Terms"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Admin Management Pages (Code-split via dynamic import)
const Dashboard = lazy(() => import("./admin/pages/Dashboard"));
const AdminProducts = lazy(() => import("./admin/pages/Products"));
const Categories = lazy(() => import("./admin/pages/Categories"));
const AdminOrders = lazy(() => import("./admin/pages/Orders"));
const Customers = lazy(() => import("./admin/pages/Customers"));
const Couriers = lazy(() => import("./admin/pages/Couriers"));
const Inventory = lazy(() => import("./admin/pages/Inventory"));
const Reviews = lazy(() => import("./admin/pages/Reviews"));
const Coupons = lazy(() => import("./admin/pages/Coupons"));
const Reports = lazy(() => import("./admin/pages/Reports"));
const Settings = lazy(() => import("./admin/pages/Settings"));
const Messages = lazy(() => import("./admin/pages/Messages"));

function ScrollToTop() {
  const { pathname, search, hash } = useLocation();
  useLayoutEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const resetToTop = () => {
      const previousBehavior = html.style.scrollBehavior;
      html.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      html.scrollTop = 0;
      body.scrollTop = 0;
      html.style.scrollBehavior = previousBehavior;
    };
    if (hash) {
      const target = document.getElementById(hash.slice(1));
      if (target) {
        const frame = window.requestAnimationFrame(() =>
          target.scrollIntoView({ behavior: "smooth", block: "start" }),
        );
        return () => window.cancelAnimationFrame(frame);
      }
    }
    resetToTop();
    const frame = window.requestAnimationFrame(resetToTop);
    return () => window.cancelAnimationFrame(frame);
  }, [pathname, search, hash]);
  return null;
}

export default function App() {
  return (
    <StoreProvider>
      <ScrollToTop />
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center p-8">
            <Loader label="Loading Hash Online Store" />
          </div>
        }
      >
        <Routes>
          <Route element={<StoreLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:id" element={<ProductDetails />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<OrderDetails />} />
            <Route path="profile" element={<Profile />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="contact" element={<Contact />} />
            <Route path="about" element={<About />} />
            <Route path="terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="categories" element={<Categories />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<Customers />} />
            <Route path="couriers" element={<Couriers />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="coupons" element={<Coupons />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
            <Route path="messages" element={<Messages />} />
            <Route path="*" element={<NotFound admin />} />
          </Route>
        </Routes>
      </Suspense>
    </StoreProvider>
  );
}
