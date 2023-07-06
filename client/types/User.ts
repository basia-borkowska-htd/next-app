import { SexEnum } from '@/enums/Sex.enum'

import { RecordType } from './helpers'

export type BasicUserType = {
  _id: string
  name: string
  email: string
  avatarUrl?: string
}

export interface UserType extends BasicUserType {
  sex: SexEnum
  age: number
  height: RecordType
  weight?: RecordType
}

export interface AddUserType extends UserType {
  avatarFile?: File
}

export type UpdateUserType = AddUserType
