import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Request, Response } from 'express'

import { Account } from '../models/account'

import { AccountStatus } from '../enums/AccountStatus.enum'

import { uploadUserData } from './users'

const createAccount = async (req: Request, res: Response) => {
  try {
    // TODO: validation on BE
    const existingAccount = await Account.findOne({ email: req.body.email })
    if (existingAccount) {
      return res.status(400).json({ error: 'Account with that email already exists!' })
    }
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)
    const account = await Account.create({
      ...req.body,
      password: hashedPassword,
      status: AccountStatus.PENDING,
    })
    res.status(200).json({ account })
  } catch (error) {
    res.status(500).json({ msg: error })
  }
}
const authenticate = async (req: Request, res: Response) => {
  dotenv.config()

  try {
    const account = await Account.findOne({ email: req.body.email })
    if (!account) {
      return res.status(400).json({ error: 'Incorrect email or password.' })
    }

    const passwordValid = await bcrypt.compare(req.body.password, account.password)
    if (!passwordValid) {
      return res.status(400).json({ error: 'Incorrect email or password.' })
    }

    const { _id, email, provider, status } = account

    res.status(200).json({ account: { _id, email, provider, status } })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const verifyEmail = async (req: Request, res: Response) => {
  try {
    await Account.updateOne({ _id: req.params.id }, { status: AccountStatus.VERIFIED })
    const account = await Account.findOne({ _id: req.params.id })
    res.status(200).json({ account })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const completeProfile = async (req: Request, res: Response) => {
  try {
    const user = await uploadUserData(req, res, 'create')
    await Account.findOneAndUpdate({ _id: req.params.id }, { status: AccountStatus.COMPLETED })
    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export { createAccount, authenticate, completeProfile, verifyEmail }
