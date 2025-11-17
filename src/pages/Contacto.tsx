import SocialMediaFixed from "@/components/SocialMediaFixed";
import Footer from "@/components/Footer";
import AppointmentForm from "@/components/AppointmentForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock, Award, Users, Sparkles, Wrench } from "lucide-react";
import LogoVideo from "@/assets/VIDEO/Animación_de_Logo_Futurista_y_Llamativo.mp4";

const Contacto = () => {
  return (
    <main className="min-h-screen bg-background">
      <SocialMediaFixed />
      {/* Video bajo el header */}
      <section className="px-6 md:px-12 pt-6">
        <div className="container max-w-6xl mx-auto">
          <div className="rounded-3xl overflow-hidden border border-border bg-black">
            <video
              src={LogoVideo}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-[240px] md:h-[360px] lg:h-[480px] xl:h-[560px] object-cover"
            />
          </div>
        </div>
      </section>
      <section className="py-24 px-6 md:px-12 border-b border-border">
        <div className="container max-w-6xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
            Contacto
          </h1>
          <p className="text-lg md:text-xl font-light text-muted-foreground">
            Déjanos tus datos y conversemos sobre tus objetivos. Te contactamos pronto.
          </p>
          {/* Grid: info left / form right */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left: Contact Info Cards */}
            <div className="space-y-4">
              <Card className="rounded-2xl border border-border bg-card">
                <CardHeader className="flex-row items-center gap-3">
                  <div className="p-3 rounded-xl bg-accent/10"><Mail className="w-5 h-5 text-accent" /></div>
                  <CardTitle className="font-light">Email</CardTitle>
                </CardHeader>
                <CardContent className="text-sm font-light">
                  <p>servicios@sierratowers.ai</p>
                  <p>contacto@sierratowers.ai</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border border-border bg-card">
                <CardHeader className="flex-row items-center gap-3">
                  <div className="p-3 rounded-xl bg-accent/10"><Phone className="w-5 h-5 text-accent" /></div>
                  <CardTitle className="font-light">Teléfono</CardTitle>
                </CardHeader>
                <CardContent className="text-sm font-light">
                  <p>+57 300 000 0000</p>
                  <p>+57 320 000 0000</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border border-border bg-card">
                <CardHeader className="flex-row items-center gap-3">
                  <div className="p-3 rounded-xl bg-accent/10"><MapPin className="w-5 h-5 text-accent" /></div>
                  <CardTitle className="font-light">Dirección</CardTitle>
                </CardHeader>
                <CardContent className="text-sm font-light">
                  <p>Bogotá, Colombia</p>
                </CardContent>
              </Card>
              <Card className="rounded-2xl border border-border bg-card">
                <CardHeader className="flex-row items-center gap-3">
                  <div className="p-3 rounded-xl bg-accent/10"><Clock className="w-5 h-5 text-accent" /></div>
                  <CardTitle className="font-light">Horario de Atención</CardTitle>
                </CardHeader>
                <CardContent className="text-sm font-light">
                  <p>Lunes a Viernes: 9:00 AM – 6:00 PM</p>
                </CardContent>
              </Card>
            </div>

            {/* Right: Contact Form */}
            <div>
              <AppointmentForm embedded />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-8">Por qué elegir Sierra Smart</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="rounded-2xl border border-border bg-card/60">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-xl bg-accent/10"><Award className="w-6 h-6 text-accent" /></div>
                <CardTitle className="font-light">Experiencia</CardTitle>
              </CardHeader>
              <CardContent className="text-sm font-light text-center">Más de una década optimizando operaciones.</CardContent>
            </Card>
            <Card className="rounded-2xl border border-border bg-card/60">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-xl bg-accent/10"><Users className="w-6 h-6 text-accent" /></div>
                <CardTitle className="font-light">Equipo de Expertos</CardTitle>
              </CardHeader>
              <CardContent className="text-sm font-light text-center">Consultores y desarrolladores especializados.</CardContent>
            </Card>
            <Card className="rounded-2xl border border-border bg-card/60">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-xl bg-accent/10"><Sparkles className="w-6 h-6 text-accent" /></div>
                <CardTitle className="font-light">Innovación Constante</CardTitle>
              </CardHeader>
              <CardContent className="text-sm font-light text-center">Tecnología inteligente para mejores decisiones.</CardContent>
            </Card>
            <Card className="rounded-2xl border border-border bg-card/60">
              <CardHeader className="items-center text-center">
                <div className="p-3 rounded-xl bg-accent/10"><Wrench className="w-6 h-6 text-accent" /></div>
                <CardTitle className="font-light">Soluciones a Medida</CardTitle>
              </CardHeader>
              <CardContent className="text-sm font-light text-center">Proyectos personalizados según tu operación.</CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-24 px-6 md:px-12">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-light text-center mb-6">Visítanos en Bogotá</h2>
          <div className="rounded-3xl overflow-hidden border border-border bg-card">
            <iframe
              title="Mapa Bogotá"
              loading="lazy"
              className="w-full h-[300px] md:h-[420px]"
              src="https://www.google.com/maps?q=Bogota,Colombia&output=embed"
            />
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contacto;