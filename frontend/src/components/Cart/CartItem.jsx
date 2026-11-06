import { Link } from "react-router";
import {
  Minus,
  Plus,
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Gamepad2,
  Cable,
  Trash2,
} from "lucide-react";
import { useStore } from "../../context/StoreContext";

const icons = {
  phone: Smartphone,
  audio: Headphones,
  laptop: Laptop,
  watch: Watch,
  gaming: Gamepad2,
  accessory: Cable,
};
const money = (value) => `Rs. ${Number(value || 0).toLocaleString()}`;

export default function CartItem({ item }) {
  const { products, setQty, removeFromCart } = useStore();
  const product = products.find((entry) => entry.id === item.id);
  if (!product) return null;

  const Icon = icons[product.icon] || Smartphone;
  const isMaxStock = item.qty >= Number(product.stock || 0);

  return (
    <article className="grid grid-cols-[76px_minmax(0,1fr)_auto_auto] items-center gap-4 border-b border-[#edf0f5] py-4 last:border-b-0 max-[600px]:grid-cols-[58px_minmax(0,1fr)_auto] max-[600px]:gap-3">
      <div className="grid size-[68px] place-items-center overflow-hidden rounded-lg border border-[#eef2f8] bg-[#f4f7fc] max-[600px]:size-[54px]">
        {product.image ? (
          <img
            className="size-full object-contain p-1.5"
            src={product.image}
            alt={product.name}
            loading="lazy"
          />
        ) : (
          <Icon size={26} className="text-[#203d70]" />
        )}
      </div>

      <div className="min-w-0">
        <Link
          className="block truncate text-sm font-bold text-[#17233b] transition hover:text-[#2563eb]"
          to={`/products/${product.id}`}
        >
          {product.name}
        </Link>
        <small className="mt-0.5 block text-[11px] text-[#8491a5]">
          {product.category}
        </small>
        <button
          className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-[#d14343] transition hover:text-[#ae2d35]"
          type="button"
          onClick={() => removeFromCart(product.id)}
        >
          <Trash2 size={13} /> Remove
        </button>
      </div>

      <div
        className="flex h-9 items-center rounded-lg border border-[#dce5f3] bg-white shadow-2xs"
        aria-label={`Quantity for ${product.name}`}
      >
        <button
          className="grid size-8 place-items-center text-[#52617a] transition hover:text-[#2563eb] disabled:opacity-30"
          type="button"
          aria-label="Decrease quantity"
          onClick={() => setQty(product.id, item.qty - 1)}
          disabled={item.qty <= 1}
        >
          <Minus size={13} />
        </button>
        <span className="w-7 text-center text-xs font-bold text-[#34445f]">
          {item.qty}
        </span>
        <button
          className="grid size-8 place-items-center text-[#52617a] transition hover:text-[#2563eb] disabled:cursor-not-allowed disabled:opacity-30"
          type="button"
          aria-label="Increase quantity"
          onClick={() => setQty(product.id, item.qty + 1)}
          disabled={isMaxStock}
          title={
            isMaxStock ? "Maximum available stock reached" : "Increase quantity"
          }
        >
          <Plus size={13} />
        </button>
      </div>

      <b className="whitespace-nowrap text-sm font-bold text-[#17233b] max-[600px]:col-start-3">
        {money(product.price * item.qty)}
      </b>
    </article>
  );
}
