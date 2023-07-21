import { VisibilityEnum } from '@/enums/Visibility.enum'

type BasicGroupType = {
  _id: string
  name: string
  photoUrl?: string
}

export interface PreviewGroupType extends BasicGroupType {
  membersCount: number
}
export interface GroupType extends BasicGroupType {
  members: string[]
  visibility: VisibilityEnum
}

export interface AddGroupType extends BasicGroupType {
  photoFile?: File
  visibility: VisibilityEnum
}

export type UpdateGroupType = AddGroupType