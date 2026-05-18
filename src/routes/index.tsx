import { createFileRoute, Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Wrench, Building2, ArrowRight, ShieldCheck, HardHat, Clock, Handshake, Sparkles, Quote, CheckCircle2, Truck, Bus, Car, UserCheck, ShieldCheck as ShieldIcon, CarFront, Handshake as HandshakeIcon, MapPin } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { ClientsCarousel } from "@/components/ClientsCarousel";
import aboutFleet from "@/assets/about-fleet.jpg";
import manager from "@/assets/manager.jpg";
import truck from "@/assets/truck.jpg";
import s1 from "@/assets/flota-1.png";
import s2 from "@/assets/flota-2.png";
import s3 from "@/assets/flota-3.png";
import s4 from "@/assets/flota-4.png";
import s5 from "@/assets/flota-5.png";
import s6 from "@/assets/flota-6.png";
import cond1 from "@/assets/cond-1.png";
import cond2 from "@/assets/cond-2.png";
import cond3 from "@/assets/cond-3.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VARMAR Contratistas Generales — Inicio" },
      { name: "description", content: "Construimos proyectos con calidad y confianza. Obras civiles, servicios generales y proyectos integrales." },
    ],
  }),
  component: Index,
});

function Index() {
  const { t } = useTranslation();
  const featureIcons = [ShieldCheck, HardHat, Clock, Handshake];
  const tileIcons = [CarFront, Bus, Bus, Car, UserCheck, ShieldIcon, Truck];
  const tileKeys = ["pickup", "minivan", "bus", "car", "drivers", "guard", "cargo"] as const;
  const servicesList = t("home.servicesList", { returnObjects: true }) as string[];
  const stats = t("home.stats", { returnObjects: true }) as string[][];
  const values = t("home.values", { returnObjects: true }) as string[];

  return (
    <>
      <HeroSlider />

      {/* ABOUT US */}
      <section className="relative overflow-hidden bg-gradient-to-r from-white via-white to-brand-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-brand-blue-dark md:text-5xl lg:text-[3.25rem]">
              {t("home.aboutTitle1")} <span className="text-brand-blue">{t("home.aboutTitle2")}</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70">{t("home.aboutP1")}</p>
            <p className="mt-5 text-sm font-bold uppercase tracking-wider text-brand-blue-dark">
              "{t("home.aboutP2pre")}<span className="text-brand-red">{t("home.aboutP2bold")}</span>{t("home.aboutP2mid")}<span className="text-brand-red">{t("home.aboutP2bold2")}</span>"
            </p>

            <div className="mt-8 flex items-stretch gap-4 rounded-sm bg-brand-blue-dark p-5 text-white shadow-[var(--shadow-card)]">
              <Quote className="h-6 w-6 shrink-0 text-brand-blue" />
              <div className="flex-1">
                <p className="text-sm leading-relaxed">{t("home.quote")}</p>
                <div className="mt-3">
                  <div className="text-sm font-bold">{t("home.manager")}</div>
                  <div className="text-xs text-white/70">{t("home.managerRole")}</div>
                </div>
              </div>
              <img src={manager} alt={t("home.manager")} width={512} height={512} loading="lazy" className="h-20 w-20 shrink-0 rounded-full border-2 border-brand-blue object-cover" />
            </div>
          </div>

          <div className="relative">
            <img src={aboutFleet} alt="Flota VARMAR" width={1280} height={640} loading="lazy" className="w-full object-contain" />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 md:px-8 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-extrabold text-brand-blue-dark md:text-5xl">
              {t("home.servicesTitle1")} <span className="text-brand-blue">{t("home.servicesTitle2")}</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/70">{t("home.servicesIntro")}</p>

            <ul className="mt-6 space-y-3">
              {servicesList.map((tx) => (
                <li key={tx} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>{tx}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-foreground/70">{t("home.servicesOutro")}</p>
          </div>

          <div className="relative mx-auto aspect-square w-full max-w-[520px]">
            {/* decorative rings */}
            <div className="absolute inset-0 rounded-full border border-dashed border-brand-blue/25" />
            <div className="absolute inset-[14%] rounded-full border border-dashed border-brand-blue/20" />
            <div className="absolute inset-[32%] rounded-full bg-gradient-to-br from-brand-blue to-sky-400 shadow-[0_20px_50px_-15px_rgba(14,165,233,0.6)]" />
            <div className="absolute inset-[32%] grid place-items-center text-center text-white">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">VARMAR</div>
                <div className="mt-1 text-sm font-extrabold uppercase leading-tight md:text-base">
                  {t("home.servicesTitle1")}<br />{t("home.servicesTitle2")}
                </div>
              </div>
            </div>

            {/* orbiting tiles */}
            {tileKeys.map((k, idx) => {
              const Icon = tileIcons[idx];
              const angle = (idx / tileKeys.length) * 2 * Math.PI - Math.PI / 2;
              const radius = 42; // % from center
              const x = 50 + radius * Math.cos(angle);
              const y = 50 + radius * Math.sin(angle);
              return (
                <div
                  key={k}
                  className="group absolute flex w-[26%] -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-brand-blue/15 bg-white text-brand-blue-dark shadow-[0_8px_22px_-8px_rgba(15,23,42,0.25)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-110 group-hover:border-brand-blue group-hover:bg-brand-blue group-hover:text-white sm:h-[72px] sm:w-[72px]">
                    <Icon className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.6} />
                  </span>
                  <span className="rounded-full bg-white/90 px-2 py-0.5 text-center text-[9px] font-bold uppercase leading-tight tracking-wider text-brand-blue-dark shadow-sm backdrop-blur sm:text-[10px]">
                    {t(`home.tiles.${k}`)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="mt-16 bg-brand-blue py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          {(["f1", "f2", "f3", "f4"] as const).map((k, idx) => {
            const Icon = featureIcons[idx];
            return (
              <div key={k} className="flex items-start gap-4">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 backdrop-blur">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold">{t(`home.features.${k}.t`)}</div>
                  <div className="text-sm text-white/80">{t(`home.features.${k}.d`)}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <ClientsCarousel />

      {/* NUESTRA FLOTA */}
      <section className="bg-slate-200 py-10 md:py-12">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <h2 className="text-4xl font-extrabold text-brand-blue-dark md:text-5xl">
            {t("home.fleetTitle1")} <span className="text-sky-500">{t("home.fleetTitle2")}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold italic text-foreground/70">{t("home.fleetSubtitle")}</p>
        </div>

        <div className="group relative mt-10 overflow-hidden" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
          <div className="flex w-max animate-marquee gap-6 group-hover:[animation-play-state:paused]">
            {[s1, s2, s3, s4, s5, s6, s1, s2, s3, s4, s5, s6].map((img, i) => (
              <div key={i} className="group/card w-[280px] shrink-0 sm:w-[340px]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-white shadow-md">
                  <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link to="/flota" className="inline-flex items-center gap-2 rounded-sm bg-sky-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-sky-600">
            {t("home.fleetCta")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-soft py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">{t("home.statsKicker")}</span>
            <h2 className="mt-3 text-4xl font-extrabold text-brand-blue-dark md:text-5xl">{t("home.statsTitle")}</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white p-8 text-center shadow-[var(--shadow-card)] transition hover:-translate-y-1">
                <div className="text-5xl font-extrabold text-brand-red">{n}</div>
                <div className="mt-2 text-sm font-medium text-foreground/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONDUCTORES */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-brand-blue-dark md:text-5xl">{t("home.driversTitle")}</h2>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 bg-brand-blue" />
              <span className="h-1 w-24 bg-brand-red" />
            </div>
            <p className="mt-6 text-base leading-relaxed text-foreground/80">{t("home.driversText")}</p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[cond1, cond2, cond3].map((img, i) => (
              <figure key={i} className="group relative aspect-[3/4] overflow-hidden rounded-sm shadow-md">
                <img src={img} alt="" loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="bg-brand-blue-dark py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div className="flex flex-col items-center md:items-start">
            <h2 className="text-5xl font-extrabold uppercase tracking-tight text-white md:text-6xl">{t("home.valuesTitle")}</h2>
            <div className="mt-4 flex items-center gap-2">
              <span className="h-1 w-10 bg-brand-blue" />
              <span className="h-1 w-20 bg-brand-red" />
            </div>
            <HandshakeIcon className="mt-8 h-40 w-40 text-white md:h-52 md:w-52" strokeWidth={1.2} />
          </div>

          <ul className="space-y-4">
            {values.map((v, idx) => (
              <li key={v} className="flex items-center gap-4" style={{ marginLeft: `${idx * 8}px` }}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 border-white bg-white shadow-md">
                  <span className="h-2 w-2 rounded-full bg-brand-blue-dark" />
                </span>
                <div className="flex-1 rounded-sm bg-white/15 px-5 py-3 backdrop-blur-sm">
                  <span className="text-base font-semibold text-white md:text-lg">{v}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-slate-100">
        <div className="relative mx-auto max-w-5xl px-4 text-center md:px-8">
          <h2 className="text-3xl font-extrabold md:text-5xl text-brand-blue-dark">{t("home.ctaTitle")}</h2>
          <p className="mx-auto mt-4 max-w-2xl text-foreground/70">{t("home.ctaText")}</p>
          <Link to="/contacto" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-red px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5">
            {t("home.ctaBtn")} <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
