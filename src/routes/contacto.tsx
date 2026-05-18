import { createFileRoute, Link } from "@tanstack/react-router";
import { type FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";
import { openWhatsApp } from "@/lib/whatsapp";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — VARMAR Contratistas Generales" },
      { name: "description", content: "Solicita una cotización o información sobre nuestros servicios." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  const [sent, setSent] = useState(false);
  const { t } = useTranslation();
  const cards = t("contacto.cards", { returnObjects: true }) as { t: string; d: string }[];
  const services = t("contacto.services", { returnObjects: true }) as string[];
  const icons = [MapPin, MapPin, Phone, Phone, Mail];
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const message = `Hola, quiero solicitar información sobre los servicios de VARMAR Contratistas Generales.\n\nNombre: ${String(data.get("nombre") ?? "").trim()}\nEmpresa: ${String(data.get("empresa") ?? "").trim()}\nEmail: ${String(data.get("email") ?? "").trim()}\nTeléfono: ${String(data.get("tel") ?? "").trim()}\nServicio: ${String(data.get("servicio") ?? "").trim()}\nMensaje: ${String(data.get("mensaje") ?? "").trim()}`;
    openWhatsApp(message);
    setSent(true);
  };
  return (
    <>
      <section className="bg-gradient-to-br from-brand-soft to-white py-12">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">{t("contacto.kicker")}</span>
          <h1 className="mt-3 text-3xl font-extrabold text-brand-blue-dark md:text-4xl">{t("contacto.title")}</h1>
          <p className="mx-auto mt-4 max-w-xl text-foreground/70">{t("contacto.intro")}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {cards.map((c, i) => {
              const Icon = icons[i];
              return (
                <div key={c.t} className="flex items-start gap-4 rounded-sm bg-white p-6 shadow-[var(--shadow-card)]">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-sm bg-brand-blue text-white"><Icon /></div>
                  <div>
                    <div className="text-sm font-bold text-brand-blue-dark">{c.t}</div>
                    <div className="mt-1 text-sm text-foreground/70">{c.d}</div>
                  </div>
                </div>
              );
            })}
            <div className="rounded-sm bg-brand-blue p-6 text-white">
              <div className="text-sm font-bold uppercase tracking-wider">{t("contacto.schedule")}</div>
              <div className="mt-2 text-sm text-white/85">{t("contacto.sched1")}</div>
              <div className="text-sm text-white/85">{t("contacto.sched2")}</div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="rounded-sm bg-white p-8 shadow-[var(--shadow-card)]">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-brand-blue" />
                <h3 className="mt-4 text-2xl font-bold text-brand-blue-dark">{t("contacto.sentTitle")}</h3>
                <p className="mt-2 text-foreground/70">{t("contacto.sentText")}</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-brand-blue-dark">{t("contacto.formTitle")}</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label={t("contacto.fName")} name="nombre" />
                  <Field label={t("contacto.fCompany")} name="empresa" />
                  <Field label={t("contacto.fEmail")} name="email" type="email" />
                  <Field label={t("contacto.fPhone")} name="tel" />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-brand-blue-dark">{t("contacto.fService")}</label>
                  <select name="servicio" required className="mt-1.5 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20">
                    {services.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-brand-blue-dark">{t("contacto.fMessage")}</label>
                  <textarea name="mensaje" required rows={5} className="mt-1.5 w-full resize-none rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20" />
                </div>
                <div className="mt-4 flex items-start gap-2">
                  <input id="terms" name="terms" type="checkbox" required className="mt-1 h-4 w-4 shrink-0 rounded border-border text-brand-blue focus:ring-brand-blue" />
                  <label htmlFor="terms" className="text-xs text-foreground/70">
                    {t("contacto.termsCheck")}{" "}
                    <Link to="/terminos" className="font-semibold text-brand-blue underline hover:text-brand-blue-dark" target="_blank">
                      {t("nav.terminos")}
                    </Link>
                    .
                  </label>
                </div>
                <button type="submit" className="mt-6 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm bg-brand-red px-6 py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5">
                  <Send className="h-4 w-4" /> {t("contacto.send")}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-semibold text-brand-blue-dark">{label}</label>
      <input id={name} name={name} type={type} required className="mt-1.5 w-full rounded-sm border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20" />
    </div>
  );
}
