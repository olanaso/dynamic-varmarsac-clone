import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Info, Users, Settings2, Fuel, Gauge, Check, MessageCircle, ShoppingCart, Trash2, Plus, Minus, X, RotateCcw } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
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

interface Vehiculo {
  id: string;
  nombre: string;
  modelo: string;
  imagen: string;
  categoria: string;
  category_id: number;
  servicios: string[];
  serviceTypeIds: number[];
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

const ESTADO_CLS: Record<Estado, string> = {
  Disponible: "bg-[oklch(0.72_0.18_152)] text-white",
  Rentado: "bg-secondary text-secondary-foreground",
  Mantenimiento: "bg-muted-foreground text-background",
};

function resolveApiBase() {
  const envBase = (import.meta.env.VITE_API_URL ?? import.meta.env.API_URL ?? "") as string;
  if (envBase) return envBase.replace(/\/$/, "");
  if (typeof window !== "undefined") return window.location.origin;
  return "http://localhost:3000";
}

interface BackendCategory {
  id: number;
  name: string;
  description: string | null;
  is_active: boolean;
}

interface BackendServiceType {
  id: number;
  name: string;
  status: boolean;
}

interface BackendVehicle {
  id: number;
  name: string;
  make: string;
  registration_number?: string;
  category_id: number;
  year: number;
  daily_rate: string | number;
  precio_mensual: string | number;
  cantidad_pasajeros: number;
  tipo_transmision: "MANUAL" | "AUTOMATICA";
  tipo_combustible: "GASOLINA" | "DIESEL" | "ELECTRICO" | "HIBRIDO" | "GNV" | "GLP";
  tipo_traccion: "DELANTERA" | "TRASERA" | "AWD" | "4X4" | "4X2";
  status: "AVAILABLE" | "RENTED" | "MAINTENANCE";
  homologado: boolean;
  image: string | null;
  description: string | null;
  equipamiento: string | string[];
  category?: { id: number; name: string };
  serviceTypes?: { id: number; name: string }[];
}

async function fetchCategories(): Promise<BackendCategory[]> {
  const base = resolveApiBase();
  const res = await fetch(`${base}/api/categories`);
  if (!res.ok) throw new Error("No se pudieron cargar las categorías.");
  const json = await res.json() as { data?: BackendCategory[] };
  return Array.isArray(json.data) ? json.data : [];
}

async function fetchServiceTypes(): Promise<BackendServiceType[]> {
  const base = resolveApiBase();
  const res = await fetch(`${base}/api/service-types`);
  if (!res.ok) throw new Error("No se pudieron cargar los tipos de servicio.");
  const json = await res.json() as { data?: BackendServiceType[] };
  return Array.isArray(json.data) ? json.data : [];
}

async function fetchVehicles(): Promise<BackendVehicle[]> {
  const base = resolveApiBase();
  const res = await fetch(`${base}/api/vehicles?limit=100`);
  if (!res.ok) throw new Error("No se pudo cargar la flota de vehículos.");
  const json = await res.json() as { data?: BackendVehicle[] };
  return Array.isArray(json.data) ? json.data : [];
}

const getVehicleImage = (v: BackendVehicle): string => {
  if (v.image && v.image.trim() !== "") {
    if (v.image.startsWith("http://") || v.image.startsWith("https://") || v.image.startsWith("data:")) {
      return v.image;
    }
    const base = resolveApiBase();
    return `${base}/uploads/${v.image}`;
  }
  // Fallback premium local assets mapping
  const cat = (v.category?.name || "").toLowerCase();
  const name = (v.name || "").toLowerCase();

  if (cat.includes("pickup") || cat.includes("truck") || name.includes("hilux") || name.includes("ranger") || name.includes("l200")) {
    if (name.includes("ranger")) return ranger;
    return hilux;
  }
  if (cat.includes("suv") || name.includes("fortuner") || name.includes("patrol") || name.includes("prado") || name.includes("rush") || name.includes("rav") || name.includes("tucson")) {
    if (name.includes("fortuner")) return fortuner;
    if (name.includes("patrol")) return patrol;
    return landcruiser;
  }
  if (cat.includes("van") || cat.includes("minivan") || name.includes("sprinter") || name.includes("hiace")) {
    return van;
  }
  return hilux;
};

const mapBackendVehicleToFrontend = (v: BackendVehicle): Vehiculo => {
  const make = v.make || "";
  const name = v.name || "";
  const nombre = name.toLowerCase().startsWith(make.toLowerCase())
    ? name
    : `${make} ${name}`;

  const modelPart = name.toLowerCase().includes(make.toLowerCase())
    ? name
    : `${make} ${name}`;
  const modelo = `${modelPart} · ${v.year}`;

  const stateMap: Record<string, Estado> = {
    AVAILABLE: "Disponible",
    RENTED: "Rentado",
    MAINTENANCE: "Mantenimiento"
  };
  const estado = stateMap[v.status] || "Disponible";

  const transmision = v.tipo_transmision === "AUTOMATICA" ? "Automática" : "Manual";

  const combustibleMap: Record<string, string> = {
    GASOLINA: "Gasolina",
    DIESEL: "Diesel",
    ELECTRICO: "Eléctrico",
    HIBRIDO: "Híbrido",
    GNV: "GNV",
    GLP: "GLP"
  };
  const combustible = combustibleMap[v.tipo_combustible] || v.tipo_combustible || "Gasolina";

  const traccionMap: Record<string, string> = {
    DELANTERA: "Delantera",
    TRASERA: "Trasera",
    AWD: "AWD",
    "4X4": "4x4",
    "4X2": "4x2"
  };
  const traccion = traccionMap[v.tipo_traccion] || v.tipo_traccion || "4x2";

  let equipamiento: string[] = [];
  if (Array.isArray(v.equipamiento)) {
    equipamiento = v.equipamiento;
  } else if (typeof v.equipamiento === "string") {
    try {
      equipamiento = JSON.parse(v.equipamiento);
    } catch {
      equipamiento = [];
    }
  }

  return {
    id: String(v.id),
    nombre,
    modelo,
    imagen: getVehicleImage(v),
    categoria: v.category?.name || "Otros",
    category_id: v.category_id,
    servicios: (v.serviceTypes || []).map((s) => s.name),
    serviceTypeIds: (v.serviceTypes || []).map((s) => s.id),
    pasajeros: v.cantidad_pasajeros,
    transmision,
    combustible,
    traccion,
    homologada: !!v.homologado,
    estado,
    diario: Number(v.daily_rate),
    mensual: Number(v.precio_mensual),
    equipamiento
  };
};

function FlotaPage() {
  const { data: categories = [], isLoading: categoriesLoading, isError: categoriesError } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10,
  });

  const { data: serviceTypes = [], isLoading: servicesLoading, isError: servicesError } = useQuery({
    queryKey: ["serviceTypes"],
    queryFn: fetchServiceTypes,
    staleTime: 1000 * 60 * 10,
  });

  const { data: backendVehicles = [], isLoading: vehiclesLoading, isError: vehiclesError, refetch: refetchVehicles } = useQuery({
    queryKey: ["vehicles"],
    queryFn: fetchVehicles,
    staleTime: 1000 * 60 * 5,
  });

  const vehicles = useMemo(() => {
    return backendVehicles.map(mapBackendVehicleToFrontend);
  }, [backendVehicles]);

  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [homo, setHomo] = useState<"todos" | "si" | "no">("todos");

  const [detalle, setDetalle] = useState<Vehiculo | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [cartOpen, setCartOpen] = useState(false);

  const toggle = <T,>(arr: T[], v: T): T[] => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtrados = useMemo(
    () =>
      vehicles.filter((v) => {
        if (selectedCategories.length && !selectedCategories.includes(v.category_id)) return false;
        if (selectedServices.length && !selectedServices.some((sId) => v.serviceTypeIds.includes(sId))) return false;
        if (homo === "si" && !v.homologada) return false;
        if (homo === "no" && v.homologada) return false;
        return true;
      }),
    [vehicles, selectedCategories, selectedServices, homo],
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
    .map(([id, qty]) => ({ v: vehicles.find((x) => x.id === id)!, qty }))
    .filter((x) => x.v);
  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + i.v.diario * i.qty, 0);
  const quoteLabel = (v: Vehiculo) => {
    const year = v.modelo.match(/\b20\d{2}\b/)?.[0];
    const displayName = v.modelo.includes("Prado") ? "Toyota Land Cruiser Prado" : v.nombre;
    return year ? `${displayName} (${year})` : `${displayName} (${v.modelo})`;
  };

  const sendCartWA = () => {
    if (!cartItems.length) return;
    const lines = cartItems.map(
      (i) => `• ${quoteLabel(i.v)} x${i.qty} — S/${i.v.diario * i.qty}/día`,
    );
    const text = `Hola, quiero cotizar los siguientes vehículos según la cotización en la sección flota\n\n${lines.join("\n")}\n\nTotal referencial diario: S/${cartTotal}`;
    openWhatsApp(text);
  };

  const hasError = categoriesError || servicesError || vehiclesError;

  if (hasError) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center bg-brand-soft">
        <div className="rounded-xl border border-brand-red/20 bg-white p-8 shadow-md max-w-md">
          <h2 className="text-xl font-bold text-brand-red">Error al cargar la flota</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            No pudimos conectarnos con el servidor para obtener los vehículos y filtros configurados.
          </p>
          <button
            onClick={() => refetchVehicles()}
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-red px-5 py-2.5 text-sm font-bold uppercase text-white shadow-md transition hover:bg-brand-red/90"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

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

            <Accordion type="multiple" defaultValue={["categories", "services", "homo"]} className="w-full mb-5">
              <AccordionItem value="categories" className="border-b border-border py-1">
                <AccordionTrigger className="hover:no-underline font-bold text-xs uppercase tracking-widest text-muted-foreground pt-0 pb-3">
                  Tipo de Vehículo
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  {categoriesLoading ? (
                    <div className="space-y-2 py-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-4 w-3/4 animate-pulse rounded bg-muted/60" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {categories.map((c) => (
                        <label key={c.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 hover:text-foreground">
                          <input
                            type="checkbox"
                            className="size-4 rounded border-input text-primary accent-primary"
                            checked={selectedCategories.includes(c.id)}
                            onChange={() => setSelectedCategories(toggle(selectedCategories, c.id))}
                          />
                          {c.name}
                        </label>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="services" className="border-b border-border py-1">
                <AccordionTrigger className="hover:no-underline font-bold text-xs uppercase tracking-widest text-muted-foreground py-3">
                  Tipo de Servicio
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  {servicesLoading ? (
                    <div className="space-y-2 py-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="h-4 w-3/4 animate-pulse rounded bg-muted/60" />
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {serviceTypes.map((s) => (
                        <label key={s.id} className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 hover:text-foreground">
                          <input
                            type="checkbox"
                            className="size-4 rounded border-input text-primary accent-primary"
                            checked={selectedServices.includes(s.id)}
                            onChange={() => setSelectedServices(toggle(selectedServices, s.id))}
                          />
                          {s.name}
                        </label>
                      ))}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="homo" className="border-b-0 py-1">
                <AccordionTrigger className="hover:no-underline font-bold text-xs uppercase tracking-widest text-muted-foreground py-3">
                  Homologación
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <div className="space-y-2.5">
                    {([
                      ["todos", "Todos"],
                      ["si", "Solo Homologadas"],
                      ["no", "No Homologadas"],
                    ] as const).map(([k, label]) => (
                      <label key={k} className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground/80 hover:text-foreground">
                        <input
                          type="radio"
                          name="homo"
                          className="size-4 text-primary accent-primary"
                          checked={homo === k}
                          onChange={() => setHomo(k)}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-xs leading-relaxed text-foreground/80">
              <p className="mb-1 text-sm font-bold text-primary">VARMAR Contratistas</p>
              <p>Más de 15 años brindando soluciones de transporte seguro y confiable para los sectores minero, energético y turístico del Perú.</p>
            </div>
          </aside>

          {/* Grid */}
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {vehiclesLoading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="flex flex-col overflow-hidden rounded-xl border border-border bg-card">
                  <div className="aspect-[4/3] w-full animate-pulse bg-muted/60" />
                  <div className="flex-1 p-5 space-y-4">
                    <div className="h-5 w-2/3 animate-pulse rounded bg-muted/60" />
                    <div className="h-3 w-1/3 animate-pulse rounded bg-muted/60" />
                    <div className="flex gap-2">
                      <div className="h-5 w-16 animate-pulse rounded-full bg-muted/60" />
                      <div className="h-5 w-20 animate-pulse rounded-full bg-muted/60" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="h-4 w-full animate-pulse rounded bg-muted/60" />
                      <div className="h-4 w-full animate-pulse rounded bg-muted/60" />
                    </div>
                    <div className="border-t border-border pt-3 space-y-2">
                      <div className="h-4 w-1/2 animate-pulse rounded bg-muted/60" />
                      <div className="h-4 w-1/3 animate-pulse rounded bg-muted/60" />
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <div className="h-10 w-full animate-pulse rounded bg-muted/60" />
                      <div className="h-10 w-full animate-pulse rounded bg-muted/60" />
                    </div>
                  </div>
                </div>
              ))
            ) : filtrados.length === 0 ? (
              <p className="col-span-full py-20 text-center text-muted-foreground">No se encontraron vehículos con esos filtros.</p>
            ) : (
              filtrados.map((v) => (
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
              ))
            )}
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
        className="fixed bottom-24 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-sky-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-sky-600 hover:shadow-xl hover:cursor-pointer"
      >
        <ShoppingCart className="h-6 w-6" />
        {cartCount > 0 && (
          <span className="absolute -right-1 -top-1 grid h-6 w-6 place-items-center rounded-full bg-brand-red text-xs font-bold text-white ring-2 ring-white">
            {cartCount}
          </span>
        )}
      </button>

      {/* Quote side panel */}
      <Sheet open={cartOpen} onOpenChange={setCartOpen}>
        <SheetContent side="right" className="flex w-full flex-col gap-0 p-0 sm:max-w-md">
          <SheetHeader className="flex flex-row items-center justify-between border-b border-sky-200 bg-sky-50 px-5 py-4 pr-12 space-y-0">
            <SheetTitle className="flex items-center gap-2 text-base font-bold text-sky-700">
              <ShoppingCart className="h-5 w-5 text-sky-600" /> Mi Cotización
            </SheetTitle>
            {cartItems.length > 0 && (
              <button onClick={() => setCart({})} className="flex items-center gap-1 text-xs font-semibold text-sky-700 hover:opacity-80 hover:cursor-pointer">
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
                  <li key={v.id} className="flex gap-3 rounded-lg border border-sky-100 bg-card p-3">
                    <img src={v.imagen} alt={v.nombre} className="h-16 w-20 shrink-0 rounded object-cover" />
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-bold leading-tight">{v.nombre}</p>
                          <p className="text-[11px] text-muted-foreground">CÓD: {v.id.toUpperCase()}</p>
                        </div>
                        <button onClick={() => setQty(v.id, 0)} aria-label="Eliminar" className="text-muted-foreground hover:text-sky-600 hover:cursor-pointer">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-sm font-bold text-sky-600">S/ {v.diario * qty}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-sky-100 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Total referencial / día</span>
                <span className="text-xl font-bold text-sky-700">S/ {cartTotal}</span>
              </div>
              <button onClick={sendCartWA} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-sky-600">
                <MessageCircle className="h-4 w-4" /> Enviar Cotización
              </button>
              <button onClick={() => setCart({})} className="mt-2 flex w-full items-center justify-center gap-2 rounded-md border border-sky-500 px-4 py-2.5 text-xs font-bold uppercase text-sky-600 transition-colors hover:bg-sky-500 hover:text-white hover:cursor-pointer">
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
