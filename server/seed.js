import { Event } from './models.js'
import { CURIOUSPARC, sampleEvents } from './seedData.js'

// Runs on every server start (safe to repeat):
//  - makes sure the featured CuriousParc event exists
//  - inserts sample events only when there are none
export async function ensureSeed() {
  await Event.updateOne({ slug: CURIOUSPARC.slug }, { $setOnInsert: CURIOUSPARC }, { upsert: true })

  const others = await Event.countDocuments({ featured: { $ne: true } })
  if (others === 0) {
    await Event.insertMany(sampleEvents())
    console.log('🌱 Seeded sample events')
  }
}

// Wipes events and re-inserts everything (used by `npm run seed`)
export async function resetEvents() {
  await Event.deleteMany({})
  await Event.insertMany([CURIOUSPARC, ...sampleEvents()])
}
