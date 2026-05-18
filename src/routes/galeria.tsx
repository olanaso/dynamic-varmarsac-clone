import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import img1 from "@/assets/galeria/img1.jpeg";
import img2 from "@/assets/galeria/img2.jpeg";
import img3 from "@/assets/galeria/img3.jpeg";
import img7 from "@/assets/galeria/img7.jpeg";
import img8 from "@/assets/galeria/img8.jpeg";
import img9 from "@/assets/galeria/img9.jpeg";
import img13 from "@/assets/galeria/img13.jpeg";
import img14 from "@/assets/galeria/img14.jpeg";
import img15 from "@/assets/galeria/img15.jpeg";
import img19 from "@/assets/galeria/img19.jpeg";

const images: { src: string; caption: string }[] = [
  { src: img1, caption: "Operaciones en mina — accesos y plataformas" },
  { src: img2, caption: "Acceso controlado en operación minera" },
  { src: img3, caption: "Convoy de camionetas escolta en ruta minera" },
  { src: img7, caption: "Pala eléctrica P&H — supervisión en campo" },
  { src: img8, caption: "Camiones mineros en tajo abierto" },
  { src: img9, caption: "Operador VARMAR junto a camión 240t" },
  { src: img13, caption: "Perforadora y unidad VARMAR en zona de trabajo" },
  { src: img14, caption: "Campamento minero — condiciones de altura" },
  { src: img15, caption: "Perforación exploratoria en clima extremo" },
  { src: img19, caption: "Transporte de mineral — vista desde escolta" },
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
  const close = () => setActive(null);
  const prev = () => setActive((i) => (i === null ? i : (i - 1 + images.length) % images.length));
  const next = () => setActive((i) => (i === null ? i : (i + 1) % images.length));

  return (
    <div className="bg-background">
      <section className="bg-brand-blue-dark py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sky-300">VARMAR · Operaciones</p>
          <h1 className="mt-3 text-4xl font-extrabold uppercase md:text-5xl">Galería</h1>
          <p className="mt-4 max-w-2xl text-sm text-white/80">
            Un vistazo a nuestras operaciones en campo: unidades, equipos y proyectos en los sectores minero, energético y de construcción.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {images.map((img, i) => (
            <button
              key={i}
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
            <img src={images[active].src} alt={images[active].caption} className="max-h-[80vh] w-auto rounded-lg object-contain" />
            <figcaption className="mt-3 text-center text-sm text-white/80">{images[active].caption}</figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}
