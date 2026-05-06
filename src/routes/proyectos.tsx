import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import obras from "@/assets/obras-civiles.jpg";
import servicios from "@/assets/servicios-generales.jpg";
import proyectos from "@/assets/proyectos-integrales.jpg";
import hero from "@/assets/hero-construction.jpg";

export const Route = createFileRoute("/proyectos")({
  head: () => ({
    meta: [
      { title: "Proyectos — VARMAR Contratistas Generales" },
      { name: "description", content: "Conoce algunos de los proyectos ejecutados por VARMAR." },
    ],
  }),
  component: Proyectos,
});

const list = [
  { img: obras, title: "Edificación corporativa", cat: "Obras civiles", loc: "Lima" },
  { img: proyectos, title: "Nave industrial", cat: "Proyecto integral", loc: "Callao" },
  { img: servicios, title: "Mantenimiento de planta", cat: "Servicios generales", loc: "Arequipa" },
  { img: hero, title: "Centro logístico", cat: "Obras civiles", loc: "Lima" },
  { img: proyectos, title: "Almacén refrigerado", cat: "Proyecto integral", loc: "Trujillo" },
  { img: servicios, title: "Planta de procesamiento", cat: "Servicios generales", loc: "Ica" },
];

function Proyectos() {
  return (
    <>
      <section className="bg-gradient-to-br from-brand-soft to-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">Portafolio</span>
          <h1 className="mt-3 text-5xl font-extrabold text-brand-blue-dark md:text-6xl">Nuestros Proyectos</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <article
              key={i}
              className="group relative h-80 overflow-hidden rounded-2xl shadow-[var(--shadow-card)]"
              style={{ animation: `fadeUp 0.5s ${i * 0.08}s both` }}
            >
              <img src={p.img} alt={p.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark via-brand-blue-dark/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <span className="inline-block rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-wider">{p.cat}</span>
                <h3 className="mt-3 text-xl font-bold">{p.title}</h3>
                <div className="mt-1 flex items-center gap-1 text-xs text-white/80"><MapPin className="h-3 w-3" /> {p.loc}</div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
