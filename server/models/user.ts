import { Sex } from '../enums/Sex.enum'

import mongoose from 'mongoose'
import { Record } from './helpers'

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
  height: Record,
  weight: Record,
  avatarUrl: String,
})

export const User = mongoose.model('User', UserSchema)
