import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db/connect.js'

const app = express()

app.use(express.json())
app.use(cors())

const port = process.env.PORT || 3000
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
