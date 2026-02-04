"use client";

import {
  Check,
  Plane,
  ArrowRight,
  Send,
  Calendar,
  Medal,
  BadgeCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tickets = [
  {
    from: "Morocco",
    fromCode: "CMN",
    to: "Emirates",
    toCode: "DXB",
    duration: "8h:15M",
    departureTime: "09:12 AM",
    date: "Mar 15, 2025",
  },
  {
    from: "Qatar",
    fromCode: "DOH",
    to: "Dubai",
    toCode: "DXB",
    duration: "6h:30M",
    departureTime: "14:45 PM",
    date: "Apr 22, 2025",
  },
  // {
  //   from: "Marseille",
  //   fromCode: "MRS",
  //   to: "Tokyo",
  //   toCode: "NRT",
  //   duration: "12h:45M",
  //   departureTime: "22:30 PM",
  //   date: "May 08, 2025",
  // },
];

const trustPoints = [
  "Accès direct aux compagnies aériennes",
  "Tarifs compétitifs et actualisés",
  "Réservations rapides et sécurisées",
];

function TicketCard({ ticket, animationClass = "" }: { ticket: (typeof tickets)[0]; animationClass?: string }) {
  return (
    <div className={`max-w-sm relative bg-white rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 overflow-hidden group ${animationClass}`}>
      {/* Shimmer overlay */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
        <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full" />
      </div>
      {/* Background Wave Pattern */}
      {/* <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
          <path
            d="M0,100 C100,150 200,50 300,100 C400,150 400,100 400,100 L400,200 L0,200 Z"
            fill="currentColor"
            className="text-[var(--brand-primary)]"
          />
          <path
            d="M0,120 C80,170 180,70 280,120 C380,170 400,120 400,120 L400,200 L0,200 Z"
            fill="currentColor"
            className="text-[var(--brand-dark)]"
          />
        </svg>
      </div> */}

      {/* Main Content */}
      <div className="relative z-10">
        {/* Top Section - Airport Codes */}
        <div className="flex items-center justify-between mb-4">
          {/* From */}
          <div className="text-left">
            <div className="text-2xl md:text-3xl font-bold text-[var(--brand-dark)]">
              {ticket.fromCode}
            </div>
            <div className="text-sm text-gray-500">{ticket.from}</div>
          </div>

          {/* Center - Plane with Duration */}
          <div className="flex-1 flex flex-col items-center px-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* Arc/Semi-circle */}
              <svg className="absolute w-full h-full" viewBox="0 0 64 64">
                <path
                  d="M 8 32 A 24 24 0 0 1 56 32"
                  fill="none"
                  stroke="var(--brand-primary)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="opacity-40 animate-dash-flow"
                />
              </svg>
              {/* Plane Icon */}
              <div className="w-10 h-10 rounded-full bg-[var(--brand-primary)]/10 flex items-center justify-center group-hover:bg-[var(--brand-primary)]/20 transition-colors duration-300">
                <Plane className="w-5 h-5 text-[var(--brand-primary)] rotate-90" />
              </div>
            </div>
            <span className="text-xs font-medium text-[var(--brand-primary)] mt-1">
              {ticket.duration}
            </span>
          </div>

          {/* To */}
          <div className="text-right">
            <div className="text-2xl md:text-3xl font-bold text-[var(--brand-dark)]">
              {ticket.toCode}
            </div>
            <div className="text-sm text-gray-500">{ticket.to}</div>
          </div>
        </div>

        {/* Decorative Side Dots */}
        {/* <div className="absolute -left-6 w-4 h-4 bg-[var(--brand-dark)] rounded-full" />
          <div className="absolute -right-6 w-4 h-4 bg-[var(--brand-dark)] rounded-full" /> */}

        {/* Dotted Separator Line */}
        <div className="relative flex items-center my-4">
          <div className="flex-1 border-t-2 border-dashed border-gray-200" />
        </div>

        {/* Bottom Section - Time & Date Capsules */}
        <div className="flex items-center justify-between gap-4">
          {/* Departure Time */}
          <div className="flex items-center gap-2 bg-[var(--brand-primary)]/10 px-4 py-2 rounded-full animate-badge-pulse hover:bg-[var(--brand-primary)]/20 transition-colors duration-300">
            <Send className="w-3 h-3 text-[var(--brand-primary)]" />
            <span className="text-xs font-medium text-[var(--brand-dark)]">
              {ticket.departureTime}
            </span>
          </div>

          {/* Date */}
          <div className="flex items-center gap-2 bg-[var(--brand-primary)]/10 px-4 py-2 rounded-full animate-badge-pulse hover:bg-[var(--brand-primary)]/20 transition-colors duration-300" style={{ animationDelay: "1.5s" }}>
            <Calendar className="w-3 h-3 text-[var(--brand-primary)]" />
            <span className="text-xs font-medium text-[var(--brand-dark)]">
              {ticket.date}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Trust() {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden px-6">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-dark)] via-[var(--brand-teal)] to-[var(--brand-dark)]" />

      {/* SVG Pattern Background - Travel Theme */}
      <div className="absolute inset-0 opacity-[0.07]">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Globe grid lines pattern */}
            {/* <pattern id="globe-grid" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <ellipse cx="100" cy="100" rx="90" ry="90" fill="none" stroke="white" strokeWidth="0.5" />
              <ellipse cx="100" cy="100" rx="90" ry="45" fill="none" stroke="white" strokeWidth="0.3" />
              <ellipse cx="100" cy="100" rx="90" ry="20" fill="none" stroke="white" strokeWidth="0.3" />
              <ellipse cx="100" cy="100" rx="45" ry="90" fill="none" stroke="white" strokeWidth="0.3" />
              <ellipse cx="100" cy="100" rx="20" ry="90" fill="none" stroke="white" strokeWidth="0.3" />
              <line x1="10" y1="100" x2="190" y2="100" stroke="white" strokeWidth="0.3" />
              <line x1="100" y1="10" x2="100" y2="190" stroke="white" strokeWidth="0.3" />
            </pattern> */}

            {/* Flight path pattern with planes */}
            <pattern
              id="flight-paths"
              x="0"
              y="0"
              width="300"
              height="300"
              patternUnits="userSpaceOnUse"
            >
              {/* Curved flight path 1 */}
              <path
                d="M30 250 Q150 100 270 150"
                fill="none"
                stroke="white"
                strokeWidth="0.8"
                strokeDasharray="8 4"
              />
              {/* Small airplane on path */}
              <g transform="translate(150, 140) rotate(-30)">
                <path d="M0 0 L8 3 L8 4 L0 2 Z" fill="white" />
                <path d="M2 2 L2 -3 L4 -3 L4 2 Z" fill="white" />
                <path d="M6 3 L6 0 L8 0 L8 3 Z" fill="white" />
              </g>

              {/* Curved flight path 2 */}
              <path
                d="M250 280 Q180 200 80 220"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />

              {/* Destination dots */}
              <circle cx="30" cy="250" r="3" fill="white" />
              <circle cx="270" cy="150" r="3" fill="white" />
              <circle cx="80" cy="220" r="2" fill="white" />
            </pattern>

            {/* Scattered small planes pattern */}
            <pattern
              id="planes-scatter"
              x="0"
              y="0"
              width="400"
              height="400"
              patternUnits="userSpaceOnUse"
            >
              {/* Plane 1 */}
              <g transform="translate(50, 80) rotate(45) scale(1.5)">
                <path d="M0 4 L12 4 L12 5 L0 5 Z" fill="white" />
                <path d="M3 0 L5 0 L6 4 L2 4 Z" fill="white" />
                <path d="M3 5 L5 5 L5 8 L3 8 Z" fill="white" />
                <path d="M10 3 L12 2 L12 7 L10 6 Z" fill="white" />
              </g>

              {/* Plane 2 */}
              <g transform="translate(320, 200) rotate(-20) scale(1.2)">
                <path d="M0 4 L12 4 L12 5 L0 5 Z" fill="white" />
                <path d="M3 0 L5 0 L6 4 L2 4 Z" fill="white" />
                <path d="M3 5 L5 5 L5 8 L3 8 Z" fill="white" />
                <path d="M10 3 L12 2 L12 7 L10 6 Z" fill="white" />
              </g>

              {/* Plane 3 */}
              <g transform="translate(180, 350) rotate(70) scale(1)">
                <path d="M0 4 L12 4 L12 5 L0 5 Z" fill="white" />
                <path d="M3 0 L5 0 L6 4 L2 4 Z" fill="white" />
                <path d="M3 5 L5 5 L5 8 L3 8 Z" fill="white" />
                <path d="M10 3 L12 2 L12 7 L10 6 Z" fill="white" />
              </g>

              {/* Cloud shapes */}
              <ellipse
                cx="280"
                cy="60"
                rx="20"
                ry="10"
                fill="white"
                opacity="0.3"
              />
              <ellipse
                cx="290"
                cy="55"
                rx="15"
                ry="8"
                fill="white"
                opacity="0.3"
              />
              <ellipse
                cx="100"
                cy="280"
                rx="25"
                ry="12"
                fill="white"
                opacity="0.3"
              />
              <ellipse
                cx="115"
                cy="275"
                rx="18"
                ry="9"
                fill="white"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#globe-grid)" />
          <rect width="100%" height="100%" fill="url(#flight-paths)" />
          <rect
            width="100%"
            height="100%"
            fill="url(#planes-scatter)"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Decorative Floating Shapes */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[var(--brand-primary)]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-30 bg-[var(--brand-accent)]/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Ticket Cards */}
          <div className="gap-2 order-2 lg:order-1 flex flex-col items-center">
            <TicketCard ticket={tickets[1]} animationClass="animate-ticket-float" />
            <div className="grid grid-cols-2 gap-2 hidden md:grid">
              {tickets.map((ticket, index) => (
                <div
                  key={index}
                  style={{ animationDelay: `${index * 150}ms` }}
                  className="animate-fade-in"
                >
                  <TicketCard
                    ticket={ticket}
                    animationClass={index === 0 ? "animate-ticket-float-delayed" : "animate-ticket-float-delayed-2"}
                  />
                </div>
              ))}
            </div>
            {/* CTA Button - Primary Color */}
            <Link href="/vols">
            <Button variant="primary" size="lg" rounded="sm" className="mt-8">
              Découvrir nos offres
              <ArrowRight className="w-5 h-5" />
            </Button>
            </Link>
          </div>

          {/* Right Side - Content */}
          <div className="order-1 lg:order-2">
             <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-4">
              <Medal className="w-4 h-4 text-[var(--brand-accent)]" />
              Certifié IATA
            </span>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Accédez aux meilleures offres de{" "}
              <span className="text-[var(--brand-accent)]">
                vols et d&apos;hôtels
              </span>
            </h2>

            <p className="text-white/90 text-md sm:text-lg leading-relaxed mb-8 max-w-xl">
              Nous vous donnons accès à des milliers de vols et d’hébergements
              aux meilleurs tarifs, en toute transparence. Billets d’avion et
              hôtels réunis pour gagner du temps, économiser de l’argent et
              profiter d’une expérience fluide.
            </p>

            {/* Trust Points */}
            <div className="space-y-4 mb-8">
              {trustPoints.map((point, index) => (
                <div key={index} className="flex items-center gap-3 group">
                  <BadgeCheck className="w-5 h-5 text-[var(--brand-primary)]" />
                  <span className="text-white/90 text-base group-hover:text-white transition-colors">
                    {point}
                  </span>
                </div>
              ))}
            </div>

            {/* Secondary CTA - Primary Color */}
            {/* <button className="inline-flex items-center gap-2 bg-[var(--brand-primary)] text-white font-semibold px-6 py-3 rounded-full hover:bg-[var(--brand-primary)]/90 hover:shadow-lg hover:shadow-[var(--brand-primary)]/30 transition-all duration-300">
              Réserver maintenant
              <ArrowRight className="w-4 h-4" />
            </button> */}
          </div>
        </div>
      </div>
    </section>
  );
}
