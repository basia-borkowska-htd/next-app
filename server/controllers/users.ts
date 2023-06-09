import { Request, Response } from 'express'
import { User } from '../models/user'

const getUsers = (req: Request, res: Response) => {
  User.find({})
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }))
}

const getUser = (req: Request, res: Response) => {
  User.findOne({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'User not found' }))
}

const createUser = (req: Request, res: Response) => {
  User.create(req.body)
    .then((result) => res.status(200).json({ result }))
    .catch((error) => res.status(500).json({ msg: error }))
}

const updateUser = (req: Request, res: Response) => {
  User.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'User not found' }))
}

const deleteUser = (req: Request, res: Response) => {
  User.findOneAndDelete({ _id: req.params.id })
    .then((result) => res.status(200).json({ result }))
    .catch(() => res.status(404).json({ msg: 'User not found' }))
}

export { getUsers, getUser, createUser, updateUser, deleteUser }
