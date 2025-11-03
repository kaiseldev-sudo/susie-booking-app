import { Heart, Award, Users, Sparkles, Camera, Target, Star, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { icon: Heart, label: "Events Celebrated", value: "1,000+" },
  { icon: Award, label: "Five-Star Reviews", value: "373" },
  { icon: Users, label: "Happy Clients", value: "500+" },
  { icon: Sparkles, label: "Years Experience", value: "5+" },
];

const values = [
  {
    icon: Camera,
    title: "Creative Excellence",
    description: "We bring artistic vision and technical expertise to every event, ensuring your photos are as beautiful as the moments they capture.",
  },
  {
    icon: Heart,
    title: "Passion for Perfection",
    description: "Every detail matters to us. We're committed to making your event unforgettable with exceptional service and attention to detail.",
  },
  {
    icon: Target,
    title: "Client-Focused",
    description: "Your vision is our mission. We work closely with you to understand your needs and bring your unique event to life.",
  },
  {
    icon: Star,
    title: "Unmatched Quality",
    description: "From state-of-the-art equipment to elegant backdrops, we use only the finest materials and latest technology in the industry.",
  },
];

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
                About Us
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Creating <span className="text-primary italic">Unforgettable</span> Moments
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                At Susie Calvert Photography, we believe every event deserves to be extraordinary. 
                What started as a passion for capturing joy has grown into Southern California's 
                premier photo booth experience company.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-card">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                  <Card
                    key={stat.label}
                    className="border-0 shadow-sm text-center hover:shadow-md transition-smooth"
                  >
                    <CardContent className="pt-6">
                      <stat.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                      <div className="font-display text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="space-y-6 text-muted-foreground leading-relaxed">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                  Our Story
                </h2>
                <p>
                  Susie Calvert Photography was born from a simple belief: every celebration deserves 
                  to be captured beautifully. What began as a personal passion for photography and 
                  event planning has evolved into one of Southern California's most trusted photo 
                  booth experience companies.
                </p>
                <p>
                  Over the past five years, we've had the incredible privilege of being part of 
                  over 1,000 special moments—from intimate backyard weddings to grand corporate 
                  galas, from sweet sixteen celebrations to milestone anniversary parties. Each 
                  event has taught us something new, and each client has become part of our story.
                </p>
                <p>
                  Today, we're proud to offer cutting-edge technology, elegant design options, 
                  and personalized service that has earned us hundreds of five-star reviews and 
                  a reputation for excellence throughout the region.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Our <span className="text-primary italic">Mission</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  To transform your celebrations into unforgettable experiences, one snapshot at a time.
                </p>
              </div>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Our mission is simple yet profound: to transform your celebrations into unforgettable 
                  experiences. We understand that events are more than just dates on a calendar—they're 
                  milestones, memories, and moments that matter.
                </p>
                <p>
                  With state-of-the-art equipment, elegant design options, and personalized service, 
                  we ensure every moment is picture-perfect. But beyond the technology and aesthetics, 
                  we're committed to making the entire process seamless and stress-free for you.
                </p>
                <p>
                  From the initial consultation to the final delivery, we're here to support you every 
                  step of the way, because when you choose Susie Calvert Photography, you're not just 
                  getting a photo booth—you're gaining a partner in making your event truly magical.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Our <span className="text-primary italic">Values</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  The principles that guide everything we do.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                {values.map((value, index) => (
                  <Card key={value.title} className="border-0 shadow-sm hover:shadow-md transition-smooth">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <value.icon className="h-6 w-6 text-primary" />
                        <CardTitle>{value.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Area Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-sm">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <MapPin className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Our Service Area</CardTitle>
                  <CardDescription className="text-base">
                    Serving all of Southern California
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground mb-6">
                    We proudly serve Southern California including:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-background rounded-lg">
                      <h3 className="font-semibold mb-2">Los Angeles</h3>
                      <p className="text-sm text-muted-foreground">City & County</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <h3 className="font-semibold mb-2">Orange County</h3>
                      <p className="text-sm text-muted-foreground">All Areas</p>
                    </div>
                    <div className="p-4 bg-background rounded-lg">
                      <h3 className="font-semibold mb-2">San Diego</h3>
                      <p className="text-sm text-muted-foreground">County Wide</p>
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground mt-6">
                    Don't see your area? <a href="/contact" className="text-primary hover:underline">Contact us</a> to discuss service availability.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="border-0 shadow-luxury bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl mb-2">
                    Ready to Make Your Event Unforgettable?
                  </CardTitle>
                  <CardDescription className="text-base">
                    Let's discuss how we can bring your vision to life
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">
                    Whether you're planning a wedding, corporate event, or special celebration, 
                    we're here to help create an experience your guests will remember forever.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <Link to="/check-availability">
                        Check Availability
                      </Link>
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    >
                      Contact Us
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

