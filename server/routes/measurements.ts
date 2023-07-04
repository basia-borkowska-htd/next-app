import express from 'express'

import {
  createMeasurement,
  deleteMeasurement,
  getChartMeasurements,
  getMeasurement,
  getMeasurements,
  updateMeasurement,
} from '../controllers/measurements'

export const router = express.Router()

router.get('/', getMeasurements)
router.get('/:id', getMeasurement)
router.post('/', createMeasurement)
router.put('/:id', updateMeasurement)
router.delete('/:id', deleteMeasurement)
router.get('/:id/charts', getChartMeasurements)
