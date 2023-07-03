import { Request, Response } from 'express'

import { Measurement } from '../models/measurement'
import { User } from '../models/user'

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
  try {
    const user = await User.create(req.body)
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}

const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
    res.status(200).json({ user })
  } catch (error) {
    res.status(404).json({ msg: 'User not found' })
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
