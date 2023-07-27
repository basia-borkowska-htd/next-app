import sendGridMail from '@sendgrid/mail'
import dotenv from 'dotenv'

import { Email } from '../models/helpers'

dotenv.config()

sendGridMail.setApiKey(process.env.SENDGRID_API_KEY || '')

const sendEmail = async (email: Email) => {
  try {
    const msg = await sendGridMail.send(email)
    console.log({ msg })
  } catch (error) {
    console.error({ error })
  }
}

export { sendEmail }
