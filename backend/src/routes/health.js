import { Router } from 'express'
import { getCacheStats } from '../services/celestrak.js'

const router = Router()

router.get('/', (req, res) => {
  res.json({
    status: 'NOMINAL',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    cache: getCacheStats()
  })
})

export default router