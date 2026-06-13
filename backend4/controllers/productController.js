import asyncHandler from '../middleware/asyncHandler.js'
import Product from '../models/Product.js'

//svi proizvodi
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

//Jedan proizvod po ID
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error('Proizvod nije pronađen')
  }
})

//Kreiraj proizvod (prazan šablon koji admin zatim uredi)
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Novi proizvod',
        price: 0,
        image: '/images/sample.jpg',
        category: 'Voće',
        countInStock: 0,
        numReviews: 0,
        rating: 0,
        description: 'Opis proizvoda',
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

//Izmeni proizvod
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error('Proizvod nije pronađen');
    }
});

// @desc    Obriši proizvod
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await Product.deleteOne({ _id: product._id });
        res.json({ message: 'Proizvod obrisan' });
    } else {
        res.status(404);
        throw new Error('Proizvod nije pronađen');
    }
});

export { getProducts, getProductById, createProduct, updateProduct, deleteProduct };