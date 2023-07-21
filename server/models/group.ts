import mongoose from 'mongoose'

import { Visibility } from '../enums/Visibility.enum'

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: {
    type: [String],
    required: true,
  },
  photoUrl: String,
  visibility: {
    type: String,
    enum: Visibility,
    required: true,
  },
})

export const Group = mongoose.model('Group', GroupSchema)
