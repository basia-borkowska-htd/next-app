import { api } from '@/api'
import { Divider } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'

import { AvatarComponent } from '@/components/common/avatar'
import { ErrorComponent } from '@/components/common/error'
import { PageLoaderComponent } from '@/components/common/pageLoader'
import { VisibilityBadgeComponent } from '@/components/common/visibilityBadge'

import { GroupType } from '@/types/Group'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import MembersPreviewComponent from './membersPreview'
import { OptionsComponent } from './options'

interface GroupProps {
  group: GroupType
}

export const GroupComponent = ({ group }: GroupProps) => {
  const {
    data: members,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.GROUP_MEMBERS, group?._id],
    queryFn: () => api.group.getGroupMembers(group?._id),
    retry: 1,
  })

  if (isLoading) return <PageLoaderComponent compact />
  if (error) return <ErrorComponent compact title={error.toString()} />

  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3 mb-3">
          <AvatarComponent src={group?.photoUrl} isGroup compact />
          <div className="flex flex-col">
            <div className="font-bold text-lg">{group?.name}</div>
            <div className="flex items-center gap-2">
              <MembersPreviewComponent members={members} />
              <VisibilityBadgeComponent visibility={group?.visibility} />
            </div>
          </div>
        </div>
        <div>
          <OptionsComponent group={group} />
        </div>
      </div>

      <Divider py="sm" />
    </div>
  )
}
