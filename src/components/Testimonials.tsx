import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Johnson",
    event: "Wedding Reception",
    rating: 5,
    text: "Absolutely incredible! The photo booth was the highlight of our wedding. Our guests couldn't stop raving about it, and the photos turned out stunning. Worth every penny!",
  },
  {
    name: "Michael Chen",
    event: "Corporate Event",
    rating: 5,
    text: "Professional, punctual, and perfect. The 360 booth was a massive hit at our company gala. The team made setup and breakdown seamless. Highly recommend!",
  },
  {
    name: "Emily Rodriguez",
    event: "Birthday Celebration",
    rating: 5,
    text: "The custom backdrop was absolutely gorgeous! It matched our theme perfectly and created the most beautiful photos. Can't wait to book again for our next event.",
  },
];

export const Testimonials = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            What Our <span className="text-primary italic">Clients</span> Say
          </h2>
          <p className="text-lg text-muted-foreground">
            Don't just take our word for it—hear from the hosts and guests who've 
            experienced the magic firsthand.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.name}
              className="border-0 shadow-luxury hover:shadow-soft transition-smooth"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div className="border-t border-border pt-4">
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.event}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
