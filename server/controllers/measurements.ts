import { Request, Response } from 'express'
import dayjs from 'dayjs'
import { Measurement } from '../models/measurement'
import { User } from '../models/user'

const getMeasurements = async (req: Request, res: Response) => {
  try {
    const measurements = await Measurement.find({ userId: req.query.userId })
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
    const weight = measurement.get('weight')
    await User.findOneAndUpdate({ _id: req.body.userId }, { weight })

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

const getChartMeasurements = async (req: Request, res: Response) => {
  try {
    const key = req.query.key
    const chart = await (
      await Measurement.find({ userId: req.params.id }).select(`${key}.value ${key}.unit createdAt`)
    ).map((res) => ({
      xAxis: dayjs(res.get('createdAt')).format('MMM DD'),
      yAxis: res.get(key?.toString() || ''),
    }))
    res.status(200).json({ chart })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

export {
  getMeasurements,
  getMeasurement,
  createMeasurement,
  updateMeasurement,
  deleteMeasurement,
  getChartMeasurements,
}
