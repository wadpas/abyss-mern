import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import connectDB from './db/connect.js'
import tasks from './routes/tasks.js'
import notFound from './middleware/not-found.js'

const app = express()

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/api/tasks', tasks as any)
app.use(notFound)

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
