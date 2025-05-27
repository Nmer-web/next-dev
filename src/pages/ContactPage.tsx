
import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const ContactPage = () => {
  // Handle scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-28"> {/* Added padding for the fixed navbar */}
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default ContactPage;
