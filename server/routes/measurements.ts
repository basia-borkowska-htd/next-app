import express from 'express'
import {
  getMeasurements,
  getMeasurement,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
} from '../controllers/measurements'

export const router = express.Router()

router.get('/', getMeasurements)
router.get('/:id', getMeasurement)
router.post('/', createMeasurement)
router.put('/:id', updateMeasurement)
router.delete('/:id', deleteMeasurement)
