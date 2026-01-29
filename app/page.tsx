import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { AirlinesCarousel } from "@/components/AirlinesCarousel";
import { About } from "@/components/About";
import { Trust } from "@/components/Trust";
import { Services } from "@/components/Services";
import { ServicesExtra } from "@/components/ServicesExtra";
import { Destinations } from "@/components/Destinations";
import { CTAFinal } from "@/components/CTAFinal";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <AirlinesCarousel />
      <About />
      <Trust />
      <Services />
      <ServicesExtra />
      <Destinations />
      <CTAFinal />
      <Testimonials />
      <Contact />
      <Footer />
    </>
  );
}
