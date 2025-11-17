import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const FinalCTA = () => {
  return (
    <section className="py-32 px-6 md:px-12 bg-gradient-to-b from-secondary/30 to-background relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-1/4 w-2 h-2 rounded-full bg-accent animate-glow" />
      <div className="absolute top-1/3 right-1/3 w-2 h-2 rounded-full bg-accent animate-glow" style={{ animationDelay: "1s" }} />
      <div className="absolute bottom-1/4 left-1/2 w-2 h-2 rounded-full bg-accent animate-glow" style={{ animationDelay: "2s" }} />

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Icon */}
          <div className="inline-flex p-6 rounded-full bg-accent/10 backdrop-blur-sm">
            <Sparkles className="w-12 h-12 text-accent" />
          </div>

          {/* Title */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-foreground">
              Es hora de dar el
              <span className="block mt-2 text-accent">siguiente paso</span>
            </h2>
            <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Haz crecer tu negocio con sistemas inteligentes que trabajan 24/7.
              Contáctanos para una auditoría gratuita y descubre cómo la IA puede multiplicar tu productividad.
            </p>
          </div>

          {/* CTA Button */}
          <div className="pt-8">
            <NavLink to="/contacto">
              <Button 
                size="lg" 
                className="group px-10 py-7 text-xl font-light bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shadow-[0_0_40px_hsl(var(--accent)/0.2)] hover:shadow-[0_0_60px_hsl(var(--accent)/0.3)] transition-all duration-500"
              >
                Ir a Contacto
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
              </Button>
            </NavLink>
          </div>

          {/* Trust Line */}
          <p className="text-sm font-light text-muted-foreground pt-8">
            Sin compromiso • Consulta gratuita • Resultados garantizados
          </p>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
