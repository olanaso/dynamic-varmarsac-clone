import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import s1 from "@/assets/slide-1.png";
import s2 from "@/assets/slide-2.png";
import s3 from "@/assets/slide-3.png";
import s4 from "@/assets/slide-4.png";

const slides = [
  { img: s1, title: "Construimos con calidad y confianza" },
  { img: s2, title: "Servicios de alquiler y arrendamiento de vehículos" },
  { img: s3, title: "Soluciones eficientes en servicios generales" },
  { img: s4, title: "Gestionamos proyectos integrales y confiables" },
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

          {/* Label box bottom-left */}
          <div className="absolute bottom-10 left-0 max-w-[85%] sm:bottom-14 sm:max-w-md md:bottom-20 md:max-w-lg">
            <div
              className={`bg-brand-blue px-5 py-4 shadow-lg transition-all duration-700 sm:px-7 sm:py-5 ${
                idx === i ? "translate-x-0 opacity-100" : "-translate-x-8 opacity-0"
              }`}
            >
              <h2 className="text-base font-extrabold uppercase leading-snug tracking-wide text-white sm:text-lg md:text-xl">
                {s.title}...
              </h2>
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
