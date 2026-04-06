import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import ServicesGrid from "@/components/ServicesGrid";
import SchoolsSection from "@/components/SchoolsSection";
import CitiesSection from "@/components/CitiesSection";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsBar />
        <ServicesGrid />
        <SchoolsSection />
        <CitiesSection />
        <HowItWorks />
        <Testimonials />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}
