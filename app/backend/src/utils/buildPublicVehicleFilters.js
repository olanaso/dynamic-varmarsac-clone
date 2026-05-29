const { Op } = require('sequelize');

/**
 * Parsea IDs repetidos o array en query (?category_id=1&category_id=2).
 */
function parseIdList(query, ...keys) {
  const ids = [];
  for (const key of keys) {
    const val = query[key];
    if (val === undefined || val === null || val === '') continue;
    const arr = Array.isArray(val) ? val : String(val).split(',');
    for (const v of arr) {
      const n = Number(String(v).trim());
      if (!Number.isNaN(n) && n > 0) ids.push(n);
    }
  }
  return [...new Set(ids)];
}

/**
 * null = todos (homologados y no homologados)
 * true = solo homologados
 * false = solo no homologados
 */
function parseHomologadoFilter(query) {
  const raw = query.homologado;
  if (raw === undefined || raw === null || raw === '') return null;

  const val = String(raw).toLowerCase().trim();
  if (val === 'all' || val === 'todos' || val === 'ambos') return null;
  if (val === 'true' || val === '1' || val === 'homologados' || val === 'si') return true;
  if (val === 'false' || val === '0' || val === 'no_homologados' || val === 'no' || val === 'sin_homologar') {
    return false;
  }
  return null;
}

/**
 * Filtros públicos: categorías (0..n), tipos de servicio (0..n), homologación, paginación.
 */
function buildPublicVehicleFilters(query) {
  const { page = 1, limit = 12 } = query;

  const where = { is_approved: true };

  const categoryIds = parseIdList(
    query,
    'category_id',
    'categoria_id',
    'category_ids',
    'categoria_ids',
  );
  if (categoryIds.length) {
    where.category_id = { [Op.in]: categoryIds };
  }

  const homologado = parseHomologadoFilter(query);
  if (homologado !== null) {
    where.homologado = homologado;
  }

  const serviceTypeIds = parseIdList(
    query,
    'service_type_id',
    'tipo_servicio_id',
    'service_type_ids',
    'tipo_servicio_ids',
  );

  const parsedLimit = Math.min(Math.max(parseInt(limit, 10) || 12, 1), 100);
  const parsedPage = Math.max(parseInt(page, 10) || 1, 1);

  return {
    where,
    order: [['createdAt', 'DESC']],
    limit: parsedLimit,
    offset: (parsedPage - 1) * parsedLimit,
    meta: { page: parsedPage, limit: parsedLimit },
    serviceTypeIds: serviceTypeIds.length ? serviceTypeIds : null,
  };
}

module.exports = buildPublicVehicleFilters;
