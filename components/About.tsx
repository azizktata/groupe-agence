"use client";

import Image from "next/image";
import { Plane, Hotel, Headphones, Globe, Shield } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Billetterie aérienne internationale",
    description: "Comparez tous les vols au même endroit et gagnez du temps.",
  },
  {
    icon: Hotel,
    title: "Réservations hôtelières 3 & 4 étoiles",
    description: "Des séjours confortables au meilleur rapport qualité-prix.",
  },
  {
    icon: Headphones,
    title: "Assistance voyage personnalisée",
    description: "Un accompagnement sur mesure à chaque étape.",
  },
];

export function About() {
  return (
    <section id="about" className="sm:pt-16 pb-26 overflow-hidden relative">
      {/* SVG Pattern Background - Curved wind lines */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Top right - accent color curves */}
        <svg
          className="absolute top-20 right-0 w-80 h-80 text-[var(--brand-accent)]/15"
          viewBox="0 0 200 200"
          fill="none"
        >
          <path
            d="M200 0C200 110.457 110.457 200 0 200"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M200 40C200 128.366 128.366 200 40 200"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path
            d="M200 80C200 146.274 146.274 200 80 200"
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
       
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div>
            <span className="text-[var(--brand-primary)] text-sm font-black  tracking-wider">
              Votre voyage commence ici
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-dark)] mt-3 mb-6">
              Groupe L&apos;Agence
            </h2>
            <p className="text-gray-600 text-md sm:text-lg max-w-lg leading-relaxed mb-10">
              Groupe L&apos;Agence vous accompagne avec des solutions complètes
              en tourisme et billetterie, réunissant billets, hôtels et services
              essentiels pour des voyages sereins.
            </p>

            {/* Services List */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--brand-dark)] mb-1">
                      {service.title}
                    </h3>
                    <p className="text-gray-500 text-sm max-w-xs">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Layered Images */}
          <div className="relative flex items-center justify-center">
            {/* Circle Background */}
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px]">
              <Image
                src="/circle-bg.png"
                alt="Background circle"
                fill
                className="object-contain animate-spin-slow"
              />

              {/* Circle Image - Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px]">
                  <Image
                    src="/circle-img.png"
                    alt="Travel image"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
              </div>

              {/* Airplane Clipart - Floating on top */}
              <div className="absolute inset-0  w-[250px] h-[250px] md:w-[450px] md:h-[450px] animate-float">
                <Image
                  src="/airplane-clipart.png"
                  alt="Airplane"
                  fill
                  className="object-contain"
                />
              </div>

              {/* Floating Badge 1 - Top Right */}
              <div className="absolute -top-2 -right-4 md:top-4 md:-right-8 bg-white rounded-2xl px-4 py-3 shadow-xl animate-float z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-primary)]/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--brand-dark)]">120+</div>
                    <div className="text-xs text-gray-500">Pays couverts</div>
                  </div>
                </div>
              </div>

              {/* Floating Badge 2 - Bottom Left */}
              <div className="absolute -bottom-2 -left-4 md:bottom-8 md:-left-8 bg-white rounded-2xl px-4 py-3 shadow-xl animate-float-delayed z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-accent)]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[var(--brand-accent)]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--brand-dark)]">Certifié IATA</div>
                    <div className="text-xs text-gray-500">Agence agréée</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
