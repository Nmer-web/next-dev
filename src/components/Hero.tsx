import React, { useEffect } from "react";
import { ArrowRight, Code, Cpu, Paintbrush, CheckCircle, Sparkles, Star, Zap, ChevronDown } from "lucide-react";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";
import { Button } from '@/components/ui/button';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const Hero = () => {
  const containerRef = React.useRef(null);
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

  useEffect(() => {
  }, []);

  const layout = { heroLayout: 'default', colorScheme: 'default' };
  const optimizedContent = {
    headline: 'Creative Web Design & AI Automation',
    subheadline: 'We build stunning websites and leverage AI to automate your business processes. The perfect blend of creativity and innovation for modern businesses.',
    ctaText: 'Get Started',
    features: [
      'Custom web design tailored to your brand',
      'AI-powered automation tools',
      'SEO optimization for better visibility'
    ]
  };
  const isLoading = false;

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <motion.div
        style={{ y, opacity, scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-agency-blue/5 to-agency-purple/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/80 via-transparent to-transparent" />
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        <div className={`max-w-4xl mx-auto text-center ${layout.heroLayout === 'split' ? 'md:flex md:items-center md:text-left md:gap-12' : ''}`}>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={animationVariants}
            className={`${layout.heroLayout === 'split' ? 'md:w-1/2' : ''}`}
          >
            <h1 className={`text-4xl md:text-6xl font-bold mb-6 ${layout.colorScheme === 'vibrant' ? 'text-agency-purple' : 'text-gray-900'}`}>
              {optimizedContent.headline}
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              {optimizedContent.subheadline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <ScrollLink
                to="contact"
                smooth={true}
                duration={500}
                offset={-80}
              >
                <Button
                  size="lg"
                  className="bg-agency-bright-blue hover:bg-agency-purple text-white cursor-pointer"
                >
                  {optimizedContent.ctaText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </ScrollLink>
              <ScrollLink
                to="portfolio"
                smooth={true}
                duration={500}
                offset={-80}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-agency-bright-blue text-agency-bright-blue hover:bg-agency-bright-blue hover:text-white cursor-pointer"
                >
                  View My Work
                </Button>
              </ScrollLink>
            </div>
          </motion.div>

          {layout.heroLayout === 'split' && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={animationVariants}
              className="md:w-1/2 mt-12 md:mt-0"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-agency-blue/20 to-agency-purple/20 rounded-2xl transform rotate-3" />
                <div className="relative bg-white p-6 rounded-2xl shadow-xl">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Code className="h-8 w-8 text-agency-purple mb-2" />
                      <h3 className="font-semibold">Web Design</h3>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Cpu className="h-8 w-8 text-agency-purple mb-2" />
                      <h3 className="font-semibold">AI Automation</h3>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Paintbrush className="h-8 w-8 text-agency-purple mb-2" />
                      <h3 className="font-semibold">UI/UX Design</h3>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <Zap className="h-8 w-8 text-agency-purple mb-2" />
                      <h3 className="font-semibold">Performance</h3>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <ScrollLink
            to="services"
            smooth={true}
            duration={500}
            offset={-80}
            className="cursor-pointer"
          >
            <ChevronDown className="h-8 w-8 text-gray-400 animate-bounce" />
          </ScrollLink>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
