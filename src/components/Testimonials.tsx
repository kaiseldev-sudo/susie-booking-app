import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState, useRef } from "react";
import { useAllContent } from "@/hooks/useContent";

const defaultTestimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    event: "Wedding Reception",
    rating: 5,
    text: "Absolutely incredible! The photo booth was the highlight of our wedding. Our guests couldn't stop raving about it, and the photos turned out stunning. Worth every penny!",
  },
  {
    id: "2",
    name: "Michael Chen",
    event: "Corporate Event",
    rating: 5,
    text: "Professional, punctual, and perfect. The 360 booth was a massive hit at our company gala. The team made setup and breakdown seamless. Highly recommend!",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    event: "Birthday Celebration",
    rating: 5,
    text: "The custom backdrop was absolutely gorgeous! It matched our theme perfectly and created the most beautiful photos. Can't wait to book again for our next event.",
  },
];

export const Testimonials = () => {
  const { content: allContent } = useAllContent();
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Get testimonials data from all content
  const testimonialsData = allContent?.testimonials;
  
  // Extract header and items based on structure
  let testimonialsHeader: { titlePart1?: string; titlePart2?: string; titlePart3?: string; description?: string } | null = null;
  let testimonialsArray: typeof defaultTestimonials = defaultTestimonials;
  
  if (testimonialsData) {
    if (Array.isArray(testimonialsData)) {
      // Old format: just an array
      testimonialsArray = testimonialsData;
    } else if (typeof testimonialsData === 'object' && testimonialsData !== null) {
      // New format: object with header and items
      const testimonialsObj = testimonialsData as { header?: typeof testimonialsHeader; items?: typeof defaultTestimonials };
      testimonialsHeader = testimonialsObj.header || null;
      testimonialsArray = testimonialsObj.items || defaultTestimonials;
    }
  }

  // Show only first 3 if 3 or fewer, otherwise show 3 at a time in carousel
  const shouldCarousel = testimonialsArray.length > 3;
  const displayTestimonials = testimonialsArray.slice(0, Math.min(3, testimonialsArray.length));

  // Auto-scroll carousel
  useEffect(() => {
    if (!shouldCarousel) return;

    const startAutoScroll = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          // Loop back to start when reaching the end
          return nextIndex >= testimonialsArray.length ? 0 : nextIndex;
        });
      }, 5000); // Scroll every 5 seconds (slow auto-scroll)
    };

    startAutoScroll();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [shouldCarousel, testimonialsArray.length]);

  // Pause carousel on hover
  const handleMouseEnter = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (!shouldCarousel) return;
    
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        return nextIndex >= testimonialsArray.length ? 0 : nextIndex;
      });
    }, 3000);
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {(testimonialsHeader?.titlePart1 && testimonialsHeader.titlePart1.trim()) || 'What Our'}{' '}
            <span className="text-primary italic">{(testimonialsHeader?.titlePart2 && testimonialsHeader.titlePart2.trim()) || 'Clients'}</span>
            {(testimonialsHeader?.titlePart3 && testimonialsHeader.titlePart3.trim()) ? ` ${testimonialsHeader.titlePart3.trim()}` : ' Say'}
          </h2>
          <p className="text-lg text-muted-foreground">
            {(testimonialsHeader?.description && testimonialsHeader.description.trim()) || "Don't just take our word for it—hear from the hosts and guests who've experienced the magic firsthand."}
          </p>
        </div>

        <div 
          ref={carouselRef}
          className="relative max-w-6xl mx-auto overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {shouldCarousel ? (
            <div className="relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-1000 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / 3)}%)`,
                  }}
                >
                  {testimonialsArray.map((testimonial, index) => (
                    <div key={testimonial.id || `${testimonial.name}-${index}`} className="w-full md:w-1/3 flex-shrink-0 px-4">
                      <Card className="border-0 shadow-luxury hover:shadow-soft transition-smooth h-full flex flex-col">
                        <CardContent className="p-8 flex flex-col flex-grow">
                          <div className="flex mb-4">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                            ))}
                          </div>
                          <p className="text-muted-foreground mb-6 leading-relaxed italic flex-grow">
                            "{testimonial.text}"
                          </p>
                          <div className="border-t border-border pt-4 mt-auto">
                            <div className="font-semibold">{testimonial.name}</div>
                            <div className="text-sm text-muted-foreground">{testimonial.event}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Carousel indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonialsArray.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-8 bg-primary' 
                        : 'w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {displayTestimonials.map((testimonial, index) => (
                <Card
                  key={testimonial.id || `${testimonial.name}-${index}`}
                  className="border-0 shadow-luxury hover:shadow-soft transition-smooth flex flex-col h-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-8 flex flex-col flex-grow">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-6 leading-relaxed italic flex-grow">
                      "{testimonial.text}"
                    </p>
                    <div className="border-t border-border pt-4 mt-auto">
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.event}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
