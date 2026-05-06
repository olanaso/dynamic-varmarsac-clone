import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Award, Users } from "lucide-react";
import hero from "@/assets/hero-construction.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — VARMAR Contratistas Generales" },
      { name: "description", content: "Conoce VARMAR: nuestra historia, misión, visión y compromiso con la calidad." },
    ],
  }),
  component: Nosotros,
});

function Nosotros() {
  return (
    <>
      <section className="relative bg-brand-blue-dark py-20 text-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${hero})`, backgroundSize: "cover" }} />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-red">Sobre nosotros</span>
          <h1 className="mt-3 text-5xl font-extrabold md:text-6xl">Construyendo el futuro,<br/>desde hace más de 15 años</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-blue-dark md:text-4xl">Quiénes somos</h2>
            <div className="mt-3 h-1 w-20 rounded-full bg-brand-red" />
            <p className="mt-6 text-foreground/75 leading-relaxed">
              VARMAR Contratistas Generales es una empresa peruana especializada en obras civiles,
              servicios generales y proyectos integrales. Trabajamos con altos estándares de calidad,
              seguridad y cumplimiento, integrando equipos multidisciplinarios que entregan resultados.
            </p>
            <p className="mt-4 text-foreground/75 leading-relaxed">
              Nuestra cultura se basa en la confianza, la mejora continua y el compromiso con cada cliente.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              { icon: Target, t: "Misión", d: "Brindar soluciones integrales con calidad, seguridad y eficiencia." },
              { icon: Eye, t: "Visión", d: "Ser referente nacional en construcción y servicios generales." },
              { icon: Award, t: "Calidad", d: "Estándares certificados y procesos auditados." },
              { icon: Users, t: "Equipo", d: "Profesionales comprometidos y certificados." },
            ].map((c) => (
              <div key={c.t} className="rounded-2xl bg-white p-6 shadow-[var(--shadow-card)] transition hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-blue text-white"><c.icon /></div>
                <h3 className="mt-4 font-bold text-brand-blue-dark">{c.t}</h3>
                <p className="mt-1 text-sm text-foreground/70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
