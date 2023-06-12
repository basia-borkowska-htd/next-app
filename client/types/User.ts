import { SexEnum } from '@/enums/Sex.enum'

export type UserType = {
  _id: string
  name: string
  sex: SexEnum
  age: number
  height: number
  weight?: number
}
