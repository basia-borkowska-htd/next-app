import { SexEnum } from '@/enums/Sex.enum'
import { RecordType } from './helpers'

export type BasicUserType = {
  _id: string
  name: string
  avatarUrl?: string
}

export interface UserType extends BasicUserType {
  sex: SexEnum
  age: number
  height: RecordType
  weight?: RecordType
}
