import Reveal from "../components/Common/Reveal";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import BestSellers from "../components/Home/BestSellers";
import NewArrivals from "../components/Home/NewArrivals";
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
        <FeaturedProducts />
      </Reveal>
      <Reveal>
        <BestSellers />
      </Reveal>
      <Reveal>
        <NewArrivals />
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
