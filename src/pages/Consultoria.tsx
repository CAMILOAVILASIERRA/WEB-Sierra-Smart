import SocialMediaFixed from "@/components/SocialMediaFixed";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import { Brain, AlertTriangle, Timer, BarChart3, Compass, Network, TrendingUp, CheckCircle2, Quote, Settings } from "lucide-react";
import LogoVideo from "@/assets/VIDEO/Animación_de_Logo_Futurista_y_Llamativo.mp4";

const Consultoria = () => {
  const questionnaireUrl = (import.meta.env.VITE_CUESTIONARIO_URL as string) || "/Cuestionario/";
  // Metadatos SEO para la página de Consultoría
  useEffect(() => {
    const title = "Consultoría Estratégica y Escaneo Digital | Sierra Smart";
    const description =
      "Deja de trabajar más y trabaja con inteligencia. Obtén tu Escaneo Digital gratuito (valorado en $497 USD) y diseña tu ventaja competitiva sostenible con IA, automatización y precisión.";
    const keywords =
      "consultoría estratégica, escaneo digital gratuito, soluciones inteligentes, automatización de procesos, inteligencia artificial, ventaja competitiva, eficiencia empresarial, optimización de procesos";

    document.title = title;

    const setMeta = (name: string, content: string) => {
      let tag = document.querySelector(`meta[name="${name}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", name);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("keywords", keywords);
  }, []);

  // Sub ventana (Sheet) eliminada: no se gestionan estados de iframe

  return (
    <main className="min-h-screen bg-background">
      <SocialMediaFixed />

      {/* 💥 Sección Principal (El Impacto) */}
      <section className="py-24 px-6 md:px-12 border-b border-border">
        <div className="container max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Left: Texto */}
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
                Deja de trabajar MÁS. Trabaja con inteligencia. Diseña tu ventaja competitiva sostenible.
              </h1>
              <h2 className="text-xl md:text-2xl font-light text-foreground/90 max-w-4xl">
                Somos el aliado estratégico que implementa IA y automatización para acelerar su competitividad, fortalecer la toma de decisiones y generar resultados medibles.
              </h2>
              <div>
                <Button asChild className="font-light bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                  <a href={questionnaireUrl}>
                    Obtén tu Escaneo Digital Gratuito (valorado en $497 USD)
                  </a>
                </Button>
                {/* Botones de cuestionario removidos según solicitud */}
              </div>
            </div>

            {/* Right: Caja cuadrada con video */}
            <div className="flex justify-center lg:justify-end">
              <div className="aspect-square w-full max-w-[420px] rounded-2xl overflow-hidden border border-border bg-card">
                <video
                  src={LogoVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub ventana (Sheet) con el cuestionario embebido — eliminada */}

      {/* ❓ El Dolor y la Solución (Conexión Inmediata) */}
      <section className="py-24 px-6 md:px-12 border-b border-border">
        <div className="container max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-block mb-3"><AlertTriangle className="w-6 h-6 text-accent" /></div>
              <p className="font-light text-foreground">¿Siente que su crecimiento está estancado? La intuición no es suficiente: necesita precisión y control.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-block mb-3"><Timer className="w-6 h-6 text-accent" /></div>
              <p className="font-light text-foreground">Sus procesos operativos consumen demasiado tiempo y limitan su productividad.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-block mb-3"><BarChart3 className="w-6 h-6 text-accent" /></div>
              <p className="font-light text-foreground">La toma de decisiones es lenta y no está basada en analítica inteligente.</p>
            </div>
          </div>
          <div className="rounded-2xl border border-accent/40 bg-accent/10 p-6">
            <p className="text-base md:text-lg font-light text-foreground">
              <span className="font-normal">La promesa Sierra Smart:</span> no solo implementamos tecnología; transformamos necesidades en sistemas eficientes, escalables y de alto impacto, garantizando una ventaja competitiva sostenible.
            </p>
          </div>
        </div>
      </section>

      {/* ✨ El DNA Empresarial Inteligente (Nuestros Pilares) */}
      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground">Así lo logramos: ingeniería aplicada y visión estratégica</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-block mb-3"><Compass className="w-6 h-6 text-accent" /></div>
              <h3 className="text-xl font-light mb-2">Diagnóstico estratégico</h3>
              <p className="text-sm font-light text-muted-foreground">Mapa de oportunidades digitales: identificamos dónde y cómo la IA y la automatización reducen tiempos operativos e impulsan la optimización de procesos.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-block mb-3"><Network className="w-6 h-6 text-accent" /></div>
              <h3 className="text-xl font-light mb-2">Arquitectura tecnológica</h3>
              <p className="text-sm font-light text-muted-foreground">Sistemas eficientes y escalables: integramos tecnología, datos y visión para crecer hacia modelos sostenibles orientados al resultado.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-block mb-3"><TrendingUp className="w-6 h-6 text-accent" /></div>
              <h3 className="text-xl font-light mb-2">Crecimiento medible</h3>
              <p className="text-sm font-light text-muted-foreground">Fortalece la competitividad: convertimos desafíos en resultados medibles y oportunidades reales, aportando confiabilidad, eficiencia y control.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🗺️ Tu Camino Hacia la Eficiencia (Metodología Simple) */}
      <section className="py-24 px-6 md:px-12 border-t border-border bg-secondary/10">
        <div className="container max-w-6xl mx-auto space-y-8">
          <h2 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground text-center">Tres pasos para diseñar su evolución</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-flex items-center gap-2 mb-3"><Brain className="w-6 h-6 text-accent" /><span className="text-sm font-normal">Comprender</span></div>
              <p className="text-sm font-light text-muted-foreground">Diagnóstico profundo: entendemos su entorno para identificar desafíos y el punto de partida.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-flex items-center gap-2 mb-3"><Settings className="w-6 h-6 text-accent" /><span className="text-sm font-normal">Diseñar</span></div>
              <p className="text-sm font-light text-muted-foreground">Estrategia de precisión: estructuramos propuesta de valor y modelo de negocio y creamos soluciones inteligentes aplicadas.</p>
            </div>
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="p-3 rounded-xl bg-accent/10 inline-flex items-center gap-2 mb-3"><CheckCircle2 className="w-6 h-6 text-accent" /><span className="text-sm font-normal">Potenciar</span></div>
              <p className="text-sm font-light text-muted-foreground">Transformación sostenible: implementamos y acompañamos como aliado de largo plazo, convirtiendo necesidades en resultados medibles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🤝 Cierre (El Próximo Paso) */}
      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-6xl mx-auto text-center space-y-6">
          <div className="max-w-3xl mx-auto">
            <div className="rounded-2xl border border-border bg-card/60 p-6">
              <div className="flex items-start gap-3">
                <Quote className="w-6 h-6 text-accent" />
                <p className="text-base md:text-lg font-light text-muted-foreground text-left">
                  “En Sierra Smart garantizamos la calidad de nuestras soluciones mediante el cumplimiento riguroso de los requisitos y expectativas de nuestros clientes.”
                </p>
              </div>
            </div>
          </div>
          <p className="text-base md:text-lg font-light text-foreground">¿Listo para escalar con inteligencia y precisión? Obtenga el informe que cambiará la forma en que ve su negocio.</p>
          <NavLink to="/contacto#appointment-form">
            <Button className="font-light bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
              Agenda tu Escaneo Digital y comienza a diseñar tu ventaja
            </Button>
          </NavLink>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Consultoria;