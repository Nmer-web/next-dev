import React from "react";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: 1100,
      description: "Perfect for small projects and startups",
      features: [
        "Responsive Website Design",
        "5 Pages",
        "Contact Form",
        "Basic SEO Setup",
        "Social Media Integration",
        "1 Month Support",
        "Basic Analytics",
      ],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Standard",
      price: 1500,
      description: "Ideal for growing businesses",
      features: [
        "Everything in Basic",
        "10 Pages",
        "Advanced SEO Setup",
        "Content Management System",
        "E-commerce Integration",
        "3 Months Support",
        "Advanced Analytics",
        "Performance Optimization",
      ],
      cta: "Get Started",
      popular: true,
    },
    {
      name: "Premium",
      price: 2500,
      description: "For businesses requiring advanced features",
      features: [
        "Everything in Standard",
        "Unlimited Pages",
        "Custom Web Application",
        "API Integration",
        "Advanced E-commerce Features",
        "6 Months Support",
        "Premium Analytics",
        "Priority Support",
        "Custom Animations",
        "Advanced Security Features",
      ],
      cta: "Get Started",
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-agency-blue">Pricing Plans</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the perfect plan for your business needs. All plans include a 100% satisfaction guarantee.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-xl shadow-lg p-8 relative ${
                plan.popular ? "border-2 border-agency-purple" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
                  <span className="bg-agency-purple text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-agency-blue mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  <span className="text-gray-600">/project</span>
                </div>
                <p className="text-gray-600 mt-2">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-agency-purple flex-shrink-0 mt-1" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link to="/contact">
                <Button
                  className={`w-full ${
                    plan.popular
                      ? "bg-agency-purple hover:bg-agency-purple/90"
                      : "bg-agency-blue hover:bg-agency-blue/90"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600">
            Need a custom solution?{" "}
            <Link
              to="/contact"
              className="text-agency-purple hover:text-agency-purple/90 font-medium cursor-pointer"
            >
              Contact me
            </Link>{" "}
            for a personalized quote.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 