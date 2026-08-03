"use client";

import { User, Mail, Phone, MessageSquare, Send, Clock } from "lucide-react";
import Image from "next/image";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-28 bg-gradient-to-br from-[#2D91E0] via-[#4AA3E4] to-[#68B4E8] overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#2D91E0]/40 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl 2xl:max-w-8xl mx-auto px-6 xl:px-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="text-white">
            <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium text-white/90 mb-6">
              Contactez-nous
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-lg">
              Planifions ensemble{" "}
              <span className="text-[var(--brand-accent)]">votre voyage</span>
            </h2>
            <p className="text-md sm:text-lg text-white/90 mb-8 max-w-lg">
              Notre équipe d&apos;experts est à votre disposition pour répondre à toutes vos questions et vous aider à organiser le voyage de vos rêves.
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Téléphone</p>
                  <p className="text-white font-medium">(+225) 07 02 84 57 19 - (+225) 27 21 53 39 90</p>
                 
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Email</p>
                  <p className="text-white font-medium">info@thagencygroup.ci</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">Temps de travail</p>
                  <p className="text-white font-medium">Lun - Ven, 9h - 18h</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form Card */}
          <div className="flex justify-center lg:justify-end relative">
            {/* Plane decoration with shadow */}
            <div className="absolute -top-16 -right-8 md:-top-20 md:-right-12 z-20">
              <div className="relative">
                <Image
                  src="/Plane.png"
                  alt="Plane"
                  width={140}
                  height={140}
                  className="drop-shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500"
                />
                {/* Plane shadow */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/20 rounded-full blur-md" />
              </div>
            </div>

            {/* Glassmorphism Card - Same style as Search Card */}
            <div className="w-full max-w-md bg-white/15 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-8 shadow-2xl">
              <h3 className="text-white text-xl font-semibold mb-6">Envoyez-nous un message</h3>

              <form className="space-y-3">
                {/* Name Field */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <User className="w-3.5 h-3.5" />
                    Nom complet
                  </label>
                  <input
                    type="text"
                    placeholder="Votre nom"
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Email Field */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <Mail className="w-3.5 h-3.5" />
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="votre@email.com"
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Phone Field */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <Phone className="w-3.5 h-3.5" />
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    placeholder="+33 6 00 00 00 00"
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Message Field */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    Message
                  </label>
                  <textarea
                    placeholder="Décrivez votre projet de voyage..."
                    rows={3}
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#2D91E0] hover:bg-[#1a7bc9] text-white font-semibold py-4 rounded-xl transition-all mt-2"
                >
                  <Send className="w-5 h-5" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
