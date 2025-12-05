import express from 'express'
import { connectDB } from './config/db.js';
import cors from 'cors'
import auth from './route/authRoutes.js'

await connectDB()

const app = express()


app.use(cors())
app.use(express.json())


app.use('/api/auth', auth)

export default app