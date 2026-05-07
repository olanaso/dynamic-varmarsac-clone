import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Mail, Phone, Facebook, Linkedin, Instagram, Youtube, Twitter } from "lucide-react";
import { Logo } from "./Logo";

const nav: { to: "/" | "/nosotros" | "/servicios" | "/proyectos" | "/contacto"; label: string }[] = [
  { to: "/", label: "INICIO" },
  { to: "/nosotros", label: "NOSOTROS" },
  { to: "/servicios", label: "SERVICIOS" },
  { to: "/proyectos", label: "PROYECTOS" },
  { to: "/contacto", label: "CONTÁCTENOS" },
];

const socials = [
  { Icon: Facebook, href: "#" },
  { Icon: Linkedin, href: "#" },
  { Icon: Instagram, href: "#" },
  { Icon: Youtube, href: "#" },
  { Icon: Twitter, href: "#" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top utility bar */}
      <div className="border-b border-border/60 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-3 md:flex-row md:px-8">
          <Link to="/"><Logo /></Link>

          <div className="flex flex-col items-center gap-3 md:flex-row md:gap-6">
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-foreground/80">
              <a href="mailto:contacto@varmar.com" className="flex items-center gap-2 hover:text-brand-red">
                <Mail className="h-4 w-4 text-brand-red" />
                contacto@varmar.com
              </a>
              <a href="tel:+51900000000" className="flex items-center gap-2 hover:text-brand-red">
                <Phone className="h-4 w-4 text-brand-red" />
                +51 900 000 000
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                {socials.map(({ Icon, href }, i) => (
                  <a
                    key={i}
                    href={href}
                    className="grid h-7 w-7 place-items-center rounded-full bg-foreground text-white transition hover:bg-brand-red"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
              <Link
                to="/contacto"
                className="rounded-sm bg-brand-red px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition hover:brightness-110"
              >
                Cotizar Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav bar */}
      <div className="border-b border-border/60 bg-[#f3f3f3]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 md:px-8">
          <nav className="hidden flex-1 items-stretch justify-center lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="relative px-7 py-4 text-xs font-bold uppercase tracking-wider text-foreground/75 transition-colors hover:text-sky-500"
                activeProps={{ className: "bg-sky-500 text-white hover:text-white" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button onClick={() => setOpen(!open)} className="ml-auto rounded-sm p-3 lg:hidden" aria-label="Menú">
            {open ? <X /> : <Menu />}
          </button>
        </div>

        {open && (
          <nav className="flex flex-col bg-white lg:hidden">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="border-t border-border px-5 py-3 text-xs font-bold uppercase tracking-wider text-foreground/80"
                activeProps={{ className: "bg-sky-500 text-white" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}
