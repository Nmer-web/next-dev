import React, { useEffect, useState } from "react";
import { testimonialService, Testimonial } from "@/lib/services/testimonialService";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Star } from "lucide-react";

const Testimonials = () => {
  const { toast } = useToast();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await testimonialService.getFeaturedTestimonials();
        setTestimonials(response.documents as Testimonial[]);
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load testimonials. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, [toast]);

  if (loading) {
    return (
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="mb-4 text-agency-blue">Loading Testimonials...</h2>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-agency-blue">Client Testimonials</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take my word for it. Here's what my clients have to say about working with me.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-white hover-card border border-gray-100">
              <CardHeader>
                <div className="flex items-center gap-4 mb-4">
                  {testimonial.imageUrl ? (
                    <img
                      src={testimonial.imageUrl}
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-agency-purple/10 flex items-center justify-center">
                      <span className="text-agency-purple font-bold text-lg">
                        {testimonial.clientName.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h3 className="font-bold text-agency-blue">{testimonial.clientName}</h3>
                    <p className="text-sm text-gray-600">
                      {testimonial.clientRole} at {testimonial.clientCompany}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`h-5 w-5 ${
                        index < testimonial.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
