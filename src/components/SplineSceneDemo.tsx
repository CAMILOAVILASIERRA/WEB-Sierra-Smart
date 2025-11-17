import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card";
import { Spotlight } from "@/components/ui/spotlight";
export function SplineSceneBasic() {
  return <Card className="w-full h-[500px] bg-gradient-to-br from-primary via-primary/95 to-secondary relative overflow-hidden border-border/50">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="hsl(var(--accent))" />
      
      <div className="flex flex-col md:flex-row h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <h1 className="text-4xl bg-clip-text text-transparent bg-gradient-to-b from-primary-foreground to-primary-foreground/70 font-bold md:text-5xl">SIERRA ONE</h1>
          <p className="mt-4 max-w-lg text-stone-300 font-normal text-lg">Con la precisión de un reloj suizo y la mirada puesta en el futuro, convierto cada proyecto en una experiencia exclusiva, reservada para quienes buscan el más alto nivel.</p>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" className="w-full h-full" />
        </div>
      </div>
    </Card>;
}