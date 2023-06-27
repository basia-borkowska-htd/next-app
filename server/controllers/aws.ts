import { Request, Response } from 'express'
import multer from 'multer'
import Aws from 'aws-sdk'
import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { User } from '../models/user'

const storage = multer.memoryStorage()

const fileFilter = (req: Request, file: Express.Multer.File, callback: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
    callback(null, true)
  } else {
    callback(null, false)
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

const s3 = new Aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
})

const uploadImage = () => {
  upload.single('avatar'),
    (req: Request, res: Response) => {
      try {
        console.log(req.file)

        if (!req.file) throw res.status(500).send({ err: 'Unable to locate file' })

        const params: PutObjectRequest = {
          Bucket: process.env.AWS_BUCKET_NAME || '',
          Key: req.file.originalname,
          Body: req.file.buffer,
          ACL: 'public-read-write',
          ContentType: 'image/jpeg',
        }

        s3.upload(params, async (error, data) => {
          if (error) {
            res.status(500).send({ err: error })
          }

          console.log(data)

          const user = await User.findOneAndUpdate({ _id: req.params.id }, { avatarUrl: data.Location })
          res.status(200).json({ user })
        })
      } catch (error) {
        res.status(404).json({ msg: 'User not found' })
      }
    }
}

export { uploadImage }
