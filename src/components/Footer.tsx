import { Instagram, Facebook, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-4 text-primary">
              Susie Calvert Photography
            </h3>
            <p className="text-muted-foreground mb-4 max-w-md">
              Southern California's premier photo booth experience company. 
              Creating unforgettable memories, one snapshot at a time.
            </p>
            <div className="flex gap-4">
              <a 
                href="#" 
                className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-muted hover:bg-primary rounded-full flex items-center justify-center transition-smooth hover:text-primary-foreground"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href="#" 
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
              <li><a href="/photo-booth" className="hover:text-primary transition-smooth">Photo Booth</a></li>
              <li><a href="#360" className="hover:text-primary transition-smooth">360° Experience</a></li>
              <li><a href="#backdrops" className="hover:text-primary transition-smooth">Backdrops</a></li>
              <li><a href="/gallery" className="hover:text-primary transition-smooth">Gallery</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-smooth">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-smooth">Contact</Link></li>
              <li><Link to="/faq" className="hover:text-primary transition-smooth">FAQ</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} Susie Calvert Photography. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
