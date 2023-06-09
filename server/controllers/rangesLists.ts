import { Request, Response } from 'express'
import { RangesList } from '../models/rangesList'

const getRangesLists = (req: Request, res: Response) => {
  RangesList.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }))
}

const getRangesList = (req: Request, res: Response) => {
  RangesList.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Ranges not found' }))
}

const createRangesList = (req: Request, res: Response) => {
  RangesList.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }))
}

const updateRangesList = (req: Request, res: Response) => {
  RangesList.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Ranges not found' }))
}

const deleteRangesList = (req: Request, res: Response) => {
  RangesList.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Ranges not found' }))
}

export { getRangesLists, getRangesList, createRangesList, updateRangesList, deleteRangesList }
