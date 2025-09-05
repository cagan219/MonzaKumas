/**
 * Product type definition
 * @typedef {Object} Product
 * @property {string} id - Unique product identifier
 * @property {string} slug - URL-friendly product name
 * @property {string} name - Product display name
 * @property {string[]} images - Array of image URLs
 * @property {string} pattern - Product pattern type
 * @property {string[]} colors - Available colors
 * @property {string} swatchType - Swatch type classification
 * @property {number} lengthMeters - Available stock in meters
 * @property {number} [pricePerMeter] - Optional price per meter
 * @property {string} createdAt - ISO date string
 */

/**
 * Order type definition
 * @typedef {Object} Order
 * @property {string} id - Unique order identifier
 * @property {string} productId - Product being ordered
 * @property {number} qtyMeters - Quantity in meters
 * @property {string} name - Customer name
 * @property {string} [company] - Optional company name
 * @property {string} email - Customer email
 * @property {string} phone - Customer phone
 * @property {string} [note] - Optional order note
 * @property {string} createdAt - ISO date string
 */

export const ProductSchema = {
  id: 'string',
  slug: 'string', 
  name: 'string',
  images: ['string'],
  pattern: 'string',
  colors: ['string'],
  swatchType: 'string',
  lengthMeters: 'number',
  pricePerMeter: 'number?',
  createdAt: 'string'
}

export const OrderSchema = {
  id: 'string',
  productId: 'string',
  qtyMeters: 'number',
  name: 'string',
  company: 'string?',
  email: 'string',
  phone: 'string',
  note: 'string?',
  createdAt: 'string'
}