import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import routes from './routes.js'
import { ensureSeed } from './seed.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campusradar'

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))

app.use('/api', routes)

// Serve the built React app in production (npm run build && npm start)
const dist = path.join(__dirname, '..', 'client', 'dist')
if (fs.existsSync(dist)) {
  app.use(express.static(dist))
  app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')))
}

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Server error' })
})

async function connectDb() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 5000 })
    console.log('✅ MongoDB connected')
  } catch (err) {
    console.error(`❌ MongoDB connection failed: ${err.message}`)
    console.error('   → Start MongoDB (or set MONGODB_URI in server/.env). Retrying in 5s…')
    setTimeout(connectDb, 5000)
    return
  }
  try {
    await ensureSeed()
  } catch (err) {
    console.error('Seed error:', err.message)
  }
}

app.listen(PORT, () => {
  console.log(`🚀 CampusRadar API on http://localhost:${PORT}`)
  connectDb()
})
