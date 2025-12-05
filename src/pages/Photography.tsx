import { useState, useEffect } from "react";
import { Camera, Image, Video, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PuffLoader } from "react-spinners";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAllContent } from "@/hooks/useContent";
import photoBoothImg from "@/assets/photo-booth.jpg";
import booth360Img from "@/assets/360-booth.jpg";
import backdropsImg from "@/assets/backdrops.jpg";

interface PhotographyType {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  badge: string;
  duration: string;
  deliveryTime: string;
  minBooking: string;
  inclusions: string;
  features: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "wedding-photography": Heart,
  "event-photography": Camera,
  "portrait-photography": Image,
  "commercial-photography": Video,
};

const imageMap: Record<string, string> = {
  "wedding-photography": photoBoothImg,
  "event-photography": booth360Img,
  "portrait-photography": backdropsImg,
  "commercial-photography": photoBoothImg,
};

const defaultPhotography: PhotographyType[] = [
  {
    id: "wedding-photography",
    slug: "wedding-photography",
    title: "Wedding Photography",
    tagline: "Capturing Your Perfect Day",
    description: "Beautiful, timeless wedding photography that tells your unique love story.",
    longDescription: "",
    badge: "Most Popular",
    duration: "Full Day",
    deliveryTime: "4-6 weeks",
    minBooking: "6 hours",
    inclusions: "Professional photographer, High-resolution images, Online gallery, Print release, Engagement session",
    features: "",
  },
  {
    id: "event-photography",
    slug: "event-photography",
    title: "Event Photography",
    tagline: "Document Every Moment",
    description: "Professional coverage for corporate events, parties, and celebrations.",
    longDescription: "",
    badge: "",
    duration: "Custom",
    deliveryTime: "1-2 weeks",
    minBooking: "2 hours",
    inclusions: "Professional photographer, High-resolution images, Online gallery, Print release, Social media images",
    features: "",
  },
  {
    id: "portrait-photography",
    slug: "portrait-photography",
    title: "Portrait Photography",
    tagline: "Showcase Your Best Self",
    description: "Professional portraits for individuals, families, and headshots.",
    longDescription: "",
    badge: "",
    duration: "1-2 hours",
    deliveryTime: "1 week",
    minBooking: "1 hour",
    inclusions: "Professional photographer, Studio or location shoot, High-resolution images, Online gallery, Print release",
    features: "",
  },
  {
    id: "commercial-photography",
    slug: "commercial-photography",
    title: "Commercial Photography",
    tagline: "Elevate Your Brand",
    description: "Professional product and brand photography for businesses.",
    longDescription: "",
    badge: "Premium",
    duration: "Custom",
    deliveryTime: "2-3 weeks",
    minBooking: "3 hours",
    inclusions: "Professional photographer, High-resolution images, Commercial license, Online gallery, Retouching services",
    features: "",
  },
];

export default function Photography() {
  const [isLoading, setIsLoading] = useState(true);
  const { content: allContent } = useAllContent();
  
  // Get photography data from all content
  const photographyData = allContent?.photography;
  
  // Handle both old array format and new object format with header and items
  let photographyTypes: PhotographyType[] = defaultPhotography;
  let photographyHeader: {
    sectionLabel?: string;
    titlePart1?: string;
    titlePart2?: string;
    titlePart3?: string;
    description?: string;
  } | null = null;
  
  if (photographyData) {
    if (Array.isArray(photographyData)) {
      // Old format: array of items
      photographyTypes = photographyData.length > 0 ? photographyData : defaultPhotography;
    } else if (typeof photographyData === 'object' && 'items' in photographyData) {
      // New format: object with header and items
      photographyHeader = photographyData.header || null;
      photographyTypes = (photographyData.items && photographyData.items.length > 0) ? photographyData.items : defaultPhotography;
    }
  }

  const photographyLoading = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || photographyLoading) {
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
                {(photographyHeader?.sectionLabel && photographyHeader.sectionLabel.trim()) || 'Photography Services'}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {(photographyHeader?.titlePart1 && photographyHeader.titlePart1.trim()) || 'Capture Your'}{' '}
                <span className="text-primary italic">{(photographyHeader?.titlePart2 && photographyHeader.titlePart2.trim()) || 'Perfect'}</span>
                {(photographyHeader?.titlePart3 && photographyHeader.titlePart3.trim()) ? ` ${photographyHeader.titlePart3.trim()}` : ' Moments'}
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {(photographyHeader?.description && photographyHeader.description.trim()) || 'From intimate weddings to corporate events, we offer professional photography services to preserve your most important memories. Custom packages available for every occasion.'}
              </p>
            </div>
          </div>
        </section>

        {/* Photography Types Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {photographyTypes.map((photo) => {
                  const IconComponent = iconMap[photo.slug] || Camera;
                  const image = imageMap[photo.slug] || photoBoothImg;
                  const inclusions = photo.inclusions ? photo.inclusions.split(',').map(s => s.trim()) : [];

                  return (
                    <Card
                      key={photo.id}
                      className="border-0 shadow-luxury hover:shadow-soft transition-smooth overflow-hidden group flex flex-col"
                    >
                      <Link to={`/photography/${photo.slug}`} className="block relative h-48 overflow-hidden">
                        <img
                          src={image}
                          alt={photo.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent group-hover:from-black/60 transition-all duration-500" />
                        
                        {/* Icon Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className="w-12 h-12 bg-primary/95 backdrop-blur-sm rounded-full flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 group-hover:shadow-xl transition-all duration-300">
                            <IconComponent className="w-6 h-6" />
                          </div>
                        </div>
                        
                        {/* Premium Badge */}
                        {photo.badge && (
                          <div className="absolute top-4 left-4 z-10">
                            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                              {photo.badge}
                            </div>
                          </div>
                        )}
                        
                        {/* Elegant overlay on hover */}
                        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all duration-500" />
                      </Link>
                      
                      <CardHeader className="pb-3">
                        <CardTitle className="text-xl mb-2">
                          <Link 
                            to={`/photography/${photo.slug}`}
                            className="hover:text-primary transition-colors duration-300"
                          >
                            {photo.title}
                          </Link>
                        </CardTitle>
                        <CardDescription className="text-sm leading-relaxed">
                          {photo.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="space-y-4 flex-1 flex flex-col">
                        {/* Details Section */}
                        {(photo.duration || photo.deliveryTime || photo.minBooking) && (
                          <div className="grid grid-cols-2 gap-3 pb-4 border-b border-border">
                            {photo.duration && (
                              <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">Duration</span>
                                <span className="text-sm font-medium mt-1">{photo.duration}</span>
                              </div>
                            )}
                            {photo.deliveryTime && (
                              <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">Delivery Time</span>
                                <span className="text-sm font-medium mt-1">{photo.deliveryTime}</span>
                              </div>
                            )}
                            {photo.minBooking && (
                              <div className="flex flex-col">
                                <span className="text-xs text-muted-foreground uppercase tracking-wide">Min Booking</span>
                                <span className="text-sm font-medium mt-1">{photo.minBooking}</span>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex-1">
                          <h4 className="font-semibold text-xs uppercase tracking-wide text-muted-foreground mb-2">
                            What's Included
                          </h4>
                          <ul className="space-y-1.5">
                            {inclusions.slice(0, 8).map((inclusion, idx) => (
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
                            Pricing tailored to your needs
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
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
                    Our team is ready to help you choose the perfect photography package for your event.
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

