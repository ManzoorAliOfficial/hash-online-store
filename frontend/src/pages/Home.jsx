import Reveal from "../components/Common/Reveal";
import Hero from "../components/Home/Hero";
import CategoryGrid from "../components/Home/CategoryGrid";
import ProductShowcase from "../components/Home/ProductShowcase";
import DealsRow from "../components/Home/DealsRow";
import PromoBanner from "../components/Home/PromoBanner";
import WhyHashStore from "../components/Home/WhyHashStore";
import Testimonials from "../components/Home/Testimonials";
import Newsletter from "../components/Home/Newsletter";

export default function Home() {
  return (
    <>
      {/* Hero without Reveal to prevent delaying LCP */}
      <Hero />

      <Reveal>
        <CategoryGrid />
      </Reveal>

      <Reveal>
        <ProductShowcase />
      </Reveal>

      <Reveal>
        <DealsRow />
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
    </>
  );
}
