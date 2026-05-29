import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Target, Eye, Award, Users } from "lucide-react";
import hero from "@/assets/hero-construction.avif";
import fundadores from "@/assets/Fundadores.avif";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — VARMAR Contratistas Generales" },
      { name: "description", content: "Conoce VARMAR: nuestra historia, misión, visión y compromiso con la calidad." },
    ],
  }),
  component: Nosotros,
});

function Nosotros() {
  const { t } = useTranslation();
  const icons = [Target, Eye, Award, Users];
  const cards = t("nosotros.cards", { returnObjects: true }) as { t: string; d: string }[];
  return (
    <>
      <section className="relative bg-brand-blue-dark py-12 text-white">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: `url(${hero})`, backgroundSize: "cover" }} />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-red">{t("nosotros.kicker")}</span>
          <h1 className="mt-3 whitespace-pre-line text-3xl font-extrabold text-white md:text-4xl">{t("nosotros.title")}</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="text-center text-lg font-bold text-brand-blue-dark">Fundadores de la empresa</h3>
            <div className="mt-3 overflow-hidden rounded-sm shadow-[var(--shadow-card)]">
              <img src={fundadores} alt="Fundadores de la empresa" className="h-auto w-full object-cover" loading="lazy" />
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-brand-blue-dark md:text-4xl">{t("nosotros.who")}</h2>
            <div className="mt-3 h-1 w-20 rounded-sm bg-brand-red" />
            <p className="mt-6 text-foreground/75 leading-relaxed">{t("nosotros.p1")}</p>
            <p className="mt-4 text-foreground/75 leading-relaxed">{t("nosotros.p2")}</p>
          </div>
        </div>
        <div className="mt-12 ml-auto grid w-fit gap-3 grid-cols-4">
          {cards.map((c, i) => {
            const Icon = icons[i];
            return (
              <div key={c.t} className="flex h-full flex-col rounded-sm bg-white px-4 py-4 shadow-[var(--shadow-card)] transition hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-sm bg-brand-blue text-white"><Icon /></div>
                <h3 className="mt-4 font-bold text-brand-blue-dark">{c.t}</h3>
                <p className="mt-1 text-sm text-foreground/70">{c.d}</p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}



