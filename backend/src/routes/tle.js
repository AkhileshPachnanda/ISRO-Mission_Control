import { Router } from 'express'
import { fetchTLEById, fetchTLEBatch } from '../services/celestrak.js'

const router = Router()

// GET /api/tle?ids=44233,41877,54361
// Fetch TLEs for multiple satellites in one request
router.get('/', async (req, res, next) => {
  try {
    const { ids } = req.query

    if (!ids) {
      return res.status(400).json({ error: 'ids query parameter required' })
    }

    const noradIds = ids.split(',').map(id => parseInt(id.trim())).filter(Boolean)

    if (!noradIds.length) {
      return res.status(400).json({ error: 'No valid NORAD IDs provided' })
    }

    const tleMap = await fetchTLEBatch(noradIds)

    res.json({
      success: true,
      count: Object.values(tleMap).filter(Boolean).length,
      total: noradIds.length,
      data: tleMap
    })

  } catch (err) {
    next(err)
  }
})

// GET /api/tle/44233
// Fetch TLE for a single satellite
router.get('/:noradId', async (req, res, next) => {
  try {
    const noradId = parseInt(req.params.noradId)

    if (isNaN(noradId)) {
      return res.status(400).json({ error: 'Invalid NORAD ID' })
    }

    const tle = await fetchTLEById(noradId)
    res.json({ success: true, data: tle })

  } catch (err) {
    next(err)
  }
})

export default router