import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";

const PricingPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-28">
        <Pricing />
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage; 