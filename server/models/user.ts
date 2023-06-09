import { Sex } from '../enums/Sex.enum'

import mongoose from 'mongoose'

const Schema = mongoose.Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  sex: {
    type: String,
    enum: Sex,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  height: {
    type: Number,
    required: true,
  },
  weight: Number,
})

export const User = mongoose.model('User', UserSchema)
