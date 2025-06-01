import { useEffect, useState } from "react";
import { contactService } from "@/lib/services/contactService";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send,
  Check,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    service: "",
    pricing: "",
  });

  const services = [
    { id: "web-development", name: "Web Development" },
    { id: "ui-design", name: "UI/UX Design" },
    { id: "mobile-app", name: "Mobile App Development" },
    { id: "ecommerce", name: "E-commerce Solutions" },
    { id: "maintenance", name: "Website Maintenance" },
  ];

  const pricingPlans = [
    { id: "basic", name: "Basic Plan" },
    { id: "standard", name: "Standard Plan" },
    { id: "premium", name: "Premium Plan" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await contactService.createMessage(formData);
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting me. I'll get back to you soon.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        service: "",
        pricing: "",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-agency-blue">Get In Touch</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ready to start your next project? Have questions about my services? I'm here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-agency-light-gray rounded-xl p-8">
            <h3 className="text-2xl font-bold text-agency-blue mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-agency-purple/20 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-agency-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-agency-blue">Location</h4>
                  <p className="text-gray-600">Available for remote work worldwide</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-agency-purple/20 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-agency-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-agency-blue">Email</h4>
                  <p className="text-gray-600">nmertechh@gmail.com</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="bg-agency-purple/20 p-3 rounded-full">
                  <Phone className="h-6 w-6 text-agency-purple" />
                </div>
                <div>
                  <h4 className="font-bold text-agency-blue">Phone</h4>
                  <p className="text-gray-600">0033604438371</p>
                </div>
              </div>
            </div>
            
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-agency-blue mb-6">Availability</h3>
              <div className="space-y-2">
                <p className="text-gray-600"><span className="font-medium">Response Time:</span> Within 24 hours</p>
                <p className="text-gray-600"><span className="font-medium">Project Start:</span> Usually within 1-2 weeks</p>
                <p className="text-gray-600"><span className="font-medium">Timezone:</span> Flexible to accommodate your schedule</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
            <h3 className="text-2xl font-bold text-agency-blue mb-6">Send me a message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
                <div>
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Select
                    value={formData.service}
                    onValueChange={(value) => handleSelectChange("service", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Select
                    value={formData.pricing}
                    onValueChange={(value) => handleSelectChange("pricing", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Pricing Plan" />
                    </SelectTrigger>
                    <SelectContent>
                      {pricingPlans.map((plan) => (
                        <SelectItem key={plan.id} value={plan.id}>
                          {plan.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full"
                />
              </div>
              <div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full min-h-[150px]"
                />
              </div>
              <div className="text-center">
                <Button
                  type="submit"
                  className="btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
