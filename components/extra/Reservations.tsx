import { Plane, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const ReservationsSection = () => {
  return (
    <section id="vols" className="py-20 lg:py-28 bg-navy relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-sky/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-sky/20 text-sky mb-6">
              <Star className="w-4 h-4" />
              Réservations exclusives
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
              Réservations Aériennes
            </h2>
            <p className="text-lg text-primary-foreground/70 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Groupe LAgence vous donne accès à des vols exclusifs avec des compagnies 
              de renom à des tarifs préférentiels. Réservez en quelques clics et voyagez l'esprit léger.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button className="btn-gold text-base">
                Réserver un vol
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button 
                variant="outline" 
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-6 py-3 rounded-xl"
              >
                En savoir plus
              </Button>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Main Circle */}
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full bg-gradient-to-br from-sky/30 to-sky/10 flex items-center justify-center">
                <div className="w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-sky/40 to-sky/20 flex items-center justify-center animate-float">
                  <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-full bg-sky flex items-center justify-center shadow-card-hover">
                    <Plane className="w-24 h-24 lg:w-32 lg:h-32 text-primary-foreground" />
                  </div>
                </div>
              </div>

              {/* Floating Stats */}
              <div className="absolute -top-4 -right-4 glass-card px-4 py-3 animate-float" style={{ animationDelay: "0.5s" }}>
                <p className="text-sm text-muted-foreground">Vols disponibles</p>
                <p className="text-2xl font-bold text-navy">+500</p>
              </div>
              
              <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 animate-float" style={{ animationDelay: "1s" }}>
                <p className="text-sm text-muted-foreground">Destinations</p>
                <p className="text-2xl font-bold text-navy">+120</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReservationsSection;
