"use client";

import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const destinationsRow1 = [
  {
    name: "Marrakech",
    country: "Maroc",
    price: "À partir de 149€",
    image: "https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=600&q=80",
  },
  {
    name: "Dubaï",
    country: "Émirats Arabes Unis",
    price: "À partir de 399€",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&q=80",
  },
  {
    name: "Abidjan",
    country: "Côte d'Ivoire",
    price: "À partir de 299€",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=600&q=80",
  },
  {
    name: "Le Caire",
    country: "Égypte",
    price: "À partir de 249€",
    image: "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?w=600&q=80",
  },
  {
    name: "Doha",
    country: "Qatar",
    price: "À partir de 349€",
    image: "https://image2url.com/r2/default/images/1770220542875-1022e9f8-f6dd-4402-9d28-718bed9a49dc.jpg",
  },
  {
    name: "Casablanca",
    country: "Maroc",
    price: "À partir de 129€",
    image: "https://images.unsplash.com/photo-1569383746724-6f1b882b8f46?w=600&q=80",
  },
];

function DestinationCard({
  destination,
}: {
  destination: (typeof destinationsRow1)[0];
}) {
  return (
    <div id="destinations" className="group relative h-[380px] rounded-3xl overflow-hidden cursor-pointer">
      {/* Background Image */}
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)]/90 via-[var(--brand-dark)]/30 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[var(--brand-primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Location badge */}
        <div className="flex items-center gap-2 text-white/80 mb-2">
          <MapPin className="w-4 h-4 text-[var(--brand-primary)]" />
          <span className="text-sm">{destination.country}</span>
        </div>

        {/* Name */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
          {destination.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <p className="text-[var(--brand-accent)] font-semibold">
            {destination.price}
          </p>

          {/* Arrow indicator */}
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300">
            <ArrowRight className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Top corner accent */}
      {/* <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[var(--brand-primary)]/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <MapPin className="w-5 h-5 text-white" />
      </div> */}
    </div>
  );
}

export function Destinations() {
  return (
    <section className="py-20 md:py-28 bg-gray-50 overflow-hidden">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6 mb-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-[var(--brand-primary)] text-sm font-semibold uppercase tracking-wider mb-4">
              <MapPin className="w-4 h-4" />
              Destinations populaires
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-dark)]">
              Inspirez-vous de nos{" "}
              <span className="text-[var(--brand-primary)]">destinations</span>
            </h2>
          </div>
          {/* <Button variant="primary" rounded="lg" className="w-fit">
            Toutes les destinations
            <ArrowRight className="w-5 h-5" />
          </Button> */}
        </div>
      </div>

      {/* Carousel Row 1 - Auto scrolls */}
      <div className="relative mb-8 px-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 3000,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {destinationsRow1.map((destination, index) => (
              <CarouselItem
                key={`row1-${index}`}
                className="pl-4 basis-[85%] sm:basis-[45%] md:basis-[35%] lg:basis-[28%] xl:basis-[22%] 2xl:basis-[18%]"
              >
                <DestinationCard destination={destination} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex left-2 bg-white/90 hover:bg-white border-none shadow-lg" />
          <CarouselNext className="hidden sm:flex right-2 bg-white/90 hover:bg-white border-none shadow-lg" />
        </Carousel>
      </div>

      {/* Carousel Row 2 - Auto scrolls in reverse */}
      {/* <div className="relative px-6">
        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: "rtl",
          }}
          plugins={[
            Autoplay({
              delay: 3500,
              stopOnInteraction: false,
              stopOnMouseEnter: true,
            }),
          ]}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {destinationsRow2.map((destination, index) => (
              <CarouselItem
                key={`row2-${index}`}
                className="pl-4 basis-[85%] sm:basis-[45%] md:basis-[35%] lg:basis-[28%] xl:basis-[22%]"
              >
                <DestinationCard destination={destination} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 bg-white/90 hover:bg-white border-none shadow-lg" />
          <CarouselNext className="right-2 bg-white/90 hover:bg-white border-none shadow-lg" />
        </Carousel>
      </div> */}
    </section>
  );
}
