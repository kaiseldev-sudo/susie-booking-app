declare module "react-photo-album" {
  import * as React from "react";
  export interface Photo {
    src: string;
    width: number;
    height: number;
    alt?: string;
  }
  export interface MasonryPhotoAlbumProps {
    photos: Photo[];
    spacing?: number;
    columns?: number | ((containerWidth: number) => number);
    renderPhoto?: (props: any) => React.ReactNode;
    className?: string;
  }
  export const MasonryPhotoAlbum: React.FC<MasonryPhotoAlbumProps>;
}

declare module "react-photo-album/masonry.css" {
  const css: string;
  export default css;
}


