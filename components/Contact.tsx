"use client";

import { User, Mail, Phone, MessageSquare, Send, LoaderCircle } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { toast } from 'sonner';

import React from "react";

export function Contact() {
  const t = useTranslations("contact");

  // form state
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  //loading state
  const [isLoading, setIsLoading] = React.useState(false);
  // handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  // form submission handler
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Handle form submission logic here
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Handle successful form submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      toast.success("Message envoyé avec succès !");
    } catch (error) {
      // console.error("Error submitting form:", error);
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  // The solid bg below is a fallback: Tailwind emits `in oklab` gradients, which
  // older iOS Safari (< 16.4) drops entirely, leaving white text on white.
  return (
    <section id="contact" className="relative py-20 md:py-28 bg-[#2D91E0] bg-gradient-to-br from-[#2D91E0] via-[#4AA3E4] to-[#68B4E8] overflow-hidden">
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
              {t("badge")}
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-6 max-w-lg">
              {t("heading")}{" "}
              <span className="text-[var(--brand-accent)]">
                {t("headingAccent")}
              </span>
            </h2>
            <p className="text-md sm:text-lg text-white/90 mb-8 max-w-lg">
              {t("description")}
            </p>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t("phone")}</p>
                  <p className="text-white font-medium">(+225) 07 02 84 57 19</p>
                 
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t("phone")}</p>
                  <p className="text-white font-medium">(+225) 27 21 53 39 90</p>
                 
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t("email")}</p>
                  <p className="text-white font-medium">info@thagencygroup.ci</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t("email")}</p>
                  <p className="text-white font-medium">Theagencygroupt@gmail.com</p>
                </div>
              </div>
              {/* <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[var(--brand-accent)]" />
                </div>
                <div>
                  <p className="text-white/60 text-sm">{t("workingHours")}</p>
                  <p className="text-white font-medium">{t("workingHoursValue")}</p>
                </div>
              </div> */}
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
              <h3 className="text-white text-xl font-semibold mb-6">{t("formTitle")}</h3>

              <form onSubmit={handleSubmit} className="space-y-3">
                {/* Name Field */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <User className="w-3.5 h-3.5" />
                    {t("fullName")}
                  </label>
                  <input
                    type="text"
                    placeholder={t("fullNamePlaceholder")}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Email Field */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <Mail className="w-3.5 h-3.5" />
                    {t("email")}
                  </label>
                  <input
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Phone Field */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <Phone className="w-3.5 h-3.5" />
                    {t("phone")}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+21612345678"
                    pattern="^\+[1-9]\d{7,14}$"
                    title="enter a valid international phone number (e.g., +21612345678)."
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium"
                  />
                </div>

                {/* Message Field */}
                <div className="bg-white rounded-xl px-4 py-3">
                  <label className="text-gray-500 text-xs font-medium flex items-center gap-1.5 mb-1">
                    <MessageSquare className="w-3.5 h-3.5" />
                    {t("message")}
                  </label>
                  <textarea
                    placeholder={t("messagePlaceholder")}
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none text-sm font-medium resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 bg-[#2D91E0] hover:bg-[#1a7bc9] text-white font-semibold py-4 rounded-xl transition-all mt-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                    <LoaderCircle className="w-5 h-5 animate-spin" />
                    {t("sending")}
                    </>
                  ) : (
                    <>
                    <Send className="w-5 h-5" />
                  {t("submit")}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
