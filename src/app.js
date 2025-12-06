import express from 'express'
import { connectDB } from './config/db.js';
import cors from 'cors'
import cookieParser from 'cookie-parser'

import auth from './route/authRoutes.js'
import user from './route/userRoutes.js'
import lessons from './route/lessonsRoutes.js'
import quiz from './route/quizRoutes.js'
import errorHandler from './middleware/errorMiddleware.js'
import leaderboard from './route/leaderBoard.js'
import family from './route/familyRoute.js'

await connectDB()

const app = express()


app.use(cors
    ({
        origin: ['http://localhost:5173'],
        credentials: true
    })
)
app.use(express.json())
app.use(cookieParser());

app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/lessons', lessons)
app.use('/api/quiz', quiz)
app.use('/api/leaderboard', leaderboard)
app.use('/api/family', family)

app.use(errorHandler)

export default app