import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { Wrench, Building2, ArrowRight, ShieldCheck, HardHat, Clock, Handshake, Sparkles, CheckCircle2, Truck, Bus, Car, UserCheck, ShieldCheck as ShieldIcon, CarFront, Handshake as HandshakeIcon, MapPin, CalendarDays } from "lucide-react";
import { HeroSlider } from "@/components/HeroSlider";
import { ClientsCarousel } from "@/components/ClientsCarousel";
import aboutFleet from "@/assets/about-fleet.jpg";
import truck from "@/assets/truck.jpg";
import s1 from "@/assets/flota-1.png";
import s2 from "@/assets/flota-2.png";
import s3 from "@/assets/flota-3.png";
import s4 from "@/assets/flota-4.png";
import s5 from "@/assets/flota-5.png";
import s6 from "@/assets/flota-6.png";
import cond1 from "@/assets/cond-1.png";
import mapCoverage from "@/assets/map-coverage.png";
import cond2 from "@/assets/cond-2.png";
import cond3 from "@/assets/cond-3.png";
import { cleanRenderedText, fetchBlogPosts, getFeaturedImageAlt, getFeaturedImageUrl, getPostDateParts, getPrimaryCategory } from "@/lib/blog";
import { openWhatsApp } from "@/lib/whatsapp";

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

      <BlogSection />

      {/* COBERTURA */}
      <section className="bg-muted py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 md:px-8 lg:grid-cols-2">
          {/* COLUMNA IZQUIERDA */}
          <div>
            <h2 className="text-4xl font-extrabold uppercase leading-tight tracking-tight text-brand-blue-dark md:text-5xl">Cobertura</h2>
            <div className="mt-5 flex items-center gap-2">
              <span className="h-1 w-12 bg-brand-blue" />
              <span className="h-1 w-24 bg-brand-red" />
            </div>
            <p className="mt-6 text-lg font-semibold text-foreground/80">Operamos en el sur del Perú</p>
            <p className="mt-5 text-lg text-muted-foreground">
              Con sedes estratégicas en Cusco y Apurímac, brindamos servicio a las principales operaciones mineras y destinos turísticos de la región.
            </p>

            {/* Cards de sedes */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {/* Card Apurímac */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-red/40 hover:shadow-lg">
                {/* Gradiente decorativo */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-red/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-red/10">
                      <Building2 className="h-5 w-5 text-brand-red" strokeWidth={1.8} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sede Operativa</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-red" />
                    <h3 className="text-lg font-bold">Apurímac</h3>
                  </div>
                  <div className="my-3 border-t border-border/50" />
                  <div className="flex items-start gap-1.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-foreground/80">Las Bambas — Barrio Manantiales S/N</span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Apurímac · Perú
                    </span>
                  </div>
                </div>
              </div>

              {/* Card Cusco */}
              <div className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand-blue/40 hover:shadow-lg">
                {/* Gradiente decorativo */}
                <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-brand-blue/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-60" />
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-brand-blue/10">
                      <Building2 className="h-5 w-5 text-brand-blue" strokeWidth={1.8} />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Sede Principal</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-blue" />
                    <h3 className="text-lg font-bold">Cusco</h3>
                  </div>
                  <div className="my-3 border-t border-border/50" />
                  <div className="flex items-start gap-1.5">
                    <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                    <span className="text-sm text-foreground/80">Villa Unión Huancaro C-8</span>
                  </div>
                  <div className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Cusco · Perú
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA — Mapa */}
          <div className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-brand-blue/40">
            <img
              src={mapCoverage}
              alt="Mapa de cobertura VARMAR en el sur del Perú"
              width={1024}
              height={1366}
              loading="lazy"
              className="h-full w-full object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
            />
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
          <button type="button" onClick={() => openWhatsApp("Hola, quiero solicitar una cotización para mi próximo proyecto con VARMAR Contratistas Generales.")} className="mt-8 inline-flex cursor-pointer items-center gap-2 rounded-xl bg-brand-red px-8 py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5">
            {t("home.ctaBtn")} <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>
    </>
  );
}

function BlogSection() {
  const {
    data: posts = [],
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["home-blog-posts"],
    queryFn: async () => {
      const { posts } = await fetchBlogPosts({ perPage: 6 });
      return posts;
    },
    staleTime: 1000 * 60 * 10,
  });

  return (
    <section className="bg-brand-soft py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-4xl font-extrabold text-brand-blue-dark md:text-5xl">
              Blog
            </h2>
            <p className="mt-3 text-base font-medium text-brand-blue-dark">
              Noticias y perspectivas para el <span className="font-extrabold text-brand-red">Perú de hoy y mañana</span>
            </p>
          </div>

          <Link
            to="/blog"
            className="inline-flex w-fit items-center gap-2 rounded-sm bg-brand-red px-6 py-3 text-sm font-extrabold uppercase tracking-wider text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="overflow-hidden rounded-sm bg-white shadow-[var(--shadow-card)]">
                <div className="aspect-[4/3] animate-pulse bg-slate-200" />
                <div className="space-y-4 p-6">
                  <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
                  <div className="h-5 w-4/5 animate-pulse rounded bg-slate-200" />
                  <div className="h-10 w-full animate-pulse rounded bg-slate-200" />
                  <div className="h-9 w-24 animate-pulse rounded bg-slate-200" />
                </div>
              </div>
            ))}
          </div>
        ) : isError ? (
          <div className="mt-10 rounded-sm border border-brand-red/20 bg-white p-6 text-sm font-medium text-foreground/70 shadow-[var(--shadow-card)]">
            No pudimos cargar las publicaciones en este momento. Puedes visitar el blog desde el botón "Ver todo".
          </div>
        ) : posts.length > 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => {
              const title = cleanRenderedText(post.title.rendered) || "Artículo VARMAR";
              const excerpt = cleanRenderedText(post.excerpt.rendered);
              const date = getPostDateParts(post.date);
              const imageAlt = getFeaturedImageAlt(post);

              return (
                <article key={post.id} className="group overflow-hidden rounded-sm bg-white shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <a href={post.link} target="_blank" rel="noreferrer" className="block">
                    <div className="relative aspect-[4/3] overflow-hidden bg-slate-200">
                      <img
                        src={getFeaturedImageUrl(post) ?? truck}
                        alt={imageAlt}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute left-5 top-5 rounded-sm bg-white/95 px-3 py-1 text-xs font-extrabold uppercase tracking-wider text-brand-blue-dark shadow-sm">
                        {getPrimaryCategory(post)}
                      </div>
                      <div className="absolute bottom-0 left-5 grid min-h-16 min-w-16 place-items-center bg-brand-red px-3 py-2 text-center text-white shadow-lg">
                        <span className="text-xs font-bold uppercase leading-none">{date.month}</span>
                        <span className="mt-1 text-2xl font-extrabold leading-none">{date.day}</span>
                      </div>
                    </div>
                  </a>

                  <div className="flex min-h-[220px] flex-col p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      <CalendarDays className="h-4 w-4 text-brand-blue" />
                      <span>Actualidad VARMAR</span>
                    </div>
                    <h3 className="text-lg font-extrabold uppercase leading-snug text-brand-blue-dark">
                      <a href={post.link} target="_blank" rel="noreferrer" className="transition hover:text-brand-blue">
                        {title}
                      </a>
                    </h3>
                    {excerpt ? (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground/70">{excerpt}</p>
                    ) : null}
                    <a
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-auto inline-flex w-fit items-center gap-2 rounded-sm bg-brand-blue-dark px-4 py-2.5 text-sm font-bold text-white transition hover:bg-brand-blue"
                    >
                      Leer más <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="mt-10 rounded-sm border border-border bg-white p-6 text-sm font-medium text-foreground/70 shadow-[var(--shadow-card)]">
            Aún no hay publicaciones disponibles en el blog.
          </div>
        )}
      </div>
    </section>
  );
}
