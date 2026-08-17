"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Car,
  Users,
  MapPin,
  ShieldCheck,
  Headphones,
  CalendarCheck,
  Phone,
  X,
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useTranslations, useFormatter } from "next-intl";
import { CarSearchForm, CarSearchFilters } from "@/components/CarSearchForm";
import { VehicleCard } from "@/components/VehicleCard";
import { MOCK_VEHICLES, UiVehicle } from "@/mocks/car/vehicles";

// Only vehicleType can actually narrow the mock data — location and dates have
// no counterpart on UiVehicle, so they are echoed back to the user instead.
function applyVehicleFilters(
  vehicles: UiVehicle[],
  filters: CarSearchFilters
): UiVehicle[] {
  return vehicles.filter(
    (v) => !filters.vehicleType || v.type === filters.vehicleType
  );
}

const HIGHLIGHT_ICONS = [Car, Users, MapPin];

const ADVANTAGE_ICONS = [ShieldCheck, Headphones, CalendarCheck];

const CATEGORY_IMAGES = [
  "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&q=80",
  "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=800&q=80",
  "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=800&q=80",
  "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=800&q=80",
];

type UiFeature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

type UiCategory = { name: string; description: string; image: string };

function HighlightCard({ item }: { item: UiFeature }) {
  const Icon = item.icon;

  return (
    <div className="group bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-[var(--brand-primary)]/30 transition-all duration-500 hover:-translate-y-2">
      <div className="w-14 h-14 rounded-2xl bg-[var(--brand-primary)]/10 flex items-center justify-center mb-6 group-hover:bg-[var(--brand-primary)]/20 group-hover:scale-110 transition-all duration-500">
        <Icon className="w-7 h-7 text-[var(--brand-primary)]" />
      </div>
      <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-3">
        {item.title}
      </h3>
      <p className="text-gray-600 leading-relaxed text-sm">
        {item.description}
      </p>
    </div>
  );
}

function AdvantageCard({ item }: { item: UiFeature }) {
  const Icon = item.icon;

  return (
    <div className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 hover:bg-white/15 hover:border-white/30 transition-all duration-500 hover:-translate-y-2">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--brand-primary)]/0 to-[var(--brand-accent)]/0 group-hover:from-[var(--brand-primary)]/10 group-hover:to-[var(--brand-accent)]/10 transition-all duration-500" />

      <div className="relative z-10">
        <div className="w-14 h-14 bg-[var(--brand-primary)]/20 rounded-2xl backdrop-blur-sm flex items-center justify-center mb-6 group-hover:bg-[var(--brand-primary)]/30 group-hover:scale-110 transition-all duration-500">
          <Icon className="w-7 h-7 text-[var(--brand-primary)]" />
        </div>

        <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>

        <p className="text-white/70 leading-relaxed text-sm">
          {item.description}
        </p>
      </div>
    </div>
  );
}

function CategoryCard({ category }: { category: UiCategory }) {
  return (
    <div className="group relative h-[380px] rounded-3xl overflow-hidden">
      {/* Background Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-dark)]/90 via-[var(--brand-dark)]/30 to-transparent" />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-[var(--brand-primary)]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Name */}
        <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
          {category.name}
        </h3>

        <p className="text-white/80 text-sm leading-relaxed">
          {category.description}
        </p>
      </div>
    </div>
  );
}

export default function VoituresPage() {
  const t = useTranslations("voitures");
  const format = useFormatter();

  const highlights: UiFeature[] = HIGHLIGHT_ICONS.map((icon, i) => ({
    icon,
    title: t(`intro.items.${i}.title`),
    description: t(`intro.items.${i}.description`),
  }));
  const advantages: UiFeature[] = ADVANTAGE_ICONS.map((icon, i) => ({
    icon,
    title: t(`advantages.items.${i}.title`),
    description: t(`advantages.items.${i}.description`),
  }));
  const categories: UiCategory[] = CATEGORY_IMAGES.map((image, i) => ({
    image,
    name: t(`categories.items.${i}.name`),
    description: t(`categories.items.${i}.description`),
  }));

  const formatDate = (dateStr: string) =>
    dateStr
      ? format.dateTime(new Date(dateStr), { day: "numeric", month: "short" })
      : "";

  // null = no search performed yet, so the results section stays hidden.
  const [results, setResults] = useState<UiVehicle[] | null>(null);
  const [criteria, setCriteria] = useState<CarSearchFilters | null>(null);
  const resultsRef = useRef<HTMLElement | null>(null);

  // Scroll after the conditional section has mounted — doing this inside the
  // submit handler would run while resultsRef is still null.
  useEffect(() => {
    if (results !== null) {
      resultsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [results]);

  const handleSearch = (filters: CarSearchFilters) => {
    setCriteria(filters);
    setResults(applyVehicleFilters(MOCK_VEHICLES, filters));
  };

  const criteriaSummary = criteria
    ? [
        criteria.pickupLocation,
        [formatDate(criteria.pickupDate), formatDate(criteria.returnDate)]
          .filter(Boolean)
          .join(" → "),
      ]
        .filter(Boolean)
        .join(" · ")
    : "";

  return (
    <>
      <Header />

      {/* 1. HERO */}
      <section className="relative flex items-center pt-40 pb-24 md:pt-48 md:pb-32 bg-[var(--brand-dark)] overflow-hidden">
        {/* Background image - rendered via next/image so it is preloaded and
            served as WebP/AVIF. The solid section background above paints
            immediately, preventing a flash before the image arrives. */}
        <Image
          src="https://images.unsplash.com/photo-1502877338535-766e1452684a?w=1600&q=80"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-[var(--brand-dark)]/70" />

        <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6 2xl:px-10 relative z-10 w-full">
          <div className="text-white mb-10">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-wide mb-6">
              {t("hero.title")}{" "}
              <span className="text-[var(--brand-accent)]">
                {t("hero.titleAccent")}
              </span>
            </h1>
            <p className="text-md sm:text-lg text-white/90 mb-8 max-w-xl">
              {t("hero.subtitle")}
            </p>

            {/* Proof Text */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/90">
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                {t("hero.proofVehicles")}
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                {t("hero.proofCities")}
              </span>
              <span className="text-xs sm:text-sm flex items-center gap-2 uppercase font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--brand-accent)] animate-pulse" />
                {t("hero.proofDriver")}
              </span>
            </div>
          </div>

          {/* Search Form */}
          <div className="max-w-5xl">
            <CarSearchForm compact onSearch={handleSearch} />
          </div>
        </div>
      </section>

      {/* RESULTS - only after a search */}
      {results !== null && (
        <section
          ref={resultsRef}
          className="relative py-16 md:py-20 bg-white scroll-mt-4"
        >
          <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6">
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-[var(--brand-dark)]">
                  {t("results.count", { count: results.length })}
                </h2>
                {criteriaSummary && (
                  <p className="text-gray-500 text-sm mt-1">
                    {criteriaSummary}
                  </p>
                )}
              </div>

              <Button
                variant="ghost"
                rounded="xl"
                onClick={() => setResults(null)}
                className="w-fit text-slate-500 hover:text-[var(--brand-dark)]"
              >
                <X className="w-4 h-4" />
                {t("results.hide")}
              </Button>
            </div>

            {/* Results grid */}
            {results.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {results.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-slate-500 text-lg">
                  {t("results.empty")}
                </p>
                <button
                  onClick={() => setResults(MOCK_VEHICLES)}
                  className="mt-4 text-[var(--brand-primary)] font-semibold hover:underline"
                >
                  {t("results.showAll")}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 2. INTRO */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        {/* Decorative background: dot grids + road trajectory */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Top Left Dots */}
          <div className="absolute left-4 top-10 hidden lg:grid grid-cols-3 gap-2 opacity-40">
            {[...Array(15)].map((_, i) => (
              <div
                key={`cars-tl-${i}`}
                className="w-3 h-3 rounded-full bg-[var(--brand-primary)]"
              />
            ))}
          </div>

          {/* Bottom Right Dots */}
          <div className="absolute right-4 bottom-10 hidden lg:grid grid-cols-3 gap-2 opacity-40">
            {[...Array(15)].map((_, i) => (
              <div
                key={`cars-br-${i}`}
                className="w-3 h-3 rounded-full bg-[var(--brand-primary)]"
              />
            ))}
          </div>

          {/* Road trajectory curve */}
          <svg
            className="absolute left-0 bottom-0 w-full h-40 text-[var(--brand-primary)] opacity-20"
            viewBox="0 0 800 160"
            fill="none"
            preserveAspectRatio="none"
          >
            <path
              d="M0 130 Q 200 60, 400 90 T 800 40"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="10 8"
              fill="none"
            />
          </svg>

          {/* Hatchback line-art */}
          <img
            src="/hatchback-removebg-preview.png"
            alt=""
            aria-hidden="true"
            className="absolute -right-10 top-8 w-56 lg:w-72 opacity-[0.07]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block text-[var(--brand-primary)] text-sm font-semibold uppercase tracking-wider mb-4">
              {t("intro.eyebrow")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-dark)] mb-4 tracking-wide">
              {t("intro.heading")}{" "}
              <span className="text-[var(--brand-primary)]">
                {t("intro.headingAccent")}
              </span>
            </h2>
            <p className="text-gray-600 text-md sm:text-lg leading-relaxed">
              {t("intro.description")}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {highlights.map((item) => (
              <HighlightCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. AVANTAGES */}
      {/* The solid bg below is a fallback: Tailwind emits `in oklab` gradients, which
          older iOS Safari (< 16.4) drops entirely, leaving white text on white. */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--brand-dark)]">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-dark)] via-[var(--brand-teal)] to-[var(--brand-dark)]" />

        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="car-advantages-grid"
                x="0"
                y="0"
                width="50"
                height="50"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="25" cy="25" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#car-advantages-grid)" />
          </svg>
        </div>

        {/* Decorative blurs */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-[var(--brand-primary)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-[var(--brand-accent)]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl px-6">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              {t("advantages.heading")}{" "}
              <span className="text-[var(--brand-primary)]">
                {t("advantages.headingAccent")}
              </span>
            </h2>
            <p className="text-white/70 text-md sm:text-lg max-w-lg mx-auto">
              {t("advantages.description")}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {advantages.map((item) => (
              <AdvantageCard key={item.title} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. CATÉGORIES */}
      <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
        {/* Decorative car line-art */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <img
            src="/SUV-removebg-preview.png"
            alt=""
            aria-hidden="true"
            className="absolute -right-14 top-6 w-60 lg:w-80 opacity-[0.07]"
          />
          <img
            src="/Bus-removebg-preview.png"
            alt=""
            aria-hidden="true"
            className="absolute -left-14 bottom-2 w-60 lg:w-80 opacity-[0.07] scale-x-[-1]"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl px-6 mb-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="inline-block text-[var(--brand-primary)] text-sm font-semibold uppercase tracking-wider mb-4">
                {t("categories.eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-dark)]">
                {t("categories.heading")}{" "}
                <span className="text-[var(--brand-primary)]">
                  {t("categories.headingAccent")}
                </span>
              </h2>
            </div>
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA FINAL */}
      {/* The solid bg below is a fallback: Tailwind emits `in oklab` gradients, which
          older iOS Safari (< 16.4) drops entirely, leaving white text on white. */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-[var(--brand-dark)]">
        {/* Dark gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-dark)] via-[#012a36] to-[var(--brand-dark)]" />

        {/* Decorative blurs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--brand-primary)]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-[var(--brand-accent)]/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Side - Content */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
                {t("cta.heading")}{" "}
                <span className="text-[var(--brand-accent)]">
                  {t("cta.headingAccent")}
                </span>
              </h2>

              <p className="text-white text-lg sm:text-xl font-semibold mb-6">
                {t("cta.subtitle")}
              </p>

              <p className="text-white/90 text-md sm:text-lg leading-relaxed mb-8 max-w-lg">
                {t("cta.description")}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="primary" size="lg" rounded="lg">
                  <Car className="w-5 h-5" />
                  {t("cta.ctaBook")}
                </Button>
                <Button asChild variant="outline" size="lg" rounded="lg">
                  <Link href="/#contact">
                    <Phone className="w-5 h-5" />
                    {t("cta.ctaContact")}
                  </Link>
                </Button>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative flex items-center justify-center lg:justify-end">
              <div className="relative w-full max-w-md lg:max-w-xl py-8">
                {/* Pulsing halo glow */}
                <div
                  className="absolute left-1/2 top-1/2 w-[320px] h-[320px] md:w-[440px] md:h-[440px] rounded-full animate-halo-pulse"
                  style={{
                    transform: "translate(-50%, -50%)",
                    background:
                      "radial-gradient(circle, rgba(81,196,245,0.30) 0%, rgba(81,196,245,0.10) 45%, rgba(81,196,245,0) 72%)",
                  }}
                />

                {/* Top light source */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full blur-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 18%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 60%)",
                  }}
                />

                {/* Thin outer ring - lit from top */}
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[420px] md:h-[420px] rounded-full p-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(81,196,245,0.12) 55%, rgba(81,196,245,0))",
                    WebkitMask:
                      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
                    WebkitMaskComposite: "xor",
                    maskComposite: "exclude",
                  }}
                />

                {/* Dashed inner ring */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[230px] h-[230px] md:w-[330px] md:h-[330px] rounded-full border border-dashed border-white/10" />

                {/* Main image container */}
                <div className="relative flex justify-center">
                  <div className="relative animate-drive">
                    <Image
                      src="/zeekrtown-removebg.png"
                      alt="Location de voitures"
                      width={679}
                      height={367}
                      quality={100}
                      unoptimized
                      className="relative z-10 h-auto w-[679px] max-w-full object-contain drop-shadow-2xl"
                    />

                    {/* Ground shadow */}
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[65%] h-4 rounded-[50%] bg-black/40 blur-xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
