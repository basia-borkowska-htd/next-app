import { Unit } from '../enums/Unit.enum'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Record = new Schema({
  value: Number,
  unit: Unit,
})

const MeasurementSchema = new Schema(
  {
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
  },
  { timestamps: true },
)

export const Measurement = mongoose.model('Measurement', MeasurementSchema)
