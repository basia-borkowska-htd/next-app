import express from 'express'
import { getUsers, getUser, getBasicUser, createUser, updateUser, deleteUser } from '../controllers/users'
import { upload } from '../controllers/aws'

export const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/basic', getBasicUser)
router.post('/', upload.single('avatar'), createUser)
router.put('/:id', upload.single('avatar'), updateUser)
router.delete('/:id', deleteUser)
