import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import Footer from "../components/Footer";

const ServicesPage = () => {
  // Handle scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-28"> {/* Added padding to account for the fixed navbar */}
        <div className="bg-gradient-to-r from-agency-purple/10 to-agency-bright-blue/10 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-agency-blue mb-6">My Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how I can help transform your digital presence with
              cutting-edge web design and AI automation solutions.
            </p>
          </div>
        </div>
        <Services />
      </div>
      <Footer />
    </div>
  );
};

export default ServicesPage;
