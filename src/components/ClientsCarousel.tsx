import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import mmg from "@/assets/clients/mmg.png";
import lasbambas from "@/assets/clients/lasbambas.png";
import bechtel from "@/assets/clients/bechtel.png";
import flsmidth from "@/assets/clients/flsmidth.png";
import ausenco from "@/assets/clients/ausenco.png";
import limagas from "@/assets/clients/limagas.png";
import mctransportes from "@/assets/clients/mctransportes.png";
import prosegur from "@/assets/clients/prosegur.png";
import ransa from "@/assets/clients/ransa.png";

const clients = [
  { src: mmg, alt: "MMG" },
  { src: lasbambas, alt: "Las Bambas" },
  { src: bechtel, alt: "Bechtel" },
  { src: flsmidth, alt: "FLSmidth" },
  { src: ausenco, alt: "Ausenco" },
  { src: limagas, alt: "Limagas" },
  { src: mctransportes, alt: "MC Transportes" },
  { src: prosegur, alt: "Prosegur" },
  { src: ransa, alt: "Ransa" },
];

export function ClientsCarousel() {
  const [page, setPage] = useState(0);
  const [perView, setPerView] = useState(4);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setPerView(w < 640 ? 2 : w < 1024 ? 3 : 4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const totalPages = Math.max(1, Math.ceil(clients.length / perView));

  useEffect(() => {
    setPage((p) => Math.min(p, totalPages - 1));
  }, [totalPages]);

  useEffect(() => {
    const t = setInterval(() => setPage((p) => (p + 1) % totalPages), 4000);
    return () => clearInterval(t);
  }, [totalPages]);

  const go = (d: number) => setPage((p) => (p + d + totalPages) % totalPages);

  return (
    <section className="bg-brand-soft py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-extrabold text-brand-blue-dark md:text-4xl">
            Nuestros <span className="text-brand-blue">Socios Comerciales</span>
          </h2>
          <div className="mx-auto mt-4 h-1 w-20 bg-brand-red" />
        </div>

        <div className="relative">
          <button
            onClick={() => go(-1)}
            aria-label="Anterior"
            className="absolute left-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 -translate-x-2 place-items-center rounded-full bg-white text-brand-blue-dark shadow-md transition hover:bg-brand-red hover:text-white md:-translate-x-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="overflow-hidden px-2">
            <div
              ref={trackRef}
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${page * 100}%)` }}
            >
              {clients.map((c) => (
                <div
                  key={c.alt}
                  className="flex shrink-0 items-center justify-center px-4 py-6"
                  style={{ width: `${100 / perView}%` }}
                >
                  <img
                    src={c.src}
                    alt={c.alt}
                    loading="lazy"
                    className="h-20 w-auto max-w-full object-contain grayscale opacity-70 transition duration-500 hover:grayscale-0 hover:opacity-100 md:h-24"
                  />
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => go(1)}
            aria-label="Siguiente"
            className="absolute right-0 top-1/2 z-10 grid h-10 w-10 -translate-y-1/2 translate-x-2 place-items-center rounded-full bg-white text-brand-blue-dark shadow-md transition hover:bg-brand-red hover:text-white md:translate-x-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                aria-label={`Página ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === page ? "w-6 bg-brand-red" : "w-2 bg-foreground/20 hover:bg-foreground/40"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
