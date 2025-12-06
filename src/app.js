import express from 'express'
import { connectDB } from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import auth from './route/authRoutes.js'
import user from './route/userRoutes.js'

await connectDB()

const app = express()


app.use(cors())
app.use(express.json())
app.use(cookieParser());

app.use('/api/auth', auth)
app.use('/api/user', user)

export default app