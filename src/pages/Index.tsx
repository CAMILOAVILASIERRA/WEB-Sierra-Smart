import Hero from "@/components/Hero";
import WhatWeDo from "@/components/WhatWeDo";
import Services from "@/components/Services";
import Packages from "@/components/Packages";
import Promise from "@/components/Promise";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import SocialMediaFixed from "@/components/SocialMediaFixed";
import Comments from "@/components/Comments";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <SocialMediaFixed />
      <Hero />
      {/* Quiénes Somos (resumen) con botón de redirección */}
      <section className="py-24 px-6 md:px-12 border-y border-border">
        <div className="container max-w-5xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground">Quiénes Somos</h2>
            <p className="text-base md:text-lg font-light text-muted-foreground">
              Creamos y optimizamos sistemas para que tu negocio gane eficiencia, tus clientes tengan mejores
              experiencias y tú mantengas control total en tiempo real.
            </p>
          </div>
          <NavLink to="/quienes-somos">
            <Button variant="default" className="font-light">
              Ver más
            </Button>
          </NavLink>
        </div>
      </section>
      <WhatWeDo animated />
      <Services animated />
      <Packages animated />
      <Promise />
      <FinalCTA />
      <Comments />
      <Footer />
    </main>
  );
};

export default Index;
