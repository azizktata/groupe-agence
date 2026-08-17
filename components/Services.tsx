"use client";

import Image from "next/image";
import { ArrowRight, Users, Plane, Hotel, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Icons, images and hrefs stay in code; the copy comes from the message catalog.
const SERVICE_META = [
  {
    id: 1,
    icon: Users,
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80",
  },
  {
    id: 2,
    href: "/vols",
    icon: Plane,
    image:
      "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80",
  },
  {
    id: 3,
    href: "/hotels",
    icon: Hotel,
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
  },
  {
    id: 4,
    href: "/voitures",
    icon: Car,
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&q=80",
  },
];

export type UiService = {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  description2: string;
  href?: string;
  cta: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
};

function ServiceItem({
  service,
  isReversed,
}: {
  service: UiService;
  isReversed: boolean;
}) {
  const t = useTranslations("services");
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
        <Link href={service.href || "#"}>
          <Button variant="primary" rounded="lg">
            {service.cta}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
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
              <div className="text-xs text-gray-500">{t("premiumBadge")}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  const t = useTranslations("services");
  const services: UiService[] = SERVICE_META.map((meta, i) => ({
    ...meta,
    subtitle: t(`items.${i}.subtitle`),
    title: t(`items.${i}.title`),
    description: t(`items.${i}.description`),
    description2: t(`items.${i}.description2`),
    cta: t(`items.${i}.cta`),
  }));

  return (
    <section
      id="services"
      className="relative py-20 md:py-28 bg-gray-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6">
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
              {t("eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-dark)] mb-4 tracking-wide">
              {t("heading")}{" "}
              <span className="text-[var(--brand-primary)]">
                {t("headingAccent")}
              </span>
            </h2>
            <p className="text-gray-600 text-md sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {t("description")}
            </p>
          </div>
        </div>

        {/* SVG Background Patterns - Airplanes & Trajectories */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Flight path curve - left side */}
          <svg
            className="absolute left-0 top-1/4 w-64 h-64 text-[var(--brand-primary)] opacity-20"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M10 180 Q 60 100, 120 120 T 190 40"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="8 4"
              fill="none"
            />
            <circle cx="190" cy="40" r="4" fill="currentColor" />
          </svg>

          {/* Airplane silhouette - right side */}
          <svg
            className="absolute right-10 top-1/3 w-20 h-20 text-[var(--brand-primary)] opacity-15 rotate-45"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>

          {/* Dotted trajectory - center */}
          <svg
            className="absolute left-1/4 top-1/2 w-96 h-48 text-[var(--brand-primary)] opacity-20 hidden lg:block"
            viewBox="0 0 400 200"
            fill="none"
          >
            <path
              d="M0 150 Q 100 50, 200 100 T 400 50"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="4 6"
              fill="none"
            />
          </svg>

          {/* Small airplane - bottom left */}
          <svg
            className="absolute left-20 bottom-1/4 w-12 h-12 text-[var(--brand-primary)] opacity-20 -rotate-12"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
          </svg>

          {/* Arc trajectory - right bottom */}
          <svg
            className="absolute right-0 bottom-1/3 w-72 h-72 text-[var(--brand-primary)] opacity-30"
            viewBox="0 0 200 200"
            fill="none"
          >
            <path
              d="M200 180 Q 140 80, 60 100 T 10 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="6 4"
              fill="none"
            />
            <circle cx="10" cy="20" r="3" fill="currentColor" />
            <circle cx="200" cy="180" r="3" fill="currentColor" />
          </svg>

          {/* Globe grid pattern - center background */}
          {/* <svg
            className="absolute left-1/2 top-2/3 -translate-x-1/2 w-[600px] h-[600px] text-[var(--brand-primary)] opacity-5 hidden md:block"
            viewBox="0 0 400 400"
            fill="none"
          >
            <ellipse cx="200" cy="200" rx="150" ry="150" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="150" ry="75" stroke="currentColor" strokeWidth="1" />
            <ellipse cx="200" cy="200" rx="75" ry="150" stroke="currentColor" strokeWidth="1" />
            <line x1="50" y1="200" x2="350" y2="200" stroke="currentColor" strokeWidth="1" />
            <line x1="200" y1="50" x2="200" y2="350" stroke="currentColor" strokeWidth="1" />
          </svg> */}

          {/* Small trajectory dots */}
          {/* <svg
            className="absolute right-1/4 top-1/4 w-32 h-32 text-[var(--brand-primary)] opacity-30 hidden lg:block"
            viewBox="0 0 100 100"
            fill="currentColor"
          >
            <circle cx="10" cy="80" r="2" />
            <circle cx="25" cy="60" r="2" />
            <circle cx="45" cy="45" r="2" />
            <circle cx="70" cy="35" r="2" />
            <circle cx="90" cy="20" r="2" />
          </svg> */}
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
