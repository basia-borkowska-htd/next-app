import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { router as userRoutes } from './routes/users'
import { router as measurementsRoutes } from './routes/measurements'
import { router as rangesRoutes } from './routes/rangesLists'

dotenv.config()

const app = express()

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => app.listen(process.env.PORT))
  .catch((err) => console.log(err))

app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/measurements', measurementsRoutes)
app.use('/api/ranges', rangesRoutes)
