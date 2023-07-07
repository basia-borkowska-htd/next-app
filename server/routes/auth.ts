import express from 'express'

import { authenticate, createAccount } from '../controllers/auth'

export const router = express.Router()

router.post('/', authenticate)
router.post('/accounts', createAccount)
