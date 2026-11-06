import { useState } from "react";
import {
  Smartphone,
  Headphones,
  Laptop,
  Watch,
  Gamepad2,
  Cable,
} from "lucide-react";
const icons = {
  phone: Smartphone,
  audio: Headphones,
  laptop: Laptop,
  watch: Watch,
  gaming: Gamepad2,
  accessory: Cable,
};
export default function ProductGallery({ product }) {
  const [failed, setFailed] = useState(false);
  const Icon = icons[product?.icon] || Smartphone;
  return (
    <div className="grid min-h-[430px] place-items-center rounded-2xl bg-[#f4f7fc] p-8 max-[600px]:min-h-[300px]">
      {product?.image && !failed ? (
        <img
          className="max-h-[380px] max-w-full object-contain drop-shadow-[0_25px_24px_#17233b22]"
          src={product.image}
          alt={product.name}
          fetchPriority="high"
          onError={() => setFailed(true)}
        />
      ) : (
        <Icon
          className="text-[#203d70]"
          size={140}
          strokeWidth={1.1}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
