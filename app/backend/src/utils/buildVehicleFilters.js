const { Op } = require('sequelize');

/**
 * Builds Sequelize where/order/pagination options for admin vehicle listing.
 */
function buildVehicleFilters(query) {
  const {
    search,
    make,
    category_id,
    categoria_id,
    year_from,
    year_to,
    min_rate,
    max_rate,
    min_mileage,
    max_mileage,
    status,
    is_approved,
    sort_by = 'createdAt',
    sort_order = 'DESC',
    page = 1,
    limit = 12,
  } = query;

  const where = {};

  if (search) {
    where[Op.or] = [
      { name: { [Op.like]: `%${search}%` } },
      { make: { [Op.like]: `%${search}%` } },
      { registration_number: { [Op.like]: `%${search}%` } },
    ];
  }

  if (make) where.make = { [Op.like]: `%${make}%` };

  const resolvedCategoryId = category_id || categoria_id;
  if (resolvedCategoryId) where.category_id = resolvedCategoryId;

  if (year_from || year_to) {
    where.year = {};
    if (year_from) where.year[Op.gte] = Number(year_from);
    if (year_to) where.year[Op.lte] = Number(year_to);
  }

  if (min_rate || max_rate) {
    where.daily_rate = {};
    if (min_rate) where.daily_rate[Op.gte] = Number(min_rate);
    if (max_rate) where.daily_rate[Op.lte] = Number(max_rate);
  }

  if (min_mileage || max_mileage) {
    where.current_mileage = {};
    if (min_mileage) where.current_mileage[Op.gte] = Number(min_mileage);
    if (max_mileage) where.current_mileage[Op.lte] = Number(max_mileage);
  }

  if (status) where.status = status;
  if (is_approved !== undefined && is_approved !== '') {
    where.is_approved = is_approved === 'true';
  }

  const allowedSortFields = ['name', 'make', 'year', 'daily_rate', 'current_mileage', 'createdAt'];
  const orderField = allowedSortFields.includes(sort_by) ? sort_by : 'createdAt';
  const orderDir = sort_order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC';

  const parsedLimit = Math.min(Math.max(parseInt(limit) || 12, 1), 100);
  const parsedPage = Math.max(parseInt(page) || 1, 1);
  const offset = (parsedPage - 1) * parsedLimit;

  return {
    where,
    order: [[orderField, orderDir]],
    limit: parsedLimit,
    offset,
    meta: { page: parsedPage, limit: parsedLimit },
  };
}

module.exports = buildVehicleFilters;
