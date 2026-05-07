import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrench, Building2, ArrowRight, ShieldCheck, HardHat, Clock, Handshake, Sparkles, Quote } from "lucide-react";
import hero from "@/assets/hero-construction.jpg";
import { HeroSlider } from "@/components/HeroSlider";
import obras from "@/assets/obras-civiles.jpg";
import servicios from "@/assets/servicios-generales.jpg";
import proyectos from "@/assets/proyectos-integrales.jpg";
import aboutFleet from "@/assets/about-fleet.jpg";
import manager from "@/assets/manager.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VARMAR Contratistas Generales — Inicio" },
      { name: "description", content: "Construimos proyectos con calidad y confianza. Obras civiles, servicios generales y proyectos integrales." },
    ],
  }),
  component: Index,
});

const services = [
  {
    icon: Building2,
    title: "Minería y Construcción",
    subtitle: "Alquiler de camionetas corporativas",
    desc: "Brindamos la posibilidad de contar con nuestras unidades vehiculares y especializadas, ideales para los proyectos más exigentes en zonas mineras y de construcción a nivel nacional.",
    img: obras,
  },
  {
    icon: Wrench,
    title: "Exploración",
    subtitle: "Alquiler de camionetas corporativas",
    desc: "Contamos con camionetas corporativas equipadas para acompañar trabajos de exploración en cualquier terreno, garantizando seguridad, eficiencia y respaldo operativo permanente.",
    img: servicios,
  },
  {
    icon: Sparkles,
    title: "Turismo",
    subtitle: "Renta de vehículos para turismo",
    desc: "Ofrecemos vehículos modernos y cómodos para servicios de turismo, con un equipo profesional que garantiza una experiencia segura, puntual y de la más alta calidad.",
    img: proyectos,
  },
];

const features = [
  { icon: ShieldCheck, title: "Calidad Garantizada", desc: "Procesos y materiales de primera." },
  { icon: HardHat, title: "Seguridad Primero", desc: "Comprometidos con el bienestar de nuestro equipo y clientes." },
  { icon: Clock, title: "Cumplimiento", desc: "Entregamos a tiempo, siempre." },
  { icon: Handshake, title: "Confianza", desc: "Construimos relaciones sólidas y duraderas." },
];

function Index() {
  return (
    <>
      {/* HERO FULLSCREEN SLIDER */}
      <HeroSlider />

      {/* ABOUT US */}
      <section className="relative overflow-hidden bg-gradient-to-r from-white via-white to-brand-soft">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 md:px-8 md:py-20 lg:grid-cols-2">
          <div>
            <h2 className="text-4xl font-extrabold leading-tight text-brand-blue-dark md:text-5xl lg:text-[3.25rem]">
              VARMAR <span className="text-brand-blue">Contratistas Generales</span>
            </h2>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-foreground/70">
              Somos una empresa líder en obras civiles y servicios generales, brindando
              soluciones efectivas e integrales a empresas de los sectores industrial,
              minero y de construcción. Innovamos cada proceso con seguridad, calidad
              y compromiso, creciendo junto a nuestros clientes en todo el Perú.
            </p>
            <p className="mt-5 text-sm font-bold uppercase tracking-wider text-brand-blue-dark">
              " Más de <span className="text-brand-red">15 años de experiencia</span> nos avalan,
              gracias a todos nuestros clientes <span className="text-brand-red">vamos por más</span> "
            </p>

            {/* Testimonial card */}
            <div className="mt-8 flex items-stretch gap-4 rounded-sm bg-brand-blue-dark p-5 text-white shadow-[var(--shadow-card)]">
              <Quote className="h-6 w-6 shrink-0 text-brand-blue" />
              <div className="flex-1">
                <p className="text-sm leading-relaxed">
                  Priorizamos la seguridad, el compromiso y la garantía para ofrecer un
                  servicio insuperable.
                </p>
                <div className="mt-3">
                  <div className="text-sm font-bold">Ing. Jorge Vargas</div>
                  <div className="text-xs text-white/70">Gerente General</div>
                </div>
              </div>
              <img
                src={manager}
                alt="Gerente General"
                width={512}
                height={512}
                loading="lazy"
                className="h-20 w-20 shrink-0 rounded-full border-2 border-brand-blue object-cover"
              />
            </div>
          </div>

          <div className="relative">
            <img
              src={aboutFleet}
              alt="Flota VARMAR"
              width={1280}
              height={640}
              loading="lazy"
              className="w-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-10 text-center">
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-brand-red">Servicio de alquiler de vehículos</span>
            <h2 className="mt-3 text-4xl font-extrabold text-brand-blue-dark md:text-5xl">
              Nuestros <span className="text-brand-blue">Servicios</span>
            </h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-brand-red" />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <article
                key={s.title}
                className="group flex flex-col overflow-hidden rounded-sm bg-white shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]"
                style={{ animation: `fadeUp 0.6s ${i * 0.1}s both` }}
              >
                <div className="border-b-2 border-brand-red bg-white py-3 text-center">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-brand-blue-dark">{s.title}</h3>
                </div>
                <div className="relative h-48 overflow-hidden">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-blue">{s.subtitle}</h4>
                  <p className="mt-3 flex-1 text-sm italic leading-relaxed text-foreground/70">{s.desc}</p>
                  <Link
                    to="/servicios"
                    className="mt-5 inline-flex w-fit items-center gap-2 rounded-sm bg-brand-blue px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-brand-red"
                  >
                    Leer más <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES BAR */}
      <section className="mt-16 bg-brand-blue py-10 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-4">
          {features.map((f) => (
            <div key={f.title} className="flex items-start gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/10 backdrop-blur transition group-hover:bg-white/20">
                <f.icon className="h-6 w-6" />
              </div>
              <div>
                <div className="font-bold">{f.title}</div>
                <div className="text-sm text-white/80">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="bg-brand-soft py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center">
            <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">Nuestra trayectoria</span>
            <h2 className="mt-3 text-4xl font-extrabold text-brand-blue-dark md:text-5xl">Resultados que hablan por nosotros</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["+200", "Proyectos ejecutados"],
              ["+15", "Años de experiencia"],
              ["+50", "Clientes satisfechos"],
              ["100%", "Compromiso"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl bg-white p-8 text-center shadow-[var(--shadow-card)] transition hover:-translate-y-1">
                <div className="text-5xl font-extrabold text-brand-red">{n}</div>
                <div className="mt-2 text-sm font-medium text-foreground/70">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-brand-blue-dark py-20 text-white">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: `url(${hero})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/95 to-brand-blue-dark/70" />
        <div className="relative mx-auto max-w-5xl px-4 text-center md:px-8">
          <h2 className="text-3xl font-extrabold md:text-5xl">¿Listo para iniciar tu próximo proyecto?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-white/80">
            Conversemos sobre tus necesidades y diseñemos juntos la mejor solución para tu empresa.
          </p>
          <Link to="/contacto" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-red px-8 py-4 text-sm font-bold shadow-[var(--shadow-glow)] transition-all hover:-translate-y-0.5">
            Solicitar Cotización <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
