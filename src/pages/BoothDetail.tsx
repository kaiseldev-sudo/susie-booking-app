import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Square, Camera, Sparkles, Star, Check, ArrowLeft, Calendar, Clock, Users, Zap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PuffLoader } from "react-spinners";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import photoBoothImg from "@/assets/photo-booth.jpg";
import booth360Img from "@/assets/360-booth.jpg";
import backdropsImg from "@/assets/backdrops.jpg";
import heroImageImg from "@/assets/hero-image.jpg";

// Booth data with extended details
const boothData: Record<string, {
  icon: typeof Square;
  title: string;
  slug: string;
  tagline: string;
  description: string;
  longDescription: string;
  image: string;
  galleryImages: string[];
  badge?: string;
  inclusions: string[];
  highlights: { icon: typeof Clock; label: string; value: string }[];
  features: { title: string; description: string }[];
}> = {
  "mirror-booth": {
    icon: Square,
    title: "Mirror Booth",
    slug: "mirror-booth",
    tagline: "The Ultimate Interactive Photo Experience",
    description: "Sleek, modern, and interactive full-length mirror experience.",
    longDescription: "Step into the spotlight with our stunning Mirror Booth – a full-length, interactive mirror that brings Hollywood glamour to your event. Guests are greeted with customizable animations, touch-screen prompts, and flattering lighting that makes everyone look their best. Perfect for weddings, corporate events, and milestone celebrations.",
    image: photoBoothImg,
    galleryImages: [photoBoothImg, booth360Img, backdropsImg, heroImageImg],
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
    highlights: [
      { icon: Clock, label: "Setup Time", value: "45 mins" },
      { icon: Users, label: "Capacity", value: "1-4 guests" },
      { icon: Zap, label: "Print Time", value: "10 seconds" },
      { icon: Calendar, label: "Min Booking", value: "2 hours" },
    ],
    features: [
      { title: "Interactive Touch Screen", description: "Engage guests with fun animations, signing capabilities, and emoji stamps before capturing the perfect shot." },
      { title: "Professional Lighting", description: "Built-in ring lights and adjustable settings ensure everyone looks flawless in every photo." },
      { title: "Instant Prints", description: "High-quality 4x6 or 2x6 strip prints ready in seconds, with unlimited reprints available." },
      { title: "Digital Sharing", description: "Guests can instantly share photos via email, text, or social media with custom overlays." },
    ],
  },
  "micro-photo-booth": {
    icon: Camera,
    title: "Micro Photo Booth",
    slug: "micro-photo-booth",
    tagline: "Compact Elegance, Maximum Fun",
    description: "Compact, stylish, and ideal for smaller spaces.",
    longDescription: "Don't let space constraints limit your fun! Our Micro Photo Booth delivers the full photo booth experience in a sleek, compact design. Perfect for intimate venues, cocktail hours, or as an addition to larger events. Small footprint, big memories.",
    image: photoBoothImg,
    galleryImages: [photoBoothImg, heroImageImg, backdropsImg],
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
    highlights: [
      { icon: Clock, label: "Setup Time", value: "30 mins" },
      { icon: Users, label: "Capacity", value: "1-3 guests" },
      { icon: Zap, label: "Print Time", value: "8 seconds" },
      { icon: Calendar, label: "Min Booking", value: "2 hours" },
    ],
    features: [
      { title: "Space-Saving Design", description: "Fits perfectly in tight spaces while still delivering a premium photo booth experience." },
      { title: "High-Resolution Camera", description: "Professional DSLR quality captures every detail with crystal clarity." },
      { title: "Custom Backdrops", description: "Choose from our curated selection or request a custom backdrop for your theme." },
      { title: "Quick Turnaround", description: "Fast printing and instant digital delivery keeps the party moving." },
    ],
  },
  "360-video-booth": {
    icon: Sparkles,
    title: "360 Video Booth",
    slug: "360-video-booth",
    tagline: "Capture Every Angle in Stunning Motion",
    description: "Capture stunning slow-motion videos with a full 360 spin and customizable music of your choice.",
    longDescription: "Be the star of your own music video with our 360 Video Booth! Step onto the platform as our camera orbits around you, capturing stunning slow-motion footage from every angle. Add your favorite music, custom overlays, and special effects for shareable content that will make your event unforgettable.",
    image: booth360Img,
    galleryImages: [booth360Img, photoBoothImg, heroImageImg, backdropsImg],
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
    highlights: [
      { icon: Clock, label: "Setup Time", value: "60 mins" },
      { icon: Users, label: "Capacity", value: "1-4 guests" },
      { icon: Zap, label: "Video Ready", value: "30 seconds" },
      { icon: Calendar, label: "Min Booking", value: "3 hours" },
    ],
    features: [
      { title: "360° Rotating Camera", description: "Our motorized arm captures smooth, cinematic footage as it orbits around you." },
      { title: "Slow Motion Magic", description: "Dramatic slow-motion effects at 120fps make every movement look incredible." },
      { title: "Custom Music", description: "Choose from our library or bring your own track for the perfect soundtrack." },
      { title: "Instant Sharing", description: "Rendered videos delivered to guests' phones within seconds via QR code." },
    ],
  },
  "open-air-booth": {
    icon: Star,
    title: "Open-Air Booth",
    slug: "open-air-booth",
    tagline: "Unlimited Space, Unlimited Creativity",
    description: "Perfect for group shots with customizable backdrops.",
    longDescription: "Go big with our Open-Air Booth! Without the constraints of an enclosed space, this setup allows for larger groups, creative poses, and stunning backdrop options. Perfect for events where you want maximum flexibility and the ability to capture everyone from the dance floor to the red carpet.",
    image: backdropsImg,
    galleryImages: [backdropsImg, photoBoothImg, heroImageImg, booth360Img],
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
    highlights: [
      { icon: Clock, label: "Setup Time", value: "45 mins" },
      { icon: Users, label: "Capacity", value: "1-10+ guests" },
      { icon: Zap, label: "Print Time", value: "10 seconds" },
      { icon: Calendar, label: "Min Booking", value: "2 hours" },
    ],
    features: [
      { title: "Flexible Layout", description: "No walls means no limits – accommodate large groups and creative arrangements." },
      { title: "Backdrop Variety", description: "From sequin walls to custom printed designs, choose the perfect background." },
      { title: "Professional Lighting", description: "Studio-quality lighting rigs ensure perfect exposure for every shot." },
      { title: "Social Integration", description: "Direct posting to Instagram, Facebook, and TikTok with custom event hashtags." },
    ],
  },
};

export default function BoothDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  const booth = slug ? boothData[slug] : null;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (isLoading) {
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

  const IconComponent = booth.icon;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          {/* Background Image with Overlay */}
          <div className="absolute inset-0">
            <img
              src={booth.galleryImages[activeImage]}
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
                {booth.longDescription}
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
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-primary/50 hover:border-primary hover:bg-primary/10"
                  asChild
                >
                  <Link to="/gallery">
                    View Gallery
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Image Thumbnails */}
          <div className="absolute bottom-8 right-8 hidden lg:flex gap-2">
            {booth.galleryImages.map((img, idx) => (
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
              {booth.highlights.map((highlight, idx) => (
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
                {booth.features.map((feature, idx) => (
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

        {/* What's Included Section */}
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
                {booth.inclusions.map((inclusion, idx) => (
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

