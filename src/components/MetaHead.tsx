import { useEffect } from 'react';
import { useContent } from '@/hooks/useContent';

/**
 * MetaHead component that dynamically updates the document head
 * with metadata from the CMS API.
 */
export function MetaHead() {
  const { content: metadata } = useContent('metadata');

  useEffect(() => {
    if (!metadata) return;

    // Update document title
    if (metadata.siteTitle) {
      document.title = metadata.siteTitle;
    }

    // Helper function to update or create meta tags
    const updateMeta = (selector: string, attribute: string, value: string) => {
      if (!value) return;
      
      let element = document.querySelector(selector) as HTMLMetaElement | null;
      
      if (!element) {
        element = document.createElement('meta');
        if (selector.includes('property=')) {
          const property = selector.match(/property="([^"]+)"/)?.[1];
          if (property) element.setAttribute('property', property);
        } else if (selector.includes('name=')) {
          const name = selector.match(/name="([^"]+)"/)?.[1];
          if (name) element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      
      element.setAttribute(attribute, value);
    };

    // Helper function to update link tags
    const updateLink = (rel: string, href: string, type?: string) => {
      if (!href) return;
      
      let element = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
      
      if (!element) {
        element = document.createElement('link');
        element.rel = rel;
        document.head.appendChild(element);
      }
      
      element.href = href;
      if (type) element.type = type;
    };

    // Update meta description
    if (metadata.siteDescription) {
      updateMeta('meta[name="description"]', 'content', metadata.siteDescription);
    }

    // Update author
    if (metadata.author) {
      updateMeta('meta[name="author"]', 'content', metadata.author);
    }

    // Update keywords
    if (metadata.keywords) {
      updateMeta('meta[name="keywords"]', 'content', metadata.keywords);
    }

    // Update Open Graph tags
    if (metadata.ogTitle) {
      updateMeta('meta[property="og:title"]', 'content', metadata.ogTitle);
    }

    if (metadata.ogDescription) {
      updateMeta('meta[property="og:description"]', 'content', metadata.ogDescription);
    }

    if (metadata.ogImage) {
      updateMeta('meta[property="og:image"]', 'content', metadata.ogImage);
    }

    // Update Twitter card
    if (metadata.twitterCard) {
      updateMeta('meta[name="twitter:card"]', 'content', metadata.twitterCard);
    }

    if (metadata.ogImage) {
      updateMeta('meta[name="twitter:image"]', 'content', metadata.ogImage);
    }

    // Update theme color
    if (metadata.themeColor) {
      updateMeta('meta[name="theme-color"]', 'content', metadata.themeColor);
    }

    // Update favicon
    if (metadata.favicon) {
      updateLink('icon', metadata.favicon, 'image/svg+xml');
      updateLink('apple-touch-icon', metadata.favicon);
    }

  }, [metadata]);

  // This component doesn't render anything visible
  return null;
}

export default MetaHead;

