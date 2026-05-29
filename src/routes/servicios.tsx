import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { CheckCircle2 } from "lucide-react";
import s1 from "@/assets/serv-1.avif";
import s2 from "@/assets/serv-2.avif";
import s3 from "@/assets/serv-3.avif";
import s4 from "@/assets/serv-4.avif";
import s5 from "@/assets/serv-5.avif";
import sFortuner from "@/assets/serv-fortuner.avif";
import sGps from "@/assets/serv-gps.avif";

export const Route = createFileRoute("/servicios")({
  head: () => ({
    meta: [
      { title: "Servicios — VARMAR Contratistas Generales" },
      { name: "description", content: "Alquiler de vehículos: Hilux, Fortuner, Hiace y Sprinter para el sector minero y turístico." },
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
      <section className="bg-brand-blue-dark py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <h1 className="text-4xl font-extrabold uppercase tracking-tight text-white md:text-6xl">{t("servicios.title")}</h1>
          <div className="mt-5 flex items-center gap-2">
            <span className="h-1 w-12 bg-brand-blue" />
            <span className="h-1 w-24 bg-brand-red" />
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/85 md:text-lg">{t("servicios.intro")}</p>
        </div>
      </section>

      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-6">
            <div className="group relative col-span-1 overflow-hidden rounded-sm shadow-md md:col-span-4 md:row-span-2">
              <img src={s5} alt={t("servicios.cap.hilux")} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent p-5">
                <span className="text-sm font-bold uppercase tracking-wider text-white">{t("servicios.cap.hilux")}</span>
              </div>
            </div>
            {[
              { img: s1, k: "mining" },
              { img: s3, k: "sprinter" },
              { img: s2, k: "pickups" },
              { img: s4, k: "hiluxEq" },
            ].map((c, i) => (
              <div key={i} className={`group relative col-span-1 aspect-[4/3] overflow-hidden rounded-sm shadow-md ${i < 2 ? "md:col-span-2" : "md:col-span-3"}`}>
                <img src={c.img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-blue-dark/90 to-transparent p-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-white">{t(`servicios.cap.${c.k}`)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="whitespace-pre-line text-4xl font-extrabold uppercase leading-tight tracking-tight text-brand-blue-dark md:text-5xl">{t("servicios.routesTitle")}</h2>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 bg-brand-blue" />
              <span className="h-1 w-24 bg-brand-red" />
            </div>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">{t("servicios.routesText")}</p>
            <ul className="mt-5 space-y-2.5">
              {routes.map((r) => (
                <li key={r} className="flex items-start gap-3 text-sm text-foreground/80 md:text-base">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative overflow-hidden rounded-sm shadow-lg">
            <img src={sFortuner} alt="" loading="lazy" className="h-full w-full object-cover" />
            <span className="absolute right-0 top-0 h-full w-2 bg-brand-red" />
          </div>
        </div>
      </section>

      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <h2 className="whitespace-pre-line text-4xl font-extrabold uppercase leading-tight tracking-tight text-brand-blue-dark md:text-5xl">{t("servicios.paxTitle")}</h2>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 bg-brand-blue" />
              <span className="h-1 w-24 bg-brand-red" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {pax.map((c, i) => (
              <article key={i} className="rounded-sm bg-white p-7 shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-[var(--shadow-glow)]">
                <div className="text-4xl font-extrabold text-brand-blue">{String(i + 1).padStart(2, "0")}</div>
                <h3 className="mt-3 text-lg font-bold text-brand-blue-dark">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{c.d}</p>
              </article>
            ))}
          </div>

          <figure className="mt-10 overflow-hidden rounded-sm border border-border bg-white shadow-lg">
            <img src={sGps} alt={t("servicios.gpsCaption")} loading="lazy" className="h-full w-full object-cover" />
            <figcaption className="border-t border-border bg-brand-blue-dark px-5 py-3 text-xs font-semibold uppercase tracking-wider text-white">{t("servicios.gpsCaption")}</figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
