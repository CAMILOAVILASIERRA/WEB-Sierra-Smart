import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { NavLink } from "react-router-dom";
import heroImage from "@/assets/hero-tower.jpg";
import { SplineSceneBasic } from "@/components/SplineSceneDemo";
const Hero = () => {
  return <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img src={heroImage} alt="Futuristic tower with data streams" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Animated Data Flow Lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-px h-64 bg-gradient-to-b from-transparent via-accent to-transparent animate-float" />
        <div className="absolute top-1/3 right-1/3 w-px h-48 bg-gradient-to-b from-transparent via-accent to-transparent animate-float" style={{
        animationDelay: "1s"
      }} />
        <div className="absolute bottom-1/4 left-1/2 w-px h-56 bg-gradient-to-b from-transparent via-accent to-transparent animate-float" style={{
        animationDelay: "2s"
      }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 px-6 md:px-12 text-center animate-fade-in-up">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Logo removido para que solo esté en el header */}

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 backdrop-blur-sm border border-border/50 animate-fade-in mt-8 md:mt-12">
            <span className="w-2 h-2 rounded-full bg-accent animate-glow" />
            <span className="text-xl md:text-2xl font-light tracking-wide text-foreground/90">Consultoría Smart para Real Estate y Hotelería</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight text-foreground">
            Transformamos el
            <span className="block mt-2 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">
              Real Estate
            </span>
            <span className="block mt-2 text-zinc-950 text-7xl">con procesos optimizados</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl font-light text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Automatizamos tus procesos, liberamos tu tiempo y potenciamos tu crecimiento con sistemas inteligentes diseñados a tu medida.
          </p>

          {/* CTA Button */}
          <div className="pt-8">
            <NavLink to="/contacto">
              <Button size="lg" className="group px-8 py-6 text-lg font-light bg-primary hover:bg-primary/90 text-primary-foreground rounded-full shadow-[0_0_40px_hsl(var(--accent)/0.15)] hover:shadow-[0_0_60px_hsl(var(--accent)/0.25)] transition-all duration-500">
                Ir a Contacto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </NavLink>
          </div>

          {/* Trust Indicators */}
          <div className="pt-12 flex flex-wrap justify-center gap-8 text-sm font-light text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span>Sistemas Inteligentes</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span>Automatización Total</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1 h-1 rounded-full bg-accent" />
              <span>Datos en Tiempo Real</span>
            </div>
          </div>

          {/* 3D Interactive Scene */}
          <div className="pt-16">
            <SplineSceneBasic />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-float">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-muted-foreground/50 rounded-full animate-glow" />
        </div>
      </div>
    </section>;
};
export default Hero;