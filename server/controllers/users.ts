import { Request, Response } from 'express'
import { User } from '../models/user'
import { Measurement } from '../models/measurement'
import { s3 } from './aws'
import { PutObjectRequest } from 'aws-sdk/clients/s3'

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

const uploadUserData = async (req: Request, res: Response, action: 'create' | 'update') => {
  try {
    if (!req.file) throw res.status(500).send({ err: 'Unable to locate file' })
    const params: PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME || '',
      Key: req.file.originalname,
      Body: req.file.buffer,
      ACL: 'public-read-write',
      ContentType: 'image/jpeg',
    }

    s3.upload(params, async (error, data) => {
      if (error) throw res.status(500).send({ err: error })
      var user
      switch (action) {
        case 'create':
          user = await User.create({ ...req.body, avatarUrl: data.Location })
          break
        case 'update':
          user = await User.findOneAndUpdate({ _id: req.params.id }, { ...req.body, avatarUrl: data.Location })
          break
      }
      res.status(200).json({ user })
    })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const deleteUser = async (req: Request, res: Response) => {
  try {
    await Measurement.deleteMany({ userId: req.params.id })
    await User.findOneAndDelete({ _id: req.params.id })
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(404).json({ msg: 'User not found' })
  }
}

export { getUsers, getUser, getBasicUser, createUser, updateUser, deleteUser }
