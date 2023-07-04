import { Request, Response } from 'express'

import { Measurement } from '../models/measurement'
import { RangesList } from '../models/rangesList'
import { User } from '../models/user'

const getRangesLists = async (req: Request, res: Response) => {
  try {
    const rangesLists = await RangesList.find({})
    res.status(200).json({ rangesLists })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getRangesList = async (req: Request, res: Response) => {
  const userId = req.params.id
  try {
    const latestMeasurement = await Measurement.findOne({ userId }, null, {
      sort: { date: 'desc' },
    })

    const user = await User.findOne({ _id: userId })
    const sex = user?.get('sex')

    const rangesList = await RangesList.findOne({ sex })
    res.status(200).json({ latestMeasurement, rangesList })
  } catch (error) {
    res.status(404).json({ msg: 'RangesList not found' })
  }
}

const createRangesList = async (req: Request, res: Response) => {
  try {
    const rangesList = await RangesList.create(req.body)
    res.status(200).json({ rangesList })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateRangesList = async (req: Request, res: Response) => {
  try {
    const rangesList = await RangesList.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ rangesList })
  } catch (error) {
    res.status(404).json({ msg: 'RangesList not found' })
  }
}

const deleteRangesList = async (req: Request, res: Response) => {
  try {
    const rangesList = await RangesList.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ rangesList })
  } catch (error) {
    res.status(404).json({ msg: 'RangesList not found' })
  }
}

export { getRangesLists, getRangesList, createRangesList, updateRangesList, deleteRangesList }
