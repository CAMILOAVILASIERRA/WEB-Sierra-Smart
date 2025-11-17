import { Brain, Workflow, Zap, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

type WhatWeDoProps = { animated?: boolean };
const WhatWeDo = ({ animated = false }: WhatWeDoProps) => {
  const features = [
    {
      icon: Brain,
      title: "Arquitectura de sistemas inteligentes",
    },
    {
      icon: Workflow,
      title: "Automatización de procesos empresariales",
    },
    {
      icon: Zap,
      title: "Integraciones con CRM, WhatsApp, portales y PMS",
    },
    {
      icon: BarChart3,
      title: "Dashboards con datos en tiempo real",
    },
  ];

  return (
    <section className="py-32 px-6 md:px-12 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

      <div className="container relative z-10 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-6 mb-20">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
            Consultoría de Inteligencia Artificial
            <span className="block mt-2 text-accent">para empresas del futuro</span>
          </h2>
          <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            En Sierra Smart diseñamos y desplegamos ecosistemas inteligentes que optimizan cada parte del negocio.
            Integramos automatización, datos y agentes conversacionales para que tu empresa opere con precisión, rapidez y elegancia.
          </p>
          
          {/* CTA Button */}
          <div className="pt-8">
            <NavLink to="/contacto">
              <Button 
                size="lg" 
                className="group px-8 py-6 text-lg font-light bg-accent text-accent-foreground hover:bg-accent/90 rounded-full shadow-[0_0_40px_hsl(var(--accent)/0.2)] hover:shadow-[0_0_60px_hsl(var(--accent)/0.3)] transition-all duration-500"
              >
                Ir a Contacto
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </NavLink>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_40px_hsl(var(--accent)/0.1)] animate-fade-in ${animated ? 'will-change-transform hover:scale-[1.03] hover:-translate-y-1' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-6 inline-flex p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-light text-foreground leading-relaxed">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
