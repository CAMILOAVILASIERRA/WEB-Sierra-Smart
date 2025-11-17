import * as React from "react";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.5 3.5c.8.7 1.8 1.2 2.9 1.4V7c-1.6-.2-3.1-.8-4.4-1.8v7.1c0 3.4-2.8 6.2-6.2 6.2S.6 15.7.6 12.3c0-3.4 2.8-6.2 6.2-6.2.7 0 1.4.1 2 .3v3.1c-.6-.2-1.3-.4-2-.4-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8 3.8-1.7 3.8-3.8V3h3.1z" />
  </svg>
);

const Footer = () => {
  return (
    <footer className="py-16 px-6 md:px-12 border-t border-border bg-secondary/20">
      <div className="container">
        <div className="max-w-6xl mx-auto">
          {/* Main Footer Content */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            {/* Brand */}
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-light tracking-wide text-foreground mb-2">
                Sierra Smart
              </h3>
              <p className="text-sm font-light text-muted-foreground">
                Consultoría IA en Real Estate y Hotelería
              </p>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/company/sierra-towers/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-accent/10 border border-border hover:border-accent/50 transition-all duration-300 group"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/sierra.towers.sas?igsh=MTlmNWdjNHQzdmN2YQ%3D%3D&utm_source=qr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-accent/10 border border-border hover:border-accent/50 transition-all duration-300 group"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-accent/10 border border-border hover:border-accent/50 transition-all duration-300 group"
                aria-label="TikTok"
              >
                <TikTokIcon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-card hover:bg-accent/10 border border-border hover:border-accent/50 transition-all duration-300 group"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border mb-8" />

          {/* Bottom Footer */}
          <div className="text-center space-y-2">
            <p className="text-sm font-light text-muted-foreground">
              © 2025 Sierra Smart — Hecho por arquitectos de sistemas inteligentes
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
