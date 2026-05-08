import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ShieldCheck, Users, MapPin, ArrowRight } from "lucide-react";
import s1 from "@/assets/slide-1.png";
import s2 from "@/assets/slide-2.png";
import s3 from "@/assets/slide-3.png";
import s4 from "@/assets/slide-4.png";

const slides = [
  {
    img: s1,
    pre: "Transporte",
    bold: "confiable,",
    post: "destinos seguros.",
  },
  {
    img: s2,
    pre: "Alquiler de",
    bold: "vehículos",
    post: "para tu empresa.",
  },
  {
    img: s3,
    pre: "Servicios",
    bold: "generales",
    post: "con calidad garantizada.",
  },
  {
    img: s4,
    pre: "Proyectos",
    bold: "integrales",
    post: "y confiables.",
  },
];

const features = [
  { icon: ShieldCheck, label: "SEGURIDAD\nGARANTIZADA" },
  { icon: Users, label: "COMODIDAD\nY CONFIANZA" },
  { icon: MapPin, label: "LLEGAMOS\nMÁS LEJOS" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);

  return (
    <section className="relative h-[calc(100svh-9rem)] min-h-[520px] w-full overflow-hidden bg-white">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          {/* Background image */}
          <img
            src={s.img}
            alt=""
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${idx === i ? "scale-105" : "scale-100"}`}
          />

          {/* Left white panel with content */}
          <div className="absolute inset-y-0 left-0 flex w-full items-center md:w-[55%] lg:w-[48%]">
            <div
              className={`relative ml-0 h-full w-full bg-white/95 px-6 py-10 backdrop-blur-sm transition-all duration-700 sm:px-10 md:py-12 lg:px-16 ${
                idx === i ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
              }`}
              style={{ clipPath: "polygon(0 0, 100% 0, 88% 100%, 0 100%)" }}
            >
              <div className="flex h-full max-w-xl flex-col justify-center">
                <h1 className="text-3xl font-light leading-tight text-brand-blue-dark sm:text-4xl md:text-5xl lg:text-6xl">
                  {s.pre}
                  <br />
                  <span className="font-extrabold text-brand-blue">{s.bold}</span>
                  <br />
                  <span className="font-light">{s.post}</span>
                </h1>

                <div className="mt-5 flex items-center gap-2">
                  <span className="h-1 w-12 bg-brand-blue" />
                  <span className="h-1 w-20 bg-brand-red" />
                </div>

                {/* Features */}
                <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
                  {features.map((f) => (
                    <div key={f.label} className="flex flex-col items-center text-center sm:items-start sm:text-left">
                      <f.icon className="h-8 w-8 text-brand-blue sm:h-10 sm:w-10" strokeWidth={1.5} />
                      <span className="mt-2 whitespace-pre-line text-[10px] font-bold uppercase leading-tight tracking-wider text-brand-blue-dark sm:text-xs">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="mt-8">
                  <Link
                    to="/flota"
                    className="inline-flex items-center gap-2 border-2 border-brand-red bg-transparent px-7 py-3 text-sm font-bold uppercase tracking-wider text-brand-red transition hover:bg-brand-red hover:text-white"
                  >
                    Ver Flota <ArrowRight className="h-4 w-4" />
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
        className="absolute right-16 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center bg-brand-blue/80 text-white backdrop-blur transition hover:bg-brand-red md:right-20"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 z-10 grid h-11 w-11 -translate-y-1/2 place-items-center bg-brand-blue/80 text-white backdrop-blur transition hover:bg-brand-red md:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-6 right-6 z-10 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1 transition-all ${idx === i ? "w-12 bg-brand-red" : "w-6 bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
    </section>
  );
}
