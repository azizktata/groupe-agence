import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const DestinationsSection = () => {
  const destinations = [
    {
      name: "Paris",
      country: "France",
      price: "À partir de 89€",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&q=80",
    },
    {
      name: "Dubaï",
      country: "Émirats Arabes",
      price: "À partir de 399€",
      image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&q=80",
    },
    {
      name: "New York",
      country: "États-Unis",
      price: "À partir de 449€",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
    },
    {
      name: "Marrakech",
      country: "Maroc",
      price: "À partir de 149€",
      image: "https://images.unsplash.com/photo-1597212618440-806262de4f6b?w=600&q=80",
    },
  ];

  return (
    <section id="destinations" className="py-20 lg:py-28 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="section-badge mb-4">
              <MapPin className="w-4 h-4" />
              Destinations populaires
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy">
              Explorez le monde
            </h2>
          </div>
          <Button className="btn-primary w-fit">
            Toutes les destinations
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Destinations Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <div
              key={destination.name}
              className="group relative rounded-3xl overflow-hidden cursor-pointer h-[320px]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Background Image */}
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 text-primary-foreground/80 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{destination.country}</span>
                </div>
                <h3 className="text-2xl font-bold text-primary-foreground mb-2">
                  {destination.name}
                </h3>
                <p className="text-gold font-semibold">
                  {destination.price}
                </p>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-sky/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DestinationsSection;
