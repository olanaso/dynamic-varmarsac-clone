import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { ArrowRight, CarFront, Bus, Truck } from "lucide-react";
import s1 from "@/assets/slide-1.png";
import s2 from "@/assets/slide-2.png";
import s3 from "@/assets/slide-3.png";
import s4 from "@/assets/slide-4.png";
import truck from "@/assets/truck.jpg";
import aboutFleet from "@/assets/about-fleet.jpg";

export const Route = createFileRoute("/flota")({
  head: () => ({
    meta: [
      { title: "Nuestra Flota — VARMAR Contratistas Generales" },
      { name: "description", content: "Conoce nuestra flota de camionetas 4x4, minivans, buses y unidades especializadas." },
    ],
  }),
  component: FlotaPage,
});

const images = [s1, s2, s3, s4, truck, aboutFleet];
const icons = [CarFront, CarFront, Bus, Bus, Truck, CarFront];

function FlotaPage() {
  const { t } = useTranslation();
  const items = t("flota.items", { returnObjects: true }) as { title: string; desc: string }[];
  return (
    <>
      <section className="relative bg-brand-blue-dark py-20 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${aboutFleet})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/90 to-brand-blue-dark/60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-sky-400">{t("flota.kicker")}</span>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-6xl">
            {t("flota.title1")} <span className="text-sky-400">{t("flota.title2")}</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">{t("flota.subtitle")}</p>
        </div>
      </section>

      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {items.map((u, i) => {
            const Icon = icons[i];
            return (
              <article key={u.title} className="group overflow-hidden rounded-sm bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1">
                <div className="aspect-[4/3] overflow-hidden bg-white">
                  <img src={images[i]} alt={u.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3">
                    <div className="grid h-10 w-10 place-items-center rounded-sm bg-sky-500 text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-extrabold text-brand-blue-dark">{u.title}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-foreground/70">{u.desc}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="bg-brand-blue py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">{t("flota.ctaTitle")}</h2>
            <p className="mt-2 text-white/85">{t("flota.ctaText")}</p>
          </div>
          <Link to="/contacto" className="inline-flex items-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-brand-blue-dark shadow-md transition hover:bg-sky-100">
            {t("flota.ctaBtn")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
