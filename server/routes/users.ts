import express from 'express'

import { upload } from '../controllers/aws'
import { deleteUser, getBasicUser, getUser, getUserByEmail, getUsers, updateUser } from '../controllers/users'

export const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:email/auth', getUserByEmail)
router.get('/:id/basic', getBasicUser)
router.put('/:id', upload.single('avatar'), updateUser)
router.delete('/:id', deleteUser)
