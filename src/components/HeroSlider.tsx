import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import s1 from "@/assets/slide-1.png";
import s2 from "@/assets/slide-2.png";
import s3 from "@/assets/slide-3.png";
import s4 from "@/assets/slide-4.png";

const slides = [
  { img: s1, title: "Operaciones en cualquier terreno", subtitle: "Flota preparada para zonas exigentes" },
  { img: s2, title: "Equipos en altura", subtitle: "Logística confiable en condiciones extremas" },
  { img: s3, title: "Movilidad para tu proyecto", subtitle: "Transporte seguro de personal y carga" },
  { img: s4, title: "Cobertura nacional", subtitle: "Donde el proyecto lo requiera" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);

  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[2rem] shadow-[var(--shadow-glow)]">
      {slides.map((s, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${idx === i ? "opacity-100 scale-100" : "opacity-0 scale-105"}`}
        >
          <img src={s.img} alt={s.title} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-blue-dark/80 via-brand-blue-dark/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white md:p-10">
            <div className={`transition-all delay-200 duration-700 ${idx === i ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"}`}>
              <span className="inline-block rounded-full bg-brand-red px-3 py-1 text-[10px] font-bold uppercase tracking-widest">VARMAR</span>
              <h3 className="mt-3 text-2xl font-extrabold md:text-4xl">{s.title}</h3>
              <p className="mt-1 text-sm text-white/85 md:text-base">{s.subtitle}</p>
            </div>
          </div>
        </div>
      ))}

      <button onClick={() => go(-1)} aria-label="Anterior" className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-brand-blue-dark shadow-md transition hover:scale-110 hover:bg-white">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => go(1)} aria-label="Siguiente" className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-brand-blue-dark shadow-md transition hover:scale-110 hover:bg-white">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Ir al slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-brand-red" : "w-2 bg-white/70 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}
