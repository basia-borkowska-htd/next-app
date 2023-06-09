import { Request, Response } from 'express'
import { Measurement } from '../models/measurement'

const getMeasurements = (req: Request, res: Response) => {
  Measurement.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }))
}

const getMeasurement = (req: Request, res: Response) => {
  Measurement.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Measurement not found' }))
}

const createMeasurement = (req: Request, res: Response) => {
  Measurement.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }))
}

const updateMeasurement = (req: Request, res: Response) => {
  Measurement.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Measurement not found' }))
}

const deleteMeasurement = (req: Request, res: Response) => {
  Measurement.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'Measurement not found' }))
}
export { getMeasurements, getMeasurement, createMeasurement, updateMeasurement, deleteMeasurement }
