import express from 'express'

import { authenticate, completeProfile, createAccount, verifyEmail } from '../controllers/auth'
import { upload } from '../controllers/aws'

export const router = express.Router()

router.post('/', authenticate)
router.post('/accounts', createAccount)
router.put('/accounts/:id/verifyEmail', verifyEmail)
router.post('/accounts/:id/completeProfile', upload.single('avatar'), completeProfile)
