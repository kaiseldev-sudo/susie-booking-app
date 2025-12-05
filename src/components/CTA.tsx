import { Button } from "@/components/ui/button";
import { Calendar, Mail, Phone } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const defaultCta = {
  titlePart1: "Ready to",
  titlePart2: "Elevate",
  titlePart3: "Your Event?",
  description: "Limited spots available for popular dates. Book your photo booth experience today and create memories that last a lifetime.",
  primaryButtonText: "Inquire Now",
  secondaryButtonText: "Get a Quote",
};

const defaultContact = {
  phone: "(123) 456-7890",
  email: "hello@susiecalvert.com",
};

export const CTA = () => {
  const { content: cta } = useContent<typeof defaultCta>('cta');
  const { content: contact } = useContent<typeof defaultContact>('contact');
  
  const ctaData = { ...defaultCta, ...cta };
  const contactData = { ...defaultContact, ...contact };

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 gradient-hero opacity-10" />
      
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {(ctaData.titlePart1 && ctaData.titlePart1.trim()) || 'Ready to'}{' '}
            <span className="text-primary italic">{(ctaData.titlePart2 && ctaData.titlePart2.trim()) || 'Elevate'}</span>
            {(ctaData.titlePart3 && ctaData.titlePart3.trim()) ? ` ${ctaData.titlePart3.trim()}` : ' Your Event?'}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            {ctaData.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft text-lg px-8"
              asChild
            >
              <a href="/contact">
                <Calendar className="mr-2 w-5 h-5" />
                {ctaData.primaryButtonText}
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground text-lg px-8"
            >
              <Mail className="mr-2 w-5 h-5" />
              {ctaData.secondaryButtonText}
            </Button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-muted-foreground">
            <a 
              href={`tel:${contactData.phone?.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-2 hover:text-primary transition-smooth"
            >
              <Phone className="w-5 h-5" />
              <span>{contactData.phone}</span>
            </a>
            <a 
              href={`mailto:${contactData.email}`}
              className="flex items-center gap-2 hover:text-primary transition-smooth"
            >
              <Mail className="w-5 h-5" />
              <span>{contactData.email}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
