const MAX_EQUIPAMIENTO_TAGS = 30;
const MAX_EQUIPAMIENTO_TAG_LENGTH = 80;
const EMPTY_JSON = '[]';

function normalizeEquipamientoArray(arr) {
  return [...new Set(
    arr
      .map((item) => String(item).trim())
      .filter(Boolean)
      .map((item) => item.slice(0, MAX_EQUIPAMIENTO_TAG_LENGTH)),
  )].slice(0, MAX_EQUIPAMIENTO_TAGS);
}

/**
 * Normaliza entrada de API/formulario a array de strings.
 * undefined = no modificar el campo en update.
 */
function parseEquipamiento(val) {
  if (val === undefined) return undefined;

  let arr;
  if (Array.isArray(val)) {
    arr = val;
  } else if (typeof val === 'string') {
    const trimmed = val.trim();
    if (!trimmed) return [];
    try {
      const parsed = JSON.parse(trimmed);
      arr = Array.isArray(parsed) ? parsed : [trimmed];
    } catch {
      arr = trimmed.split(',').map((s) => s.trim());
    }
  } else {
    return [];
  }

  return normalizeEquipamientoArray(arr);
}

/** Lee valor LONGTEXT de BD y devuelve array para la API. */
function parseEquipamientoFromDb(raw) {
  if (raw === undefined || raw === null) return [];
  if (Array.isArray(raw)) return normalizeEquipamientoArray(raw);
  if (typeof raw !== 'string') return [];

  const trimmed = raw.trim();
  if (!trimmed) return [];

  try {
    const parsed = JSON.parse(trimmed);
    return Array.isArray(parsed) ? normalizeEquipamientoArray(parsed) : [];
  } catch {
    return normalizeEquipamientoArray(trimmed.split(','));
  }
}

/** Persiste array como JSON en LONGTEXT. */
function stringifyEquipamiento(val) {
  const arr = parseEquipamiento(val);
  if (arr === undefined) return EMPTY_JSON;
  return JSON.stringify(arr);
}

module.exports = {
  parseEquipamiento,
  parseEquipamientoFromDb,
  stringifyEquipamiento,
  EMPTY_EQUIPAMIENTO_JSON: EMPTY_JSON,
};
