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
import blog from './route/blogRoutes.js'
import premium from './route/paymnetRoutes.js'
import { strpiWeebHook } from './controller/premiumController.js'
import admin from './route/adminRoute.js'
import badges from './route/badgeRoutes.js'
import notifications from './route/notificationRoutes.js'
import stats from './route/statsRoutes.js'
import health from './route/healthRoute.js'

await connectDB()

const app = express()

app.use(cors({
  origin: ['http://localhost:5173', 'https://fmbls.vercel.app'],
  credentials: true
}))

app.use('/api/payment/stripeWebhook', express.raw({ type: 'application/json' }), strpiWeebHook);

app.use(express.json());
app.use(cookieParser());

app.use('/api/health', health)
app.use('/api/auth', auth)
app.use('/api/user', user)
app.use('/api/lessons', lessons)
app.use('/api/quiz', quiz)
app.use('/api/leaderboard', leaderboard)
app.use('/api/family', family)
app.use('/api/blog', blog)
app.use('/api/premium', premium)
app.use('/api/admin', admin)
app.use('/api/badges', badges)
app.use('/api/notifications', notifications)
app.use('/api/stats', stats)

app.use(errorHandler)

export default app
