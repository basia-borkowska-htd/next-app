import express from 'express'

import { authenticate, completeProfile, createAccount, sendVerificationEmail, verifyEmail } from '../controllers/auth'
import { upload } from '../controllers/aws'

export const router = express.Router()

router.post('/', authenticate)
router.post('/accounts', createAccount)
router.post('/accounts/sendVerificationEmail', sendVerificationEmail)
router.put('/accounts/verifyEmail', verifyEmail)
router.post('/accounts/:id/completeProfile', upload.single('avatar'), completeProfile)
