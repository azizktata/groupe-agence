"use client";

import Image from "next/image";
import { ArrowRight, Users, Plane, Hotel } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    id: 1,
    subtitle: "Nos partenaires",
    title: "Partenaires de confiance",
    description:
      "Nous collaborons avec compagnies aériennes et groupes hôteliers pour garantir les meilleures offres et un voyage sans souci.",
    description2: "Grâce à nos partenaires, trouvez facilement les options idéales pour votre voyage.",
    cta: "Découvrir nos partenaires",
    icon: Users,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: 2,
    subtitle: "Billetterie aérienne",
    title: "Réservations aériennes",
    description:
      "Accédez à un large choix de vols nationaux et internationaux aux meilleurs tarifs du marché.",
    description2: "Comparez tous les vols disponibles et choisissez celui qui vous convient le mieux.",
    cta: "Réserver un vol",
    icon: Plane,
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  },
  {
    id: 3,
    subtitle: "Hébergements sélectionnés",
    title: "Réservations d'hôtels",
    description:
      "Profitez des hôtels 3 et 4 étoiles sélectionnés pour le confort, emplacement et rapport qualité-prix.",
    description2: "Chaque lieu offre le juste équilibre entre qualité, emplacement idéal et prix.",
    cta: "Trouver un hôtel",
    icon: Hotel,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  },
];

function ServiceItem({
  service,
  isReversed,
}: {
  service: (typeof services)[0];
  isReversed: boolean;
}) {
  const Icon = service.icon;

  return (
    <div
      className={`grid lg:grid-cols-2 gap-8 lg:gap-16 items-center ${
        isReversed ? "lg:flex-row-reverse" : ""
      }`}
    >
      {/* Content Side */}
      <div className={`${isReversed ? "lg:order-2" : "lg:order-1"}`}>
        {/* Subtitle with icon */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-lg bg-[var(--brand-primary)]/10 flex items-center justify-center">
            <Icon className="w-5 h-5 text-[var(--brand-primary)]" />
          </div>
          <span className="text-[var(--brand-primary)] text-sm font-semibold uppercase tracking-wider">
            {service.subtitle}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--brand-dark)] mb-4">
          {service.title}
        </h3>

        {/* Description */}
        <div className="mb-8 space-y-2 max-w-[50ch]">

        <p className="text-black/90 font-base text-base leading-relaxed">
          {service.description}
        </p>
        <p className="text-black/90 font-base text-base leading-relaxed">
          {service.description2}
        </p>
        </div>

        {/* CTA Button */}
        <Button variant="primary" rounded="lg">
          {service.cta}
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Image Side */}
      <div className={`relative ${isReversed ? "lg:order-1" : "lg:order-2"}`}>
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Overlay gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-dark)]/20" />
        </div>

        {/* Floating accent card */}
        <div
          className={`absolute ${
            isReversed ? "-right-4 lg:-right-8" : "-left-4 lg:-left-8"
          } -bottom-6 bg-white rounded-2xl p-4 shadow-xl`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center">
              <Icon className="w-6 h-6 text-[var(--brand-primary)]" />
            </div>
            <div>
              <div className="text-sm font-semibold text-[var(--brand-dark)]">
                {service.subtitle}
              </div>
              <div className="text-xs text-gray-500">Service premium</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section
      id="services"
      className="relative py-20 md:py-28 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className=" text-center mb-16 md:mb-24">
          {/* Top Left Dots - 3x4 grid */}
          <div className="absolute left-1 top-0 hidden lg:grid grid-cols-3 gap-2">
            {[...Array(15)].map((_, i) => (
              <div
                key={`tl-${i}`}
                className="w-3 h-3 rounded-full bg-[var(--brand-primary)] opacity-60"
              />
            ))}
          </div>
          {/* Bottom Right Dots - 3x4 grid */}
          <div className="absolute right-1 top-0 hidden lg:grid grid-cols-3 gap-2">
            {[...Array(15)].map((_, i) => (
              <div
                key={`br-${i}`}
                className="w-3 h-3 rounded-full bg-[var(--brand-primary)] opacity-60"
              />
            ))}
          </div>

          {/* Title Content */}
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block text-[var(--brand-primary)] text-sm font-semibold uppercase tracking-wider mb-4">
              Nos Services
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-dark)] mb-4">
              Voyager l&apos;esprit{" "}
              <span className="text-[var(--brand-primary)]">tranquille</span>
            </h2>
            <p className="text-gray-600 text-md sm:text-lg leading-relaxed max-w-2xl mx-auto">
              Une organisation maîtrisée pour des voyages confortables et
              sécurisés.
            </p>
          </div>
        </div>

        {/* Services List - Alternating Layout */}
        <div className="space-y-20 md:space-y-32">
          {services.map((service, index) => (
            <ServiceItem
              key={service.id}
              service={service}
              isReversed={index % 2 !== 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
