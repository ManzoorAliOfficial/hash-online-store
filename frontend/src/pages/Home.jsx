import Reveal from "../components/Common/Reveal";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import ProductShowcase from "../components/Home/ProductShowcase";
import PromoBanner from "../components/Home/PromoBanner";
import WhyHashStore from "../components/Home/WhyHashStore";
import Testimonials from "../components/Home/Testimonials";
import Newsletter from "../components/Home/Newsletter";

export default function Home() {
  return (
    <main>
      <Reveal className="block">
        <Hero />
      </Reveal>
      <Reveal>
        <Categories />
      </Reveal>
      <Reveal>
        <ProductShowcase />
      </Reveal>
      <Reveal>
        <PromoBanner />
      </Reveal>
      <Reveal>
        <WhyHashStore />
      </Reveal>
      <Reveal>
        <Testimonials />
      </Reveal>
      <Reveal>
        <Newsletter />
      </Reveal>
    </main>
  );
}
