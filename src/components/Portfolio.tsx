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
  { id: "web-design", label: "Web Design" },
  { id: "ai-automation", label: "AI Automation" },
  { id: "e-commerce", label: "E-commerce" },
  { id: "mobile-app", label: "Mobile App" },
  { id: "ui-ux", label: "UI/UX Design" },
  { id: "dashboard", label: "Dashboard" },
  { id: "crm", label: "CRM Systems" },
  { id: "cms", label: "CMS Development" },
  { id: "blockchain", label: "Blockchain" },
  { id: "saas", label: "SaaS Products" },
  { id: "iot", label: "IoT Solutions" },
  { id: "ar-vr", label: "AR/VR Experiences" },
  { id: "data-analytics", label: "Data Analytics" },
  { id: "machine-learning", label: "Machine Learning" },
  { id: "chatbot", label: "Chatbot Development" },
  { id: "fintech", label: "Fintech Solutions" },
  { id: "healthcare", label: "Healthcare Tech" },
  { id: "education", label: "EdTech" },
  { id: "social-media", label: "Social Media" },
];

const portfolioItems: Project[] = [
  {
    id: 1,
    title: "EcoShop E-commerce Platform",
    category: "e-commerce",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    description: "A fully responsive e-commerce platform with integrated payment systems and inventory management.",
    tags: ["E-commerce", "Web Design", "React"],
    client: "EcoShop Organics",
    duration: "4 months",
    completionDate: "March 2024",
    technologies: ["React", "Node.js", "MongoDB", "Stripe API", "AWS"],
    industry: "Retail",
    challenge: "EcoShop needed a scalable e-commerce platform that could handle their growing inventory of organic products while providing a seamless customer experience.",
    solution: "We developed a custom e-commerce solution with automated inventory management, secure payment processing, and a user-friendly interface.",
    results: "35% increase in online sales, 28% reduction in cart abandonment, and improved inventory management efficiency.",
    link: "#"
  },
  {
    id: 2,
    title: "TaskMaster AI Assistant",
    category: "ai-automation",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "AI-powered productivity tool that automates task management and scheduling for businesses.",
    tags: ["AI", "Automation", "Machine Learning"],
    client: "ProductivityPro Inc.",
    duration: "6 months",
    completionDate: "February 2024",
    technologies: ["Python", "TensorFlow", "React", "FastAPI", "Docker"],
    industry: "Productivity Software",
    challenge: "Creating an intelligent assistant capable of understanding context and managing complex business tasks with minimal human intervention.",
    solution: "Implemented natural language processing algorithms and machine learning models trained on business productivity patterns.",
    results: "Users reported saving an average of 15 hours per week on administrative tasks.",
    link: "#"
  },
  {
    id: 3,
    title: "MediConnect Healthcare Portal",
    category: "healthcare",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    description: "Secure healthcare portal connecting patients with doctors, featuring appointment scheduling and telehealth.",
    tags: ["Healthcare", "UI/UX", "Security"],
    client: "MediConnect Health Network",
    duration: "8 months",
    completionDate: "January 2024",
    technologies: ["Angular", "Node.js", "PostgreSQL", "HIPAA-compliant Cloud Services"],
    industry: "Healthcare",
    challenge: "Building a secure platform that complies with healthcare regulations while providing seamless telehealth services.",
    solution: "Developed a HIPAA-compliant portal with end-to-end encryption for patient data and integrated video conferencing.",
    results: "Facilitated over 10,000 telehealth appointments in the first quarter, reducing wait times by 70%.",
    link: "#"
  },
  {
    id: 4,
    title: "SmartFactory Automation System",
    category: "iot",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "Factory process automation using AI to optimize production lines and reduce waste.",
    tags: ["AI", "Industrial", "IoT"],
    client: "GlobalManufacturing Ltd.",
    duration: "12 months",
    completionDate: "December 2023",
    technologies: ["IoT Sensors", "Azure IoT Suite", "Machine Learning Models", "Custom Dashboard"],
    industry: "Manufacturing",
    challenge: "Optimizing production efficiency and reducing operational costs in a large manufacturing facility.",
    solution: "Deployed IoT sensors throughout the factory floor, connected to an AI system that analyzes real-time data to optimize processes.",
    results: "22% increase in production efficiency, 18% reduction in waste, and 15% energy consumption reduction.",
    link: "#"
  },
  {
    id: 5,
    title: "TravelBuddy Mobile App",
    category: "mobile-app",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    description: "Travel companion application with interactive maps, recommendations, and trip planning features.",
    tags: ["Mobile App", "UI/UX", "React Native"],
    client: "TravelBuddy LLC",
    duration: "5 months",
    completionDate: "November 2023",
    technologies: ["React Native", "Firebase", "Google Maps API", "AI Recommendation Engine"],
    industry: "Travel",
    challenge: "Creating a user-friendly travel app that works offline and provides personalized recommendations.",
    solution: "Built a React Native app with offline capabilities and an AI-driven recommendation engine based on user preferences and behavior.",
    results: "Over 100,000 downloads in the first month with a 4.7 star rating across app stores.",
    link: "#"
  },
  {
    id: 6,
    title: "DataSense Analytics Platform",
    category: "data-analytics",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    description: "AI-driven analytics platform that transforms raw data into actionable business insights.",
    tags: ["Data Analytics", "AI", "Dashboard"],
    client: "Insight Analytics Inc.",
    duration: "7 months",
    completionDate: "October 2023",
    technologies: ["Python", "D3.js", "React", "Tensorflow", "AWS"],
    industry: "Business Intelligence",
    challenge: "Transforming complex, unstructured data into clear, actionable business insights for non-technical users.",
    solution: "Created an intuitive dashboard with AI-powered data processing that automatically generates insights and recommendations.",
    results: "Clients reported making decisions 40% faster with 25% improved outcomes based on platform insights.",
    link: "#"
  },
  {
    id: 7,
    title: "CryptoTrack Blockchain Platform",
    category: "blockchain",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    description: "Secure blockchain platform for tracking and verifying cryptocurrency transactions and investments.",
    tags: ["Blockchain", "Crypto", "Security"],
    client: "CryptoTrack Ventures",
    duration: "9 months",
    completionDate: "September 2023",
    technologies: ["Solidity", "React", "Web3.js", "Ethereum", "Smart Contracts"],
    industry: "Finance",
    challenge: "Building a transparent and secure blockchain solution for tracking cryptocurrency assets across multiple platforms.",
    solution: "Developed a custom blockchain platform with smart contracts for automated verification and real-time monitoring.",
    results: "Reduced transaction verification time by 65% while increasing security metrics across all user activities.",
    link: "#"
  },
  {
    id: 8,
    title: "EduLearn Online Education Platform",
    category: "education",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
    description: "Comprehensive online learning platform with interactive courses, live sessions, and progress tracking.",
    tags: ["EdTech", "E-Learning", "Web Application"],
    client: "EduLearn Foundation",
    duration: "6 months",
    completionDate: "August 2023",
    technologies: ["Next.js", "MongoDB", "WebRTC", "AWS", "Machine Learning"],
    industry: "Education",
    challenge: "Creating an engaging online learning environment that adapts to individual student learning patterns.",
    solution: "Built an adaptive learning platform that personalizes content delivery based on student performance and preferences.",
    results: "Student engagement increased by 45% with course completion rates improving by 60% compared to traditional methods.",
    link: "#"
  },
  {
    id: 9,
    title: "FinConnect Banking App",
    category: "fintech",
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334?auto=format&fit=crop&w=800&q=80",
    description: "Secure mobile banking application with advanced fraud detection and personal finance management.",
    tags: ["FinTech", "Mobile Banking", "Security"],
    client: "FinConnect Financial Services",
    duration: "10 months",
    completionDate: "July 2023",
    technologies: ["Flutter", "Firebase", "AI Fraud Detection", "Biometric Authentication", "Blockchain"],
    industry: "Finance",
    challenge: "Developing a highly secure mobile banking solution that simplifies complex financial management for users.",
    solution: "Created a user-friendly banking app with advanced security features and AI-powered financial insights.",
    results: "98.5% user satisfaction rate with zero security breaches since launch, and 72% of users reporting improved financial management.",
    link: "#"
  },
  {
    id: 10,
    title: "SocialConnect Platform",
    category: "social-media",
    image: "https://images.unsplash.com/photo-1473091534298-04dcbce3278c?auto=format&fit=crop&w=800&q=80",
    description: "Next-generation social media platform with enhanced privacy controls and content moderation.",
    tags: ["Social Media", "Content Moderation", "Privacy"],
    client: "SocialConnect Networks",
    duration: "8 months",
    completionDate: "June 2023",
    technologies: ["React", "Node.js", "Socket.io", "AI Content Moderation", "AWS"],
    industry: "Social Media",
    challenge: "Building a social platform that prioritizes user privacy and content quality over engagement metrics.",
    solution: "Implemented AI-driven content moderation and granular privacy controls that put users in complete control of their data.",
    results: "Attracted 2 million users in the first six months with 95% citing improved experience compared to traditional platforms.",
    link: "#"
  },
  {
    id: 11,
    title: "VirtualSpace AR Office Solution",
    category: "ar-vr",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    description: "Augmented reality solution for remote teams to collaborate in a shared virtual office environment.",
    tags: ["AR/VR", "Remote Work", "Collaboration"],
    client: "VirtualSpace Technologies",
    duration: "11 months",
    completionDate: "May 2023",
    technologies: ["Unity", "ARKit", "ARCore", "WebXR", "Cloud Infrastructure"],
    industry: "Enterprise Software",
    challenge: "Creating an immersive virtual workspace that maintains productivity while supporting remote collaboration.",
    solution: "Developed an AR platform where remote team members can collaborate in a shared virtual space with realistic interactions.",
    results: "Teams reported a 50% improvement in collaboration effectiveness and a 35% increase in meeting engagement.",
    link: "#"
  },
  {
    id: 12,
    title: "RetailGenius CRM System",
    category: "crm",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
    description: "Customer relationship management system specifically designed for retail businesses with inventory integration.",
    tags: ["CRM", "Retail", "Sales Automation"],
    client: "RetailGenius Inc.",
    duration: "6 months",
    completionDate: "April 2023",
    technologies: ["Salesforce Custom Development", "React", "Node.js", "AI Analytics", "ERP Integration"],
    industry: "Retail",
    challenge: "Integrating customer data with inventory management to create a unified retail management platform.",
    solution: "Built a custom CRM that connects customer preferences with inventory planning to optimize stock levels and personalized marketing.",
    results: "30% increase in repeat customers and 25% reduction in unsold inventory through improved targeting.",
    link: "#"
  },
  {
    id: 13,
    title: "ContentFlow CMS Platform",
    category: "cms",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
    description: "Advanced content management system with automated workflows and multi-channel publishing capabilities.",
    tags: ["CMS", "Content Management", "Publishing"],
    client: "ContentFlow Media",
    duration: "5 months",
    completionDate: "March 2023",
    technologies: ["Headless CMS", "Next.js", "GraphQL", "Content Distribution Network", "AI Content Analysis"],
    industry: "Media & Publishing",
    challenge: "Building a flexible CMS that supports complex workflows while maintaining simplicity for content creators.",
    solution: "Developed a headless CMS with intuitive interfaces for content creation and powerful APIs for multi-channel distribution.",
    results: "Content production efficiency increased by 65% with 40% faster time-to-publish across all channels.",
    link: "#"
  },
  {
    id: 14,
    title: "SmartChat AI Customer Service",
    category: "chatbot",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    description: "AI-powered customer service chatbot with natural language processing and sentiment analysis capabilities.",
    tags: ["Chatbot", "Customer Service", "AI"],
    client: "CustomerCare Solutions",
    duration: "4 months",
    completionDate: "February 2023",
    technologies: ["Natural Language Processing", "Machine Learning", "React", "Node.js", "Sentiment Analysis"],
    industry: "Customer Service",
    challenge: "Creating an AI chatbot that genuinely understands customer issues and provides helpful responses.",
    solution: "Built an advanced NLP system trained on thousands of customer interactions with sentiment analysis to detect customer frustration.",
    results: "Resolved 78% of customer inquiries without human intervention, improving response time by 95%.",
    link: "#"
  },
  {
    id: 15,
    title: "DesignHub UI/UX Platform",
    category: "ui-ux",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",
    description: "Collaborative UI/UX design platform with real-time prototyping and user testing capabilities.",
    tags: ["UI/UX", "Design Tools", "Collaboration"],
    client: "DesignHub Studios",
    duration: "7 months",
    completionDate: "January 2023",
    technologies: ["React", "Canvas API", "WebSockets", "User Testing Tools", "Design Systems"],
    industry: "Design Software",
    challenge: "Creating a platform that supports the entire UI/UX workflow from ideation to user testing in one ecosystem.",
    solution: "Developed an integrated platform with real-time collaboration features and built-in user testing capabilities.",
    results: "Design teams reported 45% faster project completion with improved results in user satisfaction metrics.",
    link: "#"
  },
  {
    id: 16,
    title: "CloudMetrics Dashboard",
    category: "dashboard",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=800&q=80",
    description: "Real-time cloud resource monitoring dashboard with predictive scaling and cost optimization features.",
    tags: ["Dashboard", "Cloud Computing", "Analytics"],
    client: "CloudMetrics Technologies",
    duration: "6 months",
    completionDate: "December 2022",
    technologies: ["React", "D3.js", "WebSockets", "Cloud Provider APIs", "Predictive Analytics"],
    industry: "Cloud Computing",
    challenge: "Visualizing complex cloud infrastructure data in an intuitive way while providing actionable insights.",
    solution: "Created an interactive dashboard with real-time data visualization and AI-driven recommendations for optimization.",
    results: "Clients achieved average cloud cost savings of 32% while improving performance metrics by 28%.",
    link: "#"
  },
  {
    id: 17,
    title: "GrowMarket SaaS Platform",
    category: "saas",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    description: "Marketing automation SaaS platform with lead scoring, campaign management, and performance analytics.",
    tags: ["SaaS", "Marketing", "Analytics"],
    client: "GrowMarket Solutions",
    duration: "9 months",
    completionDate: "November 2022",
    technologies: ["React", "Node.js", "Machine Learning", "Marketing APIs", "Multi-tenant Architecture"],
    industry: "Marketing Technology",
    challenge: "Building a scalable SaaS platform that integrates with numerous marketing channels while remaining user-friendly.",
    solution: "Developed a multi-tenant architecture with extensible API connections and intuitive campaign management interfaces.",
    results: "Average customer ROI of 320% on marketing campaigns managed through the platform.",
    link: "#"
  },
  {
    id: 18,
    title: "LuxuryBoutique E-commerce",
    category: "e-commerce",
    image: "https://images.unsplash.com/photo-1573376670774-4427757f7963?auto=format&fit=crop&w=800&q=80",
    description: "High-end luxury e-commerce platform with virtual try-on and personalized shopping experiences.",
    tags: ["E-commerce", "Luxury", "AR Shopping"],
    client: "LuxuryBoutique Brands",
    duration: "8 months",
    completionDate: "October 2022",
    technologies: ["React", "WebGL", "AR Technology", "AI Personalization", "Secure Payment Processing"],
    industry: "Luxury Retail",
    challenge: "Translating the high-end in-store experience to an online environment while maintaining brand prestige.",
    solution: "Created an immersive shopping experience with virtual try-on technology and white-glove digital customer service.",
    results: "Average order value increased by 45% with 28% higher conversion rates compared to previous platform.",
    link: "#"
  },
  {
    id: 19,
    title: "SmartCity IoT Platform",
    category: "iot",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    description: "IoT management platform for smart city infrastructure monitoring and optimization.",
    tags: ["IoT", "Smart City", "Infrastructure"],
    client: "SmartCity Solutions",
    duration: "14 months",
    completionDate: "September 2022",
    technologies: ["IoT Devices", "Edge Computing", "Real-time Analytics", "Dashboard", "Machine Learning"],
    industry: "Urban Technology",
    challenge: "Creating a unified platform to manage thousands of IoT devices across urban infrastructure systems.",
    solution: "Developed a scalable IoT platform with edge computing capabilities and centralized management dashboard.",
    results: "25% reduction in energy consumption and 30% improvement in infrastructure maintenance efficiency.",
    link: "#"
  },
  {
    id: 20,
    title: "PredictML Machine Learning Platform",
    category: "machine-learning",
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?auto=format&fit=crop&w=800&q=80",
    description: "No-code machine learning platform allowing businesses to create and deploy AI models without technical expertise.",
    tags: ["Machine Learning", "No-Code", "AI"],
    client: "PredictML Technologies",
    duration: "12 months",
    completionDate: "August 2022",
    technologies: ["Python", "TensorFlow", "React", "MLOps", "Visual Model Builder"],
    industry: "Artificial Intelligence",
    challenge: "Making complex ML technology accessible to non-technical business users without sacrificing capability.",
    solution: "Developed a visual model builder with pre-trained components and intuitive interfaces for model training and deployment.",
    results: "Enabled businesses to deploy machine learning solutions 10x faster with 85% cost reduction compared to traditional development.",
    link: "#"
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
                      <button className="bg-white text-agency-blue px-4 py-2 rounded-full flex items-center gap-2 mx-auto">
                        View Project <ExternalLink size={16} />
                      </button>
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
                      <button className="bg-agency-purple text-white px-4 py-2 rounded-full flex items-center gap-2">
                        View Project <ExternalLink size={16} />
                      </button>
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
