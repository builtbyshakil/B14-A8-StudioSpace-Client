import HeroSlider from "@/components/HeroSlider";
import FeaturedStudios from "@/components/FeaturedStudios";
import CategoriesSection from "@/components/CategoriesSection";
import HowBookingWorks from "@/components/HowBookingWorks";
import HostGuarantee from "@/components/HostGuarantee";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <FeaturedStudios />
      <CategoriesSection />
      <HowBookingWorks />
      <HostGuarantee />
    </>
  );
}
