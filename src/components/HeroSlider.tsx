import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import s1 from "@/assets/slide-1.png";
import s2 from "@/assets/slide-2.png";
import s3 from "@/assets/slide-3.png";
import s4 from "@/assets/slide-4.png";

const slides = [
  {
    img: s1,
    tags: ["OBRAS CIVILES", "INFRAESTRUCTURA", "EDIFICACIONES", "INDUSTRIA"],
    title: "Construimos con calidad y confianza en obras civiles y proyectos integrales.",
  },
  {
    img: s2,
    tags: ["MINERÍA", "ENERGÍA", "TRANSPORTE", "LOGÍSTICA"],
    title: "Equipos y personal preparados para los terrenos más exigentes del Perú.",
  },
  {
    img: s3,
    tags: ["MANTENIMIENTO", "MONTAJE", "SERVICIOS", "OPERACIONES"],
    title: "Soluciones eficientes en servicios generales para diferentes sectores.",
  },
  {
    img: s4,
    tags: ["GESTIÓN", "EJECUCIÓN", "SUPERVISIÓN", "CALIDAD"],
    title: "Gestionamos proyectos integrales con resultados confiables y sostenibles.",
  },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);

  return (
    <section className="relative h-[calc(100svh-9rem)] min-h-[460px] w-full overflow-hidden bg-black">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.img}
            alt=""
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${idx === i ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-12">
              <div className={`max-w-2xl transition-all duration-1000 ${idx === i ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-white sm:text-xs">
                  {s.tags.map((t, k) => (
                    <span key={t} className="flex items-center gap-3">
                      {t}
                      {k < s.tags.length - 1 && <span className="text-white/50">|</span>}
                    </span>
                  ))}
                </div>
                <h1 className="mt-5 text-3xl font-extrabold leading-[1.15] text-white sm:mt-6 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
                  {s.title}
                </h1>
                <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
                  <Link
                    to="/contacto"
                    className="rounded-sm bg-brand-red px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
                  >
                    Contáctenos
                  </Link>
                  <Link
                    to="/proyectos"
                    className="rounded-sm bg-white/95 px-7 py-3.5 text-sm font-semibold text-foreground shadow-md transition hover:bg-white"
                  >
                    Proyectos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={() => go(-1)}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/15 text-white backdrop-blur transition hover:bg-brand-red md:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center bg-white/15 text-white backdrop-blur transition hover:bg-brand-red md:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1 transition-all ${idx === i ? "w-12 bg-brand-red" : "w-6 bg-white/50 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
}
