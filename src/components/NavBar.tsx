import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import sierraLogo from "@/assets/sierra-towers-logo.png";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? "text-accent" : "text-foreground";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur">
      <div className="container relative flex items-center justify-between px-6 md:px-12 py-0 md:py-[1mm]">
        <NavLink to="/" className="flex items-center gap-3 md:gap-3 font-light tracking-wide leading-none text-base md:text-2xl lg:text-3xl">
          <img src={sierraLogo} alt="Sierra Smart Logo" className="block w-12 h-12 sm:w-14 sm:h-14 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain drop-shadow-[0_0_12px_hsl(var(--accent)/0.45)] animate-pulse" />
          <span className="bg-gradient-to-r from-foreground via-accent to-foreground bg-clip-text text-transparent bg-[length:200%_auto] animate-shimmer">Sierra Smart</span>
        </NavLink>
        <nav className="hidden md:flex items-center gap-2 md:gap-3">
          <NavLink to="/" className={linkClass}>
            <Button variant="ghost" className="font-light group">
              <span className="text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:via-accent group-hover:to-foreground group-hover:bg-clip-text group-hover:bg-[length:200%_auto] group-hover:animate-shimmer">Inicio</span>
            </Button>
          </NavLink>
          <NavLink to="/quienes-somos" className={linkClass}>
            <Button variant="ghost" className="font-light group">
              <span className="text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:via-accent group-hover:to-foreground group-hover:bg-clip-text group-hover:bg-[length:200%_auto] group-hover:animate-shimmer">Quiénes Somos</span>
            </Button>
          </NavLink>
          <NavLink to="/consultoria" className={linkClass}>
            <Button variant="ghost" className="font-light group">
              <span className="text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:via-accent group-hover:to-foreground group-hover:bg-clip-text group-hover:bg-[length:200%_auto] group-hover:animate-shimmer">Consultoría</span>
            </Button>
          </NavLink>
          <NavLink to="/contacto" className={linkClass}>
            <Button variant="ghost" className="font-light group">
              <span className="text-foreground group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-foreground group-hover:via-accent group-hover:to-foreground group-hover:bg-clip-text group-hover:bg-[length:200%_auto] group-hover:animate-shimmer">Contacto</span>
            </Button>
          </NavLink>
        </nav>
        {/* Mobile Toggle */}
        <button
          aria-label="Abrir menú"
          className="md:hidden p-2 rounded-lg border border-border bg-card hover:bg-accent/10 transition-all"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        {open && (
          <div className="absolute top-full right-6 md:hidden mt-2 rounded-xl border border-border bg-card/95 backdrop-blur-sm shadow-lg w-[260px] max-w-[80vw]">
            <div className="px-2 py-2 flex flex-col gap-1">
              <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start font-light">Inicio</Button>
              </NavLink>
              <NavLink to="/quienes-somos" className={linkClass} onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start font-light">Quiénes Somos</Button>
              </NavLink>
              <NavLink to="/consultoria" className={linkClass} onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start font-light">Consultoría</Button>
              </NavLink>
              <NavLink to="/contacto" className={linkClass} onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start font-light">Contacto</Button>
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default NavBar;