import Hero from "@/components/Hero";
import MenuPreview from "@/components/menu/MenuPreview";
import AboutPreview from "@/components/AboutPreview";
import Testimonials from "@/components/Testimonials";
import SocialProof from "@/components/SocialProof";
import ReservationCTA from "@/components/ReservationCTA";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <MenuPreview />
      <AboutPreview />
      <Testimonials />
      <SocialProof />
      <ReservationCTA />
    </main>
  );
}