import Aws from 'aws-sdk'
import dotenv from 'dotenv'
import { Request } from 'express'
import multer from 'multer'

dotenv.config()

const storage = multer.memoryStorage()

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

export const upload = multer({ storage, fileFilter })

export const s3 = new Aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
})
