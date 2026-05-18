import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Info, Users, Settings2, Fuel, Gauge, Check, MessageCircle, ShoppingCart, Trash2, Plus, Minus, X, RotateCcw } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import hilux from "@/assets/flota-1.png";
import fortuner from "@/assets/flota-2.png";
import van from "@/assets/flota-3.png";
import ranger from "@/assets/flota-4.png";
import patrol from "@/assets/flota-5.png";
import landcruiser from "@/assets/flota-6.png";
import heroBg from "@/assets/about-fleet.jpg";

export const Route = createFileRoute("/flota")({
  head: () => ({
    meta: [
      { title: "Nuestra Flota — VARMAR Contratistas Generales" },
      { name: "description", content: "Flota homologada de camionetas 4x4, SUV y vans para minería, exploración y turismo." },
    ],
  }),
  component: FlotaPage,
});

type Estado = "Disponible" | "Rentado" | "Mantenimiento";
type Categoria = "Pickup 4x4" | "SUV" | "Van";
type Servicio = "Minería" | "Exploración" | "Turismo";

interface Vehiculo {
  id: string;
  nombre: string;
  modelo: string;
  imagen: string;
  categoria: Categoria;
  servicios: Servicio[];
  pasajeros: number;
  transmision: string;
  combustible: string;
  traccion: string;
  homologada: boolean;
  estado: Estado;
  diario: number;
  mensual: number;
  equipamiento: string[];
}

const VEHICULOS: Vehiculo[] = [
  { id: "hilux", nombre: "Toyota Hilux Guerrero", modelo: "Hilux 4x4 · 2023", imagen: hilux, categoria: "Pickup 4x4", servicios: ["Minería", "Exploración"], pasajeros: 5, transmision: "Manual", combustible: "Diesel", traccion: "4x4", homologada: true, estado: "Disponible", diario: 450, mensual: 9500, equipamiento: ["Multimedia", "GPS", "Aire acondicionado", "Barra antivuelco"] },
  { id: "fortuner", nombre: "Toyota Fortuner 4x4", modelo: "Fortuner · 2023", imagen: fortuner, categoria: "SUV", servicios: ["Exploración", "Turismo"], pasajeros: 7, transmision: "Automática", combustible: "Diesel", traccion: "4x4", homologada: true, estado: "Disponible", diario: 480, mensual: 9800, equipamiento: ["Cuero", "Multimedia", "Cámara de retroceso"] },
  { id: "van", nombre: "Mercedes Sprinter Van", modelo: "Sprinter 19 pax · 2022", imagen: van, categoria: "Van", servicios: ["Turismo", "Exploración"], pasajeros: 19, transmision: "Manual", combustible: "Diesel", traccion: "4x2", homologada: false, estado: "Disponible", diario: 520, mensual: 11000, equipamiento: ["Aire acondicionado", "Asientos reclinables", "Bodega amplia"] },
  { id: "ranger", nombre: "Ford Ranger 4x4", modelo: "Ranger XLT · 2023", imagen: ranger, categoria: "Pickup 4x4", servicios: ["Minería"], pasajeros: 5, transmision: "Automática", combustible: "Diesel", traccion: "4x4", homologada: true, estado: "Rentado", diario: 460, mensual: 9600, equipamiento: ["Estándares mineros", "Tolva con liner", "GPS"] },
  { id: "patrol", nombre: "Nissan Patrol", modelo: "Patrol Y61 · 2022", imagen: patrol, categoria: "SUV", servicios: ["Exploración", "Turismo"], pasajeros: 8, transmision: "Automática", combustible: "Diesel", traccion: "4x4", homologada: true, estado: "Disponible", diario: 500, mensual: 10500, equipamiento: ["Tracción todo terreno", "Multimedia", "Cuero"] },
  { id: "landcruiser", nombre: "Toyota Land Cruiser", modelo: "Land Cruiser Prado · 2023", imagen: landcruiser, categoria: "SUV", servicios: ["Minería", "Exploración"], pasajeros: 7, transmision: "Automática", combustible: "Diesel", traccion: "4x4", homologada: true, estado: "Mantenimiento", diario: 600, mensual: 12500, equipamiento: ["Premium", "Cuero", "Cámara 360°", "Estándares mineros"] },
];

const ESTADO_CLS: Record<Estado, string> = {
  Disponible: "bg-[oklch(0.72_0.18_152)] text-white",
  Rentado: "bg-secondary text-secondary-foreground",
  Mantenimiento: "bg-muted-foreground text-background",
};

function FlotaPage() {
  const [tipos, setTipos] = useState<Categoria[]>([]);
  const [servs, setServs] = useState<Servicio[]>([]);
  const [homo, setHomo] = useState<"todos" | "si" | "no">("todos");
  const [detalle, setDetalle] = useState<Vehiculo | null>(null);

  const toggle = <T,>(arr: T[], v: T): T[] => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtrados = useMemo(
    () =>
      VEHICULOS.filter((v) => {
        if (tipos.length && !tipos.includes(v.categoria)) return false;
        if (servs.length && !servs.some((s) => v.servicios.includes(s))) return false;
        if (homo === "si" && !v.homologada) return false;
        if (homo === "no" && v.homologada) return false;
        return true;
      }),
    [tipos, servs, homo],
  );

  const waMsg = (v: Vehiculo) =>
    `https://wa.me/51999999999?text=${encodeURIComponent(`Hola, quiero cotizar el ${v.nombre} (${v.modelo}).`)}`;

  return (
    <>
      <section className="relative bg-brand-blue-dark py-20 text-white">
        <div className="absolute inset-0 opacity-25" style={{ backgroundImage: `url(${heroBg})`, backgroundSize: "cover", backgroundPosition: "center" }} />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue-dark via-brand-blue-dark/90 to-brand-blue-dark/60" />
        <div className="relative mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-sm font-bold uppercase tracking-widest text-sky-400">Nuestra Flota</span>
          <h1 className="mt-3 text-4xl font-extrabold text-white md:text-6xl">
            Unidades <span className="text-sky-400">homologadas</span>
          </h1>
          <p className="mt-4 max-w-2xl text-white/80">Camionetas 4x4, SUV, vans y buses listos para operaciones mineras, exploración y turismo.</p>
        </div>
      </section>

      <section className="bg-brand-soft py-12 md:py-16">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-28">
            <h2 className="mb-4 text-lg font-bold uppercase">Filtros</h2>

            <div className="mb-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Tipo de Vehículo</h3>
              <div className="space-y-2">
                {(["Pickup 4x4", "SUV", "Van"] as Categoria[]).map((c) => (
                  <label key={c} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input type="checkbox" className="size-4 accent-primary" checked={tipos.includes(c)} onChange={() => setTipos(toggle(tipos, c))} />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Tipo de Servicio</h3>
              <div className="space-y-2">
                {(["Minería", "Exploración", "Turismo"] as Servicio[]).map((s) => (
                  <label key={s} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input type="checkbox" className="size-4 accent-primary" checked={servs.includes(s)} onChange={() => setServs(toggle(servs, s))} />
                    {s}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Homologación</h3>
              <div className="space-y-2">
                {([
                  ["todos", "Todos"],
                  ["si", "Solo Homologadas"],
                  ["no", "No Homologadas"],
                ] as const).map(([k, label]) => (
                  <label key={k} className="flex cursor-pointer items-center gap-2 text-sm">
                    <input type="radio" name="homo" className="size-4 accent-primary" checked={homo === k} onChange={() => setHomo(k)} />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-foreground/80">
              <p className="mb-1 text-sm font-bold text-primary">VARMAR Contratistas</p>
              <p>Más de 15 años brindando soluciones de transporte seguro y confiable para los sectores minero, energético y turístico del Perú.</p>
            </div>
          </aside>

          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {filtrados.length === 0 && (
              <p className="col-span-full py-20 text-center text-muted-foreground">No se encontraron vehículos con esos filtros.</p>
            )}
            {filtrados.map((v) => (
              <article key={v.id} className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                <div className="relative aspect-[4/3] overflow-hidden bg-white">
                  <img src={v.imagen} alt={v.nombre} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className={`absolute left-2 top-2 rounded px-2 py-1 text-[10px] font-bold uppercase ${v.homologada ? "bg-primary text-primary-foreground" : "bg-foreground/70 text-background"}`}>
                    {v.homologada ? "✓ Homologada" : "No Homologada"}
                  </span>
                  <span className={`absolute right-2 top-2 rounded px-2 py-1 text-[10px] font-bold uppercase ${ESTADO_CLS[v.estado]}`}>{v.estado}</span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-lg font-bold">{v.nombre}</h3>
                  <p className="text-xs text-muted-foreground">{v.modelo}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {v.servicios.map((s) => (
                      <span key={s} className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">{s}</span>
                    ))}
                    <span className="rounded-full bg-secondary/20 px-2 py-0.5 text-[10px] font-semibold text-secondary-foreground">{v.categoria}</span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                    <div className="flex items-center gap-1.5"><Users className="size-3.5 text-primary" />{v.pasajeros} pasajeros</div>
                    <div className="flex items-center gap-1.5"><Settings2 className="size-3.5 text-primary" />{v.transmision}</div>
                    <div className="flex items-center gap-1.5"><Fuel className="size-3.5 text-primary" />{v.combustible}</div>
                    <div className="flex items-center gap-1.5"><Gauge className="size-3.5 text-primary" />{v.traccion}</div>
                  </div>
                  <div className="mt-4 space-y-1 border-t border-border pt-3 text-sm">
                    <div className="flex justify-between"><span className="text-muted-foreground">Diario:</span><span className="font-bold">S/ {v.diario}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Mensual:</span><span className="font-bold">S/ {v.mensual}</span></div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <button onClick={() => setDetalle(v)} className="inline-flex items-center justify-center gap-1.5 rounded-md border border-primary px-3 py-2.5 text-sm font-bold uppercase text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                      <Info className="size-4" /> Detalles
                    </button>
                    <a href={waMsg(v)} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-1.5 rounded-md bg-sky-500 px-3 py-2.5 text-sm font-bold uppercase text-white transition-opacity hover:opacity-90">
                      <MessageCircle className="size-4" /> Cotizar
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Dialog open={!!detalle} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
          {detalle && (
            <>
              <div className="aspect-video w-full overflow-hidden bg-white">
                <img src={detalle.imagen} alt={detalle.nombre} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <DialogHeader>
                  <DialogTitle className="text-2xl uppercase">{detalle.nombre}</DialogTitle>
                  <DialogDescription>{detalle.modelo}</DialogDescription>
                </DialogHeader>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${detalle.homologada ? "bg-primary text-primary-foreground" : "bg-foreground/70 text-background"}`}>
                    {detalle.homologada ? "✓ Homologada" : "No Homologada"}
                  </span>
                  <span className={`rounded px-2 py-1 text-[10px] font-bold uppercase ${ESTADO_CLS[detalle.estado]}`}>{detalle.estado}</span>
                  <span className="rounded-full bg-secondary/20 px-2 py-1 text-[10px] font-semibold text-secondary-foreground">{detalle.categoria}</span>
                  {detalle.servicios.map((s) => (
                    <span key={s} className="rounded-full bg-accent px-2 py-1 text-[10px] font-semibold text-accent-foreground">{s}</span>
                  ))}
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2"><Users className="size-4 text-primary" />{detalle.pasajeros} pasajeros</div>
                  <div className="flex items-center gap-2"><Settings2 className="size-4 text-primary" />{detalle.transmision}</div>
                  <div className="flex items-center gap-2"><Fuel className="size-4 text-primary" />{detalle.combustible}</div>
                  <div className="flex items-center gap-2"><Gauge className="size-4 text-primary" />{detalle.traccion}</div>
                </div>
                <div className="mt-5">
                  <h4 className="mb-2 text-sm font-bold uppercase">Equipamiento</h4>
                  <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {detalle.equipamiento.map((e) => (
                      <li key={e} className="flex items-center gap-2 text-sm"><Check className="size-4 text-primary" />{e}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-5 rounded-lg bg-muted p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tarifa Diaria</span>
                    <span className="text-2xl font-bold text-primary">S/ {detalle.diario}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Tarifa Mensual</span>
                    <span className="text-2xl font-bold text-primary">S/ {detalle.mensual}</span>
                  </div>
                </div>
                <a href={waMsg(detalle)} target="_blank" rel="noreferrer" className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-3 text-sm font-bold uppercase text-white transition-opacity hover:opacity-90">
                  <MessageCircle className="size-5" /> Cotizar por WhatsApp
                </a>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
