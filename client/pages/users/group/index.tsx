import { Divider } from '@mantine/core'

import { GroupType } from '@/types/Group'

interface GroupProps {
  group: GroupType
}

export const GroupComponent = ({ group: { name, photoUrl, visibility, members } }: GroupProps) => (
  <div>
    <div className="mb-3 font-bold text-md">{name}</div>

    <Divider py="sm" />
  </div>
)
