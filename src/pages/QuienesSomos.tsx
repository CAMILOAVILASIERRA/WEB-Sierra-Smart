import SocialMediaFixed from "@/components/SocialMediaFixed";
import Footer from "@/components/Footer";
import Promise from "@/components/Promise";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const QuienesSomos = () => {
  return (
    <main className="min-h-screen bg-background">
      <SocialMediaFixed />
      <section className="py-24 px-6 md:px-12 border-b border-border">
        <div className="container max-w-5xl mx-auto space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
              ¿Quiénes Somos?
            </h1>
            <p className="text-lg md:text-xl font-light text-muted-foreground">
              En Sierra Smart combinamos consultoría estratégica y desarrollo tecnológico para optimizar procesos,
              mejorar la experiencia de tus clientes y escalar tu negocio con tranquilidad.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-light">Nuestra Misión</CardTitle>
                <CardDescription>
                  Acompañarte a construir sistemas eficientes que trabajen por tu negocio.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm md:text-base font-light text-foreground">
                Diseñamos soluciones que automatizan tareas, integran datos y te brindan control en tiempo real.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="font-light">Nuestra Forma de Trabajo</CardTitle>
                <CardDescription>
                  Escuchamos, analizamos y ejecutamos con foco en resultados.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-sm md:text-base font-light text-foreground">
                Usamos herramientas modernas y procesos claros para que avances con confianza y velocidad.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Promise />
      <Footer />
    </main>
  );
};

export default QuienesSomos;