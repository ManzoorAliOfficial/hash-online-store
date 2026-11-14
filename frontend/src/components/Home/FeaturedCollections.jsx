import { ArrowRight, Gamepad2, GraduationCap, Headphones, Laptop } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../context/StoreContext";

const collections = [
  { title: "Gaming essentials", eyebrow: "LEVEL UP YOUR SETUP", categories: ["Gaming"], icon: Gamepad2, tone: "from-[#142c59] to-[#315b9c]" },
  { title: "Work from anywhere", eyebrow: "WORK, YOUR WAY", categories: ["Laptops", "Audio"], icon: Laptop, tone: "from-[#144f72] to-[#2a90a7]" },
  { title: "Student essentials", eyebrow: "READY FOR WHAT'S NEXT", categories: ["Laptops", "Accessories"], icon: GraduationCap, tone: "from-[#4b3d79] to-[#8273b4]" },
  { title: "Phone accessories", eyebrow: "MAKE IT YOURS", categories: ["Phones", "Accessories"], icon: Headphones, tone: "from-[#6a3e54] to-[#b77172]" },
];

export default function FeaturedCollections() {
  const { products = [] } = useStore();
  const available = collections.map((collection) => ({ ...collection, product: products.find((product) => collection.categories.includes(product.category) && product.image) })).filter((collection) => collection.product);
  if (!available.length) return null;
  return <section aria-labelledby="home-collections-heading">
    <div className="mb-6"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#2563eb]">Made for your everyday</p><h2 id="home-collections-heading" className="mt-2 text-2xl font-semibold tracking-tight text-[#0f2347] sm:text-3xl">Featured collections</h2></div>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {available.map(({ title, eyebrow, categories: categoryNames, icon: Icon, tone, product }) => {
        const category = categoryNames.find((name) => products.some((item) => item.category === name)) || product.category;
        return <Link key={title} to={`/products?category=${encodeURIComponent(category)}`} className={`group relative isolate flex min-h-[220px] items-end overflow-hidden rounded-[24px] bg-gradient-to-br ${tone} p-5 text-white sm:min-h-[260px] sm:p-7`}>
          <img src={product.image} alt="" loading="lazy" decoding="async" className="absolute inset-y-0 right-0 -z-10 h-full w-[58%] object-cover opacity-60 mix-blend-luminosity transition duration-700 group-hover:scale-105 group-hover:opacity-75 motion-reduce:transition-none" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#0f2347]/95 via-[#0f2347]/65 to-transparent" />
          <div className="max-w-[65%]"><span className="inline-flex size-10 items-center justify-center rounded-xl border border-white/20 bg-white/10"><Icon size={18} /></span><p className="mt-5 text-[10px] font-bold tracking-[.16em] text-white/70">{eyebrow}</p><h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">{title}</h3><span className="mt-4 inline-flex items-center gap-2 text-xs font-bold">Explore collection <ArrowRight size={14} className="transition group-hover:translate-x-1" /></span></div>
        </Link>;
      })}
    </div>
  </section>;
}
