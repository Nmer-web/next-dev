import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";

const PortfolioPage = () => {
  // Handle scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-28"> {/* Added padding for the fixed navbar */}
        <div className="container mx-auto px-4 mb-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-agency-blue mb-4">My Portfolio</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my diverse range of projects across web design, AI automation, and specialized technology solutions.
              Use the filters below to find projects in your industry or technology of interest.
            </p>
          </div>
        </div>
        <Portfolio />
      </div>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
