import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Info, Users, Settings2, Fuel, Gauge, Check, MessageCircle, ShoppingCart, Trash2, Plus, Minus, X, RotateCcw } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { openWhatsApp } from "@/lib/whatsapp";
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
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

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

  const addToCart = (id: string) => {
    setCart((c) => ({ ...c, [id]: (c[id] ?? 0) + 1 }));
    setCartOpen(true);
  };
  const setQty = (id: string, q: number) => {
    setCart((c) => {
      const next = { ...c };
      if (q <= 0) delete next[id];
      else next[id] = q;
      return next;
    });
  };
  const cartItems = Object.entries(cart)
    .map(([id, qty]) => ({ v: VEHICULOS.find((x) => x.id === id)!, qty }))
    .filter((x) => x.v);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.v.diario * i.qty, 0);

  const sendCartWA = () => {
    if (!cartItems.length) return;
    const lines = cartItems.map(
      (i) => `• ${i.v.nombre} (${i.v.modelo}) x${i.qty} — S/${i.v.diario * i.qty}/día`,
    );
    const text = `Hola, quiero cotizar los siguientes vehículos según la cotización en la sección flota\n\n${lines.join("\n")}\n\nTotal referencial diario: S/${cartTotal}`;
    openWhatsApp(text);
  };

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
                    <button onClick={() => addToCart(v.id)} className="inline-flex items-center justify-center gap-1.5 rounded-md bg-sky-500 px-3 py-2.5 text-sm font-bold uppercase text-white transition-opacity hover:opacity-90">
                      <ShoppingCart className="size-4" /> Cotizar
                    </button>
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
                <button onClick={() => { addToCart(detalle.id); setDetalle(null); }} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-3 text-sm font-bold uppercase text-white transition-opacity hover:opacity-90">
                  <ShoppingCart className="size-5" /> Agregar a cotización
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Floating quote button (above WhatsApp) */}
      <button
        onClick={() => setCartOpen(true)}
        aria-label="Ver cotización"
        className="fixed bottom-24 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-brand-red text-white shadow-lg transition-transform hover:scale-110 hover:shadow-xl"
      >
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-sky-500 text-xs font-bold ring-2 ring-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* Quote side panel */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="flex flex-row items-center justify-between border-b bg-brand-soft px-5 py-4 space-y-0">
            <SheetTitle className="flex items-center gap-2 text-base font-bold">
              <ShoppingCart className="h-5 w-5 text-brand-red" /> Mi Cotización
            </SheetTitle>
            {cartItems.length > 0 && (
              <button onClick={() => setCart({})} className="flex items-center gap-1 text-xs font-semibold text-brand-red hover:opacity-80">
                <Trash2 className="h-3.5 w-3.5" /> Limpiar
              </button>
            )}
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-5">
            {cartItems.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center text-muted-foreground">
                <ShoppingCart className="mb-3 h-12 w-12 opacity-30" />
                <p className="text-sm">Tu cotización está vacía.</p>
                <p className="mt-1 text-xs">Agrega vehículos para solicitar una cotización personalizada.</p>
              </div>
            ) : (
              <ul className="space-y-3">
                {cartItems.map(({ v, qty }) => (
                  <li key={v.id} className="flex gap-3 rounded-lg border border-border bg-card p-3">
                    <img src={v.imagen} alt={v.nombre} className="h-16 w-20 shrink-0 rounded object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold leading-tight">{v.nombre}</p>
                          <p className="text-[11px] text-muted-foreground">CÓD: {v.id.toUpperCase()}</p>
                        </div>
                        <button onClick={() => setQty(v.id, 0)} aria-label="Eliminar" className="text-muted-foreground hover:text-brand-red">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-md border border-border">
                          <button onClick={() => setQty(v.id, qty - 1)} className="grid h-7 w-7 place-items-center hover:bg-muted"><Minus className="h-3 w-3" /></button>
                          <span className="w-7 text-center text-sm font-semibold">{qty}</span>
                          <button onClick={() => setQty(v.id, qty + 1)} className="grid h-7 w-7 place-items-center hover:bg-muted"><Plus className="h-3 w-3" /></button>
                        </div>
                        <span className="text-sm font-bold text-brand-red">S/ {v.diario * qty}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total referencial / día</span>
                <span className="text-xl font-bold">S/ {cartTotal}</span>
              </div>
              <button onClick={sendCartWA} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-whatsapp px-4 py-3 text-sm font-bold uppercase text-primary-foreground transition-opacity hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> Enviar Cotización
              </button>
              <button onClick={() => setCart({})} className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-brand-red px-4 py-2.5 text-xs font-bold uppercase text-brand-red transition-colors hover:bg-brand-red hover:text-white">
                <RotateCcw className="h-3.5 w-3.5" /> Reiniciar
              </button>
              <p className="mt-3 text-center text-[11px] text-muted-foreground">Cotización referencial — se confirma por WhatsApp.</p>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
