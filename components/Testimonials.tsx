import { Compass } from "lucide-react";
import { useTranslations } from "next-intl";

export function Testimonials() {
  const t = useTranslations("engagement");

  return (
    <section className="relative py-20 md:py-28 bg-gray-50 overflow-hidden">
      {/* Decorative dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-6 top-12 hidden lg:grid grid-cols-3 gap-2 opacity-40">
          {[...Array(15)].map((_, i) => (
            <div
              key={`tm-tl-${i}`}
              className="w-3 h-3 rounded-full bg-[var(--brand-primary)]"
            />
          ))}
        </div>
        <div className="absolute right-6 bottom-12 hidden lg:grid grid-cols-3 gap-2 opacity-40">
          {[...Array(15)].map((_, i) => (
            <div
              key={`tm-br-${i}`}
              className="w-3 h-3 rounded-full bg-[var(--brand-primary)]"
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto 2xl:max-w-8xl px-6">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 text-[var(--brand-primary)] text-sm font-semibold uppercase tracking-wider mb-4">
            <Compass className="w-4 h-4" />
            {t("eyebrow")}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-dark)] mb-6 tracking-wide">
            {t("heading")}{" "}
            <span className="text-[var(--brand-primary)]">
              {t("headingAccent")}
            </span>
          </h2>

          <p className="text-gray-600 text-md sm:text-lg leading-relaxed">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}
