import { useState, useEffect } from 'react';

// In development, Vite proxy handles /api requests
// In production, use the full API URL from environment variable
const API_BASE = import.meta.env.PROD 
  ? (import.meta.env.VITE_API_URL || '') 
  : '';

interface ContentData {
  metadata?: {
    siteTitle: string;
    siteDescription: string;
    author: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    twitterCard: string;
    favicon: string;
    themeColor: string;
  };
  branding?: {
    siteName: string;
    companyName: string;
    tagline: string;
    logoUrl: string;
  };
  hero?: {
    tagline: string;
    titleLine1: string;
    titleLine2: string;
    titleLine3: string;
    description: string;
    ctaText: string;
    rating: string;
    reviewCount: string;
  };
  about?: {
    sectionLabel: string;
    title: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  stats?: Array<{
    id: string;
    icon: string;
    label: string;
    value: string;
  }>;
  services?: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    featured: boolean;
  }> | {
    header?: {
      titlePart1?: string;
      titlePart2?: string;
      titlePart3?: string;
      description?: string;
    };
    items?: Array<{
      id: string;
      name: string;
      description: string;
      price: string;
      featured: boolean;
    }>;
  };
  photoBooths?: Array<{
    id: string;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    longDescription: string;
    badge: string;
    setupTime: string;
    capacity: string;
    printTime: string;
    minBooking: string;
    inclusions: string;
    features: string;
  }>;
  photography?: Array<{
    id: string;
    slug: string;
    title: string;
    tagline: string;
    description: string;
    longDescription: string;
    badge: string;
    duration: string;
    deliveryTime: string;
    minBooking: string;
    inclusions: string;
    features: string;
  }> | {
    header?: {
      sectionLabel?: string;
      titlePart1?: string;
      titlePart2?: string;
      titlePart3?: string;
      description?: string;
    };
    items?: Array<{
      id: string;
      slug: string;
      title: string;
      tagline: string;
      description: string;
      longDescription: string;
      badge: string;
      duration: string;
      deliveryTime: string;
      minBooking: string;
      inclusions: string;
      features: string;
    }>;
  };
  cta?: {
    titlePart1?: string;
    titlePart2?: string;
    titlePart3?: string;
    title?: string; // Backward compatibility
    description: string;
    primaryButtonText: string;
    secondaryButtonText: string;
  };
  testimonials?: Array<{
    id: string;
    name: string;
    event: string;
    text: string;
    rating: number;
  }> | {
    header?: {
      titlePart1?: string;
      titlePart2?: string;
      titlePart3?: string;
      description?: string;
    };
    items?: Array<{
      id: string;
      name: string;
      event: string;
      text: string;
      rating: number;
    }>;
  };
  faqCategories?: Array<{
    id: string;
    category: string;
    questions: Array<{
      id: string;
      question: string;
      answer: string;
    }>;
  }>;
  footer?: {
    description?: string;
    copyrightText?: string;
    services?: Array<{
      id: string;
      label: string;
      url: string;
    }>;
    company?: Array<{
      id: string;
      label: string;
      url: string;
    }>;
  };
  contact?: {
    email: string;
    phone: string;
    address: string;
    businessHours: string;
  };
  social?: {
    instagram: string;
    facebook: string;
    tiktok: string;
    youtube: string;
    pinterest: string;
  };
}

async function fetchContent(): Promise<ContentData> {
  try {
    const response = await fetch(`${API_BASE}/api/content`, {
      cache: 'no-store', // Always fetch fresh content
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (err) {
    console.error('Failed to fetch content from API:', err);
    return {};
  }
}

export function useContent<T = ContentData>(section?: keyof ContentData): {
  content: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
} {
  const [content, setContent] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContent = async () => {
    setLoading(true);
    try {
      const data = await fetchContent();
      if (section) {
        let sectionData = data[section];
        
        // Handle services section: extract items array if it's the new format
        if (section === 'services' && sectionData && typeof sectionData === 'object' && !Array.isArray(sectionData)) {
          const servicesData = sectionData as { header?: any; items?: any[] };
          sectionData = servicesData.items || [];
        }
        
        // Handle testimonials section: extract items array if it's the new format
        if (section === 'testimonials' && sectionData && typeof sectionData === 'object' && !Array.isArray(sectionData)) {
          const testimonialsData = sectionData as { header?: any; items?: any[] };
          sectionData = testimonialsData.items || [];
        }
        
        // Handle photography section: extract items array if it's the new format
        if (section === 'photography' && sectionData && typeof sectionData === 'object' && !Array.isArray(sectionData)) {
          const photographyData = sectionData as { header?: any; items?: any[] };
          sectionData = photographyData.items || [];
        }
        
        setContent((sectionData as T) || null);
      } else {
        setContent(data as T);
      }
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load content');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContent();
  }, [section]);

  return { content, loading, error, refetch: loadContent };
}

export function useAllContent() {
  return useContent<ContentData>();
}

export type { ContentData };
