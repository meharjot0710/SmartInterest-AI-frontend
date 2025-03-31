import NavBar from "../components/NavBar";
import HeroSection from "../components/HeroSection";
import CareerPathsSection from "../components/CareerPathsSection";
import TrustSection from "../components/TrustSection";
import FAQSection from "../components/FaqSection";
import Footer from "../components/Footer.tsx";


export default function Landing() {
  return (
    <div>
      <NavBar />
      <HeroSection />
      <CareerPathsSection />
      <TrustSection />
      <FAQSection />
      <Footer />
    </div>
  )
}
