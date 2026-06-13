import dns from 'node:dns/promises'
dns.setServers(['1.1.1.1', '1.0.0.1'])

import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
dotenv.config()
import connectDB from './config/db.js'

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('API radi...')
})

app.listen(port, () => console.log(`Server radi na portu ${port}`))