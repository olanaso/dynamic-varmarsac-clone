import { createFileRoute } from "@tanstack/react-router";
import { CheckCircle2 } from "lucide-react";
import s1 from "@/assets/serv-1.png";
import s2 from "@/assets/serv-2.png";
import s3 from "@/assets/serv-3.png";
import s4 from "@/assets/serv-4.png";
import s5 from "@/assets/serv-5.png";
import sFortuner from "@/assets/serv-fortuner.png";
import sGps from "@/assets/serv-gps.png";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — VARMAR Contratistas Generales" },
      { name: "description", content: "Alquiler de vehículos: Hilux, Fortuner, Hiace y Sprinter para el sector minero y turístico." },
      { property: "og:title", content: "Servicios — VARMAR Contratistas Generales" },
      { property: "og:description", content: "Alquiler de vehículos para el sector minero y turístico, con documentación legal vigente." },
    ],
  }),
  component: Servicios,
});

function Servicios() {
  return (
    <>
      {/* Cabecera estilo imagen */}
      <section className="bg-brand-blue-dark py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">
            Alquiler de Vehículos
          </h1>
          <div className="mt-5 flex items-center gap-2">
            <span className="h-1 w-12 bg-brand-blue" />
            <span className="h-1 w-24 bg-brand-red" />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            Alquilamos camionetas: Hilux, Fortuner, Hiace y Sprinter completamente
            equipadas para el sector minero y turístico, contamos con la documentación
            legal que solicitan las normas vigentes.
          </p>
        </div>
      </section>

      {/* Galería de fotos */}
      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
            {/* Foto destacada grande */}
            <div className="group relative col-span-1 overflow-hidden rounded-sm shadow-md md:col-span-4 md:row-span-2">
              <img
                src={s5}
                alt="Flota VARMAR alineada"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent p-5">
                <span className="text-sm font-bold uppercase tracking-wider text-white">
                  Flota Operativa Hilux
                </span>
              </div>
            </div>

            <div className="group relative col-span-1 aspect-[4/3] overflow-hidden rounded-sm shadow-md md:col-span-2">
              <img
                src={s1}
                alt="Personal y camionetas en zona minera"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Sector Minero
                </span>
              </div>
            </div>

            <div className="group relative col-span-1 aspect-[4/3] overflow-hidden rounded-sm shadow-md md:col-span-2">
              <img
                src={s3}
                alt="Sprinter para transporte de personal"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Mercedes Sprinter
                </span>
              </div>
            </div>

            <div className="group relative col-span-1 aspect-[4/3] overflow-hidden rounded-sm shadow-md md:col-span-3">
              <img
                src={s2}
                alt="Camionetas Hilux en ruta"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Camionetas 4x4
                </span>
              </div>
            </div>

            <div className="group relative col-span-1 aspect-[4/3] overflow-hidden rounded-sm shadow-md md:col-span-3">
              <img
                src={s4}
                alt="Toyota Hilux equipada"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent p-4">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Hilux Equipada
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* RUTA LARGA E INTERPROVINCIALES */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-brand-blue-dark md:text-5xl">
              Ruta Larga e<br />Interprovinciales
            </h2>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 bg-brand-blue" />
              <span className="h-1 w-24 bg-brand-red" />
            </div>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              Ofrecemos el servicio de alquiler de camionetas Fortuner para rutas
              largas a nivel interprovincial.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Cusco - Challhuahuacho - Cusco",
                "Cusco - Abancay - Cusco",
                "Cusco - Espinar - Cusco",
              ].map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/80 md:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-sm shadow-lg">
            <img
              src={sFortuner}
              alt="Camionetas Fortuner para rutas interprovinciales"
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute right-0 top-0 h-full w-2 bg-brand-red" />
          </div>
        </div>
      </section>

      {/* TRANSPORTE DE PASAJEROS */}
      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-brand-blue-dark md:text-5xl">
              Transporte<br />de Pasajeros
            </h2>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 bg-brand-blue" />
              <span className="h-1 w-24 bg-brand-red" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                t: "Comodidad y equipamiento",
                d: "Vehículos completamente acondicionados para la comodidad del pasajero. Nuestras unidades cuentan con asientos reclinables, climatizador y sistema de entretenimiento de video y música.",
              },
              {
                n: "02",
                t: "Conductores profesionales",
                d: "Nuestros conductores tienen las competencias, experiencia, educación y formación necesaria para brindar un servicio Seguro y de Calidad.",
              },
              {
                n: "03",
                t: "Monitoreo GPS 24/7",
                d: "Cuenta con un sistema de monitoreo GPS para todos los servicios contratados, garantizando trazabilidad y seguridad en ruta.",
              },
            ].map((c) => (
              <article
                key={c.n}
                className="rounded-sm bg-white p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]"
              >
                <div className="text-4xl font-extrabold text-brand-blue">{c.n}</div>
                <h3 className="mt-3 text-lg font-bold text-brand-blue-dark">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{c.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
