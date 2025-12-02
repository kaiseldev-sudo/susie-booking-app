import { useState, useEffect } from "react";
import { HelpCircle, MessageCircle, Phone, Mail } from "lucide-react";
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
import { useContent } from "@/hooks/useContent";

interface FAQCategory {
  id: string;
  category: string;
  questions: Array<{
    id: string;
    question: string;
    answer: string;
  }>;
}

const defaultFaqs: FAQCategory[] = [
  {
    id: "1",
    category: "Booking & Availability",
    questions: [
      {
        id: "1-1",
        question: "How far in advance should I book?",
        answer: "We recommend booking at least 2-3 months in advance, especially for popular dates like weekends and holidays."
      },
      {
        id: "1-2",
        question: "What is your cancellation policy?",
        answer: "Cancellations made more than 30 days before receive a full refund. 14-30 days before receive 50% refund."
      },
    ]
  },
  {
    id: "2",
    category: "Services & Packages",
    questions: [
      {
        id: "2-1",
        question: "What's included in your photo booth packages?",
        answer: "All packages include unlimited sessions, professional attendant, instant prints, digital gallery access, custom photo templates, fun props, and backdrop options."
      },
    ]
  },
];

const defaultContact = {
  phone: "(123) 456-7890",
  email: "hello@susiecalvert.com",
};

export default function FAQ() {
  const [isLoading, setIsLoading] = useState(true);
  const { content: faqCategories, loading: faqLoading } = useContent<FAQCategory[]>('faqCategories');
  const { content: contact } = useContent<typeof defaultContact>('contact');

  const faqs = faqCategories && faqCategories.length > 0 ? faqCategories : defaultFaqs;
  const contactData = { ...defaultContact, ...contact };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading || faqLoading) {
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
                <div key={category.id || categoryIndex} className="mb-12">
                  <h2 className="font-display text-2xl md:text-3xl font-bold mb-6 text-foreground">
                    {category.category}
                  </h2>
                  <Accordion type="single" collapsible className="space-y-4">
                    {category.questions.map((faq, index) => (
                      <AccordionItem
                        key={faq.id || index}
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
                      <a href={`tel:${contactData.phone?.replace(/[^0-9+]/g, '')}`}>
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
                      <a href={`mailto:${contactData.email}`}>
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
                      <a href="/contact">
                        Inquire Now
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
                      <a href={`tel:${contactData.phone?.replace(/[^0-9+]/g, '')}`}>
                        {contactData.phone}
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
