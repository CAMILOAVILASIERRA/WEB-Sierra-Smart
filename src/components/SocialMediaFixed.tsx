import * as React from "react";
import { Linkedin, Instagram, Youtube } from "lucide-react";

const TikTokIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M14.5 3.5c.8.7 1.8 1.2 2.9 1.4V7c-1.6-.2-3.1-.8-4.4-1.8v7.1c0 3.4-2.8 6.2-6.2 6.2S.6 15.7.6 12.3c0-3.4 2.8-6.2 6.2-6.2.7 0 1.4.1 2 .3v3.1c-.6-.2-1.3-.4-2-.4-2.1 0-3.8 1.7-3.8 3.8s1.7 3.8 3.8 3.8 3.8-1.7 3.8-3.8V3h3.1z" />
  </svg>
);

const SocialMediaFixed = () => {
  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4 animate-fade-in">
      <a
        href="https://www.linkedin.com/company/sierra-towers/?viewAsMember=true"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-card/95 backdrop-blur-sm hover:bg-accent/20 border border-border hover:border-accent/50 shadow-lg hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)] transition-all duration-300 group"
        aria-label="LinkedIn"
      >
        <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
      </a>
      <a
        href="https://www.instagram.com/sierra.towers.sas?igsh=MTlmNWdjNHQzdmN2YQ%3D%3D&utm_source=qr"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-card/95 backdrop-blur-sm hover:bg-accent/20 border border-border hover:border-accent/50 shadow-lg hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)] transition-all duration-300 group"
        aria-label="Instagram"
      >
        <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-card/95 backdrop-blur-sm hover:bg-accent/20 border border-border hover:border-accent/50 shadow-lg hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)] transition-all duration-300 group"
        aria-label="TikTok"
      >
        <TikTokIcon className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
      </a>
      <a
        href="#"
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-card/95 backdrop-blur-sm hover:bg-accent/20 border border-border hover:border-accent/50 shadow-lg hover:shadow-[0_0_20px_hsl(var(--accent)/0.3)] transition-all duration-300 group"
        aria-label="YouTube"
      >
        <Youtube className="w-5 h-5 text-muted-foreground group-hover:text-accent transition-colors" />
      </a>
    </div>
  );
};

export default SocialMediaFixed;
