import React, { useState } from "react";
import { ExternalLink, Grid3x3, LayoutList } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Portfolio project type
type Project = {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  tags: string[];
  client?: string;
  duration?: string;
  completionDate?: string;
  technologies?: string[];
  industry?: string;
  challenge?: string;
  solution?: string;
  results?: string;
  link?: string;
};

// Define all categories
const categories = [
  { id: "all", label: "All Projects" },
  { id: "website", label: "Website" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "app", label: "App" },
];

const portfolioItems: Project[] = [
  {
    id: 1,
    title: "HealthHub",
    category: "website",
    image: "/images/Capture d'écran 2025-06-09 161113.png",
    description: "A full-featured, responsive healthcare web application built with React.js and Express.js, designed to modernize how patients and providers interact.",
    tags: ["Healthcare", "React", "Express.js", "AI", "TeleHealth"],
    client: "HealthHub",
    duration: "6 months",
    completionDate: "March 2024",
    technologies: ["React.js", "Express.js", "Tailwind CSS", "AI Integration", "HIPAA Compliance"],
    industry: "Healthcare",
    challenge: "Creating a secure, user-friendly healthcare platform that combines modern technology with essential medical services while maintaining HIPAA compliance.",
    solution: "Developed a comprehensive healthcare platform with AI-powered booking, secure patient portal, telehealth capabilities, and real-time statistics.",
    results: "Successfully serving 50K+ patients with 200+ certified providers, maintaining 99.9% uptime and achieving a 4.9/5 average patient rating.",
    link: "https://health-tech-website.vercel.app/"
  },
  {
    id: 2,
    title: "Flashcard Generator",
    category: "website",
    image: "/images/flashcard-generato.png",
    description: "A full-stack web application designed to turn any content into study-ready flashcards in seconds using AI.",
    tags: ["AI", "Flashcards", "Education", "React", "Express.js"],
    client: "Personal Project",
    duration: "3 months",
    completionDate: "April 2024",
    technologies: ["React.js", "Express.js", "Tailwind CSS", "Content Parsing", "AI/NLP"],
    industry: "Education Technology",
    challenge: "Developing an intuitive platform that efficiently converts diverse content formats into editable, interactive flashcards using AI.",
    solution: "Built a responsive web application with robust backend for content processing and a clean frontend for user interaction and flashcard management.",
    results: "Created a versatile study tool capable of instant flashcard generation from text, documents, or URLs, enhancing study efficiency.",
    link: "https://flashcard-generator-nu.vercel.app/"
  },
  {
    id: 3,
    title: "Lumière – Modern Luxury Restaurant Website",
    category: "website",
    image: "/images/luxury-restaurant.png",
    description: "A full-stack restaurant website designed to reflect the sophistication and ambiance of a high-end dining experience.",
    tags: ["Restaurant", "Luxury", "React", "Express.js", "UI/UX"],
    client: "Lumière Restaurant",
    duration: "4 months",
    completionDate: "May 2024",
    technologies: ["React.js", "Express.js", "Tailwind CSS", "Animations", "Reservations API"],
    industry: "Hospitality",
    challenge: "Designing and developing a visually rich, responsive website that effectively communicates the luxury brand and provides a seamless user experience for reservations and menu browsing.",
    solution: "Created an elegant full-stack website with immersive storytelling, interactive menu display, and an intuitive reservation system.",
    results: "Enhanced online presence and customer engagement for the restaurant, facilitating easier menu exploration and table bookings.",
    link: "https://modern-luxury-restaurant.vercel.app/"
  },
  {
    id: 4,
    title: "Luminary Books – Premium Online Bookstore",
    category: "e-commerce",
    image: "/images/bookstore.png",
    description: "A complete e-commerce platform built to elevate the online book-buying experience, showcasing a curated catalog of books with a refined, user-first UI.",
    tags: ["E-commerce", "Bookstore", "React", "Express.js", "UI/UX"],
    client: "Luminary Books",
    duration: "5 months",
    completionDate: "June 2024",
    technologies: ["React.js", "Express.js", "Tailwind CSS", "Payment Gateway Integration", "Content Management"],
    industry: "Retail & Publishing",
    challenge: "Creating a sophisticated and fully functional e-commerce platform for books that offers a seamless and luxurious shopping experience.",
    solution: "Developed a comprehensive online bookstore with full e-commerce functionality, curated inventory display, and elegant responsive design.",
    results: "Delivered a premium online book-buying platform that enhances user engagement and streamlines the purchasing process.",
    link: "https://bookstore-ten-liart.vercel.app/"
  },
  {
    id: 5,
    title: "Lumière – Luxury Fragrance E-commerce Boutique",
    category: "e-commerce",
    image: "/images/Lumière – Luxury Fragrance E-commerce Boutique.png",
    description: "A fully developed e-commerce platform that reimagines the digital fragrance shopping experience, designed for elegance and exclusivity.",
    tags: ["E-commerce", "Fragrance", "Luxury", "React", "Express.js"],
    client: "Lumière Atelier",
    duration: "4 months",
    completionDate: "July 2024",
    technologies: ["React.js", "Express.js", "Tailwind CSS", "Payment Integration", "Product Management"],
    industry: "Luxury Retail",
    challenge: "Building an e-commerce platform that conveys luxury and provides an immersive, personalized fragrance shopping experience.",
    solution: "Developed a high-end e-commerce boutique with interactive fragrance discovery, elegant product showcases, and seamless user experience.",
    results: "Created a visually stunning and functional online store that enhances brand perception and simplifies the luxury fragrance purchasing journey.",
    link: "https://luxe-fragrance-atelier.vercel.app/"
  },
  {
    id: 6,
    title: "Luxury Electronics E-commerce Boutique",
    category: "e-commerce",
    image: "/images/Luxury Electronics E-commerce Boutique.png",
    description: "A complete, high-end e-commerce website built for a premium electronics brand offering an elevated digital shopping experience.",
    tags: ["E-commerce", "Electronics", "Luxury", "React", "Express.js"],
    client: "Premium Electronics Co.",
    duration: "6 months",
    completionDate: "August 2024",
    technologies: ["React.js", "Express.js", "Tailwind CSS", "Payment Gateway", "Product Catalog"],
    industry: "Luxury Electronics Retail",
    challenge: "Creating a high-end e-commerce platform that showcases luxury electronics with an immersive layout and premium shopping experience.",
    solution: "Developed a full-stack e-commerce boutique with sleek product displays, curated collections, and optimized responsiveness for a luxury brand identity.",
    results: "Successfully launched a premium online store that enhances brand perception and provides a seamless shopping journey for high-end electronics.",
    link: "https://luxury-electronics-e-commerce-bouti.vercel.app/"
  },
  {
    id: 7,
    title: "VERDANT",
    category: "website",
    image: "/images/VERDANT.png",
    description: "VERDANT is where sophisticated design meets sustainable practices, creating a sanctuary for coffee connoisseurs and community builders alike.",
    tags: ["Website", "React", "Tailwind CSS"],
    client: "VERDANT",
    duration: "2 months",
    completionDate: "March 2024",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    industry: "Restaurant & Coffee",
    challenge: "Creating a luxurious and engaging website that showcases the coffee shop's ambiance and offerings while maintaining a sustainable brand image.",
    solution: "Developed a modern website with beautiful gallery, smooth animations, and intuitive navigation that reflects the brand's commitment to sustainability.",
    results: "Enhanced online presence and improved customer engagement through an elegant and functional website.",
    link: "https://the-gathered-oasis-lounge.vercel.app/#gallery"
  },
  {
    id: 33,
    title: "AI-Powered SEO Blog Content Generator (SaaS)",
    category: "website",
    image: "/images/ai-seo-blog.png",
    description: "A complete SaaS application built to automate SEO blog content creation using AI. Designed for marketers, bloggers, and business owners, the platform allows users to generate high-quality, keyword-optimized blog posts in seconds by simply entering a website URL or product description and target keywords.",
    tags: ["SaaS", "AI", "SEO", "Blog Generation", "React", "Express.js"],
    client: "Personal Project",
    duration: "3 months",
    completionDate: "September 2024",
    technologies: ["React.js", "Tailwind CSS", "Express.js", "Vercel Deployment", "AI Integration"],
    industry: "Marketing Technology & SaaS",
    challenge: "Developing a robust SaaS platform that automates SEO-optimized blog content creation using AI, ensuring high quality and user-friendliness.",
    solution: "Built a full-stack SaaS application with AI-powered content generation, intuitive UI for keyword input, and optimized for seamless user experience.",
    results: "Successfully launched a production-ready SaaS platform that simplifies and accelerates SEO blog content creation for marketers and business owners.",
    link: "https://ai-seo-blog-tool.vercel.app/"
  },
  {
    id: 34,
    title: "CERM – AI-Powered Finance Platform",
    category: "website",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    description: "A complete, production-ready AI-driven financial web application designed for modern global users, offering next-generation banking experiences with instant payments, real-time insights, and enterprise-grade security.",
    tags: ["FinTech", "AI", "Banking", "Security", "React", "Express.js"],
    client: "FinFlow",
    duration: "6 months",
    completionDate: "October 2024",
    technologies: ["React.js", "Tailwind CSS", "Express.js", "Vercel Deployment", "AI-Powered Insights", "256-bit SSL"],
    industry: "Finance & SaaS",
    challenge: "Designing and developing an AI-driven financial platform with bank-grade security and real-time insights for a global user base.",
    solution: "Developed a full-stack financial web application with AI-powered insights, instant payments, and robust security features, optimized for scalability.",
    results: "Successfully launched a scalable fintech platform with 10M+ active users and processing $50B+ transactions securely.",
    link: "https://fintech-website-iota.vercel.app/"
  },
  {
    id: 35,
    title: "Fast Food Menu Website",
    category: "e-commerce",
    image: "/images/fast-food-menu-lime.png",
    description: "A complete and responsive fast food restaurant website designed to showcase menu items with a bold, modern aesthetic.",
    tags: ["E-commerce", "Food", "Restaurant", "React", "Express.js"],
    client: "Fast Food Chain",
    duration: "3 months",
    completionDate: "November 2024",
    technologies: ["React.js", "Tailwind CSS", "Express.js", "Vercel Deployment"],
    industry: "Food & Hospitality",
    challenge: "Creating a visually appealing and user-friendly online menu for a fast food restaurant with fast load times and responsive design.",
    solution: "Developed a complete and responsive fast food restaurant website with interactive menu browsing and clear calls to action.",
    results: "Successfully launched an intuitive and fast-loading online menu, enhancing customer engagement and simplifying the ordering process.",
    link: "https://fast-food-menu-lime.vercel.app/"
  }
];

const Portfolio = () => {
  const [filter, setFilter] = useState<string>("all");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = filter === "all"
    ? portfolioItems
    : portfolioItems.filter(project => project.category === filter);

  return (
    <section id="portfolio" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-agency-blue">My Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Explore my recent projects showcasing my expertise in web design, AI automation solutions, and specialized technologies.
          </p>

          <div className="flex flex-wrap justify-center mb-8">
            <div className="flex justify-end mb-4 w-full">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-l-md ${
                  viewMode === "grid" ? "bg-agency-purple text-white" : "bg-gray-100"
                }`}
                aria-label="Grid view"
              >
                <Grid3x3 size={20} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-r-md ${
                  viewMode === "list" ? "bg-agency-purple text-white" : "bg-gray-100"
                }`}
                aria-label="List view"
              >
                <LayoutList size={20} />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 max-w-5xl mx-auto">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === category.id
                    ? "bg-agency-purple text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl overflow-hidden shadow-md hover-card relative"
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-agency-blue mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-agency-light-gray px-3 py-1 rounded-full text-xs font-medium text-gray-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {hoveredProject === project.id && (
                  <div className="absolute inset-0 bg-agency-blue/80 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <div className="text-center p-6">
                      <h3 className="text-white font-bold text-xl mb-3">{project.title}</h3>
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white text-agency-blue px-4 py-2 rounded-full flex items-center gap-2 mx-auto"
                      >
                        View Project <ExternalLink size={16} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-64 md:h-full object-cover"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <CardHeader>
                      <CardTitle className="text-agency-blue">{project.title}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Project Details</h4>
                          <p className="text-sm mb-1"><span className="font-medium">Client:</span> {project.client}</p>
                          <p className="text-sm mb-1"><span className="font-medium">Industry:</span> {project.industry}</p>
                          <p className="text-sm mb-1"><span className="font-medium">Duration:</span> {project.duration}</p>
                          <p className="text-sm"><span className="font-medium">Completed:</span> {project.completionDate}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech, index) => (
                              <span
                                key={index}
                                className="bg-agency-light-gray px-3 py-1 rounded-full text-xs font-medium text-gray-600"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4">
                        <h4 className="font-semibold mb-2">Challenge & Solution</h4>
                        <p className="text-sm mb-2"><span className="font-medium">Challenge:</span> {project.challenge}</p>
                        <p className="text-sm mb-2"><span className="font-medium">Solution:</span> {project.solution}</p>
                        <p className="text-sm"><span className="font-medium">Results:</span> {project.results}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <a 
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-agency-purple text-white px-4 py-2 rounded-full flex items-center gap-2"
                      >
                        View Project <ExternalLink size={16} />
                      </a>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Portfolio;
