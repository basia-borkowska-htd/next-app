import { Request, Response } from 'express'
import { Measurement } from '../models/measurement'

const getMeasurements = async (req: Request, res: Response) => {
  try {
    const measurements = await Measurement.find({})
    res.status(200).json({ measurements })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getMeasurement = async (req: Request, res: Response) => {
  try {
    const measurement = await Measurement.findOne({ _id: req.params.id })
    res.status(200).json({ measurement })
  } catch (error) {
    res.status(404).json({ msg: 'Measurement not found' })
  }
}

const createMeasurement = async (req: Request, res: Response) => {
  try {
    const measurement = await Measurement.create(req.body)
    res.status(200).json({ measurement })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateMeasurement = async (req: Request, res: Response) => {
  try {
    const measurement = await Measurement.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ measurement })
  } catch (error) {
    res.status(404).json({ msg: 'Measurement not found' })
  }
}

const deleteMeasurement = async (req: Request, res: Response) => {
  try {
    const measurement = await Measurement.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ measurement })
  } catch (error) {
    res.status(404).json({ msg: 'Measurement not found' })
  }
}

export { getMeasurements, getMeasurement, createMeasurement, updateMeasurement, deleteMeasurement }
