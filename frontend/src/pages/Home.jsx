import Hero from "../components/Home/Hero";
import CategoryGrid from "../components/Home/CategoryGrid";
import ProductShowcase from "../components/Home/ProductShowcase";
import TrendingAccessories from "../components/Home/TrendingAccessories";
import DealsRow from "../components/Home/DealsRow";
import NewArrivals from "../components/Home/NewArrivals";
import PromoBanner from "../components/Home/PromoBanner";
import WhyHashStore from "../components/Home/WhyHashStore";
import Testimonials from "../components/Home/Testimonials";
import FAQ from "../components/Home/FAQ";
import Newsletter from "../components/Home/Newsletter";
import Reveal from "../components/Common/Reveal";
import Container from "../components/Layout/Container";

export default function Home() {
  return (
    <div className="home-page overflow-hidden bg-[#f4f7fc]">
      <Reveal variant="fade-in"><Hero /></Reveal>
      <Container className="flex flex-col gap-12 py-10 sm:gap-14 sm:py-14 lg:gap-16 lg:py-16">
        <Reveal><CategoryGrid /></Reveal>
        <Reveal><ProductShowcase /></Reveal>
        <Reveal><TrendingAccessories /></Reveal>
        <Reveal><DealsRow /></Reveal>
        <Reveal><NewArrivals /></Reveal>
        <Reveal variant="zoom-in"><PromoBanner /></Reveal>
        <Reveal><WhyHashStore /></Reveal>
        <Reveal><Testimonials /></Reveal>
        <Reveal><FAQ /></Reveal>
        <Reveal variant="fade-in"><Newsletter /></Reveal>
      </Container>
    </div>
  );
}
