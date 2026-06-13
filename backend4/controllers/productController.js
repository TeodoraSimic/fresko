import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/Product.js'

// @desc  Svi proizvodi
// @route GET /api/products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @desc  Jedan proizvod po ID
// @route GET /api/products/:id
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Proizvod nije pronađen')
  }
})

export { getProducts, getProductById }