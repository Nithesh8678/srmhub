import HeroCarousel from "./components/HeroCarousel";
import FeaturedEvents from "./components/FeaturedEvents";
import ClubsSection from "./components/ClubsSection";

export default function Home() {
  return (
    <main>
      <HeroCarousel />
      <FeaturedEvents />
      <ClubsSection />
    </main>
  );
}
