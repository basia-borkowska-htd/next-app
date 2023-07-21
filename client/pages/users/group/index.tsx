import { Divider } from '@mantine/core'

import { AvatarComponent } from '@/components/avatar'
import { VisibilityBadgeComponent } from '@/components/visibilityBadge'

import { useTranslate } from '@/hooks/useTranslate'

import { GroupType } from '@/types/Group'

import { OptionsComponent } from './options'

interface GroupProps {
  group: GroupType
}

export const GroupComponent = ({ group: { name, photoUrl, visibility, members } }: GroupProps) => {
  const { t } = useTranslate()
  const membersCountText = `${members.length} ${members.length === 1 ? t('group.member') : t('group.members')}`

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 mb-3">
          <AvatarComponent src={photoUrl} isGroup compact />
          <div className="flex flex-col">
            <div className="font-bold text-lg">{name}</div>
            <div className="flex items-center gap-2">
              <div className="text-sm">{membersCountText}</div>
              <VisibilityBadgeComponent visibility={visibility} />
            </div>
          </div>
        </div>
        <div>
          <OptionsComponent />
        </div>
      </div>

      <Divider py="sm" />
    </div>
  )
}
