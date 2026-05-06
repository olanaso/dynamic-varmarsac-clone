import { createFileRoute, Link } from "@tanstack/react-router";
import { Building2, Wrench, Sparkles, Zap, Droplets, HardHat, ArrowRight } from "lucide-react";
import obras from "@/assets/obras-civiles.jpg";
import servicios from "@/assets/servicios-generales.jpg";
import proyectos from "@/assets/proyectos-integrales.jpg";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — VARMAR Contratistas Generales" },
      { name: "description", content: "Obras civiles, mantenimiento industrial, instalaciones eléctricas y sanitarias, y proyectos integrales." },
    ],
  }),
  component: Servicios,
});

const items = [
  { icon: Building2, title: "Obras Civiles", img: obras, desc: "Diseño y construcción de edificaciones, naves industriales, infraestructura y obras complementarias." },
  { icon: Wrench, title: "Mantenimiento Industrial", img: servicios, desc: "Mantenimiento preventivo y correctivo de equipos, plantas e instalaciones industriales." },
  { icon: Sparkles, title: "Proyectos Integrales", img: proyectos, desc: "Gestión llave en mano: ingeniería, procura y construcción para tu proyecto." },
  { icon: Zap, title: "Instalaciones Eléctricas", img: servicios, desc: "Diseño, montaje y mantenimiento de sistemas eléctricos en baja y media tensión." },
  { icon: Droplets, title: "Instalaciones Sanitarias", img: obras, desc: "Sistemas de agua, desagüe y contra incendio con normativa vigente." },
  { icon: HardHat, title: "Seguridad y SST", img: proyectos, desc: "Implementación de protocolos de seguridad y salud en el trabajo." },
];

function Servicios() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-soft to-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">Lo que hacemos</span>
          <h1 className="mt-3 text-3xl font-extrabold text-brand-blue-dark md:text-4xl">Nuestros Servicios</h1>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/70">
            Soluciones integrales para los sectores construcción, industrial y comercial.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <article
              key={s.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]"
              style={{ animation: `fadeUp 0.5s ${i * 0.08}s both` }}
            >
              <div className="relative h-52 overflow-hidden">
                <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/70 to-transparent" />
                <div className="absolute bottom-4 left-4 grid h-12 w-12 place-items-center rounded-xl bg-brand-red text-white shadow-lg"><s.icon /></div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-blue-dark">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">{s.desc}</p>
                <Link to="/contacto" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                  Cotizar <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
