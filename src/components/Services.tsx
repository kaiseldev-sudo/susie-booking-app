import { Camera, Circle, Image, Palette } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import photoBoothImg from "@/assets/photo-booth.jpg";
import booth360Img from "@/assets/360-booth.jpg";
import backdropsImg from "@/assets/backdrops.jpg";

const services = [
  {
    title: "Photo Booth",
    description: "Classic photo booth fun with modern technology. High-quality prints, digital sharing, and unlimited sessions for your guests.",
    icon: Camera,
    image: photoBoothImg,
  },
  {
    title: "360° Experience",
    description: "The ultimate party centerpiece. Capture stunning slow-motion videos from every angle with our state-of-the-art 360° booth.",
    icon: Circle,
    image: booth360Img,
  },
  {
    title: "Custom Backdrops",
    description: "Transform your event with our curated collection of elegant backdrops. From florals to modern designs, we have the perfect setting.",
    icon: Image,
    image: backdropsImg,
  },
];

export const Services = () => {
  return (
    <section id="photo-booth" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Our <span className="text-primary italic">Signature</span> Services
          </h2>
          <p className="text-lg text-muted-foreground">
            From intimate gatherings to grand celebrations, we bring the perfect blend of 
            elegance and entertainment to every event.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={service.title}
              className="group overflow-hidden border-0 shadow-luxury hover:shadow-soft transition-smooth bg-card cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <div className="w-12 h-12 bg-primary/90 rounded-full flex items-center justify-center text-primary-foreground">
                    <service.icon className="w-6 h-6" />
                  </div>
                </div>
              </div>
              
              <CardContent className="p-6">
                <h3 className="font-display text-2xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
