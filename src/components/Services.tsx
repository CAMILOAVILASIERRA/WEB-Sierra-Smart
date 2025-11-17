import { Building2, Hotel, Bot, Network } from "lucide-react";
type ServicesProps = { animated?: boolean };
const Services = ({ animated = false }: ServicesProps) => {
  const services = [{
    icon: Building2,
    title: "Smart Real Estate",
    features: ["Captura y califica leads automáticamente", "Agenda citas y reportes sin esfuerzo", "Centraliza datos y gestiona tu equipo desde un solo lugar"]
  }, {
    icon: Hotel,
    title: "Smart Hotelería",
    features: ["Responde a huéspedes de forma automática", "Coordina limpieza, cobros y reportes", "Mejora la experiencia y reputación del anfitrión"]
  }, {
    icon: Bot,
    title: "Agentes IA Personalizados",
    features: ["Asistentes virtuales que hablan el idioma de tu marca", "Integración total con WhatsApp, web y CRM"]
  }, {
    icon: Network,
    title: "Arquitectura de Sistemas Inteligentes",
    features: ["Diseño de ecosistemas conectados y automatizados", "Flujos con n8n, GPT, APIs y paneles de control"]
  }];
  return <section className="py-32 px-6 md:px-12 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="text-center space-y-6 mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
            Soluciones inteligentes
            <span className="block mt-2 text-accent">que escalan contigo</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => <div key={index} className={`group relative p-10 rounded-3xl bg-card backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-500 hover:shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.15)] animate-fade-in ${animated ? 'will-change-transform hover:scale-[1.02] hover:-translate-y-1' : ''}`} style={{
          animationDelay: `${index * 0.1}s`
        }}>
              {/* Icon */}
              <div className="mb-6 inline-flex p-5 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                <service.icon className="w-10 h-10 text-accent" />
              </div>

              {/* Title */}
              <h3 className="text-2xl md:text-3xl font-light text-foreground mb-6">
                {service.title}
              </h3>

              {/* Features */}
              <ul className="space-y-4">
                {service.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-start gap-3 text-muted-foreground">
                    <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span className="leading-relaxed font-light text-lg">{feature}</span>
                  </li>)}
              </ul>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>)}
        </div>
      </div>
    </section>;
};
export default Services;