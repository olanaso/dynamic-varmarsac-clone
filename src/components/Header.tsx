import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ClipboardList, ChevronDown } from "lucide-react";
import { Logo } from "./Logo";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/servicios", label: "Servicios", hasDropdown: true },
  { to: "/proyectos", label: "Proyectos" },
  { to: "/contacto", label: "Contacto" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 md:px-8">
        <Link to="/"><Logo /></Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="group relative flex items-center gap-1 rounded-md px-4 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-brand-blue"
              activeProps={{ className: "text-brand-blue" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
              {item.hasDropdown && <ChevronDown className="h-3.5 w-3.5" />}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 -translate-x-1/2 bg-brand-blue transition-all duration-300 group-hover:w-2/3" />
            </Link>
          ))}
        </nav>

        <Link
          to="/contacto"
          className="hidden items-center gap-2 rounded-lg bg-brand-red px-5 py-3 text-sm font-semibold text-white shadow-md transition-all hover:scale-105 hover:shadow-lg lg:inline-flex"
        >
          <ClipboardList className="h-4 w-4" />
          Solicitar Cotización
        </Link>

        <button onClick={() => setOpen(!open)} className="rounded-md p-2 lg:hidden" aria-label="Menú">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <nav className="flex flex-col p-4">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-4 py-3 text-sm font-medium hover:bg-brand-soft"
                activeProps={{ className: "text-brand-blue bg-brand-soft" }}
                activeOptions={{ exact: item.to === "/" }}
              >
                {item.label}
              </Link>
            ))}
            <Link to="/contacto" onClick={() => setOpen(false)} className="mt-2 rounded-lg bg-brand-red px-5 py-3 text-center text-sm font-semibold text-white">
              Solicitar Cotización
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
