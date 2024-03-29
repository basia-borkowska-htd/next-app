import mongoose from 'mongoose'

import { Sex } from '../enums/Sex.enum'

import { Record } from './helpers'

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
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
