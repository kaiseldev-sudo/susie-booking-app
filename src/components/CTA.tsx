import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone } from "lucide-react";

export const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Ready to <span className="text-primary italic">Elevate</span> Your Event?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Limited spots available for popular dates. Book your photo booth experience today 
            and create memories that last a lifetime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft text-lg px-8"
              asChild
            >
              <a href="/contact">
                <Calendar className="mr-2 w-5 h-5" />
                Inquire Now
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8"
            >
              <Mail className="mr-2 w-5 h-5" />
              Get a Quote
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-muted-foreground">
            <a 
              href="tel:+1234567890" 
              className="flex items-center gap-2 hover:text-primary transition-smooth"
            >
              <Phone className="w-5 h-5" />
              <span>(123) 456-7890</span>
            </a>
            <a 
              href="mailto:hello@susiecalvert.com" 
              className="flex items-center gap-2 hover:text-primary transition-smooth"
            >
              <Mail className="w-5 h-5" />
              <span>hello@susiecalvert.com</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
