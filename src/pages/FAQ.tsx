import { useState, useEffect } from "react";
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PuffLoader } from "react-spinners";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    category: "Booking & Availability",
    questions: [
      {
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 2-3 months in advance, especially for popular dates like weekends and holidays. However, we always try to accommodate last-minute requests when possible, so don't hesitate to reach out!"
      },
      {
        question: "What is your cancellation policy?",
        answer: "We understand that plans can change. Cancellations made more than 30 days before your event date receive a full refund minus a small processing fee. Cancellations made 14-30 days before receive a 50% refund. Cancellations made less than 14 days before are non-refundable, but we'll work with you to reschedule if possible."
      },
      {
        question: "Can I change my booking date?",
        answer: "Yes! Date changes are subject to availability. If your new date is available, we'll happily accommodate the change. Changes made more than 30 days in advance are free, while changes made closer to the event may incur a small rescheduling fee."
      },
    ]
  },
  {
    category: "Services & Packages",
    questions: [
      {
        question: "What's included in your photo booth packages?",
        answer: "All our packages include unlimited sessions, professional attendant, instant prints, digital gallery access, custom photo templates, fun props, and backdrop options. We also offer add-ons like guest books, custom backdrops, and extended hours."
      },
      {
        question: "What's the difference between the Photo Booth and 360° Experience?",
        answer: "The Photo Booth is our classic setup perfect for traditional photos with props and backdrops. The 360° Experience creates stunning slow-motion videos as guests rotate on a platform, making for a unique and memorable addition to any event. Both include instant prints and digital access."
      },
      {
        question: "Can we customize the photo prints?",
        answer: "Yes! We offer completely custom photo templates designed to match your event theme, colors, and branding. You can include logos, event details, hashtags, and more. We'll work with you to create the perfect design."
      },
      {
        question: "What props do you provide?",
        answer: "We bring a wide variety of fun props including hats, glasses, signs, boas, and seasonal items. You can also request specific props or bring your own. We're happy to work with your theme!"
      },
    ]
  },
  {
    category: "Setup & Requirements",
    questions: [
      {
        question: "Do you provide an attendant?",
        answer: "Absolutely! Every booking includes a professional, friendly attendant who will set up, operate the booth, assist guests, and ensure everything runs smoothly throughout your event."
      },
      {
        question: "How much space do you need?",
        answer: "Our standard photo booth requires approximately 8x8 feet. The 360 booth needs about 10x10 feet. We're flexible and can work with various space configurations—just let us know your venue details!"
      },
      {
        question: "What are your power requirements?",
        answer: "We need one standard 120V electrical outlet within 20 feet of the setup area. We bring extension cords and power strips, but let us know if your venue has any special requirements."
      },
      {
        question: "Do you need internet access?",
        answer: "Internet access is not required for the photo booth to operate, but it's helpful for instant photo sharing and social media uploads. We can operate fully offline if needed."
      },
    ]
  },
  {
    category: "Delivery & Photos",
    questions: [
      {
        question: "How do guests receive their photos?",
        answer: "Guests receive instant physical prints on-site. Additionally, all photos are uploaded to a private online gallery that's accessible within 24-48 hours. Guests can download, share on social media, or order additional prints."
      },
      {
        question: "How long will the online gallery be available?",
        answer: "Your online gallery remains active for 90 days after your event. During this time, guests can view, download, and share all photos. After 90 days, we can provide a download link or extend access for a small fee."
      },
      {
        question: "Can I get all the photos on a USB drive?",
        answer: "Yes! We can provide all photos on a custom USB drive (included in some packages or available as an add-on). This is perfect for keeping a physical backup of all your event memories."
      },
    ]
  },
  {
    category: "Service Area & Pricing",
    questions: [
      {
        question: "What is your service area?",
        answer: "We proudly serve all of Southern California, including Los Angeles, Orange County, San Diego, Riverside, and San Bernardino counties. Travel fees may apply for locations outside our primary service area."
      },
      {
        question: "Do you charge for travel?",
        answer: "Travel within our primary service area (Los Angeles, Orange County, and San Diego counties) is included. Travel fees may apply for events in outlying areas, but we'll always discuss this upfront and include it in your quote."
      },
      {
        question: "How does pricing work?",
        answer: "Pricing is based on several factors including package selection, event duration, date, and location. We offer transparent, upfront pricing with no hidden fees. Contact us for a personalized quote based on your specific event needs."
      },
      {
        question: "Do you offer packages for multiple events?",
        answer: "Yes! We offer special pricing for clients booking multiple events or recurring bookings. Contact us to discuss multi-event packages and discounts."
      },
    ]
  },
  {
    category: "Technical & Support",
    questions: [
      {
        question: "What happens if there's a technical issue?",
        answer: "We always bring backup equipment to every event, and our experienced attendants are trained to handle any technical situations quickly. Your event will never be interrupted—we guarantee it!"
      },
      {
        question: "What equipment do you use?",
        answer: "We use professional-grade Canon cameras, studio-quality lighting, and industry-leading photo booth software. All equipment is regularly maintained and updated to ensure the best possible results."
      },
      {
        question: "Can you accommodate outdoor events?",
        answer: "Yes! We can set up outdoors as long as we have adequate protection from direct sunlight and weather. We bring canopies and can work with your venue to ensure the best setup location."
      },
    ]
  },
];

export default function FAQ() {
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
                Frequently Asked Questions
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Got <span className="text-primary italic">Questions?</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We've got answers! Find everything you need to know about our services, 
                booking process, and more. Can't find what you're looking for? 
                Feel free to reach out to us directly.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {faqs.map((category, categoryIndex) => (
                <div key={categoryIndex} className="mb-12">
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={index}
                        value={`item-${categoryIndex}-${index}`}
                        className="bg-card border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-smooth"
                      >
                        <AccordionTrigger className="text-left font-sans font-semibold text-lg hover:text-primary py-6">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              ))}

              {/* Still Have Questions CTA */}
              <Card className="border-0 shadow-luxury bg-gradient-to-br from-primary/10 to-primary/5 mt-12">
                <CardHeader className="text-center">
                  <div className="flex justify-center mb-4">
                    <HelpCircle className="h-12 w-12 text-primary" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl mb-2">
                    Still Have Questions?
                  </CardTitle>
                  <CardDescription className="text-base">
                    Can't find the answer you're looking for? We're here to help!
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-muted-foreground mb-6">
                    Our team is always happy to answer any questions about our services, 
                    availability, or how we can make your event unforgettable.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <a href="/contact">
                        <MessageCircle className="mr-2 h-4 w-4" />
                        Contact Us
                      </a>
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a href="tel:+1234567890">
                        <Phone className="mr-2 h-4 w-4" />
                        Call Us
                      </a>
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a href="mailto:hello@susiecalvert.com">
                        <Mail className="mr-2 h-4 w-4" />
                        Email Us
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Help Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
                  Need More <span className="text-primary italic">Help?</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Explore our other resources or get in touch with our team.
                </p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-0 shadow-sm hover:shadow-md transition-smooth">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <HelpCircle className="h-6 w-6 text-primary" />
                      <CardTitle>Quick Booking</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Check availability and book your date online in just a few clicks.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/check-availability">
                        Check Availability
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-smooth">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <MessageCircle className="h-6 w-6 text-primary" />
                      <CardTitle>Contact Us</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Send us a message with any questions or special requests.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/contact">
                        Get in Touch
                      </a>
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm hover:shadow-md transition-smooth">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <Phone className="h-6 w-6 text-primary" />
                      <CardTitle>Call Directly</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Speak with our team directly for immediate assistance.
                    </p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="tel:+1234567890">
                        (123) 456-7890
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

