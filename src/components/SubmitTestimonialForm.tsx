import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Star, Loader2 } from "lucide-react";

// Assume a service exists to handle the submission
// import { submitTestimonial } from '@/lib/services/submitTestimonialService';

const SubmitTestimonialForm = () => {
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [clientCompany, setClientCompany] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!clientName || !content || rating === 0) {
      toast({
        title: "Error",
        description: "Please fill in all required fields (Name, Testimonial, Rating).",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // In a real application, you would call your service here
    // try {
    //   await submitTestimonial({
    //     clientName,
    //     clientRole,
    //     clientCompany,
    //     content,
    //     rating,
    //   });
    //   toast({
    //     title: "Success",
    //     description: "Thank you for your testimonial!",
    //   });
    //   // Clear form
    //   setClientName('');
    //   setClientRole('');
    //   setClientCompany('');
    //   setContent('');
    //   setRating(0);
    // } catch (error) {
    //   const errorMessage = error instanceof Error ? error.message : 'Failed to submit testimonial';
    //   toast({
    //     title: "Error",
    //     description: errorMessage,
    //     variant: "destructive",
    //   });
    // } finally {
    //   setIsLoading(false);
    // }

    // временная заглушка для демонстрации без бекенда
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success",
        description: "Thank you for your testimonial! (Simulated)",
      });
       // Clear form
      setClientName('');
      setClientRole('');
      setClientCompany('');
      setContent('');
      setRating(0);
    }, 2000);



  };

  return (
    <section id="submit-testimonial" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 text-agency-blue">Leave a Testimonial</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Share your experience working with me.
          </p>
        </div>
        <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="clientName">Name <span className="text-red-500">*</span></Label>
              <Input
                id="clientName"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientRole">Role</Label>
              <Input
                id="clientRole"
                value={clientRole}
                onChange={(e) => setClientRole(e.target.value)}
              />
            </div>
             <div>
              <Label htmlFor="clientCompany">Company</Label>
              <Input
                id="clientCompany"
                value={clientCompany}
                onChange={(e) => setClientCompany(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="content">Testimonial <span className="text-red-500">*</span></Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="rating">Rating <span className="text-red-500">*</span></Label>
              <div className="flex gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`h-6 w-6 cursor-pointer ${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    onClick={() => setRating(index + 1)}
                  />
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full bg-agency-bright-blue hover:bg-agency-purple" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Testimonial'
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SubmitTestimonialForm; 