export default function ServiceCard({
  service,
}: {
  service: {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    description: string;
  };
}) {
  const Icon = service.icon;

  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 hover:border-[var(--brand-primary)]/30">
      {/* Decorative shapes - visible on hover */}
      {/* Top Right Shape */}
      <div className="absolute -top-10 -right-10 w-24 h-24 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 translate-x-4 -translate-y-4">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Curved shape */}
          <path
            d="M100 0 L100 100 Q50 100 50 50 Q50 0 100 0 Z"
            fill="var(--brand-primary)"
            opacity="0.1"
          />
          {/* Dotted arc */}
          <path
            d="M100 20 Q70 20 70 50 Q70 80 100 80"
            stroke="var(--brand-primary)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
            opacity="0.4"
          />
          {/* Small circles */}
          <circle cx="85" cy="30" r="3" fill="var(--brand-primary)" opacity="0.6" />
          <circle cx="75" cy="50" r="2" fill="var(--brand-accent)" opacity="0.8" />
          <circle cx="85" cy="70" r="3" fill="var(--brand-primary)" opacity="0.6" />
        </svg>
      </div>

      {/* Bottom Left Shape */}
      <div className="absolute -bottom-10 -left-10 w-24 h-24 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-0 group-hover:translate-y-0 -translate-x-4 translate-y-4">
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* Curved shape - mirrored */}
          <path
            d="M0 100 L0 0 Q50 0 50 50 Q50 100 0 100 Z"
            fill="var(--brand-accent)"
            opacity="0.1"
          />
          {/* Dotted arc - mirrored */}
          <path
            d="M0 20 Q30 20 30 50 Q30 80 0 80"
            stroke="var(--brand-accent)"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
            opacity="0.4"
          />
          {/* Small circles */}
          <circle cx="15" cy="30" r="3" fill="var(--brand-accent)" opacity="0.6" />
          <circle cx="25" cy="50" r="2" fill="var(--brand-primary)" opacity="0.8" />
          <circle cx="15" cy="70" r="3" fill="var(--brand-accent)" opacity="0.6" />
        </svg>
      </div>

      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--brand-primary)]/0 via-transparent to-[var(--brand-accent)]/0 group-hover:from-[var(--brand-primary)]/5 group-hover:to-[var(--brand-accent)]/5 transition-all duration-500 rounded-2xl" />

      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[var(--brand-primary)]/10 to-[var(--brand-primary)]/5 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[var(--brand-primary)]/20 transition-all duration-500">
          <Icon className="w-8 h-8 text-[var(--brand-primary)] group-hover:scale-110 transition-transform duration-500" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-[var(--brand-dark)] mb-3 group-hover:text-[var(--brand-primary)] transition-colors duration-300">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed">
          {service.description}
        </p>

        {/* Bottom accent line */}
        <div className="mt-6 h-1 w-12 bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] rounded-full group-hover:w-full transition-all duration-500" />
      </div>
    </div>
  );
}