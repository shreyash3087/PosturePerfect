import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HeroSection from "../components/HomePage/HeroSection";
import StatsSection from "../components/HomePage/StatsSection";
import AboutsSection from "../components/HomePage/AboutsSection";
import PricingSection from "../components/HomePage/PricingSection"
import FeaturesSection from "../components/HomePage/FeaturesSection";
import TestimonialsSection from "../components/HomePage/TestimonialsSection";
import ContactSection from "../components/HomePage/ContactSection";

function HomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedInStatus = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedInStatus);
  }, []);

  return (
    <div className="bg-black py-4">
      <Header />
      <div className="w-full overflow-hidden relative -top-24">
        <ToastContainer />
        <main className="min-h-screen">
          <HeroSection />
          <StatsSection />
          <AboutsSection />
          <PricingSection/>
          <FeaturesSection />
          <TestimonialsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
