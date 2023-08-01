import { GroupType } from '@/types/Group'

import { VisibilityEnum } from '@/enums/Visibility.enum'

export const getInitialValues = (group: GroupType | undefined) => ({
  name: group?.name || '',
  visibility: group?.visibility || VisibilityEnum.PRIVATE,
  photoUrl: group?.photoUrl || '',
})

export const validate = {
  name: ({ length }) => (length < 2 ? 'Name must be at least 2 characters' : undefined),
}
