import React from "react";
import { Link as ScrollLink } from "react-scroll";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  ArrowUp,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-agency-blue text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-agency-purple flex items-center justify-center mr-2">
                  <span className="text-white text-lg font-bold">N</span>
                </div>
                <span className="text-2xl font-bold">
                  <span className="text-white">Next</span>
                  <span className="text-agency-purple">Dev</span>
                </span>
              </div>
            </div>
            <p className="text-gray-300 mb-4">
              Transforming businesses through innovative web design and AI automation solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                  Web Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                  UI/UX Design
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                  Custom Development
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                  AI Automation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                  SEO Optimization
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Company</h3>
            <ul className="space-y-2">
              <li>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-gray-300 hover:text-agency-purple transition-colors cursor-pointer"
                >
                  About Us
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="portfolio"
                  smooth={true}
                  duration={500}
                  offset={-80}
                  className="text-gray-300 hover:text-agency-purple transition-colors cursor-pointer"
                >
                  Portfolio
                </ScrollLink>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-agency-purple transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-white">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md focus:outline-none bg-white/10 border-y border-l border-white/20 w-full"
              />
              <button
                type="submit"
                className="bg-agency-purple px-4 py-2 rounded-r-md hover:bg-agency-purple/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} NextDev. All rights reserved.
          </p>
          <div className="flex items-center space-x-4">
            <ScrollLink
              to="hero"
              smooth={true}
              duration={500}
              className="bg-agency-purple/20 hover:bg-agency-purple/30 transition-colors p-2 rounded-full cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} className="text-agency-purple" />
            </ScrollLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
