"use client";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const airlines = [
  { src: "/airlines (1).png", alt: "Air France" },
  { src: "/airlines (2).png", alt: "Emirates" },
  { src: "/airlines (3).png", alt: "Turkish Airlines" },
  { src: "/airlines (4).png", alt: "Qatar Airways" },
];

export function AirlinesCarousel() {
  const allAirlines = [...airlines, ...airlines, ...airlines, ...airlines];

  return (
    <section className="py-4 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto">
        {/* Gradient Masks for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-48 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <Carousel
          opts={{
            align: "start",
            loop: true,
            dragFree: true,
            skipSnaps: true,
          }}
          plugins={[
            Autoplay({
              delay: 1500,
              stopOnInteraction: false,
              stopOnMouseEnter: false,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-8">
            {allAirlines.map((airline, index) => (
              <CarouselItem
                key={index}
                className="pl-8 basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="flex items-center justify-center py-4">
                  <Image
                    src={airline.src}
                    alt={airline.alt}
                    width={200}
                    height={100}
                    className="h-20 md:h-24 lg:h-28 w-auto object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
