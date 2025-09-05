// Static data service to replace API calls for frontend-only deployment

// Simulate API response structure
const createResponse = (data, success = true, message = '') => ({
  success,
  data,
  message
})

// Simulate async behavior
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms))

// Load fabrics data from public JSON file
let fabricsData = []

const loadFabricsData = async () => {
  if (fabricsData.length === 0) {
    try {
      const response = await fetch('/data/fabrics.json')
      fabricsData = await response.json()
    } catch (error) {
      console.error('Failed to load fabrics data:', error)
      // Fallback data if JSON file fails to load
      fabricsData = [
        {
          id: "1",
          slug: "sample-fabric",
          name: "Sample Fabric",
          description: "This is a sample fabric for demo purposes.",
          pricePerMeter: 25.99,
          stockQty: 10,
          pattern: "Solid",
          colors: ["Blue"],
          swatchType: "Cotton",
          images: ["https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500&h=500&fit=crop"]
        }
      ]
    }
  }
  return fabricsData
}

// Get fabrics with filtering and pagination
export const getFabrics = async (params = {}) => {
  await delay(200) // Simulate network delay
  await loadFabricsData()
  
  let filteredFabrics = [...fabricsData]
  
  // Apply filters
  if (params.search) {
    const searchTerm = params.search.toLowerCase()
    filteredFabrics = filteredFabrics.filter(fabric =>
      fabric.name.toLowerCase().includes(searchTerm) ||
      fabric.description.toLowerCase().includes(searchTerm) ||
      fabric.pattern.toLowerCase().includes(searchTerm) ||
      fabric.colors.some(color => color.toLowerCase().includes(searchTerm))
    )
  }
  
  if (params.pattern) {
    filteredFabrics = filteredFabrics.filter(fabric => 
      fabric.pattern === params.pattern
    )
  }
  
  if (params.colors) {
    const filterColors = Array.isArray(params.colors) ? params.colors : params.colors.split(',')
    filteredFabrics = filteredFabrics.filter(fabric =>
      fabric.colors.some(color => filterColors.includes(color))
    )
  }
  
  if (params.swatchType) {
    filteredFabrics = filteredFabrics.filter(fabric =>
      fabric.swatchType === params.swatchType
    )
  }
  
  if (params.inStock !== undefined) {
    const inStock = params.inStock === 'true' || params.inStock === true
    filteredFabrics = filteredFabrics.filter(fabric =>
      inStock ? fabric.stockQty > 0 : fabric.stockQty === 0
    )
  }
  
  if (params.minPrice || params.maxPrice) {
    filteredFabrics = filteredFabrics.filter(fabric => {
      const price = fabric.pricePerMeter
      const min = params.minPrice ? parseFloat(params.minPrice) : 0
      const max = params.maxPrice ? parseFloat(params.maxPrice) : Infinity
      return price >= min && price <= max
    })
  }
  
  // Pagination
  const page = parseInt(params.page) || 1
  const limit = parseInt(params.limit) || 12
  const startIndex = (page - 1) * limit
  const endIndex = startIndex + limit
  
  const paginatedFabrics = filteredFabrics.slice(startIndex, endIndex)
  const totalPages = Math.ceil(filteredFabrics.length / limit)
  
  return createResponse({
    fabrics: paginatedFabrics,
    total: filteredFabrics.length,
    page,
    totalPages,
    hasMore: page < totalPages
  })
}

// Get single fabric by slug
export const getFabricBySlug = async (slug) => {
  await delay(150)
  await loadFabricsData()
  
  const fabric = fabricsData.find(f => f.slug === slug)
  
  if (fabric) {
    return createResponse(fabric)
  } else {
    return createResponse(null, false, 'Fabric not found')
  }
}

// Submit order (simulate)
export const submitOrder = async (orderData) => {
  await delay(300) // Simulate processing time
  
  // Basic validation
  if (!orderData.productId || !orderData.name || !orderData.email || !orderData.qtyMeters) {
    return createResponse(null, false, 'Missing required fields')
  }
  
  // Check stock
  await loadFabricsData()
  const fabric = fabricsData.find(f => f.id === orderData.productId)
  
  if (!fabric) {
    return createResponse(null, false, 'Product not found')
  }
  
  if (orderData.qtyMeters > fabric.stockQty) {
    return createResponse(null, false, 'Insufficient stock')
  }
  
  // Generate mock order ID
  const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`
  
  // In a real app, this would save to database
  console.log('Order submitted:', { ...orderData, orderId })
  
  return createResponse({
    orderId,
    status: 'received',
    estimatedProcessingTime: '2-3 business days'
  })
}

// Submit contact form (simulate)
export const submitContact = async (contactData) => {
  await delay(200)
  
  if (!contactData.name || !contactData.email || !contactData.message) {
    return createResponse(null, false, 'Missing required fields')
  }
  
  // Generate mock message ID
  const messageId = `MSG-${Date.now()}`
  
  // In a real app, this would save to database
  console.log('Contact form submitted:', { ...contactData, messageId })
  
  return createResponse({
    messageId,
    status: 'received'
  })
}