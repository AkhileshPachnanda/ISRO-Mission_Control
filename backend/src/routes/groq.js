import { Router } from 'express'
import { getMissionIntel } from '../services/groq.js'

const router = Router()

// POST /api/groq/intel
// Body: { id, name, mission, orbitType, launched, mass, description }
router.post('/intel', async (req, res, next) => {
  try {
    const satellite = req.body

    if (!satellite || !satellite.name) {
      return res.status(400).json({ error: 'Satellite data required' })
    }

    const result = await getMissionIntel(satellite)
    res.json({ success: true, ...result })

  } catch (err) {
    next(err)
  }
})

export default router