import { PutObjectRequest } from 'aws-sdk/clients/s3'
import { Request, Response } from 'express'

import { Account } from '../models/account'
import { Measurement } from '../models/measurement'
import { User } from '../models/user'

import { s3 } from './aws'

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).select('name avatarUrl')
    res.status(200).json({ users })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id })
    res.status(200).json({ user })
  } catch (error) {
    res.status(404).json({ msg: 'User not found' })
  }
}

const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.params.email })
    if (user === null) res.status(404).json({ error: 'User with that email does not exist' })
    else res.status(200).json({ user })
  } catch (error) {
    res.status(404).json({ msg: 'User not found' })
  }
}

const getBasicUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('name avatarUrl')
    res.status(200).json({ user })
  } catch (error) {
    res.status(404).json({ msg: 'User not found' })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    // TODO: avatarUrl is in two different places
    // TODO: polish signs are not being handled properly

    if (!!req?.body?.removeAvatar) {
      deleteAvatar(req, res)
    }

    if (!!req.file) {
      deleteAvatar(req, res)

      const params: PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: 'public-read-write',
        ContentType: 'image/jpeg',
      }

      s3.upload(params, async (error, data) => {
        if (error) throw res.status(500).send({ error })
        const user = await User.findOneAndUpdate(
          { _id: req.params.id },
          { ...req.body, avatarUrl: data.Location },
          { new: true },
        )

        return res.status(200).json({ user })
      })
    } else {
      const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })

      return res.status(200).json({ user })
    }
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    deleteAvatar(req, res)

    await Measurement.deleteMany({ userId: req.params.id })

    const user = await User.findOneAndDelete({ _id: req.params.id })
    if (!user) return res.status(404).json({ error: 'Unable to delete user' })

    await Account.findOneAndDelete({ email: user.email })

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(404).json({ msg: 'User not found' })
  }
}

const deleteAvatar = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.params.id })
  if (user?.avatarUrl) {
    const match = user?.avatarUrl?.match('/([^/]+)$')
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: match ? match[1] : '',
    }

    s3.deleteObject(params, async (error) => {
      if (error) throw res.status(500).send({ error })
      await User.updateOne({ _id: req.params.id }, { ...req.body, avatarUrl: '' })
    })
  }
}

export { getUsers, getUser, getUserByEmail, getBasicUser, updateUser, deleteUser }
