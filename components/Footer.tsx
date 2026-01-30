import { Plane, MapPin, Phone, Mail, Facebook, Instagram, Twitter, Linkedin } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[var(--brand-dark)] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl 2xl:max-w-8xl mx-auto px-6 xl:px-16 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-6">
             
              <span className="text-xl font-bold">Groupe L&apos;Agence</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Votre partenaire de confiance pour tous vos voyages.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[var(--brand-primary)] flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Liens rapides</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Nos services
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Nos services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Réservation de vols
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Hôtels & Hébergements
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Location de voitures
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Assurance voyage
                </Link>
              </li>
              <li>
                <Link href="#" className="text-white/60 hover:text-[var(--brand-accent)] transition-colors text-sm">
                  Visa & Formalités
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[var(--brand-accent)] flex-shrink-0 mt-0.5" />
                <span className="text-white/60 text-sm">
                  123 Avenue des Voyages<br />
                  75001 Paris, France
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[var(--brand-accent)] flex-shrink-0" />
                <a href="tel:+33702845719" className="text-white/60 hover:text-white transition-colors text-sm">
                  0702845719
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[var(--brand-accent)] flex-shrink-0" />
                <a href="mailto:contact@groupelagence.com" className="text-white/60 hover:text-white transition-colors text-sm">
                  contact@groupelagence.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto 2xl:max-w-8xl  px-6 xl:px-16 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/50 text-sm">
              &copy; {new Date().getFullYear()} Groupe L&apos;Agence. Tous droits réservés.
            </p>
            <div className="flex items-center gap-1 text-white/50 text-sm">
              Développé par <a href="https://asis.tn" target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] ">Asis.tn</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
