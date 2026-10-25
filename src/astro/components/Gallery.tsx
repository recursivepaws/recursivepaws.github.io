import { useEffect, useState } from "react";
import type { Gallery as SanityGallery } from "../utils/sanity";
import { GalleryItem } from "./GalleryItem";
import { Card, CardContent } from "./ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

export function Gallery({ gallery }: { gallery: SanityGallery }) {
  const [api, setApi] = useState<CarouselApi>();

  // Size the track to the current slide, not the tallest one.
  useEffect(() => {
    if (!api) return;
    const fit = () => {
      const slide = api.slideNodes()[api.selectedScrollSnap()];
      api.containerNode().style.height = `${slide.offsetHeight}px`;
    };
    // slides change height as their images load
    const observer = new ResizeObserver(fit);
    for (const slide of api.slideNodes()) observer.observe(slide);
    api.on("select", fit).on("reInit", fit);
    fit();
    return () => {
      observer.disconnect();
      api.off("select", fit).off("reInit", fit);
    };
  }, [api]);

  if (gallery.length === 1) return <GalleryItem item={gallery[0]} />;

  return (
    <Carousel className="w-full max-w-m" setApi={setApi}>
      <CarouselContent>
        {gallery.map((item, index) => (
          <CarouselItem key={String(index)}>
            <div className="p-1">
              <Card style={{ position: "relative" }} className="w-full">
                <CardContent>
                  <GalleryItem key={String(index)} item={item} />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
