import { promises as fs } from 'fs'
import path from 'path'

/**
 * Read JSON file from data directory
 * @template T
 * @param {string} filename - The filename (without .json extension)
 * @returns {Promise<T>}
 */
export async function readJson(filename) {
  try {
    const filePath = path.join(process.cwd(), 'data', `${filename}.json`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    return JSON.parse(fileContent)
  } catch (error) {
    console.error(`Error reading ${filename}.json:`, error)
    throw error
  }
}

/**
 * Write JSON file to data directory
 * @template T
 * @param {string} filename - The filename (without .json extension)
 * @param {T} data - The data to write
 * @returns {Promise<void>}
 */
export async function writeJson(filename, data) {
  try {
    const filePath = path.join(process.cwd(), 'data', `${filename}.json`)
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
  } catch (error) {
    console.error(`Error writing ${filename}.json:`, error)
    throw error
  }
}

/**
 * Get all fabrics
 * @returns {Promise<Product[]>}
 */
export async function getFabrics() {
  return readJson('fabrics')
}

/**
 * Get fabric by slug
 * @param {string} slug
 * @returns {Promise<Product | undefined>}
 */
export async function getFabricBySlug(slug) {
  const fabrics = await getFabrics()
  return fabrics.find(fabric => fabric.slug === slug)
}

/**
 * Get orders
 * @returns {Promise<Order[]>}
 */
export async function getOrders() {
  try {
    return await readJson('orders')
  } catch (error) {
    // If orders file doesn't exist, return empty array
    return []
  }
}

/**
 * Add new order
 * @param {Order} order
 * @returns {Promise<void>}
 */
export async function addOrder(order) {
  const orders = await getOrders()
  orders.push({
    ...order,
    id: `order-${Date.now()}`,
    createdAt: new Date().toISOString()
  })
  await writeJson('orders', orders)
}

/**
 * Get contact messages
 * @returns {Promise<any[]>}
 */
export async function getMessages() {
  try {
    return await readJson('messages')
  } catch (error) {
    // If messages file doesn't exist, return empty array
    return []
  }
}

/**
 * Add new contact message
 * @param {any} message
 * @returns {Promise<void>}
 */
export async function addMessage(message) {
  const messages = await getMessages()
  messages.push({
    ...message,
    id: `msg-${Date.now()}`,
    createdAt: new Date().toISOString()
  })
  await writeJson('messages', messages)
}