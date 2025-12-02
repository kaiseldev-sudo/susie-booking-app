import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Square, Camera, Sparkles, Star, Check, ArrowLeft, Calendar, Clock, Users, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PuffLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useContent } from "@/hooks/useContent";
import photoBoothImg from "@/assets/photo-booth.jpg";
import booth360Img from "@/assets/360-booth.jpg";
import backdropsImg from "@/assets/backdrops.jpg";
import heroImageImg from "@/assets/hero-image.jpg";

interface PhotoBoothType {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  badge: string;
  setupTime: string;
  capacity: string;
  printTime: string;
  minBooking: string;
  inclusions: string;
  features: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  "mirror-booth": Square,
  "micro-photo-booth": Camera,
  "360-video-booth": Sparkles,
  "open-air-booth": Star,
};

const imageMap: Record<string, string[]> = {
  "mirror-booth": [photoBoothImg, booth360Img, backdropsImg, heroImageImg],
  "micro-photo-booth": [photoBoothImg, heroImageImg, backdropsImg],
  "360-video-booth": [booth360Img, photoBoothImg, heroImageImg, backdropsImg],
  "open-air-booth": [backdropsImg, photoBoothImg, heroImageImg, booth360Img],
};

export default function BoothDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const { content: photoBooths, loading: boothsLoading } = useContent<PhotoBoothType[]>('photoBooths');

  const booth = photoBooths?.find(b => b.slug === slug);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading || boothsLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <PuffLoader size={60} color="hsl(var(--primary))" />
      </div>
    );
  }

  if (!booth) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Booth Not Found</h1>
            <p className="text-muted-foreground mb-6">The booth you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/photo-booth">View All Booths</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const IconComponent = iconMap[booth.slug] || Camera;
  const galleryImages = imageMap[booth.slug] || [photoBoothImg];
  const inclusions = booth.inclusions ? booth.inclusions.split(',').map(s => s.trim()) : [];
  const features = booth.features ? booth.features.split('|').map(f => {
    const [title, description] = f.split(':').map(s => s.trim());
    return { title, description: description || '' };
  }) : [];

  const highlights = [
    { icon: Clock, label: "Setup Time", value: booth.setupTime || "45 mins" },
    { icon: Users, label: "Capacity", value: booth.capacity || "1-4 guests" },
    { icon: Zap, label: "Print Time", value: booth.printTime || "10 seconds" },
    { icon: Calendar, label: "Min Booking", value: booth.minBooking || "2 hours" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={galleryImages[activeImage]}
              alt={booth.title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/40" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/30" />
          </div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
          </div>

          {/* Content */}
          <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-32 pb-16">
            <div className="max-w-3xl">
              {/* Back Link */}
              <Link 
                to="/photo-booth" 
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>Back to All Booths</span>
              </Link>

              {/* Badge */}
              {booth.badge && (
                <div className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <Sparkles className="w-4 h-4" />
                  {booth.badge}
                </div>
              )}

              {/* Title */}
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground shadow-lg">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold">
                  {booth.title}
                </h1>
              </div>

              {/* Tagline */}
              <p className="text-xl md:text-2xl text-primary font-medium mb-4 italic">
                {booth.tagline}
              </p>

              {/* Description */}
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-2xl">
                {booth.longDescription || booth.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <Link to="/contact">
                    Book This Booth
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="absolute bottom-8 right-8 hidden lg:flex gap-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === idx 
                    ? 'border-primary scale-110 shadow-lg' 
                    : 'border-white/20 hover:border-white/50'
                }`}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="py-12 bg-muted/30 border-y border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {highlights.map((highlight, idx) => (
                <div key={idx} className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                    <highlight.icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold text-foreground">{highlight.value}</p>
                  <p className="text-sm text-muted-foreground">{highlight.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        {features.length > 0 && (
          <section className="py-20">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Why Choose the <span className="text-primary">{booth.title}</span>?
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Discover what makes this booth the perfect choice for your event.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {features.map((feature, idx) => (
                    <Card key={idx} className="border-0 shadow-sm hover:shadow-md transition-shadow bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                            <span className="text-primary font-bold">{idx + 1}</span>
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                            <p className="text-muted-foreground text-sm leading-relaxed">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* What's Included Section */}
        {inclusions.length > 0 && (
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    What's <span className="text-primary">Included</span>
                  </h2>
                  <p className="text-muted-foreground">
                    Everything you need for an unforgettable experience.
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {inclusions.map((inclusion, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 bg-card p-4 rounded-xl shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-foreground">{inclusion}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <Card className="max-w-4xl mx-auto border-0 shadow-luxury bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center relative">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/5 rounded-full blur-3xl" />
                
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground mx-auto mb-6 shadow-lg">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  
                  <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                    Ready to Book the {booth.title}?
                  </h2>
                  <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                    Let's create unforgettable memories at your next event. Contact us today for pricing and availability.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
                      asChild
                    >
                      <Link to="/contact">Get a Quote</Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <Link to="/photo-booth">Explore Other Booths</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
