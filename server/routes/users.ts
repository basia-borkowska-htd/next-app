import express from 'express'

import { upload } from '../controllers/aws'
import { createUser, deleteUser, getBasicUser, getUser, getUsers, updateUser } from '../controllers/users'

export const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUser)
router.get('/:id/basic', getBasicUser)
router.post('/', upload.single('avatar'), createUser)
router.put('/:id', upload.single('avatar'), updateUser)
router.delete('/:id', deleteUser)
