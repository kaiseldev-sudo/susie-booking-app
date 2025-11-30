import { useState, useEffect } from "react";
import { Square, Camera, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PuffLoader } from "react-spinners";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import photoBoothImg from "@/assets/photo-booth.jpg";
import booth360Img from "@/assets/360-booth.jpg";
import backdropsImg from "@/assets/backdrops.jpg";
import heroImageImg from "@/assets/hero-image.jpg";

const boothTypes = [
  {
    icon: Square,
    title: "Mirror Booth",
    slug: "mirror-booth",
    description: "Sleek, modern, and interactive full-length mirror experience.",
    image: photoBoothImg,
    badge: "Most Popular",
    inclusions: [
      "Professional setup & breakdown",
      "Touch-screen mirror interface",
      "Instant photo printing",
      "Digital gallery access",
      "Custom branding options",
      "Props & backdrop included",
      "Attendant for entire event",
      "Unlimited photos per guest",
    ],
  },
  {
    icon: Camera,
    title: "Micro Photo Booth",
    slug: "micro-photo-booth",
    description: "Compact, stylish, and ideal for smaller spaces.",
    image: photoBoothImg,
    inclusions: [
      "Professional setup & breakdown",
      "High-resolution camera system",
      "Instant photo printing",
      "Digital gallery access",
      "Custom backdrop selection",
      "Props package included",
      "On-site attendant",
      "Unlimited sessions",
    ],
  },
  {
    icon: Sparkles,
    title: "360 Video Booth",
    slug: "360-video-booth",
    description: "Capture stunning slow-motion videos with a full 360 spin and customizable music of your choice.",
    image: booth360Img,
    badge: "Premium",
    inclusions: [
      "Professional setup & breakdown",
      "Premium lighting system",
      "Professional styling area",
      "Instant & retouched prints",
      "Digital gallery access",
      "Luxury backdrop options",
      "Premium props collection",
      "Dedicated attendant",
      "Hair & makeup station",
    ],
  },
  {
    icon: Star,
    title: "Open-Air Booth",
    slug: "open-air-booth",
    description: "Perfect for group shots with customizable backdrops.",
    image: backdropsImg,
    inclusions: [
      "Professional setup & breakdown",
      "Open-air photo station",
      "Digital instant sharing",
      "Online gallery access",
      "Customizable backdrop",
      "Props package included",
      "Mobile-friendly interface",
      "Social media integration",
    ],
  },
];

export default function PhotoBooth() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <PuffLoader size={60} color="hsl(var(--primary))" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
                Photo Booth Options
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Choose Your <span className="text-primary italic">Perfect</span> Booth
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From elegant mirror booths to classic photo experiences, we offer a variety of premium options 
                to match your event style. All packages include professional service and 
                unforgettable memories. Custom pricing available for every occasion.
              </p>
            </div>
          </div>
        </section>

        {/* Booth Types Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {boothTypes.map((booth, index) => (
                  <Card
                    key={booth.title}
                    className="border-0 shadow-luxury hover:shadow-soft transition-smooth overflow-hidden group flex flex-col"
                  >
                    <Link to={`/photo-booth/${booth.slug}`} className="block relative h-48 overflow-hidden">
                      <img
                        src={booth.image}
                        alt={booth.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-500" />
                      
                      {/* Icon Badge */}
                      <div className="absolute top-4 right-4 z-10">
                        <div className="w-12 h-12 bg-primary/95 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                          <booth.icon className="w-6 h-6" />
                        </div>
                      </div>
                      
                      {/* Premium Badge */}
                      {booth.badge && (
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                            {booth.badge}
                          </div>
                        </div>
                      )}
                      
                      {/* Elegant overlay on hover */}
                      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500" />
                    </Link>
                    
                    <CardHeader className="pb-3">
                      <CardTitle className="text-xl mb-2">
                        <Link 
                          to={`/photo-booth/${booth.slug}`}
                          className="hover:text-primary transition-colors duration-300"
                        >
                          {booth.title}
                        </Link>
                      </CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {booth.description}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-4 flex-1 flex flex-col">
                      <div className="flex-1">
                        <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-2">
                          What's Included
                        </h4>
                        <ul className="space-y-1.5">
                          {booth.inclusions.map((inclusion, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs">
                              <span className="text-primary mt-1 flex-shrink-0">✓</span>
                              <span className="text-muted-foreground leading-relaxed">{inclusion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pt-4 border-t border-border">
                        <Button 
                          asChild
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300"
                        >
                          <a href="/contact">
                            Inquire Now
                          </a>
                        </Button>
                        <p className="text-xs text-center text-muted-foreground mt-2 italic">
                          Pricing tailored to your event
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Information Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-2xl text-center">
                    Have Questions? We're Here to Help
                  </CardTitle>
                  <CardDescription className="text-center">
                    Our team is ready to help you choose the perfect photo booth for your event.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button 
                      asChild
                      variant="outline"
                      className="flex-1 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      <a href="/contact">
                        Contact Us
                      </a>
                    </Button>
                    <Button 
                      asChild
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <a href="/contact">
                        Inquire Now
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

