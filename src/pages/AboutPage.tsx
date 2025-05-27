
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import About from "../components/About";
import Footer from "../components/Footer";

const AboutPage = () => {
  // Handle scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-28"> {/* Added padding for the fixed navbar */}
        <About />
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
