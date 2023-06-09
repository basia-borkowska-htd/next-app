import { Request, Response } from 'express'
import { RangesList } from '../models/rangesList'

const getRangesLists = async (req: Request, res: Response) => {
  try {
    const rangesLists = await RangesList.find({})
    res.status(200).json({ rangesLists })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getRangesList = async (req: Request, res: Response) => {
  try {
    const rangesList = await RangesList.findOne({ _id: req.params.id })
    res.status(200).json({ rangesList })
  } catch (error) {
    res.status(404).json({ msg: 'RangesList not found' })
  }
}

const createRangesList = async (req: Request, res: Response) => {
  try {
    const newRangesList = await RangesList.create(req.body)
    res.status(200).json({ newRangesList })
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
