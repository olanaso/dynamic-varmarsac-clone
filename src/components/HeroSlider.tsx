import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight, Phone } from "lucide-react";
import s1 from "@/assets/slide-1.png";
import s2 from "@/assets/slide-2.png";
import s3 from "@/assets/slide-3.png";
import s4 from "@/assets/slide-4.png";

const slides = [
  {
    img: s1,
    eyebrow: "Contratistas Generales",
    title: "Construimos con calidad",
    accent: "y confianza",
    desc: "Soluciones integrales en obras civiles y servicios generales.",
  },
  {
    img: s2,
    eyebrow: "Operaciones",
    title: "Equipos en cualquier",
    accent: "terreno",
    desc: "Flota preparada para zonas exigentes y condiciones extremas.",
  },
  {
    img: s3,
    eyebrow: "Movilidad",
    title: "Transporte seguro",
    accent: "para tu proyecto",
    desc: "Personal y carga con cobertura nacional.",
  },
  {
    img: s4,
    eyebrow: "Cobertura",
    title: "Donde el proyecto",
    accent: "lo requiera",
    desc: "Operamos en todo el Perú con eficiencia y cumplimiento.",
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
    <section className="relative h-[calc(100svh-4.5rem)] min-h-[480px] w-full overflow-hidden">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <img
            src={s.img}
            alt={s.title}
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${idx === i ? "scale-110" : "scale-100"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 md:px-10">
              <div className={`max-w-2xl transition-all duration-1000 ${idx === i ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
                <span className="inline-block bg-brand-red px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:text-[11px]">
                  {s.eyebrow}
                </span>
                <h1 className="mt-4 text-3xl font-extrabold uppercase leading-[1.05] text-white sm:mt-6 sm:text-5xl md:text-6xl lg:text-7xl">
                  {s.title}
                  <br />
                  <span className="text-brand-red">{s.accent}</span>
                </h1>
                <p className="mt-4 max-w-xl text-sm text-white/85 sm:mt-6 sm:text-base md:text-lg">{s.desc}</p>
                <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
                  <Link
                    to="/servicios"
                    className="group inline-flex items-center gap-2 bg-brand-red px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow)] sm:px-7 sm:py-4 sm:text-sm"
                  >
                    Ver Servicios
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    to="/contacto"
                    className="inline-flex items-center gap-2 border-2 border-white px-5 py-3 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-white hover:text-black sm:px-7 sm:py-4 sm:text-sm"
                  >
                    <Phone className="h-4 w-4" /> Contáctanos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide counter */}
      <div className="absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
        <span className="text-xs font-bold tracking-widest text-white/70">
          {String(i + 1).padStart(2, "0")}
        </span>
        <div className="h-16 w-px bg-white/40" />
        <span className="text-xs font-bold tracking-widest text-white/70">
          {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      <button
        onClick={() => go(-1)}
        aria-label="Anterior"
        className="absolute left-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/15 text-white backdrop-blur transition hover:bg-brand-red md:left-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Siguiente"
        className="absolute right-4 top-1/2 z-10 grid h-12 w-12 -translate-y-1/2 place-items-center bg-white/15 text-white backdrop-blur transition hover:bg-brand-red"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
