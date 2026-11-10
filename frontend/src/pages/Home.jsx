import Reveal from "../components/Common/Reveal";
import Hero from "../components/Home/Hero";
import CategoryGrid from "../components/Home/CategoryGrid";
import BestSellers from "../components/Home/BestSellers";
import LimitedTimeOffer from "../components/Home/LimitedTimeOffer";
import NewArrivals from "../components/Home/NewArrivals";
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

      {/* Categories Slider */}
      <Reveal>
        <CategoryGrid />
      </Reveal>

      {/* 1. Best Sellers */}
      <Reveal>
        <BestSellers />
      </Reveal>

      {/* 2. Limited-Time Offer (In Watch S11 series) */}
      <Reveal>
        <LimitedTimeOffer />
      </Reveal>

      {/* 3. New Arrivals */}
      <Reveal>
        <NewArrivals />
      </Reveal>

      {/* Deals Row */}
      <Reveal>
        <DealsRow />
      </Reveal>

      {/* Promotional Banner */}
      <Reveal>
        <PromoBanner />
      </Reveal>

      {/* Why Hash Store Value Propositions */}
      <Reveal>
        <WhyHashStore />
      </Reveal>

      {/* Customer Testimonials */}
      <Reveal>
        <Testimonials />
      </Reveal>

      {/* Newsletter Signup */}
      <Reveal>
        <Newsletter />
      </Reveal>
    </>
  );
}
