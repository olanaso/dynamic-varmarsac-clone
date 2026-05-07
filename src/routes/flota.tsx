import { createFileRoute, Link } from "@tanstack/react-router";
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
      { name: "description", content: "Conoce nuestra flota de camionetas 4x4, minivans, buses y unidades especializadas para minería, construcción y turismo." },
      { property: "og:title", content: "Nuestra Flota — VARMAR" },
      { property: "og:description", content: "Camionetas 4x4, minivans, buses y unidades especializadas." },
    ],
  }),
  component: FlotaPage,
});

const fleet = [
  { img: s1, title: "Camionetas 4x4", desc: "Unidades robustas para terrenos exigentes en minería y exploración.", icon: CarFront },
  { img: s2, title: "Camionetas Doble Cabina", desc: "Ideales para transporte de personal y supervisión en obra.", icon: CarFront },
  { img: s3, title: "Minivans y Mini Bus", desc: "Confort y seguridad para el transporte de personal.", icon: Bus },
  { img: s4, title: "Buses de Personal", desc: "Capacidad para grupos grandes con la máxima seguridad.", icon: Bus },
  { img: truck, title: "Transporte de Carga", desc: "Camiones equipados para carga pesada y logística especializada.", icon: Truck },
  { img: aboutFleet, title: "Flota Completa", desc: "Más de 10 años de experiencia respaldan cada unidad.", icon: CarFront },
];

function FlotaPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative bg-brand-blue-dark py-20 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${aboutFleet})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/90 to-brand-blue-dark/60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-sky-400">VARMAR</span>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-6xl">
            Nuestra <span className="text-sky-400">Flota</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">
            "Más de 10 años de experiencia avalan nuestro trabajo"
          </p>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-brand-soft py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {fleet.map((u) => (
            <article key={u.title} className="group overflow-hidden rounded-sm bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1">
              <div className="aspect-[4/3] overflow-hidden bg-white">
                <img src={u.img} alt={u.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-sm bg-sky-500 text-white">
                    <u.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-extrabold text-brand-blue-dark">{u.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-foreground/70">{u.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-blue py-14 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <h2 className="text-2xl font-extrabold md:text-3xl">¿Necesitas alquilar una unidad?</h2>
            <p className="mt-2 text-white/85">Conversemos sobre tu proyecto y la unidad ideal para ti.</p>
          </div>
          <Link to="/contacto" className="inline-flex items-center gap-2 rounded-sm bg-white px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-brand-blue-dark shadow-md transition hover:bg-sky-100">
            Contáctenos <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
