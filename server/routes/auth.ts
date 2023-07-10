import express from 'express'

import { authenticate, createAccount, verifyEmail } from '../controllers/auth'

export const router = express.Router()

router.post('/', authenticate)
router.post('/accounts', createAccount)
router.put('/accounts/:id/verifyEmail', verifyEmail)
