import express from 'express'
import { getUsers, getUser, getBasicUser, createUser, updateUser, deleteUser } from '../controllers/users'

export const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/basic', getBasicUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
