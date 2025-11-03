declare module "lightgallery/react" {
  import * as React from "react";
  interface LightGalleryProps {
    plugins?: any[];
    speed?: number;
    elementClassNames?: string;
    children?: React.ReactNode;
  }
  const LightGallery: React.FC<LightGalleryProps>;
  export default LightGallery;
}

declare module "lightgallery/plugins/zoom" {
  const plugin: any;
  export default plugin;
}

declare module "lightgallery/plugins/thumbnail" {
  const plugin: any;
  export default plugin;
}

declare module "lightgallery/css/lightgallery.css" {
  const css: string;
  export default css;
}

declare module "lightgallery/css/lg-zoom.css" {
  const css: string;
  export default css;
}

declare module "lightgallery/css/lg-thumbnail.css" {
  const css: string;
  export default css;
}


