import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Info,
  Users,
  Settings2,
  Fuel,
  Gauge,
  Check,
  MessageCircle,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  X,
  RotateCcw,
  Search,
  Car,
  ShieldCheck,
  Tag,
  Calendar,
  FileText,
  Maximize2,
} from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import jsPDF from "jspdf";
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
import hilux from "@/assets/flota-1.avif";
import fortuner from "@/assets/flota-2.avif";
import van from "@/assets/flota-3.avif";
import ranger from "@/assets/flota-4.avif";
import patrol from "@/assets/flota-5.avif";
import landcruiser from "@/assets/flota-6.avif";
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

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [homo, setHomo] = useState<"todos" | "si" | "no">("todos");

  const [detalle, setDetalle] = useState<Vehiculo | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [rateTypes, setRateTypes] = useState<Record<string, "diario" | "mensual">>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [itemDates, setItemDates] = useState<Record<string, { inicio?: Date, fin?: Date }>>({});

  const toggle = <T,>(arr: T[], v: T): T[] => (arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtrados = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vehicles.filter((v) => {
      if (selectedCategories.length && !selectedCategories.includes(v.category_id)) return false;
      if (selectedServices.length && !selectedServices.some((sId) => v.serviceTypeIds.includes(sId))) return false;
      if (homo === "si" && !v.homologada) return false;
      if (homo === "no" && v.homologada) return false;
      if (q) {
        const haystack = `${v.nombre} ${v.modelo} ${v.categoria} ${v.servicios.join(" ")}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [vehicles, search, selectedCategories, selectedServices, homo]);

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
    .map(([id, qty]) => {
      const v = vehicles.find((x) => x.id === id)!;
      if (!v) return null;

      const rateType = rateTypes[id] || "diario";
      const dates = itemDates[id] || {};

      let dias = 0;
      if (dates.inicio && dates.fin) {
        dias = Math.max(1, Math.ceil((dates.fin.getTime() - dates.inicio.getTime()) / (1000 * 60 * 60 * 24)));
      }

      let subtotal = 0;
      if (dias > 0) {
        if (rateType === "mensual") {
          const meses = Math.max(1, Math.ceil(dias / 30));
          subtotal = v.mensual * qty * meses;
        } else {
          subtotal = v.diario * qty * dias;
        }
      } else {
        subtotal = (rateType === "mensual" ? v.mensual : v.diario) * qty;
      }

      return { v, qty, rateType, dates, dias, subtotal };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce((sum, i) => sum + (i.rateType === "mensual" ? i.v.mensual : i.v.diario) * i.qty, 0);
  const totalConFechas = cartItems.reduce((sum, i) => sum + i.subtotal, 0);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const quoteLabel = (v: Vehiculo) => {
    const year = v.modelo.match(/\b20\d{2}\b/)?.[0];
    const displayName = v.modelo.includes("Prado") ? "Toyota Land Cruiser Prado" : v.nombre;
    return year ? `${displayName} (${year})` : `${displayName} (${v.modelo})`;
  };

  const fmtDate = (d: Date) =>
    d.toLocaleDateString("es-PE", { day: "2-digit", month: "short", year: "numeric" });

  const sendCartWA = () => {
    if (!cartItems.length) return;
    const lines = cartItems.map(
      (i) => {
        const rateLabel = i.rateType === "mensual" ? "/mes" : "/día";
        const datesStr = i.dias > 0
          ? `\n  - Fechas: ${fmtDate(i.dates.inicio!)} al ${fmtDate(i.dates.fin!)} (${i.dias} días)`
          : "";
        return `• ${quoteLabel(i.v)} x${i.qty} — S/ ${fmt(i.subtotal)}${datesStr}`;
      }
    );
    const hasAnyDates = cartItems.some(i => i.dias > 0);
    const totalStr = hasAnyDates
      ? `\n\nTotal estimado: S/ ${fmt(totalConFechas)}`
      : `\n\nTotal referencial: S/ ${fmt(cartTotal)}`;
    const text = `Hola, quiero cotizar los siguientes vehículos según la cotización en la sección flota:\n\n${lines.join("\n")}${totalStr}`;
    openWhatsApp(text);
  };

  const generarPDF = () => {
    if (!cartItems.length) return;
    const doc = new jsPDF({ unit: "mm", format: "a4" });
    const pageW = doc.internal.pageSize.getWidth();
    let y = 20;

    // Header
    doc.setFillColor(14, 86, 147);
    doc.rect(0, 0, pageW, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("VARMAR Contratistas Generales", 15, 13);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text("Cotización de Flota Vehicular", 15, 21);
    doc.text(`Generado: ${new Date().toLocaleDateString("es-PE")}`, pageW - 15, 21, { align: "right" });
    y = 40;

    // Tabla de vehículos
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(255, 255, 255);
    doc.setFillColor(14, 120, 190);
    doc.rect(15, y, pageW - 30, 8, "F");
    doc.text("Vehículo", 18, y + 5.5);
    doc.text("Cant.", pageW - 80, y + 5.5, { align: "center" });
    doc.text("Tarifa", pageW - 45, y + 5.5, { align: "right" });
    doc.text("Subtotal", pageW - 18, y + 5.5, { align: "right" });
    y += 10;

    cartItems.forEach(({ v, qty, rateType, dias, subtotal, dates }, idx) => {
      const rowHeight = dias > 0 ? 14 : 9;
      if (idx % 2 === 0) {
        doc.setFillColor(240, 248, 255);
        doc.rect(15, y - 1, pageW - 30, rowHeight, "F");
      }
      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const label = quoteLabel(v);
      doc.text(label.length > 50 ? label.substring(0, 47) + "..." : label, 18, y + 5);
      doc.text(String(qty), pageW - 80, y + 5, { align: "center" });

      const baseRate = rateType === "mensual" ? v.mensual : v.diario;
      const rateLabel = rateType === "mensual" ? " /mes" : " /día";
      doc.text(`S/ ${fmt(baseRate)}${rateLabel}`, pageW - 45, y + 5, { align: "right" });
      doc.text(`S/ ${fmt(subtotal)}`, pageW - 18, y + 5, { align: "right" });

      if (dias > 0 && dates.inicio && dates.fin) {
        doc.setFontSize(7.5);
        doc.setTextColor(100, 100, 100);
        doc.text(`Período: ${fmtDate(dates.inicio)} al ${fmtDate(dates.fin)} (${dias} días)`, 18, y + 10);
      }

      y += rowHeight;
    });

    // Total
    y += 4;
    doc.setDrawColor(14, 86, 147);
    doc.line(15, y, pageW - 15, y);
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.setTextColor(14, 86, 147);
    const hasAnyDates = cartItems.some(i => i.dias > 0);
    const label = hasAnyDates ? `TOTAL ESTIMADO` : "TOTAL REFERENCIAL";
    doc.text(label, 15, y);
    doc.text(`S/ ${fmt(totalConFechas)}`, pageW - 15, y, { align: "right" });
    y += 12;

    // Nota
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text("* Cotización referencial. Los precios finales se confirmarán con el asesor.", 15, y);

    doc.save(`cotizacion-varmar-${Date.now()}.pdf`);
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

      <section className="bg-brand-soft py-12 md:py-6">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 md:px-8 lg:grid-cols-[280px_1fr]">
          {/* Sidebar */}
          <aside className="h-fit rounded-xl border border-border bg-card p-6 lg:sticky lg:top-28">
            <h2 className="mb-4 text-lg font-bold uppercase">Filtros</h2>

            <Accordion type="multiple" defaultValue={[]} className="w-full mb-5">
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
          <div>
            {/* Buscador */}
            <div className="mb-6 relative flex items-center">
              <Search className="absolute left-3.5 size-4 text-muted-foreground pointer-events-none" />
              <input
                id="flota-search"
                type="text"
                placeholder="Buscar por marca, modelo, categoría o tipo de servicio..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-border bg-background pl-10 pr-10 py-3 text-sm shadow-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Limpiar búsqueda"
                  className="absolute right-3 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="size-4" />
                </button>
              )}
            </div>

            {/* Resultado info */}
            {search && !vehiclesLoading && (
              <p className="mb-4 text-xs text-muted-foreground">
                {filtrados.length === 0
                  ? "Sin resultados para "
                  : `${filtrados.length} vehículo${filtrados.length !== 1 ? "s" : ""} encontrado${filtrados.length !== 1 ? "s" : ""} para `}
                <span className="font-semibold text-foreground">"{search}"</span>
              </p>
            )}

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
                      <div className="mt-auto pt-4">
                        <div className="space-y-1 border-t border-border pt-3 text-sm">
                          <div className="flex justify-between"><span className="font-bold">
                            Diario: S/ {Number(v.diario).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span></div>
                          <div className="flex justify-between"><span className="font-bold">
                            Mensual: S/ {Number(v.mensual).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span></div>
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
                    </div>
                  </article>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <Dialog open={!!detalle} onOpenChange={(o) => !o && setDetalle(null)}>
        <DialogContent
          className="
      max-w-2xl
      p-0
      overflow-hidden

      [&>button]:top-4
      [&>button]:right-4
      [&>button]:z-50
      [&>button]:rounded-full
      [&>button]:bg-white/90
      [&>button]:p-2
      [&>button]:text-black
      [&>button]:shadow-md
      [&>button]:hover:bg-white
    "
        >
          {detalle && (
            <div className="flex max-h-[90vh] flex-col">

              {/* Imagen */}
              <div className="relative h-80 shrink-0 overflow-hidden">
                <img
                  src={detalle.imagen}
                  alt={detalle.nombre}
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Contenido con scroll */}
              <div className="flex-1 overflow-y-auto p-4">

                {/* Cabecera */}
                <div className="mb-5 flex items-center gap-2 flex-wrap">
                  <DialogTitle className="text-lg font-medium">
                    {detalle.nombre}
                  </DialogTitle>

                  <DialogDescription className="m-0 text-sm text-muted-foreground">
                    {detalle.modelo}
                  </DialogDescription>
                </div>

                {/* Datos generales */}
                <div className="mb-6">
                  <div className="flex flex-wrap gap-2 text-sm">

                    <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                      <Users className="h-4 w-4 text-sky-500" />
                      <span>{detalle.pasajeros} pasajeros</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                      <Fuel className="h-4 w-4 text-sky-500" />
                      <span>{detalle.combustible}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                      <Settings2 className="h-4 w-4 text-sky-500" />
                      <span>{detalle.transmision}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                      <Gauge className="h-4 w-4 text-sky-500" />
                      <span>{detalle.traccion}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                      <Tag className="h-4 w-4 text-sky-500" />
                      <span>{detalle.categoria}</span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1.5">
                      <ShieldCheck className="h-4 w-4 text-sky-500" />
                      <span>
                        {detalle.homologada ? "Homologada" : "No homologada"}
                      </span>
                    </div>

                  </div>
                </div>

                {/* Servicios */}
                {detalle.servicios?.length > 0 && (
                  <div className="mb-6">
                    <h3 className="mb-2 text-sm text-muted-foreground">
                      Servicios
                    </h3>

                    <div className="flex flex-wrap gap-2">
                      {detalle.servicios.map((s) => (
                        <span
                          key={s}
                          className="rounded-full bg-muted px-3 py-1 text-xs"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Equipamiento */}
                <div className="flex flex-wrap gap-1">
                  <div className="mb-6">
                    <h3 className="mb-2 text-sm text-muted-foreground">
                      Equipamiento
                    </h3>
                    {detalle.equipamiento.map((item) => (
                      <span
                        key={item}
                        className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-sm"
                      >
                        <Check className="h-3.5 w-3.5 text-sky-500" />
                        {item}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Tarifas */}
                <div className="mb-6">

                  <div className="grid grid-cols-2 gap-3">

                    <div className="rounded-lg border bg-muted/30 p-3 ">
                      <div className="text-xs text-muted-foreground font-bold text-[15px] text-center">
                        Tarifa diaria
                      </div>

                      <div className="mt-2 text-center">
                        <span className="text-sm font-bold text-sky-600 text-center">
                          S/ {Number(detalle.diario).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-muted/30 p-3">
                      <div className="text-xs text-muted-foreground font-bold text-[15px] text-center">
                        Tarifa mensual
                      </div>

                      <div className="mt-2 text-center">
                        <span className="text-sm font-bold text-sky-600 text-center">
                          S/ {Number(detalle.mensual).toLocaleString("en-US", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

              </div>

              {/* Footer fijo */}
              <div className="shrink-0 border-t bg-background p-4">
                <button
                  onClick={() => {
                    addToCart(detalle.id);
                    setDetalle(null);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-md bg-sky-500 py-3 text-sm font-bold uppercase text-white transition hover:bg-sky-600"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Agregar a cotización
                </button>
              </div>

            </div>
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
              <button onClick={() => setCart({})} className="flex items-center gap-1 text-xs font-semibold text-sky-700 text-[16px] hover:opacity-80 hover:cursor-pointer">
                <Trash2 className="h-4 w-4" /> Limpiar
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
                {cartItems.map(({ v, qty, rateType, dates, dias }) => (
                  <li key={v.id} className="flex flex-col gap-2 rounded-lg border border-sky-100 bg-card p-3">
                    <div className="flex gap-3">
                      <img src={v.imagen} alt={v.nombre} className="h-16 w-20 shrink-0 rounded object-cover" />
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-[16px] font-bold leading-tight">{v.nombre}</p>
                          </div>
                          <button onClick={() => setQty(v.id, 0)} aria-label="Eliminar" className="text-muted-foreground hover:text-sky-600 hover:cursor-pointer">
                            <X className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Checkboxes para tipo de tarifa */}
                        <div className="mt-2 flex flex-col gap-1.5">
                          <label className="flex items-center gap-2 text-xs text-foreground/80 cursor-pointer">
                            <input
                              type="radio"
                              name={`rate-${v.id}`}
                              checked={rateType === "diario"}
                              onChange={() => setRateTypes(r => ({ ...r, [v.id]: "diario" }))}
                              className="text-sky-500 focus:ring-sky-500"
                            />
                            <span className={rateType === "diario" ? "font-bold text-sky-700 text-[16px]" : "text-[16px]"}>
                              Diario: S/ {fmt(v.diario)}
                            </span>
                          </label>
                          <label className="flex items-center gap-2 text-xs text-foreground/80 cursor-pointer">
                            <input
                              type="radio"
                              name={`rate-${v.id}`}
                              checked={rateType === "mensual"}
                              onChange={() => {
                                setRateTypes(r => ({ ...r, [v.id]: "mensual" }));
                                const start = new Date();
                                const end = new Date();
                                end.setDate(start.getDate() + 30);
                                setItemDates(prev => ({ ...prev, [v.id]: { inicio: start, fin: end } }));
                              }}
                              className="text-sky-500 focus:ring-sky-500"
                            />
                            <span className={rateType === "mensual" ? "font-bold text-sky-700 text-[16px]" : "text-[16px]"}>
                              Mensual: S/ {fmt(v.mensual)}
                            </span>
                          </label>

                        </div>

                      </div>
                    </div>

                    {/* Selector de fechas por vehículo */}
                    <div className="mt-2 border-t pt-2 border-sky-50">
                      <p className="mb-1.5 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Período de alquiler</p>
                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs hover:border-sky-300">
                              <Calendar className="size-3.5 shrink-0" />
                              <span className="truncate">{dates.inicio ? fmtDate(dates.inicio) : "Fecha inicio"}</span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto p-0">
                            <DayPicker
                              mode="single"
                              selected={dates.inicio}
                              onSelect={(d) => {
                                setItemDates(prev => {
                                  const current = prev[v.id] || {};
                                  return { ...prev, [v.id]: { ...current, inicio: d, fin: (d && current.fin && d >= current.fin) ? undefined : current.fin } };
                                });
                              }}
                              disabled={{ before: new Date() }}
                            />
                          </PopoverContent>
                        </Popover>

                        <Popover>
                          <PopoverTrigger asChild>
                            <button className="flex w-full items-center gap-2 rounded-lg border px-2 py-1.5 text-left text-xs hover:border-sky-300">
                              <Calendar className="size-3.5 shrink-0" />
                              <span className="truncate">{dates.fin ? fmtDate(dates.fin) : "Fecha fin"}</span>
                            </button>
                          </PopoverTrigger>
                          <PopoverContent align="start" className="w-auto p-0">
                            <DayPicker
                              mode="single"
                              selected={dates.fin}
                              onSelect={(d) => setItemDates(prev => ({ ...prev, [v.id]: { ...(prev[v.id] || {}), fin: d } }))}
                              disabled={dates.inicio ? { before: dates.inicio } : { before: new Date() }}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="shrink-0 border-t border-sky-100 bg-white">
              {/* Totales y acciones */}
              <div className="p-5">
                <div className="mb-4 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[15px] font-bold uppercase tracking-wider text-muted-foreground">
                      {cartItems.some(i => i.dias > 0) ? `Total estimado` : "Total referencial"}
                    </span>
                    <span className="text-xl font-bold text-sky-700">S/ {fmt(totalConFechas)}</span>
                  </div>
                </div>

                <button onClick={sendCartWA} className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-sky-500 px-4 py-3 text-sm font-bold uppercase text-white transition-colors hover:bg-sky-600">
                  <MessageCircle className="h-4 w-4" /> Enviar por WhatsApp
                </button>
                <button onClick={generarPDF} className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md border border-sky-500 px-4 py-2.5 text-xs font-bold uppercase text-sky-600 transition-colors hover:bg-sky-500 hover:text-white">
                  <FileText className="h-3.5 w-3.5" /> Descargar Cotización (PDF)
                </button>
              </div>
            </div>
          )}
        </SheetContent>

      </Sheet>
    </>
  );
}
