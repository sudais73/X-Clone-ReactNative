import express from 'express'
import cors from 'cors'
import { clerkMiddleware } from '@clerk/express'
import { ENV } from './config/env.js'
import { connectDB } from './config/db.config.js'
import userRoutes from './routes/user.route.js'
import commentRoutes from './routes/comment.route.js'
import postRoutes from './routes/post.route.js'
import notificationRoutes from './routes/notification.route.js'
import { arcjetMiddleware } from './middleware/arcjet.js'

const app = express()

app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}))

app.use(express.json())

app.use(clerkMiddleware())
app.use(arcjetMiddleware)

/* =======================
   Routes
======================= */
app.use('/api/user', userRoutes)
app.use('/api/comment', commentRoutes)
app.use('/api/post', postRoutes)
app.use('/api/notification', notificationRoutes)

app.get('/', (req, res) => {
  res.send("Nice to meet you sudais ☕")
})

const startServer = async () => {
  try {
    await connectDB()

    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log(`server listening on port: ${ENV.PORT}`)
      })
    }
  } catch (error) {
    console.log("failed to start server", error.message)
    process.exit(1)
  }
}

startServer()

export default app
