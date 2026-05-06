import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2 } from "lucide-react";

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
  return (
    <>
      <section className="bg-gradient-to-br from-brand-soft to-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-brand-blue">Hablemos</span>
          <h1 className="mt-3 text-5xl font-extrabold text-brand-blue-dark md:text-6xl">Contáctanos</h1>
          <p className="mx-auto mt-4 max-w-xl text-foreground/70">Cuéntanos sobre tu proyecto y te respondemos en menos de 24 horas.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 md:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="space-y-4">
            {[
              { icon: MapPin, t: "Dirección", d: "Av. Industrial 123, Lima — Perú" },
              { icon: Phone, t: "Teléfono", d: "+51 999 888 777" },
              { icon: Mail, t: "Email", d: "contacto@varmar.com" },
            ].map((c) => (
              <div key={c.t} className="flex items-start gap-4 rounded-2xl bg-white p-6 shadow-[var(--shadow-card)]">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-blue text-white"><c.icon /></div>
                <div>
                  <div className="text-sm font-bold text-brand-blue-dark">{c.t}</div>
                  <div className="mt-1 text-sm text-foreground/70">{c.d}</div>
                </div>
              </div>
            ))}
            <div className="rounded-2xl bg-brand-blue p-6 text-white">
              <div className="text-sm font-bold uppercase tracking-wider">Horario</div>
              <div className="mt-2 text-sm text-white/85">Lun – Vie: 8:00 — 18:00</div>
              <div className="text-sm text-white/85">Sábado: 9:00 — 13:00</div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="rounded-2xl bg-white p-8 shadow-[var(--shadow-card)]"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <CheckCircle2 className="h-16 w-16 text-brand-blue" />
                <h3 className="mt-4 text-2xl font-bold text-brand-blue-dark">¡Mensaje enviado!</h3>
                <p className="mt-2 text-foreground/70">Te contactaremos pronto.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-brand-blue-dark">Solicita tu cotización</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <Field label="Nombre" name="nombre" />
                  <Field label="Empresa" name="empresa" />
                  <Field label="Email" name="email" type="email" />
                  <Field label="Teléfono" name="tel" />
                </div>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-brand-blue-dark">Servicio</label>
                  <select required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20">
                    <option>Obras Civiles</option>
                    <option>Servicios Generales</option>
                    <option>Proyecto Integral</option>
                    <option>Otro</option>
                  </select>
                </div>
                <div className="mt-4">
                  <label className="text-sm font-semibold text-brand-blue-dark">Mensaje</label>
                  <textarea required rows={5} className="mt-1.5 w-full resize-none rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20" />
                </div>
                <button type="submit" className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-red px-6 py-4 text-sm font-bold text-white shadow-[var(--shadow-glow)] transition hover:-translate-y-0.5">
                  <Send className="h-4 w-4" /> Enviar mensaje
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
      <input id={name} name={name} type={type} required className="mt-1.5 w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20" />
    </div>
  );
}
