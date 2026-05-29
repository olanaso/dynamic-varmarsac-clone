import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
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
      {
        name: "description",
        content:
          "Alquiler de vehículos: Hilux, Fortuner, Hiace y Sprinter para el sector minero y turístico.",
      },
    ],
  }),
  component: Servicios,
});

function Servicios() {
  const { t } = useTranslation();
  const routes = t("servicios.routes", { returnObjects: true }) as string[];
  const pax = t("servicios.pax", { returnObjects: true }) as { t: string; d: string }[];
  return (
    <>
      <section className="relative bg-brand-blue-dark py-20 text-white">
        <div
          className="absolute inset-0 opacity-20 bg-cover bg-bottom"
          style={{ backgroundImage: `url(${s5})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-linear-to-r from-brand-blue-dark via-brand-blue-dark/5 to-brand-blue-dark/5" />

        <div className="relative mx-auto max-w-5xl px-4 md:px-8">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">
            {t("servicios.title")}
          </h1>
          <div className="mt-5 flex items-center gap-2">
            <span className="h-1 w-12 bg-brand-blue" />
            <span className="h-1 w-24 bg-brand-red" />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">
            {t("servicios.intro")}
          </p>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="whitespace-pre-line text-4xl font-extrabold uppercase leading-tight tracking-tight text-brand-blue-dark md:text-5xl">
              {t("servicios.routesTitle")}
            </h2>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 bg-brand-blue" />
              <span className="h-1 w-24 bg-brand-red" />
            </div>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">
              {t("servicios.routesText")}
            </p>
            <ul className="mt-5 space-y-2.5">
              {routes.map((r) => (
                <li
                  key={r}
                  className="flex items-start gap-3 text-sm text-foreground/80 md:text-base"
                >
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="group relative isolate overflow-hidden rounded-2xl border border-border bg-white shadow-glow">
            <div
              className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-red/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -left-10 bottom-8 h-24 w-24 rounded-full bg-brand-blue/15 blur-2xl"
              aria-hidden="true"
            />
            <div className="absolute left-4 top-4 z-10 rounded-full bg-brand-blue-dark/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white shadow-lg backdrop-blur">
              Flota VARMAR
            </div>
            <img
              src={sFortuner}
              alt="Camioneta Fortuner en ruta"
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:animate-float group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-blue-dark/95 via-brand-blue-dark/35 to-transparent px-5 py-5">
              <div className="flex items-center justify-between gap-4 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Movilidad segura
                  </p>
                  <p className="text-lg font-bold">Listas para ruta larga</p>
                </div>
                <span className="hidden rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 sm:inline-flex">
                  4x4 · Comfort
                </span>
              </div>
            </div>
            <span className="absolute right-0 top-0 h-full w-2 bg-brand-red" />
          </div>
        </div>
      </section>

      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <h2 className="whitespace-pre-line text-4xl font-extrabold uppercase leading-tight tracking-tight text-brand-blue-dark md:text-5xl">
              {t("servicios.paxTitle")}
            </h2>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 bg-brand-blue" />
              <span className="h-1 w-24 bg-brand-red" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pax.map((c, i) => (
              <article
                key={i}
                className="rounded-sm bg-white p-7 shadow-card transition hover:-translate-y-1 hover:shadow-glow"
              >
                <div className="text-4xl font-extrabold text-brand-blue">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-3 text-lg font-bold text-brand-blue-dark">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{c.d}</p>
              </article>
            ))}
          </div>

          <figure className="group relative mt-10 isolate overflow-hidden rounded-2xl border border-border bg-white shadow-glow">
            <div
              className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-red/15 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -left-10 bottom-8 h-24 w-24 rounded-full bg-brand-blue/15 blur-2xl"
              aria-hidden="true"
            />
            <div className="absolute left-4 top-4 z-10 rounded-full bg-brand-blue-dark/85 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.25em] text-white shadow-lg backdrop-blur">
              Seguimiento GPS
            </div>
            <img
              src={sGps}
              alt={t("servicios.gpsCaption")}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-out motion-safe:animate-float group-hover:scale-[1.03]"
            />
            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-brand-blue-dark/95 via-brand-blue-dark/35 to-transparent px-5 py-5">
              <div className="flex items-center justify-between gap-4 text-white">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                    Monitoreo en tiempo real
                  </p>
                  <p className="text-lg font-bold">Control y trazabilidad</p>
                </div>
                <span className="hidden rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white/90 sm:inline-flex">
                  GPS 24/7
                </span>
              </div>
            </div>
            <figcaption className="border-t border-border bg-brand-blue-dark px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white">
              {t("servicios.gpsCaption")}
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
