import express from 'express'

import {
  createRangesList,
  deleteRangesList,
  getRangesList,
  getRangesLists,
  updateRangesList,
} from '../controllers/rangesLists'

export const router = express.Router()

router.get('/', getRangesLists)
router.get('/:id', getRangesList)
router.post('/', createRangesList)
router.put('/:id', updateRangesList)
router.delete('/:id', deleteRangesList)
