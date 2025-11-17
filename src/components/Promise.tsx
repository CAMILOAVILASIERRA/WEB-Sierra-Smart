import { Clock, Workflow, Star, TrendingUp, Activity } from "lucide-react";
const Promise = () => {
  const promises = [{
    icon: Clock,
    text: "Recupera horas de trabajo cada día"
  }, {
    icon: Workflow,
    text: "Cada proceso fluye automáticamente"
  }, {
    icon: Star,
    text: "Tus clientes lo notan. Tus reseñas lo confirman"
  }, {
    icon: TrendingUp,
    text: "Escala sin perder tu paz mental"
  }, {
    icon: Activity,
    text: "Ten control total en tiempo real"
  }];
  return <section className="py-32 px-6 md:px-12 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />

      <div className="container relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12 animate-fade-in">
          {/* Title */}
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-extralight tracking-tight text-foreground">
              Tu negocio,
              <span className="block mt-2 bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent">elevado por Sistemas Optimizados
            </span>
            </h2>
          </div>

          {/* Promises Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-12">
            {promises.map((promise, index) => <div key={index} className="group flex flex-col items-center text-center space-y-4 p-6 rounded-2xl hover:bg-card/50 transition-all duration-500 animate-fade-in" style={{
            animationDelay: `${index * 0.1}s`
          }}>
                <div className="p-4 rounded-xl bg-accent/10 group-hover:bg-accent/20 transition-colors">
                  <promise.icon className="w-8 h-8 text-accent" />
                </div>
                <p className="text-lg font-light text-foreground leading-relaxed">
                  {promise.text}
                </p>
              </div>)}
          </div>

          {/* Bottom Statement */}
          <div className="pt-16">
            <p className="text-2xl md:text-3xl font-light text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Diseñamos tecnología que trabaja por ti,
              <span className="block mt-2 text-foreground">no al revés.</span>
            </p>
          </div>
        </div>
      </div>
    </section>;
};
export default Promise;