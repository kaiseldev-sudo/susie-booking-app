import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How far in advance should I book?",
    answer: "We recommend booking at least 2-3 months in advance, especially for popular dates like weekends and holidays. However, we always try to accommodate last-minute requests when possible, so don't hesitate to reach out!"
  },
  {
    question: "What's included in your photo booth packages?",
    answer: "All our packages include unlimited sessions, professional attendant, instant prints, digital gallery access, custom photo templates, fun props, and backdrop options. We also offer add-ons like guest books, custom backdrops, and extended hours."
  },
  {
    question: "Do you provide an attendant?",
    answer: "Absolutely! Every booking includes a professional, friendly attendant who will set up, operate the booth, assist guests, and ensure everything runs smoothly throughout your event."
  },
  {
    question: "What is your service area?",
    answer: "We proudly serve all of Southern California, including Los Angeles, Orange County, San Diego, Riverside, and San Bernardino counties. Travel fees may apply for locations outside our primary service area."
  },
  {
    question: "How much space do you need?",
    answer: "Our standard photo booth requires approximately 8x8 feet. The 360 booth needs about 10x10 feet. We're flexible and can work with various space configurations—just let us know your venue details!"
  },
  {
    question: "Can we customize the photo prints?",
    answer: "Yes! We offer completely custom photo templates designed to match your event theme, colors, and branding. You can include logos, event details, hashtags, and more. We'll work with you to create the perfect design."
  },
  {
    question: "How do guests receive their photos?",
    answer: "Guests receive instant physical prints on-site. Additionally, all photos are uploaded to a private online gallery that's accessible within 24-48 hours. Guests can download, share on social media, or order additional prints."
  },
  {
    question: "What happens if there's a technical issue?",
    answer: "We always bring backup equipment to every event, and our experienced attendants are trained to handle any technical situations quickly. Your event will never be interrupted—we guarantee it!"
  }
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Frequently Asked <span className="text-primary italic">Questions</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Got questions? We've got answers. If you don't see what you're looking for, 
              feel free to reach out to us directly.
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border rounded-lg px-6 shadow-soft hover:shadow-luxury transition-smooth"
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

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/faq" 
                className="text-primary font-semibold hover:underline transition-smooth"
              >
                View All FAQs →
              </Link>
              <span className="text-muted-foreground hidden sm:inline">|</span>
              <Link 
                to="/contact" 
                className="text-primary font-semibold hover:underline transition-smooth"
              >
                Contact us directly →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
