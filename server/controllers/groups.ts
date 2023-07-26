import { Request, Response } from 'express'

import { Group } from '../models/group'
import { User } from '../models/user'

import { Visibility } from '../enums/Visibility.enum'

import { getDeleteObjectParams, getUploadParams, s3 } from './aws'

const getPublicGroups = async (req: Request, res: Response) => {
  try {
    const groups = (await Group.find({ visibility: Visibility.PUBLIC })).map(({ _id, name, photoUrl, members }) => ({
      _id,
      name,
      photoUrl,
      membersCount: members.length,
    }))
    res.status(200).json({ groups })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getJoinedGroups = async (req: Request, res: Response) => {
  try {
    const groups = await Group.find({ members: req.params.userId })
    res.status(200).json({ groups })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getGroup = async (req: Request, res: Response) => {
  try {
    const group = await Group.findOne({ _id: req.params.id })
    res.status(200).json({ group })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const getGroupMembers = async (req: Request, res: Response) => {
  try {
    const ids = await Group.findOne({ _id: req.params.id }).select('-_id members')
    const members = await User.find({ _id: { $in: ids?.members } }).select('name avatarUrl email')

    res.status(200).json({ members })
  } catch (error) {
    res.status(500).json({ error })
  }
}

const createGroup = async (req: Request, res: Response) => {
  try {
    if (!!req.file) {
      s3.upload(getUploadParams(req.file), async (error, data) => {
        if (error) throw res.status(500).send({ error })
        const group = await Group.create({
          ...req.body,
          photoUrl: data.Location,
          members: JSON.parse(req.body.members),
        })
        return res.status(200).json({ group })
      })
    } else {
      const group = await Group.create({ ...req.body, members: JSON.parse(req.body.members) })
      return res.status(200).json({ group })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const updateGroup = async (req: Request, res: Response) => {
  try {
    if (!!req?.body?.removePhoto) {
      deleteGroupPhoto(req, res)
    }
    if (!!req.file) {
      deleteGroupPhoto(req, res)

      s3.upload(getUploadParams(req.file), async (error, data) => {
        if (error) throw res.status(500).send({ error })
        const group = await Group.findOneAndUpdate(
          { _id: req.params.id },
          { ...req.body, photoUrl: data.Location },
          { new: true },
        )
        res.status(200).json({ group })
      })
    } else {
      const group = await Group.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
      res.status(200).json({ group })
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const addGroupMember = async (req: Request, res: Response) => {
  try {
    await Group.findOneAndUpdate({ _id: req.params.id }, { $push: { members: req.body.userId } })
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Unable to add a member to a group' })
  }
}

const removeGroupMember = async (req: Request, res: Response) => {
  try {
    await Group.findOneAndUpdate({ _id: req.params.id }, { $pull: { members: req.body.userId } })
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Unable to remove a member form a group' })
  }
}

const deleteGroup = async (req: Request, res: Response) => {
  try {
    deleteGroupPhoto(req, res)

    await Group.deleteOne({ _id: req.params.id })
    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete a group' })
  }
}

const deleteGroupPhoto = async (req: Request, res: Response) => {
  const group = await Group.findOne({ _id: req.params.id })
  if (group?.photoUrl) {
    s3.deleteObject(getDeleteObjectParams(group.photoUrl), async (error) => {
      if (error) throw res.status(500).send({ error })
      await Group.updateOne({ _id: req.params.id }, { ...req.body, photoUrl: '' })
    })
  }
}

export {
  addGroupMember,
  createGroup,
  deleteGroup,
  getGroup,
  getGroupMembers,
  getJoinedGroups,
  getPublicGroups,
  removeGroupMember,
  updateGroup,
}
