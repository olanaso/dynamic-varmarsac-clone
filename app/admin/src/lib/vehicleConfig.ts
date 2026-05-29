/**
 * Configuración centralizada de vehículos (admin).
 * Edita aquí labels y opciones de selects — se usan en index, new y scripts cliente.
 */

export type VehicleSelectOption = {
  value: string;
  label: string;
};

export const VEHICLE_SELECT_PLACEHOLDER = '— Seleccionar —';

/** Estado operativo del vehículo */
export const VEHICLE_STATUS_OPTIONS: VehicleSelectOption[] = [
  { value: 'AVAILABLE', label: 'Disponible' },
  { value: 'RENTED', label: 'Alquilado' },
  { value: 'MAINTENANCE', label: 'Mantenimiento' },
];

export const VEHICLE_STATUS_FILTER_OPTIONS: VehicleSelectOption[] = [
  { value: '', label: 'Todos los estados' },
  ...VEHICLE_STATUS_OPTIONS,
];

export const VEHICLE_APPROVAL_FILTER_OPTIONS: VehicleSelectOption[] = [
  { value: '', label: 'Todos' },
  { value: 'true', label: 'Aprobados' },
  { value: 'false', label: 'Pendientes' },
];

export const VEHICLE_TRANSMISSION_OPTIONS: VehicleSelectOption[] = [
  { value: 'MANUAL', label: 'Manual' },
  { value: 'AUTOMATICA', label: 'Automática' },
];

export const VEHICLE_FUEL_OPTIONS: VehicleSelectOption[] = [
  { value: 'GASOLINA', label: 'Gasolina' },
  { value: 'DIESEL', label: 'Diésel' },
  { value: 'ELECTRICO', label: 'Eléctrico' },
  { value: 'HIBRIDO', label: 'Híbrido' },
  { value: 'GNV', label: 'GNV' },
  { value: 'GLP', label: 'GLP' },
];

export const VEHICLE_TRACTION_OPTIONS: VehicleSelectOption[] = [
  { value: '4X4', label: '4x4' },
  { value: '4X2', label: '4x2' },
  { value: 'DELANTERA', label: 'Delantera' },
  { value: 'TRASERA', label: 'Trasera' },
  { value: 'AWD', label: 'AWD' },
];

export const VEHICLE_STATUS_COLORS: Record<string, string> = {
  AVAILABLE: 'bg-green-100 text-green-700',
  RENTED: 'bg-blue-100 text-blue-700',
  MAINTENANCE: 'bg-amber-100 text-amber-700',
};

export const VEHICLE_STATUS_BADGE_CLASSES: Record<string, [string, string]> = {
  AVAILABLE: ['Disponible', 'bg-green-100 text-green-700'],
  RENTED: ['Alquilado', 'bg-blue-100 text-blue-700'],
  MAINTENANCE: ['Mantenimiento', 'bg-amber-100 text-amber-700'],
};

export const VEHICLE_EXPORT_STATUS_FILE_LABELS: Record<string, string> = {
  AVAILABLE: 'disponible',
  RENTED: 'alquilado',
  MAINTENANCE: 'mantenimiento',
};

export const VEHICLE_MAX_EQUIPAMIENTO_TAGS = 30;
export const VEHICLE_MAX_EQUIPAMIENTO_TAG_LENGTH = 80;

export function optionsToLabelMap(options: VehicleSelectOption[]): Record<string, string> {
  return Object.fromEntries(options.map((o) => [o.value, o.label]));
}

export const vehicleTransmissionLabels = optionsToLabelMap(VEHICLE_TRANSMISSION_OPTIONS);
export const vehicleFuelLabels = optionsToLabelMap(VEHICLE_FUEL_OPTIONS);
export const vehicleTractionLabels = optionsToLabelMap(VEHICLE_TRACTION_OPTIONS);
export const vehicleStatusLabels = optionsToLabelMap(VEHICLE_STATUS_OPTIONS);

/** Objeto serializable para scripts `define:vars` en .astro */
export function getVehicleClientConfig() {
  return {
    statusColors: VEHICLE_STATUS_COLORS,
    statusLabels: vehicleStatusLabels,
    statusBadgeClasses: VEHICLE_STATUS_BADGE_CLASSES,
    transmissionLabels: vehicleTransmissionLabels,
    fuelLabels: vehicleFuelLabels,
    tractionLabels: vehicleTractionLabels,
    exportStatusLabels: vehicleStatusLabels,
    exportStatusFileLabels: VEHICLE_EXPORT_STATUS_FILE_LABELS,
    maxEquipamientoTags: VEHICLE_MAX_EQUIPAMIENTO_TAGS,
    maxEquipamientoTagLength: VEHICLE_MAX_EQUIPAMIENTO_TAG_LENGTH,
  };
}

export function vehicleSpecLabel(
  map: Record<string, string>,
  key: string | null | undefined,
): string {
  return key && map[key] ? map[key] : key || '—';
}

/** Acepta array (API) o JSON en string (legacy / LONGTEXT crudo). */
export function normalizeEquipamiento(val: unknown): string[] {
  if (Array.isArray(val)) {
    return val.map((item) => String(item).trim()).filter(Boolean);
  }
  if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed) as unknown;
      return Array.isArray(parsed)
        ? parsed.map((item) => String(item).trim()).filter(Boolean)
        : [];
    } catch {
      return trimmed
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
    }
  }
  return [];
}
