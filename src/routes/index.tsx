import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrench, Building2, ArrowRight, ShieldCheck, HardHat, Clock, Handshake, Sparkles, Quote, CheckCircle2, Truck, Bus, Car, UserCheck, ShieldCheck as ShieldIcon, CarFront } from "lucide-react";
import hero from "@/assets/hero-construction.jpg";
import { HeroSlider } from "@/components/HeroSlider";
import { ClientsCarousel } from "@/components/ClientsCarousel";
import obras from "@/assets/obras-civiles.jpg";
import servicios from "@/assets/servicios-generales.jpg";
import proyectos from "@/assets/proyectos-integrales.jpg";
import aboutFleet from "@/assets/about-fleet.jpg";
import manager from "@/assets/manager.jpg";
import truck from "@/assets/truck.jpg";
import s1 from "@/assets/slide-1.png";
import s2 from "@/assets/slide-2.png";
import s3 from "@/assets/slide-3.png";
import s4 from "@/assets/slide-4.png";

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
        <div className="mx-auto grid max-w-7xl items-start gap-12 px-4 md:px-8 lg:grid-cols-2">
          {/* Left: title + checklist */}
          <div>
            <h2 className="text-4xl font-extrabold text-brand-blue-dark md:text-5xl">
              Nuestros <span className="text-brand-blue">Servicios</span>
            </h2>
            <p className="mt-5 text-base leading-relaxed text-foreground/70">
              En VARMAR brindamos servicios integrales de obras civiles, mantenimiento
              industrial y alquiler de unidades vehiculares para los sectores minero,
              energético y de construcción. Además ofrecemos:
            </p>

            <ul className="mt-6 space-y-3">
              {[
                "Servicio de transporte especializado en camionetas 4x4.",
                "Servicio de transporte de personal en minivan, mini bus y bus.",
                "Alquiler de camionetas 4x4.",
                "Alquiler de autos.",
                "Servicio de conductor especializado en 4x4.",
                "Servicio especial de resguardo - autorizados por la SUCAMEC.",
                "Transporte de carga.",
              ].map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-blue" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-sm leading-relaxed text-foreground/70">
              Nos comprometemos a proporcionar servicios de alta calidad y atención
              personalizada. Confíe en nosotros para todas sus necesidades de transporte
              y alquiler de vehículos.
            </p>
          </div>

          {/* Right: tile grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {[
              { icon: CarFront, label: "Camionetas 4x4" },
              { icon: Bus, label: "Minivan" },
              { icon: Bus, label: "Mini Bus y Bus" },
              { icon: Car, label: "Alquiler de Autos" },
              { icon: UserCheck, label: "Conductores Especializados" },
              { icon: ShieldIcon, label: "Resguardo Autorizado" },
              { icon: Truck, label: "Transporte de Carga" },
            ].map((it) => (
              <div
                key={it.label}
                className="group flex aspect-square flex-col items-center justify-center gap-2 rounded-sm bg-brand-blue p-4 text-center text-white shadow-md transition hover:-translate-y-1 hover:bg-brand-blue-dark"
              >
                <it.icon className="h-10 w-10 transition-transform group-hover:scale-110" strokeWidth={1.5} />
                <span className="text-[11px] font-bold uppercase leading-tight tracking-wider sm:text-xs">
                  {it.label}
                </span>
              </div>
            ))}
            {/* truck photo tile */}
            <div className="col-span-2 aspect-square overflow-hidden rounded-sm shadow-md sm:col-span-2">
              <img
                src={truck}
                alt="Transporte de carga"
                width={768}
                height={512}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>
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

      {/* CLIENTS */}
      <ClientsCarousel />

      {/* NUESTRA FLOTA */}
      <section className="bg-white py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <h2 className="text-4xl font-extrabold text-brand-blue-dark md:text-5xl">
            Nuestra <span className="text-sky-500">Flota</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm font-semibold italic text-foreground/70">
            "Más de 10 años de experiencia avalan nuestro trabajo"
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[
              { img: s1, label: "Camioneta 4x4" },
              { img: s2, label: "Doble Cabina" },
              { img: s3, label: "Minivan" },
              { img: s4, label: "Mini Bus" },
              { img: truck, label: "Bus" },
              { img: aboutFleet, label: "Bus Turismo" },
            ].map((u) => (
              <div key={u.label} className="group flex flex-col items-center">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-brand-soft">
                  <img src={u.img} alt={u.label} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                </div>
                <span className="mt-2 text-xs font-bold uppercase tracking-wider text-brand-blue-dark">{u.label}</span>
              </div>
            ))}
          </div>

          <Link
            to="/flota"
            className="mt-10 inline-flex items-center gap-2 rounded-sm bg-sky-500 px-8 py-3.5 text-sm font-bold uppercase tracking-wider text-white shadow-md transition hover:bg-sky-600"
          >
            Ver Nuestra Flota <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-12 h-3 w-full bg-brand-blue-dark" />
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
