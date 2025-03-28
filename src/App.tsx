"use client";
import React from "react";
import Header from "./components/NavBar.tsx";
import HeroSection from "./components/HeroSection.tsx";
import CareerPathsSection from "./components/CareerPathsSection.tsx";
import TrustSection from "./components/TrustSection";
import FAQSection from "./components/FaqSection";
import Footer from "./components/Footer.tsx";
import SignUpLogIn from "./components/SignUpLogIn.tsx";

const SmartInterestAI: React.FC = () => {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-black to-[#1a0e2b] overflow-x-hidden">
      <Header />
      <HeroSection />
      <CareerPathsSection />
      <TrustSection />
      <FAQSection />
      <Footer />
      <SignUpLogIn/>
    </main>
  );
};

export default SmartInterestAI;
