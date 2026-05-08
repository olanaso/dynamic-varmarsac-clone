import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, ArrowRight, HardHat, MapPin, Route as RouteIcon, Mountain, Globe, Phone } from "lucide-react";
import logo from "@/assets/logo.png";
import slideSnow from "@/assets/slide-snow.png";
import s2 from "@/assets/serv-1.png";
import s3 from "@/assets/serv-4.png";
import s4 from "@/assets/serv-5.png";

const slides = [
  {
    img: slideSnow,
    eyebrow: "Alquiler de",
    title: "Vehículos",
    desc: "Transporte de personal, alquiler de vehículos y escolta a nivel nacional.",
    models: ["Hilux", "Fortuner", "Hiace", "Sprinter"],
  },
  {
    img: s2,
    eyebrow: "Sector",
    title: "Minería",
    desc: "Camionetas 4x4 equipadas y conductores homologados para zonas mineras.",
    models: ["Hilux 4x4", "Fortuner", "Doble Cabina"],
  },
  {
    img: s3,
    eyebrow: "Servicio",
    title: "Corporativo",
    desc: "Movilidad ejecutiva con unidades modernas y conductores profesionales.",
    models: ["Hilux", "Fortuner", "Hiace"],
  },
  {
    img: s4,
    eyebrow: "Flota",
    title: "Operativa",
    desc: "Más de 15 años respaldando proyectos en construcción, minería y turismo.",
    models: ["Camionetas", "Minivans", "Mini Bus"],
  },
];

const features = [
  { icon: HardHat, label: "Conductores", sub: "homologados" },
  { icon: MapPin, label: "Monitoreo", sub: "GPS" },
  { icon: RouteIcon, label: "Rutas", sub: "interprovinciales" },
  { icon: Mountain, label: "Sector minero", sub: "y turístico" },
];

export function HeroSlider() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % slides.length), 7000);
    return () => clearInterval(t);
  }, []);
  const go = (d: number) => setI((p) => (p + d + slides.length) % slides.length);
  const s = slides[i];

  return (
    <section className="relative min-h-[640px] w-full overflow-hidden bg-white md:min-h-[680px] lg:h-[calc(100svh-9rem)]">
      {/* Imagen lateral derecha */}
      {slides.map((sl, idx) => (
        <div
          key={idx}
          className={`absolute inset-y-0 right-0 w-full transition-opacity duration-1000 lg:w-[58%] ${idx === i ? "opacity-100" : "opacity-0"}`}
          aria-hidden={idx !== i}
        >
          <img
            src={sl.img}
            alt=""
            className={`h-full w-full object-cover transition-transform duration-[8000ms] ease-out ${idx === i ? "scale-105" : "scale-100"}`}
          />
        </div>
      ))}

      {/* Overlay azul difuminado sobre imagen móvil */}
      <div className="absolute inset-0 bg-white/70 lg:hidden" />

      {/* Cortes diagonales decorativos (solo desktop) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[42%] hidden w-[18%] bg-brand-blue/15 lg:block"
        style={{ clipPath: "polygon(50% 0, 100% 0, 50% 100%, 0 100%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[40%] hidden w-[6%] bg-brand-blue/40 lg:block"
        style={{ clipPath: "polygon(50% 0, 100% 0, 50% 100%, 0 100%)" }}
      />

      {/* Panel blanco izquierdo */}
      <div className="relative z-10 flex min-h-[640px] w-full flex-col bg-white/95 backdrop-blur-sm lg:min-h-0 lg:h-full lg:w-[55%]"
        style={{
          clipPath: typeof window !== "undefined" && window.innerWidth >= 1024
            ? "polygon(0 0, 100% 0, 88% 100%, 0 100%)"
            : undefined,
        }}
      >
        <div className="flex flex-1 flex-col px-6 pt-8 sm:px-10 md:px-14 md:pt-10 lg:pl-[8%] lg:pr-[12%]">
          {/* Logo */}
          <img src={logo} alt="VARMAR S.A.C." className="h-14 w-auto md:h-16 lg:h-20" />

          {/* Acento línea celeste/amarilla */}
          <div className="mt-6 flex items-center gap-1.5">
            <span className="h-1 w-10 bg-brand-blue" />
            <span className="h-1 w-20 bg-brand-red" />
          </div>

          {/* Título */}
          <div
            key={i}
            className="mt-5 animate-[fadeUp_0.6s_ease-out_both]"
          >
            <p className="text-2xl font-extrabold uppercase tracking-tight text-brand-blue-dark md:text-3xl">
              {s.eyebrow}
            </p>
            <h1 className="text-5xl font-extrabold uppercase leading-[0.95] tracking-tight text-brand-blue md:text-6xl lg:text-7xl">
              {s.title}
            </h1>

            <p className="mt-5 max-w-md text-sm text-foreground/75 md:text-base">
              {s.desc}
            </p>

            {/* Modelos */}
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm font-bold text-brand-blue md:text-base">
              {s.models.map((m, k) => (
                <span key={m} className="flex items-center gap-3">
                  {m}
                  {k < s.models.length - 1 && <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" />}
                </span>
              ))}
            </div>
          </div>

          {/* Pills de features */}
          <div className="mt-7 grid max-w-xl grid-cols-2 gap-2.5 sm:grid-cols-4">
            {features.map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-2 rounded-sm bg-brand-blue px-3 py-2.5 text-white shadow-md"
              >
                <f.icon className="h-5 w-5 shrink-0" strokeWidth={2} />
                <div className="text-[11px] font-semibold leading-tight">
                  {f.label}<br />
                  <span className="font-normal text-white/85">{f.sub}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-auto pt-8 pb-6">
            {/* CTA + contacto */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/contacto"
                className="group inline-flex items-center justify-between gap-3 rounded-sm bg-brand-red px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-brand-blue-dark shadow-md transition hover:brightness-95"
              >
                Cotiza ahora
                <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-blue text-white transition group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-brand-blue-dark sm:text-sm">
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-brand-blue" />
                  www.varmarsac.com
                </span>
                <span className="text-foreground/30">|</span>
                <span className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-brand-blue" />
                  950 396 818
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controles */}
      <button
        onClick={() => go(-1)}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-brand-blue-dark shadow-md backdrop-blur transition hover:bg-white md:left-6"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={() => go(1)}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 z-20 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-brand-blue-dark shadow-md backdrop-blur transition hover:bg-white md:right-6"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-3 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            aria-label={`Slide ${idx + 1}`}
            className={`h-1 transition-all ${idx === i ? "w-12 bg-brand-blue" : "w-6 bg-brand-blue-dark/30 hover:bg-brand-blue-dark/60"}`}
          />
        ))}
      </div>
    </section>
  );
}
