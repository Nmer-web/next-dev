import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LandingPage from "./pages/LandingPage";
import ServicesPage from "./pages/ServicesPage";
import PortfolioPage from "./pages/PortfolioPage";
import ProjectsPage from "./pages/ProjectsPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PricingPage from "./pages/PricingPage";
import NotFound from "./pages/NotFound";
import BeforeAfterPage from "./pages/BeforeAfterPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <Router>
        <Routes>
          <Route path="/home" element={<Index />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/before-after" element={<BeforeAfterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
