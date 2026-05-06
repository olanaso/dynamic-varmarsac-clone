import { createFileRoute, Link } from "@tanstack/react-router";
import { Wrench, Phone, Building2, ArrowRight, ShieldCheck, HardHat, Clock, Handshake, CheckCircle2, Sparkles } from "lucide-react";
import hero from "@/assets/hero-construction.jpg";
import { HeroSlider } from "@/components/HeroSlider";
import obras from "@/assets/obras-civiles.jpg";
import servicios from "@/assets/servicios-generales.jpg";
import proyectos from "@/assets/proyectos-integrales.jpg";

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
  { icon: Building2, title: "Obras Civiles", desc: "Ejecutamos obras civiles con altos estándares de calidad, seguridad y cumplimiento técnico.", img: obras },
  { icon: Wrench, title: "Servicios Generales", desc: "Brindamos soluciones eficientes en mantenimiento, instalaciones y servicios para diferentes sectores industriales.", img: servicios },
  { icon: Sparkles, title: "Proyectos Integrales", desc: "Gestionamos y ejecutamos proyectos integrales de principio a fin, asegurando resultados confiables y sostenibles.", img: proyectos },
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

      {/* SERVICES CARDS */}
      <section className="mx-auto -mt-10 max-w-7xl px-4 md:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-[var(--shadow-card)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-glow)]"
              style={{ animation: `fadeUp 0.6s ${i * 0.1}s both` }}
            >
              <div className="grid grid-cols-[1fr_auto] items-stretch">
                <div className="p-6">
                  <div className="grid h-12 w-12 place-items-center rounded-full bg-brand-blue/10 text-brand-blue">
                    <s.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-brand-blue-dark">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/70">{s.desc}</p>
                  <Link to="/servicios" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-blue">
                    Ver más <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
                <div className="relative w-28 overflow-hidden md:w-36">
                  <img src={s.img} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                </div>
              </div>
            </article>
          ))}
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
