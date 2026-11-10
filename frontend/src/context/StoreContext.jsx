import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";

const seed = [
  {
    id: "p1",
    name: "iPhone 15 Pro",
    category: "Phones",
    price: 289999,
    oldPrice: 329999,
    rating: 4.9,
    reviews: 126,
    stock: 18,
    icon: "phone",
    image:
      "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A powerful, beautifully designed smartphone with a pro camera system and all-day performance.",
  },
  {
    id: "p2",
    name: "AirPods Pro 2",
    category: "Audio",
    price: 64999,
    oldPrice: 72000,
    rating: 4.8,
    reviews: 94,
    stock: 27,
    icon: "audio",
    image:
      "https://images.unsplash.com/photo-1733556046403-2d090cf359a3?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "Immersive sound, active noise cancellation and a comfortable fit for everyday listening.",
  },
  {
    id: "p3",
    name: "MacBook Air M2",
    category: "Laptops",
    price: 304999,
    oldPrice: 0,
    rating: 4.9,
    reviews: 68,
    stock: 9,
    icon: "laptop",
    image:
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A lightweight laptop built for work, study and creative projects.",
  },
  {
    id: "p4",
    name: "Watch S11 Series",
    category: "Wearables",
    price: 89999,
    oldPrice: 119999,
    rating: 4.8,
    reviews: 64,
    stock: 15,
    icon: "watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "Next-generation flagship smartwatch with edge-to-edge OLED display, fast wireless charging, and comprehensive fitness tracking.",
  },
  {
    id: "p5",
    name: "Noise Cancel Headphones",
    category: "Audio",
    price: 38999,
    oldPrice: 44999,
    rating: 4.6,
    reviews: 42,
    stock: 31,
    icon: "audio",
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "Rich audio and comfortable cushioning for your commute or desk.",
  },
  {
    id: "p6",
    name: "Wireless Charging Stand",
    category: "Accessories",
    price: 11999,
    oldPrice: 14999,
    rating: 4.5,
    reviews: 38,
    stock: 42,
    icon: "accessory",
    image:
      "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?auto=format&fit=crop&w=900&h=700&q=85",
    description: "A compact charging stand designed to keep your desk tidy.",
  },
  {
    id: "p7",
    name: "Gaming Controller",
    category: "Gaming",
    price: 21999,
    oldPrice: 0,
    rating: 4.7,
    reviews: 29,
    stock: 21,
    icon: "gaming",
    image:
      "https://images.unsplash.com/photo-1602323460270-4caefc261548?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "Responsive controls and comfortable ergonomics for your gaming setup.",
  },
  {
    id: "p8",
    name: "USB-C Power Adapter",
    category: "Accessories",
    price: 8999,
    oldPrice: 9999,
    rating: 4.4,
    reviews: 21,
    stock: 54,
    icon: "accessory",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&h=700&q=85",
    description: "Fast, reliable charging in a compact travel-friendly design.",
  },
  {
    id: "p9",
    name: "Samsung Galaxy S24 Ultra",
    category: "Phones",
    price: 324999,
    oldPrice: 349999,
    rating: 4.8,
    reviews: 115,
    stock: 12,
    icon: "phone",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A premium smartphone with a vivid display, versatile cameras and powerful performance.",
  },
  {
    id: "p10",
    name: "Google Pixel 9 Pro",
    category: "Phones",
    price: 269999,
    oldPrice: 289999,
    rating: 4.7,
    reviews: 87,
    stock: 15,
    icon: "phone",
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A smart everyday phone with crisp photography and a smooth, responsive screen.",
  },
  {
    id: "p11",
    name: "iPhone 15 Plus",
    category: "Phones",
    price: 259999,
    oldPrice: 279999,
    rating: 4.8,
    reviews: 102,
    stock: 14,
    icon: "phone",
    image:
      "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A large bright display, reliable cameras and all-day battery life in one device.",
  },
  {
    id: "p12",
    name: "Redmi Note 14 Pro",
    category: "Phones",
    price: 79999,
    oldPrice: 89999,
    rating: 4.5,
    reviews: 37,
    stock: 33,
    icon: "phone",
    image:
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A feature-rich phone with a bright display and dependable everyday performance.",
  },
  {
    id: "p13",
    name: "Sony WH-1000XM5",
    category: "Audio",
    price: 94999,
    oldPrice: 109999,
    rating: 4.8,
    reviews: 78,
    stock: 11,
    icon: "audio",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "Comfortable wireless headphones with detailed sound for work and travel.",
  },
  {
    id: "p14",
    name: "JBL Tune 770NC",
    category: "Audio",
    price: 27999,
    oldPrice: 32999,
    rating: 4.6,
    reviews: 52,
    stock: 19,
    icon: "audio",
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "Wireless headphones with rich bass and a comfortable over-ear fit.",
  },
  {
    id: "p15",
    name: "Sony WF-1000XM5 Earbuds",
    category: "Audio",
    price: 79999,
    oldPrice: 89999,
    rating: 4.7,
    reviews: 61,
    stock: 8,
    icon: "audio",
    image:
      "https://images.unsplash.com/photo-1733556046403-2d090cf359a3?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "Pocket-sized earbuds with clear sound and effective noise cancellation.",
  },
  {
    id: "p16",
    name: "JBL Flip 6 Speaker",
    category: "Audio",
    price: 31999,
    oldPrice: 34999,
    rating: 4.6,
    reviews: 43,
    stock: 20,
    icon: "audio",
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A portable speaker with room-filling sound for home and outdoor listening.",
  },
  {
    id: "p17",
    name: "MacBook Pro 14-inch",
    category: "Laptops",
    price: 619999,
    oldPrice: 659999,
    rating: 4.9,
    reviews: 71,
    stock: 6,
    icon: "laptop",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A powerful laptop for demanding creative, business and development work.",
  },
  {
    id: "p18",
    name: "Lenovo Yoga Slim 7",
    category: "Laptops",
    price: 189999,
    oldPrice: 209999,
    rating: 4.5,
    reviews: 34,
    stock: 12,
    icon: "laptop",
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A slim, versatile laptop made for studying, working and travelling.",
  },
  {
    id: "p19",
    name: "ASUS Zenbook 14",
    category: "Laptops",
    price: 329999,
    oldPrice: 359999,
    rating: 4.8,
    reviews: 56,
    stock: 7,
    icon: "laptop",
    image:
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A lightweight laptop with a sharp screen and responsive performance.",
  },
  {
    id: "p20",
    name: "Apple Watch SE",
    category: "Wearables",
    price: 79999,
    oldPrice: 89999,
    rating: 4.6,
    reviews: 49,
    stock: 16,
    icon: "watch",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A handy smartwatch for notifications, workouts and everyday activity.",
  },
  {
    id: "p21",
    name: "Samsung Galaxy Watch 7",
    category: "Wearables",
    price: 89999,
    oldPrice: 99999,
    rating: 4.7,
    reviews: 53,
    stock: 10,
    icon: "watch",
    image:
      "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A modern smartwatch with useful health and fitness tracking features.",
  },
  {
    id: "p22",
    name: "Fitbit Charge 6",
    category: "Wearables",
    price: 48999,
    oldPrice: 52999,
    rating: 4.4,
    reviews: 28,
    stock: 18,
    icon: "watch",
    image:
      "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A comfortable activity tracker for daily movement, workouts and sleep.",
  },
  {
    id: "p23",
    name: "Anker Nano 65W Charger",
    category: "Accessories",
    price: 15999,
    oldPrice: 17999,
    rating: 4.7,
    reviews: 64,
    stock: 32,
    icon: "accessory",
    image:
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A compact fast charger that is easy to carry between home and work.",
  },
  {
    id: "p24",
    name: "MagSafe Wireless Charger",
    category: "Accessories",
    price: 11999,
    oldPrice: 13999,
    rating: 4.5,
    reviews: 41,
    stock: 29,
    icon: "accessory",
    image:
      "https://images.unsplash.com/photo-1606741965326-cb990ae01bb2?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A simple wireless charging stand that keeps your phone ready and visible.",
  },
  {
    id: "p25",
    name: "USB-C Hub 7-in-1",
    category: "Accessories",
    price: 19999,
    oldPrice: 22999,
    rating: 4.5,
    reviews: 33,
    stock: 25,
    icon: "accessory",
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A compact multiport hub for connecting displays, storage and accessories.",
  },
  {
    id: "p26",
    name: "PowerCore 20,000mAh",
    category: "Accessories",
    price: 12999,
    oldPrice: 14999,
    rating: 4.6,
    reviews: 57,
    stock: 24,
    icon: "accessory",
    image:
      "https://images.unsplash.com/photo-1609592806596-4d19ca092ad5?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A high-capacity power bank for keeping your devices charged on the go.",
  },
  {
    id: "p27",
    name: "Logitech MX Master 3S",
    category: "Accessories",
    price: 35999,
    oldPrice: 39999,
    rating: 4.8,
    reviews: 68,
    stock: 8,
    icon: "accessory",
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "An ergonomic wireless mouse designed for precise, comfortable work.",
  },
  {
    id: "p28",
    name: "DualSense Wireless Controller",
    category: "Gaming",
    price: 24999,
    oldPrice: 27999,
    rating: 4.8,
    reviews: 67,
    stock: 13,
    icon: "gaming",
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A responsive wireless controller with an ergonomic shape for long sessions.",
  },
  {
    id: "p29",
    name: "Logitech G733 Wireless Headset",
    category: "Gaming",
    price: 22999,
    oldPrice: 25999,
    rating: 4.5,
    reviews: 35,
    stock: 17,
    icon: "gaming",
    image:
      "https://images.unsplash.com/photo-1599669454699-248893623440?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A lightweight gaming headset with clear voice chat and immersive sound.",
  },
  {
    id: "p30",
    name: "Mechanical RGB Keyboard",
    category: "Gaming",
    price: 32999,
    oldPrice: 36999,
    rating: 4.6,
    reviews: 39,
    stock: 9,
    icon: "gaming",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&h=700&q=85",
    description:
      "A mechanical keyboard with satisfying key response for gaming and typing.",
  },
];

const C = createContext(null);

const safeRead = (key, fallback) => {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    if (value === null || value === undefined) return fallback;
    if (
      Array.isArray(fallback) &&
      Array.isArray(value) &&
      value.length === 0 &&
      fallback.length > 0
    ) {
      return fallback;
    }
    if (key === "hash-coupons" && Array.isArray(value)) {
      if (!value.some((c) => c.code === "HASH500")) {
        const hash500 = defaultCoupons.find((c) => c.code === "HASH500");
        if (hash500) return [hash500, ...value];
      }
    }
    return value;
  } catch {
    return fallback;
  }
};

const safeWrite = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    window.dispatchEvent(
      new CustomEvent("hash-toast", {
        detail: "Browser storage is full. Some demo data may not be saved.",
      }),
    );
  }
};

function usePersistentState(key, fallback) {
  const [value, setValue] = useState(() => safeRead(key, fallback));
  useEffect(() => safeWrite(key, value), [key, value]);
  return [value, setValue];
}

const makeId = (prefix) =>
  prefix +
  "-" +
  Date.now().toString(36) +
  "-" +
  Math.random().toString(36).slice(2, 7);
const emitNotice = (detail) =>
  window.dispatchEvent(new CustomEvent("hash-toast", { detail }));

async function createPasswordRecord(password) {
  if (!globalThis.crypto?.subtle) {
    throw new Error("Please use localhost or HTTPS to create a demo account.");
  }
  const saltBytes = crypto.getRandomValues(new Uint8Array(16));
  const salt = Array.from(saltBytes, (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  const bytes = new TextEncoder().encode(salt + ":" + password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const passwordHash = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return { salt, passwordHash };
}

async function verifyPassword(password, account) {
  const bytes = new TextEncoder().encode(account.salt + ":" + password);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  const passwordHash = Array.from(new Uint8Array(digest), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");
  return passwordHash === account.passwordHash;
}

const defaultCategories = [
  "Phones",
  "Audio",
  "Laptops",
  "Wearables",
  "Accessories",
  "Gaming",
];
const defaultCoupons = [
  {
    id: "welcome10",
    code: "WELCOME10",
    type: "percent",
    value: 10,
    minimumOrder: 25000,
    active: true,
  },
  {
    id: "hash500",
    code: "HASH500",
    type: "fixed",
    value: 500,
    minimumOrder: 5000,
    active: true,
  },
  {
    id: "tech5000",
    code: "TECH5000",
    type: "fixed",
    value: 5000,
    minimumOrder: 100000,
    active: true,
  },
];

const defaultReviews = [
  {
    id: "rev-1",
    productId: "p1",
    productName: "iPhone 15 Pro",
    name: "Usman Tariq",
    rating: 5,
    status: "Published",
    text: "Delivered in sealed original retail box. Battery life and camera are breathtaking. Verified PTA approved. Highly recommended!",
    date: "2026-10-24T14:32:00.000Z",
  },
  {
    id: "rev-2",
    productId: "p1",
    productName: "iPhone 15 Pro",
    name: "Zainab Fatima",
    rating: 5,
    status: "Published",
    text: "Received the Natural Titanium model within 2 days in Lahore. 100% original with valid serial. Superb customer support.",
    date: "2026-10-18T10:15:00.000Z",
  },
  {
    id: "rev-3",
    productId: "p2",
    productName: "AirPods Pro 2",
    name: "Bilal Sheikh",
    rating: 5,
    status: "Published",
    text: "Active noise cancellation is phenomenal, cuts out all city traffic. Spatial audio is crisp and immersive.",
    date: "2026-10-28T16:45:00.000Z",
  },
  {
    id: "rev-4",
    productId: "p2",
    productName: "AirPods Pro 2",
    name: "Ayesha Noor",
    rating: 5,
    status: "Published",
    text: "Original Apple product with working warranty on Apple coverage checker. Fast doorstep delivery via TCS.",
    date: "2026-10-14T09:20:00.000Z",
  },
  {
    id: "rev-5",
    productId: "p3",
    productName: "MacBook Air M2",
    name: "Farhan Ali",
    rating: 5,
    status: "Published",
    text: "Completely silent, super fast, and the battery easily lasts 15+ hours of heavy development work. Best laptop investment.",
    date: "2026-10-22T12:00:00.000Z",
  },
  {
    id: "rev-6",
    productId: "p4",
    productName: "Watch S11 Series",
    name: "Dr. Sarah Khan",
    rating: 5,
    status: "Published",
    text: "Heart rate tracking and ECG are spot-on accurate. Display is ultra-bright even under direct Pakistani sunlight.",
    date: "2026-10-12T11:10:00.000Z",
  },
  {
    id: "rev-7",
    productId: "p5",
    productName: "Noise Cancel Headphones",
    name: "Hamza Rehman",
    rating: 5,
    status: "Published",
    text: "Cushioning is exceptionally comfortable for long work sessions. Rich bass without overpowering highs.",
    date: "2026-10-05T18:25:00.000Z",
  },
  {
    id: "rev-8",
    productId: "p7",
    productName: "Gaming Controller",
    name: "Ahmed Raza",
    rating: 5,
    status: "Published",
    text: "Zero input latency on PC and PS5. Ergonomics and trigger resistance feel sturdy and premium.",
    date: "2026-09-29T15:30:00.000Z",
  },
];
const defaultSettings = {
  storeName: "Hash Online Store",
  supportEmail: "support@hashstore.pk",
  supportPhone: "+92 301 3858980",
  whatsappNumber: "+92 301 3858980",
  instagramUrl: "",
  twitterUrl: "",
  linkedinUrl: "",
  currency: "PKR",
  deliveryFee: 1500,
  freeDeliveryThreshold: 5000,
};

export function StoreProvider({ children }) {
  const [products, setProducts] = usePersistentState("hash-products", seed);
  const [categories, setCategories] = usePersistentState(
    "hash-categories",
    defaultCategories,
  );
  const [cart, setCart] = usePersistentState("hash-cart", []);
  const [wishlist, setWishlist] = usePersistentState("hash-wishlist", []);
  const [orders, setOrders] = usePersistentState("hash-orders", []);
  const [user, setUser] = usePersistentState("hash-user", null);
  const [accounts, setAccounts] = usePersistentState("hash-accounts", []);
  const [addresses, setAddresses] = usePersistentState("hash-addresses", []);
  const [coupons, setCoupons] = usePersistentState(
    "hash-coupons",
    defaultCoupons,
  );
  const [appliedCoupon, setAppliedCoupon] = usePersistentState(
    "hash-applied-coupon",
    null,
  );
  const [settings, setSettings] = usePersistentState(
    "hash-store-settings",
    defaultSettings,
  );
  const [reviews, setReviews] = usePersistentState(
    "hash-reviews",
    defaultReviews,
  );
  const [messages, setMessages] = usePersistentState("hash-messages", []);
  const [subscribers, setSubscribers] = usePersistentState(
    "hash-subscribers",
    [],
  );
  const [couriers, setCouriers] = usePersistentState("hash-couriers", [
    { id: "trax", name: "Trax", enabled: false },
    { id: "leopards", name: "Leopards", enabled: false },
    { id: "mnp", name: "M&P", enabled: false },
    { id: "tcs", name: "TCS", enabled: false },
  ]);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const openCartDrawer = useCallback(() => setCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setCartDrawerOpen(false), []);

  useEffect(() => {
    // Automatically migrate placeholder phone numbers to the live WhatsApp number
    if (
      settings?.whatsappNumber === "+92 300 1234567" ||
      !settings?.whatsappNumber
    ) {
      setSettings((prev) => ({
        ...prev,
        whatsappNumber: "+92 301 3858980",
        supportPhone:
          prev?.supportPhone === "+92 300 1234567" || !prev?.supportPhone
            ? "+92 301 3858980"
            : prev.supportPhone,
      }));
    }
  }, [settings?.whatsappNumber, settings?.supportPhone, setSettings]);

  useEffect(() => {
    setCart((previous) => {
      const next = previous.reduce((items, item) => {
        const product = products.find((entry) => entry.id === item.id);
        const qty = Math.min(
          product?.stock || 0,
          Math.floor(Number(item.qty) || 0),
        );
        if (product && qty > 0) items.push({ id: item.id, qty });
        return items;
      }, []);
      return next.length === previous.length &&
        next.every(
          (item, index) =>
            item.id === previous[index].id &&
            item.qty === Number(previous[index].qty),
        )
        ? previous
        : next;
    });
  }, [products]);

  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + (product?.price || 0) * item.qty;
  }, 0);
  const activeCoupon = coupons.find(
    (coupon) =>
      coupon.code === appliedCoupon &&
      coupon.active &&
      subtotal >= Number(coupon.minimumOrder || 0),
  );
  const discount = activeCoupon
    ? Math.min(
        subtotal,
        activeCoupon.type === "percent"
          ? Math.round((subtotal * activeCoupon.value) / 100)
          : activeCoupon.value,
      )
    : 0;
  const freeThreshold =
    Number(settings.freeDeliveryThreshold) > 0
      ? Number(settings.freeDeliveryThreshold)
      : 5000;
  const delivery =
    subtotal === 0 || subtotal >= freeThreshold
      ? 0
      : Number(settings.deliveryFee || 0);
  const cartTotals = useMemo(
    () => ({
      subtotal,
      discount,
      delivery,
      total: Math.max(0, subtotal - discount + delivery),
      coupon: activeCoupon || null,
    }),
    [subtotal, discount, delivery, activeCoupon],
  );
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);

  const addToCart = (id, quantity = 1, openDrawer = true) => {
    quantity = Math.max(1, Math.floor(Number(quantity) || 1));
    const product = products.find((entry) => entry.id === id);
    const currentQuantity =
      Number(cart.find((item) => item.id === id)?.qty) || 0;
    if (!product) {
      emitNotice("This product is no longer available.");
      return false;
    }
    if (product.stock < 1 || currentQuantity + quantity > product.stock) {
      emitNotice(
        product.stock < 1
          ? "This product is out of stock."
          : "You have reached the available stock limit.",
      );
      return false;
    }
    setCart((previous) => {
      const existing = previous.find((item) => item.id === id);
      return existing
        ? previous.map((item) =>
            item.id === id ? { ...item, qty: item.qty + quantity } : item,
          )
        : [...previous, { id, qty: quantity }];
    });
    emitNotice("Added to your cart.");
    if (openDrawer) setCartDrawerOpen(true);
    return true;
  };

  const setQty = (id, quantity) => {
    quantity = Math.floor(Number(quantity) || 0);
    const product = products.find((entry) => entry.id === id);
    if (!product) {
      setCart((previous) => previous.filter((item) => item.id !== id));
      return;
    }
    if (quantity > product.stock) {
      emitNotice("Only " + product.stock + " item(s) are available.");
      return;
    }
    setCart((previous) =>
      quantity < 1
        ? previous.filter((item) => item.id !== id)
        : previous.map((item) =>
            item.id === id ? { ...item, qty: quantity } : item,
          ),
    );
  };

  const removeFromCart = (id) =>
    setCart((previous) => previous.filter((item) => item.id !== id));
  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };
  const toggleWishlist = (id) =>
    setWishlist((previous) =>
      previous.includes(id)
        ? previous.filter((item) => item !== id)
        : [...previous, id],
    );

  const applyCoupon = (code) => {
    const normalized = String(code || "")
      .trim()
      .toUpperCase();
    const coupon = coupons.find(
      (item) => item.code.toUpperCase() === normalized && item.active,
    );
    if (!coupon)
      return { ok: false, message: "That coupon code is not valid." };
    if (subtotal < Number(coupon.minimumOrder || 0)) {
      return {
        ok: false,
        message:
          "This coupon needs a Rs. " +
          Number(coupon.minimumOrder).toLocaleString() +
          " minimum order.",
      };
    }
    setAppliedCoupon(coupon.code);
    return { ok: true, message: coupon.code + " applied." };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const placeOrder = (details) => {
    if (!cart.length) return { ok: false, error: "Your cart is empty." };
    const items = cart
      .map((item) => {
        const product = products.find((entry) => entry.id === item.id);
        return product ? { ...item, product: { ...product } } : null;
      })
      .filter(Boolean);
    if (items.length !== cart.length)
      return {
        ok: false,
        error: "A product in your cart is no longer available.",
      };
    const stockIssue = items.find((item) => item.qty > item.product.stock);
    if (stockIssue)
      return {
        ok: false,
        error: stockIssue.product.name + " no longer has enough stock.",
      };

    const totals = cartTotals;
    const order = {
      id: "HS" + Date.now().toString().slice(-8),
      date: new Date().toISOString(),
      status: "Confirmed",
      items,
      subtotal: totals.subtotal,
      discount: totals.discount,
      delivery: totals.delivery,
      coupon: totals.coupon?.code || null,
      total: totals.total,
      userId: user?.id || null,
      details: { ...details },
    };
    setOrders((previous) => [order, ...previous]);
    setProducts((previous) =>
      previous.map((product) => {
        const purchased = items.find((item) => item.id === product.id);
        return purchased
          ? { ...product, stock: Math.max(0, product.stock - purchased.qty) }
          : product;
      }),
    );
    clearCart();
    return { ok: true, order };
  };

  const updateOrderStatus = (id, status) => {
    const order = orders.find((item) => item.id === id);
    if (!order || order.status === status) return true;
    if (status !== "Cancelled" && order.status === "Cancelled") {
      const shortage = order.items.find(
        (item) =>
          (products.find((product) => product.id === item.id)?.stock || 0) <
          item.qty,
      );
      if (shortage) {
        emitNotice("Not enough stock to reopen this order.");
        return false;
      }
      setProducts((previous) =>
        previous.map((product) => {
          const item = order.items.find((entry) => entry.id === product.id);
          return item
            ? { ...product, stock: product.stock - item.qty }
            : product;
        }),
      );
    } else if (status === "Cancelled" && order.status !== "Cancelled") {
      setProducts((previous) =>
        previous.map((product) => {
          const item = order.items.find((entry) => entry.id === product.id);
          return item
            ? { ...product, stock: product.stock + item.qty }
            : product;
        }),
      );
    }
    setOrders((previous) =>
      previous.map((item) => (item.id === id ? { ...item, status } : item)),
    );
    return true;
  };
  const addProduct = (input) => {
    const product = {
      ...input,
      id: input.id || makeId("p"),
      name: String(input.name || "").trim(),
      category: String(input.category || "Accessories").trim(),
      price: Number(input.price || 0),
      oldPrice: Number(input.oldPrice || 0),
      stock: Math.max(0, Number(input.stock || 0)),
      rating: Number(input.rating || 0),
      reviews: Number(input.reviews || 0),
      icon: input.icon || "accessory",
      image: input.image || "",
      images: Array.isArray(input.images) && input.images.length
        ? input.images
        : input.image
          ? [input.image]
          : [],
      description: String(input.description || "").trim(),
      createdAt: input.createdAt || new Date().toISOString(),
    };
    setProducts((previous) => [product, ...previous]);
    if (product.category && !categories.includes(product.category))
      setCategories((previous) => [...previous, product.category]);
    return product;
  };
  const updateProduct = (id, updates) =>
    setProducts((previous) =>
      previous.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updates,
              price: Number(updates.price ?? product.price),
              stock: Math.max(0, Number(updates.stock ?? product.stock)),
              images: updates.images ?? product.images,
            }
          : product,
      ),
    );
  const deleteProduct = (id) => {
    setProducts((previous) => previous.filter((product) => product.id !== id));
    setCart((previous) => previous.filter((item) => item.id !== id));
    setWishlist((previous) => previous.filter((item) => item !== id));
  };
  const updateStock = (id, stock) =>
    updateProduct(id, { stock: Math.max(0, Number(stock) || 0) });

  const addCategory = (name) => {
    const category = String(name || "").trim();
    if (
      !category ||
      categories.some((item) => item.toLowerCase() === category.toLowerCase())
    )
      return false;
    setCategories((previous) => [...previous, category]);
    return true;
  };
  const renameCategory = (oldName, newName) => {
    const name = String(newName || "").trim();
    if (
      !name ||
      categories.some(
        (item) => item.toLowerCase() === name.toLowerCase() && item !== oldName,
      )
    )
      return false;
    setCategories((previous) =>
      previous.map((item) => (item === oldName ? name : item)),
    );
    setProducts((previous) =>
      previous.map((product) =>
        product.category === oldName ? { ...product, category: name } : product,
      ),
    );
    return true;
  };
  const deleteCategory = (name) => {
    if (products.some((product) => product.category === name)) return false;
    setCategories((previous) => previous.filter((item) => item !== name));
    return true;
  };

  const saveCoupon = (input) => {
    const coupon = {
      ...input,
      id:
        input.id ||
        coupons.find(
          (item) =>
            item.code ===
            String(input.code || "")
              .trim()
              .toUpperCase(),
        )?.id ||
        makeId("coupon"),
      code: String(input.code || "")
        .trim()
        .toUpperCase(),
      type: input.type === "fixed" ? "fixed" : "percent",
      value: Math.max(
        0,
        Math.min(
          input.type === "fixed" ? Number.MAX_SAFE_INTEGER : 100,
          Number(input.value || 0),
        ),
      ),
      minimumOrder: Number(input.minimumOrder || 0),
      active: input.active !== false,
    };
    setCoupons((previous) =>
      previous.some((item) => item.id === coupon.id)
        ? previous.map((item) => (item.id === coupon.id ? coupon : item))
        : [coupon, ...previous],
    );
    return coupon;
  };
  const deleteCoupon = (id) => {
    const coupon = coupons.find((item) => item.id === id);
    setCoupons((previous) => previous.filter((item) => item.id !== id));
    if (coupon?.code === appliedCoupon) setAppliedCoupon(null);
  };

  const registerCustomer = async ({ name, email, password }) => {
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    if (accounts.some((account) => account.email === normalizedEmail)) {
      return { ok: false, error: "An account with this email already exists." };
    }
    try {
      const credentials = await createPasswordRecord(password);
      const account = {
        id: makeId("user"),
        name: String(name || "").trim(),
        email: normalizedEmail,
        role: "customer",
        ...credentials,
      };
      setAccounts((previous) => [account, ...previous]);
      const session = {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
      };
      setUser(session);
      return { ok: true, user: session };
    } catch (error) {
      return {
        ok: false,
        error: error.message || "Could not create this demo account.",
      };
    }
  };

  const loginCustomer = async ({ email, password }) => {
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const account = accounts.find((item) => item.email === normalizedEmail);
    if (!account)
      return { ok: false, error: "No demo account was found for this email." };
    try {
      if (!(await verifyPassword(password, account)))
        return { ok: false, error: "The password is incorrect." };
      const session = {
        id: account.id,
        name: account.name,
        email: account.email,
        role: account.role,
      };
      setUser(session);
      return { ok: true, user: session };
    } catch (error) {
      return {
        ok: false,
        error: error.message || "Could not sign in to this demo account.",
      };
    }
  };

  const loginAsDemoAdmin = () => {
    const session = {
      id: "demo-admin",
      name: "Store Admin",
      email: "admin@hashstore.local",
      role: "admin",
    };
    setUser(session);
    return session;
  };
  const logout = () => setUser(null);
  const updateProfile = (updates) => {
    const email = String(updates.email || user?.email || "")
      .trim()
      .toLowerCase();
    if (
      accounts.some(
        (account) => account.id !== user?.id && account.email === email,
      )
    )
      return { ok: false, error: "This email belongs to another account." };
    const session = {
      ...user,
      name: String(updates.name || user?.name || "").trim(),
      email,
    };
    setUser(session);
    setAccounts((previous) =>
      previous.map((account) =>
        account.id === session.id
          ? { ...account, name: session.name, email: session.email }
          : account,
      ),
    );
    return { ok: true, user: session };
  };
  const changePassword = async ({ currentPassword, newPassword }) => {
    const account = accounts.find((item) => item.id === user?.id);
    if (!account)
      return {
        ok: false,
        error: "Password changes are available for registered demo accounts.",
      };
    try {
      if (!(await verifyPassword(currentPassword, account)))
        return { ok: false, error: "Current password is incorrect." };
      const credentials = await createPasswordRecord(newPassword);
      setAccounts((previous) =>
        previous.map((item) =>
          item.id === account.id ? { ...item, ...credentials } : item,
        ),
      );
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error.message || "Could not update the password.",
      };
    }
  };
  const resetDemoPassword = async ({ email, newPassword }) => {
    const normalizedEmail = String(email || "")
      .trim()
      .toLowerCase();
    const account = accounts.find((item) => item.email === normalizedEmail);
    if (!account)
      return { ok: false, error: "No demo account was found for this email." };
    try {
      const credentials = await createPasswordRecord(newPassword);
      setAccounts((previous) =>
        previous.map((item) =>
          item.id === account.id ? { ...item, ...credentials } : item,
        ),
      );
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error.message || "Could not reset the demo password.",
      };
    }
  };

  const addAddress = (value) => {
    const address = String(value || "").trim();
    if (!address) return false;
    setAddresses((previous) => [
      { id: makeId("address"), userId: user?.id || "guest", text: address },
      ...previous,
    ]);
    return true;
  };
  const deleteAddress = (id) =>
    setAddresses((previous) => previous.filter((address) => address.id !== id));
  const saveReview = (input) => {
    const review = {
      ...input,
      id: input.id || makeId("review"),
      status: input.status || "Pending",
      date: input.date || new Date().toISOString(),
    };
    setReviews((previous) => [review, ...previous]);
    return review;
  };
  const updateReview = (id, updates) =>
    setReviews((previous) =>
      previous.map((review) =>
        review.id === id ? { ...review, ...updates } : review,
      ),
    );
  const saveMessage = (input) =>
    setMessages((previous) => [
      {
        ...input,
        id: makeId("message"),
        date: new Date().toISOString(),
        status: "New",
      },
      ...previous,
    ]);
  const deleteMessage = (id) =>
    setMessages((previous) => previous.filter((message) => message.id !== id));
  const subscribe = (email) => {
    const normalized = String(email || "")
      .trim()
      .toLowerCase();
    if (!normalized) return false;
    if (subscribers.includes(normalized)) return true;
    setSubscribers((previous) => [normalized, ...previous]);
    return true;
  };
  const updateSettings = (updates) =>
    setSettings((previous) => ({ ...previous, ...updates }));
  const updateCourier = (id, updates) =>
    setCouriers((previous) =>
      previous.map((courier) =>
        courier.id === id ? { ...courier, ...updates } : courier,
      ),
    );

  const value = useMemo(
    () => ({
      products,
      setProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      updateStock,
      categories,
      addCategory,
      renameCategory,
      deleteCategory,
      cart,
      cartCount,
      cartTotals,
      cartDrawerOpen,
      setCartDrawerOpen,
      openCartDrawer,
      closeCartDrawer,
      addToCart,
      setQty,
      removeFromCart,
      clearCart,
      applyCoupon,
      removeCoupon,
      appliedCoupon,
      wishlist,
      toggleWishlist,
      orders,
      updateOrderStatus,
      placeOrder,
      user,
      setUser,
      accounts,
      loginCustomer,
      registerCustomer,
      loginAsDemoAdmin,
      logout,
      updateProfile,
      changePassword,
      resetDemoPassword,
      addresses,
      addAddress,
      deleteAddress,
      coupons,
      saveCoupon,
      deleteCoupon,
      settings,
      updateSettings,
      reviews,
      saveReview,
      updateReview,
      messages,
      saveMessage,
      deleteMessage,
      subscribers,
      subscribe,
      couriers,
      updateCourier,
    }),
    [
      products,
      categories,
      cart,
      cartCount,
      cartTotals,
      cartDrawerOpen,
      openCartDrawer,
      closeCartDrawer,
      wishlist,
      orders,
      user,
      accounts,
      addresses,
      coupons,
      appliedCoupon,
      settings,
      reviews,
      messages,
      subscribers,
      couriers,
    ],
  );

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useStore() {
  const value = useContext(C);
  if (!value) throw new Error("useStore must be used within StoreProvider");
  return value;
}
