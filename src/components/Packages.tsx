import { Crown, Zap, Bot, BarChart, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
type PackagesProps = { animated?: boolean };
const Packages = ({ animated = false }: PackagesProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const packages = [{
    icon: Crown,
    name: "SIERRA KING",
    emoji: "👑",
    description: "Ecosistema completo: automatización + agente IA + dashboard ejecutivo + capacitación.",
    highlight: "Ideal para empresas que buscan dominar su mercado con control total.",
    featured: true,
    detailedInfo: {
      title: "SIERRA KING - Dominio Total del Mercado",
      subtitle: "La solución más completa para transformar tu empresa",
      features: [{
        title: "Automatización Integral",
        description: "Flujos de trabajo automatizados para todas las operaciones críticas: gestión de leads, agenda inteligente, seguimientos automáticos, y reportería completa."
      }, {
        title: "Agente IA Personalizado",
        description: "Asistente con inteligencia artificial entrenado específicamente en tu negocio, capaz de atender clientes 24/7, calificar leads y programar citas de forma autónoma."
      }, {
        title: "Dashboard Ejecutivo",
        description: "Panel de control en tiempo real con métricas clave, análisis predictivo, y reportes personalizados para tomar decisiones basadas en datos concretos."
      }, {
        title: "Capacitación Completa",
        description: "Programa de onboarding y entrenamiento continuo para tu equipo, asegurando máxima adopción y aprovechamiento del sistema."
      }, {
        title: "Soporte Premium",
        description: "Atención prioritaria con equipo dedicado, actualizaciones continuas y optimizaciones mensuales del sistema."
      }],
      benefits: ["Reducción de hasta 70% en tiempo operativo", "Aumento de conversión de leads del 40%", "Visibilidad total del embudo de ventas", "Escalabilidad sin límites", "ROI medible en 90 días"]
    }
  }, {
    icon: Zap,
    name: "SIERRA FLOW",
    emoji: "💡",
    description: "Flujos de trabajo automatizados para tareas clave (agenda, leads, reportes).",
    highlight: "Perfecto para alcanzar orden y eficiencia inmediata.",
    detailedInfo: {
      title: "SIERRA FLOW - Automatización sin Complicaciones",
      subtitle: "Optimiza tus procesos más importantes desde el día uno",
      features: [{
        title: "Gestión Automática de Leads",
        description: "Captura, clasifica y distribuye leads automáticamente desde múltiples canales. Scoring inteligente que prioriza los prospectos más valiosos."
      }, {
        title: "Agenda Inteligente",
        description: "Sistema de programación de citas que se sincroniza con calendarios, envía recordatorios automáticos y optimiza la disponibilidad del equipo."
      }, {
        title: "Reportería Automatizada",
        description: "Reportes diarios, semanales y mensuales generados automáticamente con las métricas más importantes de tu operación."
      }, {
        title: "Integraciones Nativas",
        description: "Conecta con tus herramientas actuales: CRM, WhatsApp, email, calendarios y más. Sin necesidad de cambiar lo que ya funciona."
      }, {
        title: "Workflows Personalizables",
        description: "Diseña flujos de trabajo específicos para tu negocio sin código. Ajusta y optimiza según necesites."
      }],
      benefits: ["Implementación en menos de 2 semanas", "Ahorro de 15+ horas semanales por persona", "Cero leads perdidos en el proceso", "Respuesta inmediata a prospectos", "Eliminación de tareas repetitivas"]
    }
  }, {
    icon: Bot,
    name: "SIERRA AGENT",
    emoji: "🤖",
    description: "Asistente IA personalizado para atención y seguimiento de clientes.",
    highlight: "Diseñado para conectar con tus leads en tiempo real.",
    detailedInfo: {
      title: "SIERRA AGENT - Tu Asistente IA 24/7",
      subtitle: "Nunca pierdas un cliente por falta de atención",
      features: [{
        title: "Atención Multicanal",
        description: "Tu agente IA responde instantáneamente por WhatsApp, web chat, email y redes sociales. Conversaciones naturales que se sienten humanas."
      }, {
        title: "Entrenamiento Personalizado",
        description: "El agente aprende de tu negocio: inventario, servicios, políticas, precios. Responde como tu mejor vendedor, pero sin descansos."
      }, {
        title: "Calificación Inteligente de Leads",
        description: "Identifica automáticamente leads calientes vs fríos. Escala las oportunidades importantes al equipo de ventas en el momento exacto."
      }, {
        title: "Seguimiento Proactivo",
        description: "No espera a que el cliente regrese. Envía seguimientos personalizados basados en el contexto de cada conversación."
      }, {
        title: "Programación de Citas",
        description: "Agenda demostraciones, visitas y reuniones directamente desde la conversación, sin intervención humana."
      }],
      benefits: ["Atención 24/7 sin aumentar costos", "Tiempo de respuesta menor a 30 segundos", "Aumento del 60% en leads calificados", "Reducción del 80% en consultas repetitivas", "Experiencia de cliente excepcional"]
    }
  }, {
    icon: BarChart,
    name: "SIERRA DATA",
    emoji: "📊",
    description: "Reportes y dashboards en tiempo real para decisiones basadas en datos.",
    highlight: "Control y visibilidad completa de tu negocio.",
    detailedInfo: {
      title: "SIERRA DATA - Inteligencia para Decisiones",
      subtitle: "Convierte tus datos en ventaja competitiva",
      features: [{
        title: "Dashboard en Tiempo Real",
        description: "Visualiza el estado de tu negocio al instante: leads activos, pipeline de ventas, conversiones, y KPIs críticos en una sola pantalla."
      }, {
        title: "Análisis Predictivo",
        description: "Modelos de IA que predicen tendencias de ventas, ocupación, y comportamiento de clientes. Anticípate al mercado en lugar de reaccionar."
      }, {
        title: "Reportes Personalizados",
        description: "Crea reportes específicos para cada stakeholder: ejecutivos, ventas, operaciones. La información correcta para cada persona."
      }, {
        title: "Alertas Inteligentes",
        description: "Recibe notificaciones automáticas sobre oportunidades, riesgos, y cambios importantes en tus métricas clave."
      }, {
        title: "Integración de Fuentes",
        description: "Consolida datos de todas tus plataformas: CRM, PMS, redes sociales, analytics web. Una sola fuente de verdad."
      }],
      benefits: ["Decisiones basadas en datos, no intuición", "Identificación temprana de oportunidades", "Optimización continua de estrategias", "Transparencia total del negocio", "Reportería ejecutiva en segundos, no días"]
    }
  }];
  return <section className="py-32 px-6 md:px-12 bg-secondary/30 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-0 w-px h-full bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        <div className="absolute top-1/3 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-accent/30 to-transparent" />
        <div className="absolute top-1/4 right-0 w-px h-full bg-gradient-to-b from-transparent via-accent/50 to-transparent" />
      </div>

      <div className="container relative z-10 rounded-2xl bg-amber-50">
        <div className="relative text-center space-y-6 mb-20 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
            Elige tu
            <Dialog open={isInfoOpen} onOpenChange={setIsInfoOpen}>
              <DialogTrigger asChild>
                <button className="relative md:absolute md:left-1/2 md:-translate-x-1/2 md:-top-24 lg:-top-32 xl:-top-40 z-20 inline-flex items-center gap-2 rounded-2xl bg-slate-900 hover:bg-slate-800 text-accent hover:text-accent/80 transition-colors cursor-pointer group align-baseline">
                  estrategia inteligente
                  <Info className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-opacity" />
                </button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="text-3xl font-light text-accent mb-4">
                    ¿Qué es una Estrategia Inteligente?
                  </DialogTitle>
                  <DialogDescription className="text-base text-muted-foreground space-y-6">
                    <p className="leading-relaxed">
                      Una <strong className="text-foreground">estrategia inteligente</strong> en Sierra Smart es un enfoque integral que combina tecnología de automatización con inteligencia artificial para transformar completamente la forma en que tu empresa opera.
                    </p>
                    
                    <div className="space-y-4">
                      <h3 className="text-xl font-light text-foreground">🎯 Beneficios Clave:</h3>
                      <ul className="space-y-3 list-none">
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span><strong className="text-foreground">Automatización Total:</strong> Elimina tareas repetitivas y libera a tu equipo para enfocarse en lo que realmente importa.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span><strong className="text-foreground">IA Personalizada:</strong> Agentes inteligentes que aprenden de tu negocio y atienden a tus clientes 24/7.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span><strong className="text-foreground">Decisiones Basadas en Datos:</strong> Dashboards en tiempo real que te dan visibilidad completa de tu operación.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <span className="text-accent mt-1">•</span>
                          <span><strong className="text-foreground">Escalabilidad:</strong> Crece sin necesidad de aumentar proporcionalmente tu equipo o recursos.</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-xl font-light text-foreground">💡 Casos de Uso:</h3>
                      <div className="grid gap-4">
                        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                          <h4 className="font-medium text-foreground mb-2">Bienes Raíces</h4>
                          <p className="text-sm">Automatiza seguimientos de prospectos, agenda visitas automáticamente, y genera reportes de ventas en tiempo real.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                          <h4 className="font-medium text-foreground mb-2">Hotelería</h4>
                          <p className="text-sm">Gestiona reservas inteligentemente, responde dudas de huéspedes 24/7, y optimiza la ocupación con análisis predictivo.</p>
                        </div>
                        <div className="p-4 rounded-lg bg-accent/5 border border-accent/20">
                          <h4 className="font-medium text-foreground mb-2">Empresas de Servicios</h4>
                          <p className="text-sm">Califica leads automáticamente, programa citas sin intervención humana, y mantiene a tu equipo enfocado en cerrar negocios.</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-accent/10 p-6 rounded-lg border border-accent/30 mt-6">
                      <p className="text-foreground font-light text-center">
                        ✨ <strong>El resultado:</strong> Más tiempo, menos costos operativos, y una experiencia excepcional para tus clientes.
                      </p>
                    </div>
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {packages.map((pkg, index) => <div key={index} className={`group relative p-10 rounded-3xl backdrop-blur-sm border transition-all duration-500 animate-fade-in ${pkg.featured ? "bg-gradient-to-br from-accent/10 to-card border-accent hover:shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.3)]" : "bg-card border-border hover:border-accent/50 hover:shadow-[0_20px_60px_-20px_hsl(var(--accent)/0.15)]"} ${animated ? 'will-change-transform hover:scale-[1.02] hover:-translate-y-1' : ''}`} style={{
          animationDelay: `${index * 0.1}s`
        }}>
              {pkg.featured && <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-2 bg-accent text-accent-foreground rounded-full text-sm font-light">
                  Más Popular
                </div>}

              {/* Icon and Name */}
              <div className="flex items-center gap-4 mb-6">
                <div className="p-4 rounded-2xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <pkg.icon className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <div className="text-3xl mb-1">{pkg.emoji}</div>
                  <h3 className="text-2xl font-light text-foreground tracking-wide">
                    {pkg.name}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-muted-foreground leading-relaxed mb-4 font-normal">
                {pkg.description}
              </p>

              {/* Highlight */}
              <p className="text-sm text-foreground/80 italic mb-8 pl-4 border-l-2 border-accent/50 font-semibold">
                {pkg.highlight}
              </p>

              {/* CTA */}
              <Button
                variant={pkg.featured ? "default" : "outline"}
                className={`w-full rounded-full transition-all duration-300 ${index === 0
                  ? "bg-accent text-accent-foreground hover:bg-accent/90"
                  : index === 1
                  ? "bg-accent/80 text-accent-foreground hover:bg-accent/70"
                  : index === 2
                  ? "bg-accent/60 text-accent-foreground hover:bg-accent/50"
                  : "bg-accent/40 text-accent-foreground hover:bg-accent/30"}`}
                onClick={() => setSelectedPackage(index)}
              >
                Más información
              </Button>

              {/* Hover Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>)}
        </div>

        {/* Package Detail Dialog */}
        {selectedPackage !== null && packages[selectedPackage].detailedInfo && <Dialog open={selectedPackage !== null} onOpenChange={() => setSelectedPackage(null)}>
            <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <div className="flex items-center gap-4 mb-2">
                  <div className="p-3 rounded-2xl bg-accent/10">
                    {(() => {
                  const PackageIcon = packages[selectedPackage].icon;
                  return <PackageIcon className="w-8 h-8 text-accent" />;
                })()}
                  </div>
                  <div className="text-4xl">{packages[selectedPackage].emoji}</div>
                </div>
                <DialogTitle className="text-3xl font-light text-accent">
                  {packages[selectedPackage].detailedInfo.title}
                </DialogTitle>
                <DialogDescription className="text-lg text-muted-foreground">
                  {packages[selectedPackage].detailedInfo.subtitle}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-8 mt-6">
                {/* Features Section */}
                <div>
                  <h3 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2">
                    <span className="text-accent">✨</span>
                    Características Principales
                  </h3>
                  <div className="space-y-4">
                    {packages[selectedPackage].detailedInfo.features.map((feature, idx) => <div key={idx} className="p-4 rounded-lg bg-accent/5 border border-accent/20 hover:bg-accent/10 transition-colors">
                        <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                          <span className="text-accent">•</span>
                          {feature.title}
                        </h4>
                        <p className="text-muted-foreground pl-4 text-base">
                          {feature.description}
                        </p>
                      </div>)}
                  </div>
                </div>

                {/* Benefits Section */}
                <div>
                  <h3 className="text-2xl font-light text-foreground mb-6 flex items-center gap-2">
                    <span className="text-accent">🎯</span>
                    Beneficios Clave
                  </h3>
                  <div className="grid gap-3">
                    {packages[selectedPackage].detailedInfo.benefits.map((benefit, idx) => <div key={idx} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent/5 transition-colors">
                        <span className="text-accent mt-0.5 flex-shrink-0">✓</span>
                        <span className="text-foreground">{benefit}</span>
                      </div>)}
                  </div>
                </div>

                {/* CTA Section */}
                <div className="bg-accent/10 p-6 rounded-lg border border-accent/30 mt-8">
                  <p className="text-foreground font-light text-center mb-4">
                    ¿Listo para transformar tu negocio con <strong>{packages[selectedPackage].name}</strong>?
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button className="bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => {
                  setSelectedPackage(null);
                  window.location.href = '/contacto';
                }}>
                      Ir a Contacto
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedPackage(null)}>
                      Cerrar
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>}
      </div>
    </section>;
};
export default Packages;