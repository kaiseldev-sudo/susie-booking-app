import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Instagram, Facebook, AlertCircle } from "lucide-react";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useContent } from "@/hooks/useContent";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const defaultContactInfo = [
  {
    icon: Phone,
    title: "Phone",
    key: "phone",
    fallback: "+1 228-209-0801",
    description: "Call us anytime",
  },
  {
    icon: Mail,
    title: "Email",
    key: "email",
    fallback: "magicalmemoriespbs@gmail.com",
    description: "Send us an email",
  },
  {
    icon: MapPin,
    title: "Location",
    key: "address",
    fallback: "Colorado Springs, CO",
    description: "Local & beyond",
  },
  {
    icon: Clock,
    title: "Response Time",
    key: "responseTime",
    fallback: "Within 24 Hours",
    description: "We'll get back to you",
  },
] as const;

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const { content: contact } = useContent<{
    email?: string;
    phone?: string;
    address?: string;
    businessHours?: string;
    responseTime?: string;
  }>("contact");

  const { content: social } = useContent<{
    instagram?: string;
    facebook?: string;
    tiktok?: string;
    youtube?: string;
    pinterest?: string;
  }>("social");

  const { content: contactPage } = useContent<{
    hero?: {
      sectionLabel?: string;
      titleLine1?: string;
      titleLine2?: string;
      description?: string;
    };
    info?: {
      bookTitle?: string;
      bookDescription?: string;
      questionsTitle?: string;
      questionsDescription?: string;
      quoteTitle?: string;
      quoteDescription?: string;
    };
    cta?: {
      title?: string;
      subtitle?: string;
    };
  }>("contactPage");

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await fetch(`${API_URL}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      setSubmitSuccess(true);
      form.reset();
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 5000);
    } catch (error) {
      console.error('Error sending message:', error);
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : 'Failed to send message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const hero = contactPage?.hero;
  const info = contactPage?.info;
  const cta = contactPage?.cta;

  const contactInfo = defaultContactInfo.map((item) => {
    const value = (contact as any)?.[item.key] || item.fallback;
    let link: string | undefined;
    if (item.key === "phone") link = `tel:${value}`;
    if (item.key === "email") link = `mailto:${value}`;

    return {
      icon: item.icon,
      title: item.title,
      content: value,
      link,
      description: item.description,
    };
  });

  const instagramUrl = social?.instagram || "https://www.instagram.com";
  const facebookUrl = social?.facebook || "https://www.facebook.com";
  const emailUrl = `mailto:${contact?.email || "magicalmemoriespbs@gmail.com"}`;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <p className="text-secondary font-medium mb-4 tracking-wide uppercase text-sm">
                {hero?.sectionLabel || "Contact Us"}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {hero?.titleLine1 || "Get In"}{" "}
                <span className="text-primary italic">
                  {hero?.titleLine2 || "Touch"}
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {hero?.description ||
                  "Have a question or ready to book your event? We'd love to hear from you. Send us a message and we'll respond as soon as possible."}
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-6xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 mb-12">
                {contactInfo.map((info) => (
                  <Card key={info.title} className="border-0 shadow-sm text-center hover:shadow-md transition-smooth">
                    <CardContent className="pt-6">
                      <info.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{info.title}</h3>
                      {info.link && info.link !== "#" ? (
                        <a 
                          href={info.link}
                          className="text-primary hover:underline mb-1 block"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-foreground mb-1">{info.content}</p>
                      )}
                      <p className="text-sm text-muted-foreground">{info.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Contact Form */}
                <Card className="border-0 shadow-luxury">
                  <CardHeader>
                    <CardTitle className="text-2xl">Send Us a Message</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get back to you within 24 hours.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {submitSuccess && (
                      <div className="mb-6 p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-900 rounded-lg flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-green-900 dark:text-green-100">Message Sent!</p>
                          <p className="text-sm text-green-800 dark:text-green-200">
                            Thank you for contacting us. We'll respond to your message within 24 hours.
                          </p>
                        </div>
                      </div>
                    )}

                    {submitError && (
                      <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-lg flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-red-900 dark:text-red-100">Failed to Send</p>
                          <p className="text-sm text-red-800 dark:text-red-200">
                            {submitError}
                          </p>
                        </div>
                      </div>
                    )}

                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name *</FormLabel>
                              <FormControl>
                                <Input placeholder="Your name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="your.email@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input type="tel" placeholder="(123) 456-7890" {...field} />
                              </FormControl>
                              <FormDescription>
                                Optional - We'll use this to contact you if needed.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="subject"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Subject *</FormLabel>
                              <FormControl>
                                <Input placeholder="What's this about?" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message *</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell us about your event or ask us a question..."
                                  className="min-h-[120px]"
                                  {...field} 
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button 
                          type="submit" 
                          size="lg" 
                          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? (
                            <>
                              <ClipLoader size={16} color="currentColor" className="mr-2" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="mr-2 h-4 w-4" />
                              Send Message
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>

                {/* Additional Information */}
                <div className="space-y-6">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Why Contact Us?</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">
                          {info?.bookTitle || "Book Your Event"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {info?.bookDescription ||
                            "Ready to make your event unforgettable? Contact us to discuss your vision and we'll create a customized package perfect for your celebration."}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          {info?.questionsTitle || "Ask Questions"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {info?.questionsDescription ||
                            "Have questions about our services, pricing, or availability? We're here to help and happy to answer any questions you may have."}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">
                          {info?.quoteTitle || "Request a Quote"}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {info?.quoteDescription ||
                            "Looking for a custom package? Tell us about your event and we'll provide a detailed quote tailored to your needs."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm bg-gradient-to-br from-primary/10 to-primary/5">
                    <CardHeader>
                      <CardTitle>Connect With Us</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Follow us on social media to see our latest work and stay updated with 
                        special offers and event highlights.
                      </p>
                      <div className="flex gap-4">
                        <a 
                          href={instagramUrl}
                          className="w-12 h-12 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
                          aria-label="Instagram"
                        >
                          <Instagram className="w-6 h-6" />
                        </a>
                        <a 
                          href={facebookUrl}
                          target="_blank"
                          className="w-12 h-12 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
                          aria-label="Facebook"
                        >
                          <Facebook className="w-6 h-6" />
                        </a>
                        <a 
                          href={emailUrl}
                          target="_blank"
                          className="w-12 h-12 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
                          aria-label="Email"
                        >
                          <Mail className="w-6 h-6" />
                        </a>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Service Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <p className="text-muted-foreground">
                          {contact?.businessHours ||
                            "Mon-Fri: 9:00 AM - 6:00 PM, Sat-Sun: By Appointment"}
                        </p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-4">
                        Events can be scheduled outside of these hours. Contact us to discuss availability.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="border-0 shadow-luxury bg-gradient-to-br from-primary/10 to-primary/5">
                <CardHeader>
                  <CardTitle className="text-2xl md:text-3xl mb-2">
                    {cta?.title || "Ready to Book Your Event?"}
                  </CardTitle>
                  <CardDescription className="text-base">
                    {cta?.subtitle || "Check availability and reserve your date today"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <a href="/contact">
                        Inquire Now
                      </a>
                    </Button>
                    <Button 
                      size="lg"
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a href="/about">
                        Learn More About Us
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

