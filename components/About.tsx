"use client";

import Image from "next/image";
import { Hotel, Globe, Shield, TicketsPlane, HandHeart } from "lucide-react";
import { useTranslations } from "next-intl";

// Icons and colors stay in code; the copy comes from the message catalog.
const SERVICE_STYLES = [
  { icon: TicketsPlane, color: "#8ECBDB" },
  { icon: Hotel, color: "#42A8C3" },
  { icon: HandHeart, color: "#006380" },
];

export function About() {
  const t = useTranslations("about");
  const services = SERVICE_STYLES.map((style, i) => ({
    ...style,
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
  }));

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

      <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6 xl:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Side - Content */}
          <div>
            <span className="text-[var(--brand-primary)] text-sm font-black  tracking-wider">
              {t("eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-[var(--brand-dark)] mt-3 mb-6">
              {t("title")}
            </h2>
            <p className="text-gray-600 text-md sm:text-lg max-w-lg leading-relaxed mb-10">
              {t("description")}
            </p>

            {/* Services List */}
            <div className="space-y-6">
              {services.map((service, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: service.color }}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--brand-dark)] mb-1">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm max-w-xs">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Layered Images */}
          <div className="relative flex items-center justify-center">
            {/* Circle Background */}
            <div className="relative w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[500px] lg:h-[500px]">
              <Image
                src="/circle-bg.png"
                alt="Background circle"
                fill
                className="object-contain animate-spin-slow"
              />

              {/* Circle Image - Centered */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-[200px] h-[200px] md:w-[260px] md:h-[260px] lg:w-[300px] lg:h-[300px]">
                  <Image
                    src="/circle-img.png"
                    alt="Travel image"
                    fill
                    className="object-contain rounded-full"
                  />
                </div>
              </div>

              {/* Airplane Clipart - Floating on top */}
              <div className="absolute inset-0  w-[250px] h-[250px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] animate-float">
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
                    <div className="text-sm font-bold text-[var(--brand-dark)]">
                      {t("badgeCountriesValue")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("badgeCountriesLabel")}
                    </div>
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
                    <div className="text-sm font-bold text-[var(--brand-dark)]">
                      {t("badgeIataValue")}
                    </div>
                    <div className="text-xs text-gray-500">
                      {t("badgeIataLabel")}
                    </div>
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
