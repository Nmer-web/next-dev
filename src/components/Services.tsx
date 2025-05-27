import React, { useState } from "react";
import { 
  Layout, 
  PaintBucket, 
  Code2, 
  Bot, 
  BadgeDollarSign, 
  ShieldCheck, 
  Rocket,
  X,
  ChevronRight,
  DollarSign,
  Link
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link as RouterLink } from "react-router-dom";

// Define the service type
interface ServiceType {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconBgColor: string;
  iconColor: string;
  longDescription: string;
  features: string[];
  pricing: {
    basic: number;
    standard: number;
    premium: number;
  };
  deliveryTime: {
    basic: string;
    standard: string;
    premium: string;
  };
  benefits: string[];
}

const ServicesCard = ({ 
  service,
  onClick
}: { 
  service: ServiceType,
  onClick: () => void
}) => {
  return (
    <Card className="bg-white hover-card border border-gray-100 h-full">
      <CardHeader>
        <div className={`${service.iconBgColor} w-14 h-14 rounded-lg flex items-center justify-center mb-4`}>
          {service.icon}
        </div>
        <CardTitle className="text-xl font-bold text-agency-blue">{service.title}</CardTitle>
        <CardDescription className="text-gray-600">{service.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-4">
          {service.features.slice(0, 4).map((feature, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight className="h-4 w-4 text-agency-purple mt-1 mr-2 shrink-0" />
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>Starting from</span>
          <span className="font-bold text-agency-blue">${service.pricing.basic}</span>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-2">
        <Button 
          variant="outline" 
          className="w-full"
          onClick={onClick}
        >
          View Details
        </Button>
        <RouterLink to="/contact" className="w-full">
          <Button className="w-full">
            Choose Plan
          </Button>
        </RouterLink>
      </CardFooter>
    </Card>
  );
};

const PricingCard = ({ 
  tier, 
  price, 
  deliveryTime, 
  features,
  recommended = false
}: { 
  tier: string, 
  price: number, 
  deliveryTime: string, 
  features: string[],
  recommended?: boolean 
}) => {
  return (
    <Card className={`${recommended ? 'border-2 border-agency-purple' : 'border border-gray-200'} bg-white shadow-md h-full`}>
      <CardHeader className={`${recommended ? 'bg-agency-purple/10' : ''}`}>
        <CardTitle className="flex items-center justify-between">
          {tier} 
          {recommended && <span className="bg-agency-purple text-white text-xs py-1 px-2 rounded-full">Recommended</span>}
        </CardTitle>
        <CardDescription className="flex items-center mt-4">
          <DollarSign className="h-5 w-5 text-agency-bright-blue mr-1" />
          <span className="text-3xl font-bold text-agency-blue">${price}</span>
        </CardDescription>
        <p className="text-sm text-gray-500 mt-2">Delivery time: {deliveryTime}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <ChevronRight className="h-4 w-4 text-agency-purple mt-1 mr-2 shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <RouterLink to="/contact">
          <Button className="w-full">Choose Plan</Button>
        </RouterLink>
      </CardFooter>
    </Card>
  );
};

const ServiceDetail = ({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: ServiceType | null, 
  isOpen: boolean, 
  onClose: () => void 
}) => {
  if (!service) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className={`${service.iconBgColor} w-12 h-12 rounded-lg flex items-center justify-center`}>
                {service.icon}
              </div>
              <DialogTitle className="text-2xl">{service.title}</DialogTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <DialogDescription className="text-lg mt-4">
            {service.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-agency-blue mb-4">Overview</h3>
            <p className="text-gray-600">{service.longDescription}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-agency-blue mb-4">Features</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {service.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-agency-purple mt-1 mr-2 shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-agency-blue mb-4">Benefits</h3>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start">
                  <ChevronRight className="h-4 w-4 text-agency-purple mt-1 mr-2 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-agency-blue mb-4">Pricing Plans</h3>
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="basic">Basic</TabsTrigger>
                <TabsTrigger value="standard">Standard</TabsTrigger>
                <TabsTrigger value="premium">Premium</TabsTrigger>
              </TabsList>
              <TabsContent value="basic" className="pt-4">
                <PricingCard 
                  tier="Basic Plan" 
                  price={1100} 
                  deliveryTime="10-14 days"
                  features={[
                    "Responsive Website Design",
                    "5 Pages",
                    "Contact Form",
                    "Basic SEO Setup",
                    "Social Media Integration",
                    "1 Month Support",
                    "Basic Analytics"
                  ]} 
                />
              </TabsContent>
              <TabsContent value="standard" className="pt-4">
                <PricingCard 
                  tier="Standard Plan" 
                  price={1500} 
                  deliveryTime="7-10 days"
                  features={[
                    "Everything in Basic",
                    "10 Pages",
                    "Advanced SEO Setup",
                    "Content Management System",
                    "E-commerce Integration",
                    "3 Months Support",
                    "Advanced Analytics",
                    "Performance Optimization"
                  ]} 
                  recommended={true}
                />
              </TabsContent>
              <TabsContent value="premium" className="pt-4">
                <PricingCard 
                  tier="Premium Plan" 
                  price={2500}
                  deliveryTime="3-5 days"
                  features={[
                    "Everything in Standard",
                    "Unlimited Pages",
                    "Custom Web Application",
                    "API Integration",
                    "Advanced E-commerce Features",
                    "6 Months Support",
                    "Premium Analytics",
                    "Priority Support",
                    "Custom Animations",
                    "Advanced Security Features"
                  ]} 
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Services = () => {
  const [selectedService, setSelectedService] = useState<ServiceType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleServiceClick = (service: ServiceType) => {
    setSelectedService(service);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const services: ServiceType[] = [
    {
      icon: <Layout className="h-6 w-6 text-agency-purple" />,
      title: "Web Design",
      description: "Beautiful, responsive websites designed to engage your audience and represent your brand perfectly.",
      iconBgColor: "bg-agency-purple/10",
      iconColor: "text-agency-purple",
      longDescription: "My web design service focuses on creating visually stunning, functional websites that capture your brand essence. I combine aesthetic appeal with user-friendly navigation to ensure visitors have an engaging experience that drives conversions. Every design is optimized for all devices and screens.",
      features: [
        "Custom website layouts", 
        "Responsive design for all devices", 
        "Interactive elements",
        "SEO-friendly structure",
        "Fast loading optimization",
        "Cross-browser compatibility",
        "Social media integration",
        "Contact forms and CTAs"
      ],
      pricing: {
        basic: 1499,
        standard: 2999,
        premium: 5999
      },
      deliveryTime: {
        basic: "10-14 days",
        standard: "7-10 days",
        premium: "3-5 days"
      },
      benefits: [
        "Increased user engagement and time on site",
        "Higher conversion rates with strategic CTAs",
        "Improved brand perception through professional design",
        "Better search engine rankings with optimized code",
        "Reduced bounce rates with intuitive navigation"
      ]
    },
    {
      icon: <PaintBucket className="h-6 w-6 text-agency-bright-blue" />,
      title: "UI/UX Design",
      description: "User-centered interfaces that enhance usability and create seamless, enjoyable user experiences.",
      iconBgColor: "bg-agency-bright-blue/10",
      iconColor: "text-agency-bright-blue",
      longDescription: "My UI/UX design service transforms complex user flows into intuitive, enjoyable experiences. I conduct thorough research to understand your users' needs and behaviors, creating interfaces that guide them effortlessly through your digital product while achieving your business goals.",
      features: [
        "User research and personas", 
        "Wireframing and prototyping", 
        "Usability testing",
        "Information architecture",
        "Interaction design",
        "Visual design systems",
        "Accessibility compliance",
        "User journey mapping"
      ],
      pricing: {
        basic: 1999,
        standard: 3499,
        premium: 6999
      },
      deliveryTime: {
        basic: "14-21 days",
        standard: "10-14 days",
        premium: "7-10 days"
      },
      benefits: [
        "Reduced learning curve for new users",
        "Increased user satisfaction and loyalty",
        "Higher completion rates for key user flows",
        "Fewer support tickets and customer service inquiries",
        "Data-driven design decisions based on user testing"
      ]
    },
    {
      icon: <Code2 className="h-6 w-6 text-agency-purple" />,
      title: "Custom Development",
      description: "Tailored web applications and solutions built with cutting-edge technologies to meet your specific needs.",
      iconBgColor: "bg-agency-purple/10",
      iconColor: "text-agency-purple",
      longDescription: "My custom development service creates tailor-made web applications and software solutions that perfectly align with your business requirements. Using modern frameworks and best practices, I build scalable, maintainable codebases that can grow with your business and adapt to changing needs.",
      features: [
        "Frontend development", 
        "Backend systems", 
        "API integration",
        "Database design",
        "E-commerce functionality",
        "Content management systems",
        "Payment gateway integration",
        "Third-party API integration"
      ],
      pricing: {
        basic: 4999,
        standard: 9999,
        premium: 19999
      },
      deliveryTime: {
        basic: "30-45 days",
        standard: "21-30 days",
        premium: "14-21 days"
      },
      benefits: [
        "Purpose-built solutions for your specific business needs",
        "Scalable architecture that grows with your business",
        "Integration with your existing systems and workflows",
        "Ongoing support and maintenance options",
        "Competitive advantage through custom functionality"
      ]
    },
    {
      icon: <Bot className="h-6 w-6 text-agency-bright-blue" />,
      title: "AI Automation",
      description: "Smart solutions that automate repetitive tasks, streamline workflows, and enhance productivity.",
      iconBgColor: "bg-agency-bright-blue/10",
      iconColor: "text-agency-bright-blue",
      longDescription: "My AI automation service harnesses the power of artificial intelligence to streamline your business operations. I identify repetitive processes that can be automated, design intelligent workflows, and implement AI-powered solutions that save time, reduce errors, and allow your team to focus on high-value tasks.",
      features: [
        "Workflow automation", 
        "Chatbots and virtual assistants", 
        "Data processing automation",
        "Document analysis",
        "Predictive analytics",
        "Customer segmentation",
        "Personalization engines",
        "Machine learning implementation"
      ],
      pricing: {
        basic: 3999,
        standard: 7999,
        premium: 15999
      },
      deliveryTime: {
        basic: "21-30 days",
        standard: "14-21 days",
        premium: "10-14 days"
      },
      benefits: [
        "Significant time savings on repetitive tasks",
        "Reduced operational costs and human error",
        "24/7 availability for customer interactions",
        "Scalable solutions that handle increasing workloads",
        "Data-driven insights for better business decisions"
      ]
    },
    {
      icon: <BadgeDollarSign className="h-6 w-6 text-agency-purple" />,
      title: "SEO Optimization",
      description: "Boost your visibility with search engine optimization strategies tailored to your business goals.",
      iconBgColor: "bg-agency-purple/10",
      iconColor: "text-agency-purple",
      longDescription: "My SEO optimization service improves your website's visibility in search engine results pages. I conduct thorough keyword research, optimize on-page elements, enhance technical SEO factors, and develop content strategies that attract qualified traffic to your site and improve organic rankings.",
      features: [
        "Keyword research and analysis", 
        "On-page SEO optimization", 
        "Technical SEO improvements",
        "Content strategy development",
        "Local SEO optimization",
        "Link building strategy",
        "SEO audit and reporting",
        "Competitor analysis"
      ],
      pricing: {
        basic: 999,
        standard: 1999,
        premium: 3999
      },
      deliveryTime: {
        basic: "Ongoing monthly",
        standard: "Ongoing monthly",
        premium: "Ongoing monthly"
      },
      benefits: [
        "Increased organic traffic and qualified leads",
        "Higher rankings for relevant search terms",
        "Improved website authority and credibility",
        "Better user experience through optimized content",
        "Long-term sustainable traffic growth"
      ]
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-agency-bright-blue" />,
      title: "Web Security",
      description: "Protect your digital assets with robust security measures and best practices implementation.",
      iconBgColor: "bg-agency-bright-blue/10",
      iconColor: "text-agency-bright-blue",
      longDescription: "My web security service safeguards your digital presence against threats and vulnerabilities. I perform comprehensive security audits, implement protection measures, set up monitoring systems, and ensure compliance with relevant regulations to keep your data and users safe from malicious attacks.",
      features: [
        "Security audit and assessment", 
        "SSL implementation", 
        "Firewall configuration",
        "Malware scanning and removal",
        "DDoS protection",
        "Security monitoring",
        "User authentication systems",
        "Data encryption implementation"
      ],
      pricing: {
        basic: 1499,
        standard: 2999,
        premium: 5999
      },
      deliveryTime: {
        basic: "7-10 days + ongoing",
        standard: "5-7 days + ongoing",
        premium: "2-4 days + ongoing"
      },
      benefits: [
        "Protection against data breaches and hacks",
        "Maintained customer trust through secure experiences",
        "Compliance with data protection regulations",
        "Reduced risk of downtime from security incidents",
        "Peace of mind with ongoing security monitoring"
      ]
    },
  ];

  return (
    <section id="services" className="py-20 bg-agency-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-agency-blue">My Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            I combine beautiful design with powerful technology to create websites and automation solutions that drive business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServicesCard
              key={index}
              service={service}
              onClick={() => handleServiceClick(service)}
            />
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-white p-6 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <Rocket className="h-6 w-6 text-agency-purple" />
              <h3 className="text-xl font-bold text-agency-blue">Ready to transform your digital presence?</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Let's discuss how my services can help you achieve your business goals.
            </p>
            <RouterLink to="/contact">
              <Button className="btn-primary inline-block">
                Schedule a Consultation
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>

      <ServiceDetail 
        service={selectedService} 
        isOpen={isDialogOpen} 
        onClose={handleCloseDialog} 
      />
    </section>
  );
};

export default Services;
