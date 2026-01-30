"use client";

import Image from "next/image";
import { Plane, Hotel, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTAFinal() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Dark gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-dark)] via-[#012a36] to-[var(--brand-dark)]" />

      {/* Globe/World Map SVG Background */}
      <div className="absolute inset-0 opacity-[0.08]">
        <svg
          className="w-full h-full"
          viewBox="0 0 800 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          {/* Main globe circle */}
          <circle
            cx="600"
            cy="300"
            r="250"
            stroke="white"
            strokeWidth="1"
            fill="none"
          />

          {/* Latitude lines */}
          <ellipse
            cx="600"
            cy="300"
            rx="250"
            ry="80"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <ellipse
            cx="600"
            cy="300"
            rx="250"
            ry="160"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <ellipse
            cx="600"
            cy="220"
            rx="200"
            ry="60"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <ellipse
            cx="600"
            cy="380"
            rx="200"
            ry="60"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />

          {/* Longitude lines */}
          <ellipse
            cx="600"
            cy="300"
            rx="80"
            ry="250"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <ellipse
            cx="600"
            cy="300"
            rx="160"
            ry="250"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
          />
          <line
            x1="350"
            y1="300"
            x2="850"
            y2="300"
            stroke="white"
            strokeWidth="0.5"
          />
          <line
            x1="600"
            y1="50"
            x2="600"
            y2="550"
            stroke="white"
            strokeWidth="0.5"
          />

          {/* Flight paths */}
          <path
            d="M100 450 Q300 200 500 250"
            stroke="var(--brand-primary)"
            strokeWidth="2"
            strokeDasharray="8 4"
            fill="none"
            opacity="0.6"
          />
          <path
            d="M150 350 Q350 150 550 200"
            stroke="var(--brand-accent)"
            strokeWidth="1.5"
            strokeDasharray="6 3"
            fill="none"
            opacity="0.5"
          />
          <path
            d="M50 500 Q250 300 450 350"
            stroke="white"
            strokeWidth="1"
            strokeDasharray="4 4"
            fill="none"
            opacity="0.3"
          />

          {/* Destination dots */}
          <circle cx="100" cy="450" r="4" fill="var(--brand-primary)" />
          <circle cx="500" cy="250" r="4" fill="var(--brand-primary)" />
          <circle cx="150" cy="350" r="3" fill="var(--brand-accent)" />
          <circle cx="550" cy="200" r="3" fill="var(--brand-accent)" />
          <circle cx="700" cy="280" r="3" fill="white" opacity="0.6" />
          <circle cx="650" cy="350" r="2" fill="white" opacity="0.4" />
          <circle cx="500" cy="320" r="2" fill="white" opacity="0.4" />

          {/* Small airplane icons */}
          <g transform="translate(300, 230) rotate(-20) scale(1.5)">
            <path d="M0 4 L10 4 L10 5 L0 5 Z" fill="var(--brand-primary)" />
            <path d="M2 0 L4 0 L5 4 L1 4 Z" fill="var(--brand-primary)" />
            <path d="M2 5 L4 5 L4 8 L2 8 Z" fill="var(--brand-primary)" />
            <path d="M8 3 L10 2 L10 7 L8 6 Z" fill="var(--brand-primary)" />
          </g>

          <g transform="translate(400, 300) rotate(15) scale(1.2)">
            <path d="M0 4 L10 4 L10 5 L0 5 Z" fill="var(--brand-accent)" />
            <path d="M2 0 L4 0 L5 4 L1 4 Z" fill="var(--brand-accent)" />
            <path d="M2 5 L4 5 L4 8 L2 8 Z" fill="var(--brand-accent)" />
            <path d="M8 3 L10 2 L10 7 L8 6 Z" fill="var(--brand-accent)" />
          </g>

          {/* Additional decorative circles */}
          <circle
            cx="200"
            cy="150"
            r="30"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
          <circle
            cx="750"
            cy="450"
            r="40"
            stroke="white"
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
          />
        </svg>
      </div>

      {/* Decorative blurs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-primary)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[var(--brand-accent)]/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Content */}
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Prêt à organiser votre{" "}
              <span className="text-[var(--brand-accent)]">
                prochain voyage
              </span>{" "}
              ?
            </h2>

            <p className="text-white/70 text-md sm:text-lg leading-relaxed mb-8 max-w-lg">
              Billets, hôtels et services complémentaires réunis pour que vous
              profitiez pleinement de chaque étape.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button variant="primary" size="lg" rounded="lg">
                <Plane className="w-5 h-5" />
                Réservez votre voyage
              </Button>
              <Button variant="outline" size="lg" rounded="lg">
                <Hotel className="w-5 h-5" />
                Trouvez votre hôtel
              </Button>
            </div>

            {/* Trust indicators */}
            {/* <div className="mt-10 flex flex-wrap items-center gap-6 text-white/60 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span>Paiement sécurisé</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span>Support 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400" />
                <span>Meilleurs prix garantis</span>
              </div>
            </div> */}
          </div>

          {/* Right Side - Tickets Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Glow effect behind image */}
              <div className="absolute inset-0 bg-[var(--brand-primary)]/20 rounded-3xl blur-3xl transform scale-90" />

              {/* Main image container */}
              <div className="relative rounded-3xl overflow-hidden ">
                <Image
                  src="/tickets.png"
                  alt="Billets d'avion"
                  width={500}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>

              {/* Floating badge - top right */}
              {/* <div className="absolute -top-4 -right-4 bg-[var(--brand-accent)] text-[var(--brand-dark)] px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                -20% cette semaine
              </div> */}

              {/* Floating badge - bottom left */}
              {/* <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center">
                    <Plane className="w-5 h-5 text-[var(--brand-primary)]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[var(--brand-dark)]">
                      560 000+
                    </div>
                    <div className="text-xs text-gray-500">Vols disponibles</div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
