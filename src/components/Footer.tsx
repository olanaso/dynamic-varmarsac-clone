import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Facebook, Linkedin, Instagram } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-brand-blue-dark text-white/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <div className="rounded-sm bg-white/95 p-3 inline-block"><Logo /></div>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Soluciones integrales en obras civiles y servicios generales con calidad, seguridad y confianza.
          </p>
          <div className="mt-5 flex gap-3">
            {[Facebook, Linkedin, Instagram].map((Icon, i) => (
              <a key={i} href="#" className="grid h-9 w-9 place-items-center rounded-sm bg-white/10 transition hover:bg-brand-red">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Enlaces</h4>
          <ul className="space-y-2 text-sm">
            {[["/", "Inicio"], ["/nosotros", "Nosotros"], ["/servicios", "Servicios"], ["/proyectos", "Proyectos"], ["/contacto", "Contacto"]].map(([to, l]) => (
              <li key={to}><Link to={to} className="text-white/70 transition hover:text-white">{l}</Link></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Servicios</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Obras Civiles</li>
            <li>Mantenimiento Industrial</li>
            <li>Servicios Eléctricos</li>
            <li>Instalaciones Sanitarias</li>
            <li>Proyectos Integrales</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider">Contacto</h4>
          <ul className="space-y-3 text-sm text-white/80">
            <li className="flex gap-3"><MapPin className="h-4 w-4 mt-0.5 text-brand-red shrink-0" /> Av. Industrial 123, Lima — Perú</li>
            <li className="flex gap-3"><Phone className="h-4 w-4 mt-0.5 text-brand-red shrink-0" /> +51 999 888 777</li>
            <li className="flex gap-3"><Mail className="h-4 w-4 mt-0.5 text-brand-red shrink-0" /> contacto@varmar.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} VARMAR Contratistas Generales. Todos los derechos reservados.
      </div>
    </footer>
  );
}
