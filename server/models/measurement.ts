import mongoose from 'mongoose'

import { MeasurementsNote } from '../enums/MeasurementsNote.enum'

import { Record } from './helpers'

const MeasurementSchema = new mongoose.Schema({
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
  notes: {
    type: [String],
    enum: MeasurementsNote,
  },
})

export const Measurement = mongoose.model('Measurement', MeasurementSchema)
