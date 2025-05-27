import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Portfolio from "../components/Portfolio";
import Testimonials from "../components/Testimonials";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

const Index = () => {
  // Handle scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">Why Work With Me</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I combine creative design with technical expertise to deliver exceptional digital experiences that help your business grow.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover-card">
              <div className="w-16 h-16 bg-agency-purple/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl text-agency-purple font-bold">01</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Innovative Approach</h3>
              <p className="text-gray-600">
                I leverage the latest technologies and creative strategies to deliver solutions that stand out in today's digital landscape.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover-card">
              <div className="w-16 h-16 bg-agency-bright-blue/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl text-agency-bright-blue font-bold">02</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Expert Skills</h3>
              <p className="text-gray-600">
                With years of experience in design, development, and AI integration, I bring comprehensive expertise to every project.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-md hover-card">
              <div className="w-16 h-16 bg-agency-purple/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-2xl text-agency-purple font-bold">03</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Results-Driven</h3>
              <p className="text-gray-600">
                I focus on creating solutions that deliver measurable results for your business, from increased traffic to higher conversion rates.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      <Services />
      <Portfolio />
      
      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="mb-4">My Process</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I follow a structured approach to ensure every project is completed efficiently and to the highest standards.
            </p>
          </div>
          
          <div className="relative">
            {/* Process Timeline */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>
            
            <div className="space-y-24 relative">
              {/* Step 1 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-agency-blue text-xl font-bold mb-3">Discovery & Planning</h3>
                  <p className="text-gray-600">
                    I begin by understanding your goals, target audience, and business requirements through in-depth consultations.
                  </p>
                </div>
                <div className="md:w-14 w-full flex justify-center my-4 md:my-0">
                  <div className="w-10 h-10 rounded-full bg-agency-blue text-white flex items-center justify-center font-bold relative z-10">
                    1
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d" alt="Discovery" className="rounded-lg shadow-md w-full" />
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-agency-purple text-xl font-bold mb-3">Design & Development</h3>
                  <p className="text-gray-600">
                    I create visually stunning and functionally sound digital solutions, handling both design and development aspects.
                  </p>
                </div>
                <div className="md:w-14 w-full flex justify-center my-4 md:my-0">
                  <div className="w-10 h-10 rounded-full bg-agency-purple text-white flex items-center justify-center font-bold relative z-10">
                    2
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6" alt="Development" className="rounded-lg shadow-md w-full" />
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <h3 className="text-agency-bright-blue text-xl font-bold mb-3">Testing & Refinement</h3>
                  <p className="text-gray-600">
                    I thoroughly test all aspects of your solution to ensure it performs flawlessly across all devices and platforms.
                  </p>
                </div>
                <div className="md:w-14 w-full flex justify-center my-4 md:my-0">
                  <div className="w-10 h-10 rounded-full bg-agency-bright-blue text-white flex items-center justify-center font-bold relative z-10">
                    3
                  </div>
                </div>
                <div className="md:w-1/2 md:pl-12">
                  <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158" alt="Testing" className="rounded-lg shadow-md w-full" />
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="flex flex-col md:flex-row-reverse items-center">
                <div className="md:w-1/2 md:pl-12">
                  <h3 className="text-agency-blue text-xl font-bold mb-3">Launch & Support</h3>
                  <p className="text-gray-600">
                    After successful deployment, I provide ongoing support to ensure your digital solution continues to evolve with your business.
                  </p>
                </div>
                <div className="md:w-14 w-full flex justify-center my-4 md:my-0">
                  <div className="w-10 h-10 rounded-full bg-agency-blue text-white flex items-center justify-center font-bold relative z-10">
                    4
                  </div>
                </div>
                <div className="md:w-1/2 md:pr-12 md:text-right">
                  <img src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b" alt="Launch" className="rounded-lg shadow-md w-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Testimonials />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
