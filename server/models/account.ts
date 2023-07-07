import mongoose from 'mongoose'
import * as Yup from 'yup'

import { AccountStatus } from '../enums/AccountStatus.enum'
import { Provider } from '../enums/Provider.enum'

const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: AccountStatus,
    required: true,
  },
  provider: {
    type: String,
    enum: Provider,
    required: true,
  },
})

export const Account = mongoose.model('Account', AccountSchema)
