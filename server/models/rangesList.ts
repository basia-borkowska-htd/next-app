import mongoose from 'mongoose'

import { Sex } from '../enums/Sex.enum'

import { Range } from './helpers'

const Schema = mongoose.Schema

const RangesListSchema = new Schema({
  sex: {
    type: String,
    enum: Sex,
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
