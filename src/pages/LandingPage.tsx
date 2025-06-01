import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Code, Cpu, Paintbrush, Sparkles, Star, Zap, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Portfolio from '@/components/Portfolio';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SubmitTestimonialForm from '@/components/SubmitTestimonialForm';

const LandingPage = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useSpring(useTransform(scrollYProgress, [0, 0.5], [1, 0.8]), {
    stiffness: 100,
    damping: 30
  });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Pricing />
      <Contact />
      <SubmitTestimonialForm />
      <Footer />
    </div>
  );
};

export default LandingPage;
