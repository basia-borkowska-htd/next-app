import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'

import { router as authRoutes } from './routes/auth'
import { router as measurementsRoutes } from './routes/measurements'
import { router as rangesRoutes } from './routes/rangesLists'
import { router as userRoutes } from './routes/users'
import { router as groupsRoutes } from './routes/users'

dotenv.config()

const app = express()

mongoose
  .connect(process.env.MONGO_URI || '')
  .then(() => app.listen(process.env.PORT || 3001))
  .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/groups', groupsRoutes)
app.use('/api/measurements', measurementsRoutes)
app.use('/api/ranges', rangesRoutes)
