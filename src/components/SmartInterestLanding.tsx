"use client";
import React from "react";
import NavBar from "./NavBar";
import HeroSection from "./HeroSection";
import CareerPathsSection from "./CareerPathsSection";
import TrustSection from "./TrustSection";
import FaqSection from "./FaqSection";
import Footer from "./Footer";

const SmartInterestLanding: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <HeroSection />
      <CareerPathsSection />
      <TrustSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default SmartInterestLanding;
