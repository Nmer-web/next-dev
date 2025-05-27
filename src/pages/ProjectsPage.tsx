import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Portfolio from "../components/Portfolio";
import Footer from "../components/Footer";

const ProjectsPage = () => {
  // Handle scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-24 lg:pt-28"> {/* Added padding for the fixed navbar */}
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4 text-agency-blue">My Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore my complete portfolio of successful web design and AI automation projects.
            </p>
          </div>
          <Portfolio />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
