import { Request, Response } from 'express'
import { User } from '../models/user'
import { Measurement } from '../models/measurement'

const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({})
    res.status(500).json({ error: 'Planned error' })

    // res.status(200).json({ users })
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

export { getUsers, getUser, createUser, updateUser, deleteUser }
