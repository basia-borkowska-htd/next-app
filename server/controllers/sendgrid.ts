import sendGridMail from '@sendgrid/mail'
import dotenv from 'dotenv'

import { Email } from '../models/helpers'

dotenv.config()

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const sendEmail = async (email: Email) => {
  try {
    await sendGridMail.send(email)
  } catch (error) {
    console.error({ error })
  }
}

export { sendEmail }
