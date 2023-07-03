import { Request, Response } from 'express'
import { User } from '../models/user'
import { Measurement } from '../models/measurement'
import { s3 } from './aws'
import { PutObjectRequest } from 'aws-sdk/clients/s3'

type ActionType = 'create' | 'update'

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

const getBasicUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ _id: req.params.id }).select('name avatarUrl')
    res.status(200).json({ user })
  } catch (error) {
    res.status(404).json({ msg: 'User not found' })
  }
}

const createUser = async (req: Request, res: Response) => {
  uploadUserData(req, res, 'create')
}

const updateUser = async (req: Request, res: Response) => {
  uploadUserData(req, res, 'update')
}

const uploadUserData = async (req: Request, res: Response, action: ActionType) => {
  try {
    // TODO: avatarUrl is in two different places
    // TODO: polish signs are not being handled properly

    const fileExists = !!req.file

    deleteAvatar(req, res)
    if (fileExists) {
      const params: PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: req?.file?.originalname || 'default',
        Body: req?.file?.buffer || '',
        ACL: 'public-read-write',
        ContentType: 'image/jpeg',
      }

      s3.upload(params, async (error, data) => {
        if (error) throw res.status(500).send({ error })
        await modifyUser(req, res, action, data.Location)
      })
    } else {
      await modifyUser(req, res, action, '')
    }
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    deleteAvatar(req, res)
    await Measurement.deleteMany({ userId: req.params.id })
    await User.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(404).json({ msg: 'User not found' })
  }
}

const deleteAvatar = async (req: Request, res: Response) => {
  const user = await User.findOne({ _id: req.params.id })
  if (user?.avatarUrl) {
    const match = user?.avatarUrl.match('/([^/]+)$')
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

const modifyUser = async (req: Request, res: Response, action: ActionType, avatarUrl: String) => {
  let user = null

  switch (action) {
    case 'create':
      user = await User.create({ ...req.body, avatarUrl })
      break
    case 'update':
      await User.updateOne({ _id: req.params.id }, { ...req.body, avatarUrl })
      user = await User.findOne({ _id: req.params.id })
      break
  }
  res.status(200).json({ user })
}

export { getUsers, getUser, getBasicUser, createUser, updateUser, deleteUser }
