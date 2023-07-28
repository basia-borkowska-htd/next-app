import { Schema } from 'mongoose'

import { Unit } from '../enums/Unit.enum'

export const Record = new Schema({
  value: Number,
  unit: {
    type: String,
    enum: Unit,
  },
})

export const Range = new Schema({
  min: Number,
  max: Number,
  unit: {
    type: String,
    enum: Unit,
  },
})

export type Email = {
  to: string[]
  from: string
  subject: string
  html: string
}
