import { Sex } from '../enums/Sex.enum'
import { Unit } from '../enums/Unit.enum'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Range = new Schema({
  min: Number,
  max: Number,
  unit: Unit,
})

const RangesListSchema = new Schema({
  sex: {
    type: Sex,
    required: true,
  },
  weight: Range,
  bodyFat: Range,
  visceralFat: Range,
  muscles: Range,
  protein: Range,
  water: Range,
  boneTissue: Range,
  BMI: Range,
  BMR: Range,
  metabolicAge: Range,
})

export const RangesList = mongoose.model('RangesList', RangesListSchema)
