import 'dotenv/config'
import mongoose from 'mongoose'
import { resetEvents } from './seed.js'

const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/campusradar'

try {
  await mongoose.connect(uri, { serverSelectionTimeoutMS: 8000 })
  await resetEvents()
  console.log('✅ Events reset: CuriousParc + sample events inserted')
} catch (err) {
  console.error('❌ Seed failed:', err.message)
  process.exitCode = 1
} finally {
  await mongoose.disconnect().catch(() => {})
}
