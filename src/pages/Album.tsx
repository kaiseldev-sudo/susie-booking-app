import { useMemo, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { PuffLoader } from "react-spinners";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import LightGallery from "lightgallery/react";
import lgZoom from "lightgallery/plugins/zoom";
import lgThumbnail from "lightgallery/plugins/thumbnail";
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Calendar, Image as ImageIcon, ArrowLeft, Share2, Download } from "lucide-react";
import photoBoothImg from "@/assets/photo-booth.jpg";
import booth360Img from "@/assets/360-booth.jpg";
import backdropsImg from "@/assets/backdrops.jpg";
import heroImageImg from "@/assets/hero-image.jpg";

type AlbumRecord = {
  id: number;
  title: string;
  description: string;
  imageCount: number;
  coverImage: string;
  date: string;
  category: string;
};

const allAlbums: AlbumRecord[] = [
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

export default function Album() {
  const params = useParams();
  const albumId = Number(params.id);
  const [isLoading, setIsLoading] = useState(true);

  const album = useMemo(() => allAlbums.find(a => a.id === albumId), [albumId]);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Simple placeholder image set; in real app, fetch album items by id
  const photos = useMemo(() => {
    const base = [photoBoothImg, booth360Img, backdropsImg, heroImageImg];
    const sizes = [
      { width: 1200, height: 1600 },
      { width: 1600, height: 1200 },
      { width: 1200, height: 900 },
      { width: 1200, height: 1500 },
      { width: 1400, height: 933 },
      { width: 1200, height: 800 },
    ];
    const count = 18;
    return Array.from({ length: count }).map((_, i) => {
      const img = base[i % base.length];
      const size = sizes[i % sizes.length];
      return {
        src: img,
        width: size.width,
        height: size.height,
        alt: `${album?.title || "Album"} #${i + 1}`,
      };
    });
  }, [album]);

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
        <section className="bg-gradient-to-b from-background to-muted/30">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <a href="/">Home</a>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <a href="/gallery">Gallery</a>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{album?.title || "Album"}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>

              <div className="relative overflow-hidden rounded-2xl border-0 shadow-soft">
                <div className="absolute inset-0">
                  <img
                    src={album?.coverImage || heroImageImg}
                    alt={album?.title || "Album cover"}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                </div>
                <div className="relative p-6 md:p-10">
                  <div className="flex flex-wrap items-end gap-4 justify-between">
                    <div className="text-white">
                      <p className="text-primary/90 font-semibold uppercase tracking-wider text-xs mb-2">
                        {album?.category}
                      </p>
                      <h1 className="font-display text-3xl md:text-5xl font-bold mb-3">
                        {album?.title || "Album"}
                      </h1>
                      <p className="max-w-2xl text-white/80">
                        {album?.description || "A curated selection of memorable moments."}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 mt-4 text-white/90 text-sm">
                        <span className="inline-flex items-center gap-2"><ImageIcon className="w-4 h-4" /> {album?.imageCount ?? photos.length} photos</span>
                        <span className="inline-flex items-center gap-2"><Calendar className="w-4 h-4" /> {album?.date || "2024"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <LightGallery
                plugins={[lgZoom, lgThumbnail]}
                speed={500}
                elementClassNames="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
              >
                {photos.map((photo, idx) => (
                  <a
                    key={idx}
                    href={photo.src}
                    data-lg-size={`${photo.width}-${photo.height}`}
                    data-sub-html={`<p>${photo.alt}</p>`}
                    className="group block rounded-lg overflow-hidden border-0 shadow-luxury hover:shadow-soft transition-all duration-500"
                  >
                    <div className="relative w-full h-full">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <CardContent className="p-3 bg-black/40 backdrop-blur-sm rounded-md text-white">
                          <div className="flex items-center justify-between text-xs">
                            <span>{photo.alt}</span>
                            <span className="inline-flex items-center gap-1"><ImageIcon className="w-3 h-3" /> HD</span>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </a>
                ))}
              </LightGallery>

              <div className="mt-10 flex justify-center">
                <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  <a href="/check-availability">Book us for your event</a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}


