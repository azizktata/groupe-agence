import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Marie Dubois",
    location: "Paris, France",
    rating: 5,
    text: "Une expérience exceptionnelle ! L'équipe a organisé notre voyage de noces à Bali avec une attention aux détails remarquable. Tout était parfait.",
    avatar: "MD",
  },
  {
    name: "Jean-Pierre Martin",
    location: "Lyon, France",
    rating: 5,
    text: "Service client irréprochable. Ils ont trouvé des vols à des prix imbattables pour toute ma famille. Je recommande vivement !",
    avatar: "JM",
  },
  {
    name: "Sophie Laurent",
    location: "Marseille, France",
    rating: 5,
    text: "Grâce à Groupe Agence, j'ai découvert des destinations incroyables. Leur expertise et leurs conseils personnalisés font toute la différence.",
    avatar: "SL",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 md:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto 2xl:max-w-8xl px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 bg-[#68B4E8]/10 rounded-full text-sm font-medium text-[#2D91E0] mb-4">
            Témoignages
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[var(--brand-dark)] mb-4">
            Ce que disent nos{" "}
            <span className="text-[#2D91E0]">clients</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Des milliers de voyageurs nous font confiance chaque année. Découvrez leurs expériences.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D91E0] to-[#68B4E8] flex items-center justify-center shadow-lg">
                  <Quote className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-4 mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[var(--brand-accent)] text-[var(--brand-accent)]"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#2D91E0] to-[#68B4E8] flex items-center justify-center text-white font-semibold text-sm">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[var(--brand-dark)]">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Bar */}
        {/* <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#2D91E0]">15k+</p>
            <p className="text-gray-600 text-sm mt-1">Clients satisfaits</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#2D91E0]">4.9</p>
            <p className="text-gray-600 text-sm mt-1">Note moyenne</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#2D91E0]">98%</p>
            <p className="text-gray-600 text-sm mt-1">Taux de satisfaction</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold text-[#2D91E0]">15+</p>
            <p className="text-gray-600 text-sm mt-1">Années d&apos;expérience</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
