import { PutObjectRequest } from 'aws-sdk/clients/s3'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { Request, Response } from 'express'

import { Account } from '../models/account'
import { User } from '../models/user'

import { AccountStatus } from '../enums/AccountStatus.enum'

import { s3 } from './aws'

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
    await createUser(req, res)
    const user = await User.findOne({ email: req.body.email })
    console.log({ user })
    if (!user) return res.status(500).json({ error: 'Unable to complete profile' })

    const account = await Account.findOneAndUpdate({ _id: req.params.id }, { status: AccountStatus.COMPLETED })
    if (!account) return res.status(500).json({ error: 'Unable to update account status' })

    res.status(200).json({ user, status: account.status })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    // TODO: avatarUrl is in two different places
    // TODO: polish signs are not being handled properly
    const existingUser = await User.findOne({ email: req.body.email })
    if (existingUser) {
      return res.status(400).json({ error: 'User with that email already exists!' })
    }

    if (!!req.file) {
      const params: PutObjectRequest = {
        Bucket: process.env.AWS_BUCKET_NAME || '',
        Key: req.file.originalname,
        Body: req.file.buffer,
        ACL: 'public-read-write',
        ContentType: 'image/jpeg',
      }

      s3.upload(params, async (error, data) => {
        if (error) throw res.status(500).send({ error })
        await User.create({ ...req.body, avatarUrl: data.Location })
      })
    } else {
      await User.create(req.body)
    }
  } catch (error) {
    throw error
  }
}

export { createAccount, authenticate, completeProfile, verifyEmail }
