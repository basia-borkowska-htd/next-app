import mongoose from 'mongoose'
import { Record } from './helpers'

const Schema = mongoose.Schema

const MeasurementSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  weight: Record,
  bodyFat: Record,
  visceralFat: Record,
  muscles: Record,
  protein: Record,
  water: Record,
  boneTissue: Record,
  BMI: Record,
  BMR: Record,
  metabolicAge: Record,
  bodyRating: Record,
  date: {
    type: String,
    required: true,
  },
})

export const Measurement = mongoose.model('Measurement', MeasurementSchema)
