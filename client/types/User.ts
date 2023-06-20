import { SexEnum } from '@/enums/Sex.enum'
import { RecordType } from './helpers'

export type UserType = {
  _id: string
  name: string
  sex: SexEnum
  age: number
  height: RecordType
  weight?: RecordType
}
