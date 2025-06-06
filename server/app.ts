import 'express-async-errors'
import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import connectDB from './db/connect.js'
import auth from './routes/auth.js'
import restaurants from './routes/restaurants.js'
import users from './routes/users.js'
import reviews from './routes/reviews.js'
import notFound from './middleware/not-found.js'
import errorHandler from './middleware/error-handler.js'
import cookieParser from 'cookie-parser'
import products from './routes/products.js'
import { v2 as cloudinary } from 'cloudinary'

dotenv.config()
const app = express()

// middleware
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.static('./public'))
app.use(cookieParser('cookieParser'))
app.use(cors())
// routes

app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/api/restaurants', restaurants)
app.use('/api/products', products)
app.use('/api/reviews', reviews)
app.use(notFound)
app.use(errorHandler as any)

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
