import { Instagram, Facebook, Mail, Youtube } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const defaultBranding = {
  companyName: "Susie Calvert Photography",
  tagline: "Southern California's premier photo booth experience company. Creating unforgettable memories, one snapshot at a time.",
};

const defaultContact = {
  email: "hello@susiecalvert.com",
  phone: "(123) 456-7890",
};

const defaultSocial = {
  instagram: "#",
  facebook: "#",
  tiktok: "",
  youtube: "",
  pinterest: "",
};

const defaultFooter = {
  description: "Southern California's premier photo booth experience company. Creating unforgettable memories, one snapshot at a time.",
  copyrightText: "All rights reserved.",
  services: [
    { id: "1", label: "Photo Booth", url: "/photo-booth" },
    { id: "2", label: "360° Experience", url: "/photo-booth/360-video-booth" },
    { id: "3", label: "Backdrops", url: "/photo-booth/open-air-booth" },
  ],
  company: [
    { id: "1", label: "About Us", url: "/about" },
    { id: "2", label: "Contact", url: "/contact" },
    { id: "3", label: "FAQ", url: "/faq" },
  ],
};

export const Footer = () => {
  const { content: branding } = useContent<typeof defaultBranding>('branding');
  const { content: social } = useContent<typeof defaultSocial>('social');
  const { content: footer } = useContent<typeof defaultFooter>('footer');
  
  const brandingData = { ...defaultBranding, ...branding };
  const socialData = { ...defaultSocial, ...social };
  const footerData = { ...defaultFooter, ...footer };

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-4 text-primary">
              {brandingData.companyName}
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              {(footerData.description && footerData.description.trim()) || brandingData.tagline}
            </p>
            <div className="flex gap-4">
              {socialData.instagram && (
                <a 
                  href={socialData.instagram} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
              {socialData.facebook && (
                <a 
                  href={socialData.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {socialData.youtube && (
                <a 
                  href={socialData.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
                >
                  <Youtube className="w-5 h-5" />
                </a>
              )}
              {socialData.tiktok && (
                <a 
                  href={socialData.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
                  title="TikTok"
                >
                  <span className="text-sm font-bold">TT</span>
                </a>
              )}
              {socialData.pinterest && (
                <a 
                  href={socialData.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
                  title="Pinterest"
                >
                  <span className="text-sm font-bold">P</span>
                </a>
              )}
              <a 
                href="/contact"
                className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-muted-foreground">
              {(footerData.services && footerData.services.length > 0 ? footerData.services : defaultFooter.services).map((link) => (
                <li key={link.id}>
                  <a href={link.url} className="hover:text-primary transition-smooth">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              {(footerData.company && footerData.company.length > 0 ? footerData.company : defaultFooter.company).map((link) => (
                <li key={link.id}>
                  <a href={link.url} className="hover:text-primary transition-smooth">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} {brandingData.companyName}. {(footerData.copyrightText && footerData.copyrightText.trim()) || 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};
