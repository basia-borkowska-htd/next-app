import bcrypt from 'bcrypt'
import { Request, Response } from 'express'

import { Account } from '../models/account'
import { User } from '../models/user'

import { AccountStatus } from '../enums/AccountStatus.enum'

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
  try {
    const account = await Account.findOne({ email: req.body.email })
    if (!account) {
      return res.status(400).json({ error: 'Incorrect email or password.' })
    }

    const passwordValid = await bcrypt.compare(req.body.password, account.password)
    if (!passwordValid) {
      return res.status(400).json({ error: 'Incorrect email or password.' })
    }
    // TODO: check account status
    // if(status === 'pending') =>  step 2
    // verified => step 3
    // completed => home page

    const user = await User.findOne({ email: account.email })
    console.log({ status: account.status })

    res.status(200).json({ user })
  } catch (error) {
    res.status(500).json({ error })
  }
}

export { createAccount, authenticate }
