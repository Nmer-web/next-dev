import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useAnimation } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight, Star, Maximize2, Minimize2, ArrowRight, GripVertical, Keyboard } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface Transformation {
  id: number;
  title: string;
  category: string;
  
  before: string;
  after: string;
  description: string;
  improvements: string[];
  technologies: string[];
  metrics?: {
    label: string;
    value: string;
    change: string;
  }[];
}

const transformations: Transformation[] = [
  {
    id: 1,
    title: "E-commerce Platform Redesign",
    category: "Web Development",
    before: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3",
    description: "Complete overhaul of an e-commerce platform focusing on user experience and conversion optimization.",
    improvements: [
      "Increased conversion rate by 45%",
      "Improved page load speed by 60%",
      "Enhanced mobile responsiveness",
      "Streamlined checkout process"
    ],
    technologies: ["React", "Next.js", "Tailwind CSS", "Framer Motion"],
    metrics: [
      { label: "Conversion Rate", value: "4.8%", change: "+45%" },
      { label: "Page Load Time", value: "1.2s", change: "-60%" },
      { label: "Mobile Users", value: "65%", change: "+30%" }
    ]
  },
  {
    id: 2,
    title: "Corporate Website Modernization",
    category: "UI/UX Design",
    before: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3",
    description: "Modern redesign of a corporate website with focus on brand identity and user engagement.",
    improvements: [
      "Enhanced brand consistency",
      "Improved content hierarchy",
      "Added interactive elements",
      "Optimized for all devices"
    ],
    technologies: ["Figma", "React", "GSAP", "Three.js"],
    metrics: [
      { label: "User Engagement", value: "3.5min", change: "+120%" },
      { label: "Bounce Rate", value: "32%", change: "-45%" },
      { label: "Lead Generation", value: "250%", change: "+150%" }
    ]
  },
  {
    id: 3,
    title: "AI-Powered Dashboard",
    category: "AI Solutions",
    before: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
    description: "Transformation of a traditional dashboard into an AI-powered analytics platform.",
    improvements: [
      "Added predictive analytics",
      "Implemented real-time data processing",
      "Enhanced data visualization",
      "Automated reporting system"
    ],
    technologies: ["Python", "TensorFlow", "D3.js", "Node.js"],
    metrics: [
      { label: "Data Processing", value: "10x", change: "+900%" },
      { label: "Accuracy", value: "98.5%", change: "+25%" },
      { label: "Time Saved", value: "40hrs", change: "-75%" }
    ]
  },
  {
    id: 4,
    title: "Mobile App Redesign",
    category: "Mobile Development",
    before: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3",
    after: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3",
    description: "Complete redesign of a mobile application focusing on user experience and performance.",
    improvements: [
      "Reduced app size by 40%",
      "Improved app store rating",
      "Enhanced offline capabilities",
      "Added dark mode support"
    ],
    technologies: ["React Native", "Redux", "Firebase", "Lottie"],
    metrics: [
      { label: "App Size", value: "15MB", change: "-40%" },
      { label: "Store Rating", value: "4.8", change: "+1.2" },
      { label: "User Retention", value: "85%", change: "+35%" }
    ]
  }
];

const BeforeAfterPage = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeImage, setActiveImage] = useState<'before' | 'after'>('after');
  const [isDragging, setIsDragging] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragX = useMotionValue(0);
  const sliderX = useTransform(dragX, [0, 100], [0, 100]);
  const controls = useAnimation();

  const nextTransformation = () => {
    setCurrentIndex((prev) => (prev + 1) % transformations.length);
  };

  const prevTransformation = () => {
    setCurrentIndex((prev) => (prev - 1 + transformations.length) % transformations.length);
  };

  const currentTransformation = transformations[currentIndex];

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleDrag = (event: any, info: any) => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const percentage = (info.point.x / containerWidth) * 100;
      dragX.set(Math.max(0, Math.min(100, percentage)));
    }
  };

  // Keyboard Controls
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
          prevTransformation();
          break;
        case 'ArrowRight':
          nextTransformation();
          break;
        case 'Escape':
          if (isFullscreen) {
            setIsFullscreen(false);
          }
          break;
        case 'b':
          setActiveImage('before');
          break;
        case 'a':
          setActiveImage('after');
          break;
        case 'f':
          toggleFullscreen();
          break;
        case '?':
          setShowKeyboardShortcuts(!showKeyboardShortcuts);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  // Animated Chart Component
  const MetricChart = ({ value, change }: { value: string; change: string }) => {
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ''));
    const maxValue = 100;
    const percentage = (numericValue / maxValue) * 100;

    return (
      <div className="relative h-2 bg-zinc-700 rounded-full overflow-hidden mt-2">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`absolute inset-y-0 left-0 ${
            change.startsWith('+') ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-amber-500/20">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center text-amber-200 hover:text-amber-100 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Keyboard Shortcuts Button */}
      <button
        onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-black/50 text-amber-200 hover:bg-amber-500/20 transition-colors z-50"
      >
        <Keyboard className="h-5 w-5" />
      </button>

      {/* Keyboard Shortcuts Modal */}
      <AnimatePresence>
        {showKeyboardShortcuts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            <motion.div
              className="bg-zinc-900 rounded-xl p-6 max-w-md w-full border border-amber-500/20"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-white mb-4">Keyboard Shortcuts</h3>
              <div className="space-y-3">
                {[
                  { key: '← / →', description: 'Navigate between transformations' },
                  { key: 'B', description: 'Show before image' },
                  { key: 'A', description: 'Show after image' },
                  { key: 'F', description: 'Toggle fullscreen' },
                  { key: 'ESC', description: 'Exit fullscreen' },
                  { key: '?', description: 'Show/hide shortcuts' }
                ].map((shortcut, index) => (
                  <div key={index} className="flex items-center justify-between text-zinc-300">
                    <span>{shortcut.description}</span>
                    <kbd className="px-2 py-1 bg-zinc-800 rounded text-amber-200 text-sm">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="container mx-auto px-4 pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-200 font-serif">
            My Project Transformations
          </h1>
          <p className="text-xl text-zinc-400 max-w-3xl mx-auto font-light">
            Explore my portfolio of digital transformations and see the impact of my work
          </p>
        </motion.div>

        {/* Transformation Showcase */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevTransformation}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-amber-200 hover:bg-amber-500/20 transition-colors"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={nextTransformation}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 text-amber-200 hover:bg-amber-500/20 transition-colors"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Current Transformation */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-amber-500/20 overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Image Comparison Slider */}
              <div className="space-y-4">
                <div 
                  ref={containerRef}
                  className="relative aspect-video rounded-xl overflow-hidden group cursor-ew-resize"
                  onMouseDown={() => setIsDragging(true)}
                  onMouseUp={() => setIsDragging(false)}
                  onMouseLeave={() => setIsDragging(false)}
                >
                  {/* Before Image */}
                  <img
                    src={currentTransformation.before}
                    alt="Before"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* After Image with Slider */}
                  <motion.div
                    style={{ width: `${sliderX.get()}%` }}
                    className="absolute inset-0 overflow-hidden"
                  >
                    <img
                      src={currentTransformation.after}
                      alt="After"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </motion.div>

                  {/* Slider Handle */}
                  <motion.div
                    drag="x"
                    dragConstraints={containerRef}
                    dragElastic={0}
                    dragMomentum={false}
                    onDrag={handleDrag}
                    style={{ x: sliderX }}
                    className="absolute top-0 bottom-0 w-1 bg-amber-200 cursor-ew-resize"
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center shadow-lg">
                      <GripVertical className="h-4 w-4 text-zinc-900" />
                    </div>
                  </motion.div>

                  {/* Labels */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-4 left-4 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                      Before
                    </div>
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 rounded-full text-white text-sm">
                      After
                    </div>
                  </div>
                </div>

                {/* Fullscreen Button */}
                <button
                  onClick={toggleFullscreen}
                  className="w-full py-2 px-4 bg-amber-500/10 text-amber-200 rounded-lg hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2"
                >
                  <Maximize2 className="h-4 w-4" />
                  View Full Size
                </button>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div>
                  <span className="text-amber-200 text-sm font-medium">{currentTransformation.category}</span>
                  <h2 className="text-3xl font-bold text-white font-serif mt-2">{currentTransformation.title}</h2>
                </div>

                <p className="text-zinc-400 leading-relaxed">{currentTransformation.description}</p>

                {/* Enhanced Metrics with Charts */}
                {currentTransformation.metrics && (
                  <div className="grid grid-cols-3 gap-4">
                    {currentTransformation.metrics.map((metric, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-zinc-800/50 p-4 rounded-xl text-center relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-rose-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="relative z-10">
                          <div className="text-amber-200 text-sm mb-1">{metric.label}</div>
                          <motion.div 
                            initial={{ scale: 0.5 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 200, damping: 20 }}
                            className="text-2xl font-bold text-white mb-1"
                          >
                            {metric.value}
                          </motion.div>
                          <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className={`text-sm font-medium ${
                              metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                            }`}
                          >
                            {metric.change}
                          </motion.div>
                          <MetricChart value={metric.value} change={metric.change} />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Key Improvements</h3>
                  <ul className="space-y-3">
                    {currentTransformation.improvements.map((improvement, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-zinc-300"
                      >
                        <Star className="h-4 w-4 text-amber-200 mr-2" />
                        {improvement}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Technologies Used</h3>
                  <div className="flex flex-wrap gap-2">
                    {currentTransformation.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-amber-500/10 text-amber-200 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {transformations.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentIndex ? "bg-amber-200" : "bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-20"
        >
          <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-rose-200 font-serif">
            Ready to Transform Your Digital Presence?
          </h2>
          <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">
            Let's work together to create something extraordinary for your brand
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/contact">
              <Button className="bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:opacity-90 transition-opacity">
                Start Your Project
              </Button>
            </Link>
            <Link to="/portfolio">
              <Button variant="outline" className="border-amber-500/30 text-amber-200 hover:bg-amber-500/10">
                View More Projects
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Enhanced Fullscreen Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={toggleFullscreen}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-[90vw] max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activeImage === 'before' ? currentTransformation.before : currentTransformation.after}
                alt={activeImage === 'before' ? 'Before' : 'After'}
                className="max-w-full max-h-[90vh] object-contain rounded-lg"
              />
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => setActiveImage('before')}
                  className={`p-2 rounded-full ${
                    activeImage === 'before' ? 'bg-amber-500' : 'bg-black/50'
                  } text-white transition-colors`}
                >
                  Before
                </button>
                <button
                  onClick={() => setActiveImage('after')}
                  className={`p-2 rounded-full ${
                    activeImage === 'after' ? 'bg-amber-500' : 'bg-black/50'
                  } text-white transition-colors`}
                >
                  After
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="p-2 rounded-full bg-black/50 text-amber-200 hover:bg-amber-500/20 transition-colors"
                >
                  <Minimize2 className="h-6 w-6" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BeforeAfterPage; 