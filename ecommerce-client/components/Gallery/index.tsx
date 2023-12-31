"use client";

import { ImageType } from "@/types";
import { Tab } from "@headlessui/react";
import React from "react";
import GalleryTab from "@/components/Gallery/GalleryTab";
import Image from "next/image";

interface GalleryProps {
  images: ImageType[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <Tab.Group as={"div"} className={"flex flex-col-reverse"}>
      <div className="mt-6 w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className={"grid grid-cols-4 gap-6"}>
          {images.map((image) => (
            <GalleryTab key={image.id} image={image} />
          ))}
        </Tab.List>
      </div>
      <Tab.Panels className={"aspect-square w-full"}>
        {images.map((image) => (
          <Tab.Panel key={image.id}>
            <div className="aspect-square relative h-full w-full sm:rounded-lg overflow-hidden">
              <Image
                fill
                src={image.url}
                alt="product image"
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Gallery;
