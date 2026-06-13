import dns from 'node:dns/promises'
dns.setServers(['1.1.1.1', '1.0.0.1'])

import dotenv from 'dotenv'
import products from './data/products.js'
import Product from './models/Product.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async () => {
  try {
    await Product.deleteMany()
    await Product.insertMany(products)
    console.log('Proizvodi uvezeni u bazu!')
    process.exit()
  } catch (error) {
    console.error(`Greška: ${error.message}`)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Product.deleteMany()
    console.log('Svi proizvodi obrisani iz baze!')
    process.exit()
  } catch (error) {
    console.error(`Greška: ${error.message}`)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}