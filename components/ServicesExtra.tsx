"use client";

import { CreditCard, ShieldCheck, FileText, Car } from "lucide-react";

const extraServices = [
  {
    icon: CreditCard,
    title: "Transactions sécurisées",
    description:
      "Cartes, mobile money ou espèces. Payez comme vous le souhaitez en toute sécurité.",
  },
  {
    icon: ShieldCheck,
    title: "Assurance voyage",
    description:
      "En collaboration avec un partenaire d'assurance de confiance, profitez d’une protection adaptée à vos besoins.",
  },
  {
    icon: FileText,
    title: "Visas & documents",
    description:
      "Accédez à une assistance dédiée pour toutes les démarches de visa, simplifiant ainsi la préparation de votre voyage.",
  },
  {
    icon: Car,
    title: "Location de voitures",
    description:
      "Louez le véhicule adapté à votre séjour, avec ou sans chauffeur, disponible à l’aéroport ou en ville.",
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof extraServices)[0];
  index: number;
}) {
  const Icon = service.icon;

  return (
    <div id="services-extra" className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--brand-primary)]/0 to-[var(--brand-accent)]/0 group-hover:from-[var(--brand-primary)]/10 group-hover:to-[var(--brand-accent)]/10 transition-all duration-500" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon with number badge */}
        <div className="flex items-start justify-between mb-6">
          <div className="w-14 h-14 bg-[var(--brand-primary)]/20 rounded-2xl backdrop-blur-sm flex items-center justify-center group-hover:bg-[var(--brand-primary)]/30 group-hover:scale-110 transition-all duration-500">
            <Icon className="w-7 h-7 text-[var(--brand-primary)]" />
          </div>
          <span className="text-5xl font-bold text-white/10 group-hover:text-white/20 transition-colors duration-500">
            0{index + 1}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-3">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 leading-relaxed text-sm">
          {service.description}
        </p>

        {/* Arrow indicator */}
        {/* <div className="mt-6 flex items-center gap-2 text-[var(--brand-accent)] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 group-hover:translate-x-2">
          <span className="text-sm font-medium">En savoir plus</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div> */}
      </div>
    </div>
  );
}

export function ServicesExtra() {
  // The solid bg below is a fallback: Tailwind emits `in oklab` gradients, which
  // older iOS Safari (< 16.4) drops entirely, leaving white text on white.
  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--brand-dark)]">
      {/* Gradient background - matching Trust section */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-dark)] via-[var(--brand-teal)] to-[var(--brand-dark)]" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="extra-services-grid" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#extra-services-grid)" />
        </svg>
      </div>

      {/* Decorative blurs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--brand-primary)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--brand-accent)]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* <span className="inline-block text-[var(--brand-primary)] text-sm font-semibold uppercase tracking-wider mb-4">
            Nos meilleurs services
          </span> */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
           Nos meilleurs {' '}
            <span className="text-[var(--brand-primary)]">services</span>
          </h2>
          <p className="text-white/70 text-md sm:text-lg max-w-lg mx-auto">
            Des solutions additionnelles pour simplifier chaque aspect de votre voyage.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {extraServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
