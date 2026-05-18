import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import heroBg from "@/assets/about-fleet.jpg";
import img1 from "@/assets/galeria/img1.jpeg";
import img2 from "@/assets/galeria/img2.jpeg";
import img3 from "@/assets/galeria/img3.jpeg";
import img4 from "@/assets/galeria/img4.jpeg";
import img5 from "@/assets/galeria/img5.jpeg";
import img6 from "@/assets/galeria/img6.jpeg";
import img7 from "@/assets/galeria/img7.jpeg";
import img8 from "@/assets/galeria/img8.jpeg";
import img9 from "@/assets/galeria/img9.jpeg";
import img10 from "@/assets/galeria/img10.jpeg";
import img11 from "@/assets/galeria/img11.jpeg";
import img12 from "@/assets/galeria/img12.jpeg";
import img13 from "@/assets/galeria/img13.jpeg";
import img14 from "@/assets/galeria/img14.jpeg";
import img15 from "@/assets/galeria/img15.jpeg";
import img16 from "@/assets/galeria/img16.jpeg";
import img17 from "@/assets/galeria/img17.jpeg";
import img18 from "@/assets/galeria/img18.jpeg";
import img19 from "@/assets/galeria/img19.jpeg";

type Category = "todas" | "operaciones" | "equipos" | "escoltas" | "campamento";

const categories: { id: Category; label: string }[] = [
  { id: "todas", label: "Todas" },
  { id: "operaciones", label: "Operaciones Mineras" },
  { id: "equipos", label: "Equipos y Maquinaria" },
  { id: "escoltas", label: "Escoltas y Transporte" },
  { id: "campamento", label: "Campamento" },
];

const images: { src: string; caption: string; category: Exclude<Category, "todas"> }[] = [
  { src: img1, caption: "Operaciones en mina — accesos y plataformas", category: "operaciones" },
  { src: img2, caption: "Acceso controlado en operación minera", category: "operaciones" },
  { src: img3, caption: "Convoy de camionetas escolta en ruta minera", category: "escoltas" },
  { src: img4, caption: "Unidad VARMAR junto a perforadora en tajo", category: "equipos" },
  { src: img5, caption: "Pala eléctrica CAT en mantenimiento de campo", category: "equipos" },
  { src: img6, caption: "Supervisión en mirador de tajo abierto", category: "operaciones" },
  { src: img7, caption: "Pala eléctrica P&H — supervisión en campo", category: "equipos" },
  { src: img8, caption: "Camiones mineros en tajo abierto", category: "equipos" },
  { src: img9, caption: "Operador VARMAR junto a camión 240t", category: "operaciones" },
  { src: img10, caption: "Camión minero cargado en ruta de acarreo", category: "escoltas" },
  { src: img11, caption: "Operación de perforación nocturna", category: "operaciones" },
  { src: img12, caption: "Unidad VARMAR junto a perforadoras CAT", category: "equipos" },
  { src: img13, caption: "Perforadora y unidad VARMAR en zona de trabajo", category: "equipos" },
  { src: img14, caption: "Campamento minero — condiciones de altura", category: "campamento" },
  { src: img15, caption: "Perforación exploratoria en clima extremo", category: "campamento" },
  { src: img16, caption: 'Camión 240t — "Podemos, sabemos y queremos trabajar con seguridad"', category: "equipos" },
  { src: img17, caption: "Acarreo de mineral al atardecer", category: "escoltas" },
  { src: img18, caption: "Escolta a camión minero en ruta interna", category: "escoltas" },
  { src: img19, caption: "Transporte de mineral — vista desde escolta", category: "escoltas" },
];

export const Route = createFileRoute("/galeria")({
  component: GaleriaPage,
  head: () => ({
    meta: [
      { title: "Galería — VARMAR Contratistas Generales" },
      { name: "description", content: "Galería de operaciones VARMAR en zonas mineras: equipos, escoltas, perforación y transporte especializado." },
      { property: "og:title", content: "Galería — VARMAR" },
      { property: "og:description", content: "Imágenes de nuestras operaciones en campo." },
    ],
  }),
});

function GaleriaPage() {
  const [active, setActive] = useState<number | null>(null);
  const [filter, setFilter] = useState<Category>("todas");
  const filtered = filter === "todas" ? images : images.filter((i) => i.category === filter);
  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length));
  const next = () => setActive((i) => (i === null ? i : (i + 1) % filtered.length));

  return (
    <div className="bg-background">
      <section className="relative bg-brand-blue-dark py-20 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/90 to-brand-blue-dark/60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-sky-400">VARMAR · Operaciones</span>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-6xl">
            Nuestra <span className="text-sky-400">Galería</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            Un vistazo a nuestras operaciones en campo: unidades, equipos y proyectos en los sectores minero, energético y de construcción.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {categories.map((cat) => {
            const isActive = filter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => { setFilter(cat.id); setActive(null); }}
                className={
                  "rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-wider transition-all md:text-sm " +
                  (isActive
                    ? "bg-brand-red text-white shadow-md"
                    : "bg-muted text-foreground/70 hover:bg-muted/80 hover:text-foreground")
                }
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {filtered.map((img, i) => (
            <button
              key={img.src}
              onClick={() => setActive(i)}
              className="group relative aspect-square overflow-hidden rounded-xl bg-muted shadow-sm transition hover:shadow-lg"
            >
              <img
                src={img.src}
                alt={img.caption}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 translate-y-2 p-3 text-left text-xs font-medium text-white opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                {img.caption}
              </div>
            </button>
          ))}
        </div>
      </section>

      {active !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          onClick={close}
        >
          <button
            onClick={close}
            aria-label="Cerrar"
            className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
            className="absolute left-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Siguiente"
            className="absolute right-4 top-1/2 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <figure className="max-h-[90vh] max-w-5xl" onClick={(e) => e.stopPropagation()}>
            <img src={filtered[active].src} alt={filtered[active].caption} className="max-h-[80vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-3 text-center text-sm text-white/80">{filtered[active].caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
