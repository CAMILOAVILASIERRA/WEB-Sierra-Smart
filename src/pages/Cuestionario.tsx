import SocialMediaFixed from "@/components/SocialMediaFixed";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const Cuestionario = () => {
  const questionnaireUrl = (import.meta.env.VITE_CUESTIONARIO_URL as string) || "http://localhost:8080/Cuestionario/";

  return (
    <main className="min-h-screen bg-background">
      <SocialMediaFixed />

      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl md:text-4xl font-extralight tracking-tight text-foreground">Escaneo Digital — Cuestionario</h1>
          <p className="text-base md:text-lg font-light text-muted-foreground">Responde el cuestionario para iniciar tu diagnóstico. Si prefieres abrirlo en una nueva pestaña, usa el botón.</p>

          <div className="flex gap-3">
            <a href={questionnaireUrl} target="_blank" rel="noopener noreferrer">
              <Button className="font-light bg-accent text-accent-foreground hover:bg-accent/90 rounded-full">
                Abrir en nueva pestaña <ExternalLink className="w-4 h-4" />
              </Button>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-border bg-card">
            <iframe
              title="Cuestionario"
              src={questionnaireUrl}
              className="w-full h-[75vh]"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Cuestionario;