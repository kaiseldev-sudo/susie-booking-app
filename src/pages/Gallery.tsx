import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image as ImageIcon, Grid3x3, FolderOpen, Calendar } from "lucide-react";
import { PuffLoader } from "react-spinners";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import photoBoothImg from "@/assets/photo-booth.jpg";
import booth360Img from "@/assets/360-booth.jpg";
import backdropsImg from "@/assets/backdrops.jpg";
import heroImageImg from "@/assets/hero-image.jpg";

// Sample gallery images for bento grid with creative layouts - 6 photos
const galleryImages = [
  { 
    id: 1, 
    src: photoBoothImg, 
    title: "Mirror Booth", 
    category: "Wedding", 
    span: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-2",
    featured: true,
    size: "large-tall"
  },
  { 
    id: 2, 
    src: booth360Img, 
    title: "360 Experience", 
    category: "Corporate", 
    span: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 row-span-2",
    featured: true,
    size: "tall"
  },
  { 
    id: 3, 
    src: backdropsImg, 
    title: "Custom Backdrops", 
    category: "Birthday", 
    span: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    featured: true,
    size: "small"
  },
  { 
    id: 6, 
    src: booth360Img, 
    title: "Celebration Events", 
    category: "Event", 
    span: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 row-span-2",
    featured: true,
    size: "tall"
  },
  { 
    id: 4, 
    src: heroImageImg, 
    title: "Open Air Booth", 
    category: "Event", 
    span: "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-2 row-span-1",
    featured: true,
    size: "wide"
  },
  { 
    id: 5, 
    src: photoBoothImg, 
    title: "Special Moments", 
    category: "Wedding", 
    span: "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-1 row-span-1",
    featured: true,
    size: "small"
  },
];

// Albums data
const albums = [
  {
    id: 1,
    title: "Wedding Collections",
    description: "Beautiful moments from elegant wedding celebrations",
    imageCount: 145,
    coverImage: photoBoothImg,
    date: "2024",
    category: "Wedding",
  },
  {
    id: 2,
    title: "Corporate Events",
    description: "Professional photo booths for business gatherings",
    imageCount: 89,
    coverImage: booth360Img,
    date: "2024",
    category: "Corporate",
  },
  {
    id: 3,
    title: "Birthday Parties",
    description: "Fun and festive birthday celebrations",
    imageCount: 112,
    coverImage: backdropsImg,
    date: "2024",
    category: "Birthday",
  },
  {
    id: 4,
    title: "Special Events",
    description: "Unique moments from various celebrations",
    imageCount: 203,
    coverImage: heroImageImg,
    date: "2024",
    category: "Event",
  },
  {
    id: 5,
    title: "360 Video Booth",
    description: "Stunning slow-motion video captures",
    imageCount: 67,
    coverImage: booth360Img,
    date: "2024",
    category: "Video",
  },
  {
    id: 6,
    title: "Holiday Celebrations",
    description: "Festive photos from holiday events",
    imageCount: 98,
    coverImage: photoBoothImg,
    date: "2024",
    category: "Holiday",
  },
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["All", "Wedding", "Corporate", "Birthday", "Event", "Video", "Holiday"];

  const filteredAlbums = selectedCategory === "All" 
    ? albums 
    : albums.filter(album => album.category === selectedCategory);

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
                Our Gallery
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Captured <span className="text-primary italic">Moments</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explore our collection of beautiful moments captured at events, weddings, 
                corporate gatherings, and special celebrations. Each photo tells a unique story.
              </p>
            </div>
          </div>
        </section>

        {/* Bento Grid Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <Grid3x3 className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-3xl font-bold">Featured Gallery</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[minmax(200px,auto)]">
                {galleryImages.map((image, index) => {
                  // Dynamic heights based on size type
                  const heightMap: Record<string, string> = {
                    'small': 'h-[200px]',
                    'tall': 'h-[420px] md:h-[420px]',
                    'wide': 'h-[200px]',
                    'medium-wide': 'h-[200px]',
                    'large-tall': 'h-[420px] md:h-[420px]',
                  };
                  
                  const heightClass = heightMap[image.size] || 'h-[200px]';
                  const isFeatured = image.featured;
                  
                  // Staggered animation delay for creative entrance
                  const animationDelay = `${index * 50}ms`;
                  
                  // Creative border radius variations
                  const radiusVariations = [
                    'rounded-none',
                    'rounded-lg',
                    'rounded-xl',
                    'rounded-2xl',
                    'rounded-3xl',
                  ];
                  const borderRadius = radiusVariations[index % radiusVariations.length];
                  
                  // Alternate border styles for visual interest
                  const hasBorder = index % 3 === 0;
                  const borderStyle = hasBorder ? 'ring-2 ring-primary/20 group-hover:ring-primary/40' : '';
                  
                  return (
                    <Card
                      key={image.id}
                      className={`${image.span} ${heightClass} ${borderRadius} ${borderStyle} border-0 shadow-luxury hover:shadow-soft transition-all duration-500 overflow-hidden group relative animate-fade-in hover:z-10`}
                      style={{ animationDelay }}
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={image.src}
                          alt={image.title}
                          className={`w-full h-full object-cover transition-all duration-700 ${
                            isFeatured 
                              ? 'group-hover:scale-105 group-hover:brightness-110' 
                              : 'group-hover:scale-110'
                          }`}
                        />
                        
                        {/* Creative gradient overlays */}
                        <div className={`absolute inset-0 transition-opacity duration-500 ${
                          isFeatured 
                            ? 'bg-gradient-to-br from-primary/20 via-transparent to-black/60' 
                            : 'bg-gradient-to-t from-black/80 via-black/40 to-transparent'
                        } opacity-0 group-hover:opacity-100`} />
                        
                        {/* Decorative accent for featured items */}
                        {isFeatured && (
                          <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute bottom-4 left-4 w-12 h-0.5 bg-primary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        )}
                        
                        {/* Title overlay - always visible on featured, hidden on others */}
                        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-300 ${
                          isFeatured 
                            ? 'opacity-100 translate-y-0' 
                            : 'opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0'
                        }`}>
                          <div className="flex items-end justify-between gap-2">
                            <div>
                              <p className={`font-semibold mb-1 text-white ${
                                isFeatured ? 'text-base' : 'text-sm'
                              }`}>
                                {image.title}
                              </p>
                              <p className="text-white/80 text-xs uppercase tracking-wider">
                                {image.category}
                              </p>
                            </div>
                            {isFeatured && (
                              <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                                Featured
                              </div>
                            )}
                          </div>
                        </div>
                        
                        {/* Subtle shine effect on hover */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        </div>
                        
                        {/* Removed decorative corner accent to avoid arrow-like hover effect */}
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Albums Section */}
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <FolderOpen className="w-6 h-6 text-primary" />
                  <h2 className="font-display text-3xl font-bold">Photo Albums</h2>
                </div>
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                        : "border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                    } transition-smooth`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Albums Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAlbums.map((album) => (
                  <Card
                    key={album.id}
                    className="border-0 shadow-luxury hover:shadow-soft transition-smooth overflow-hidden group cursor-pointer flex flex-col"
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={album.coverImage}
                        alt={album.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-smooth duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        <div className="bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" />
                          {album.imageCount}
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="font-display text-xl font-bold text-white mb-1">
                          {album.title}
                        </h3>
                        <div className="flex items-center gap-3 text-white/80 text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {album.date}
                          </div>
                          <span>•</span>
                          <span>{album.category}</span>
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-4 flex-1 flex flex-col">
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {album.description}
                      </p>
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-auto"
                        asChild
                      >
                        <a href={`/gallery/album/${album.id}`}>
                          View Album
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredAlbums.length === 0 && (
                <div className="text-center py-12">
                  <FolderOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-muted-foreground">
                    No albums found in this category.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-soft">
                <CardContent className="p-8 text-center">
                  <h3 className="font-display text-2xl font-bold mb-4">
                    Ready to Create Your Own Gallery?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Book our photo booth services for your next event and create unforgettable memories.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                      asChild
                    >
                      <a href="/contact">Inquire Now</a>
                    </Button>
                    <Button
                      variant="outline"
                      className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      asChild
                    >
                      <a href="/contact">Contact Us</a>
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

