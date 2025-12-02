import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const heroVideo = "https://www.pexels.com/download/video/5271945/";

// Default values as fallback
const defaults = {
  tagline: "Magic starts here",
  titleLine1: "Susie's",
  titleLine2: "Photography",
  titleLine3: "Magical Memories",
  description: "Transform your moments into unforgettable memories with our premium photo booths—bringing fun, laughter, and sparkle to every celebration!",
  ctaText: "Inquire Now",
  rating: "5.0",
  reviewCount: "373+"
};

export const Hero = () => {
  const { content: hero } = useContent<typeof defaults>('hero');
  
  const data = { ...defaults, ...hero };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <div className="max-w-3xl">
          <p className="text-secondary font-medium tracking-wide uppercase text-sm animate-fade-in">
            {data.tagline}
          </p>
          
          <h1 className="font-display text-5xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-6 animate-fade-in leading-tight break-words">
            <span className="block sm:inline">{data.titleLine1}</span>{" "}
            <span className="italic text-primary block sm:inline">{data.titleLine2}</span>
            <br className="hidden sm:block" />
            <span className="block">{data.titleLine3}</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl animate-fade-in">
            {data.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft text-lg px-8"
              asChild
            >
              <a href="/contact">
                {data.ctaText}
              </a>
            </Button>
          </div>

          {/* Reviews */}
          <div className="flex items-center gap-6 animate-fade-in">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                ))}
              </div>
              <span className="font-semibold">{data.rating}</span>
            </div>
            <div className="text-muted-foreground">
              <span className="font-semibold text-foreground">{data.reviewCount}</span> Five-Star Reviews
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};
