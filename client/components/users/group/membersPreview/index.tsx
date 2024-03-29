import { Avatar, Tooltip } from '@mantine/core'
import { useRouter } from 'next/router'
import React from 'react'

import { BasicUserType } from '@/types/User'

import { Pathnames } from '@/utils/pathnames'

const PREVIEW_LIMIT = 3

interface MembersPreviewProps {
  members: BasicUserType[]
}

export const MembersPreviewComponent = ({ members }: MembersPreviewProps) => {
  const preview = members.slice(0, PREVIEW_LIMIT)
  const rest = members.slice(PREVIEW_LIMIT)
  const router = useRouter()

  const seeUserProfile = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }

  return (
    <Tooltip.Group openDelay={300} closeDelay={100}>
      <Avatar.Group spacing="sm">
        {preview.map(({ _id, name, avatarUrl }) => (
          <Tooltip key={_id} label={name} withArrow>
            <Avatar className="cursor-pointer" src={avatarUrl} radius="xl" onClick={() => seeUserProfile(_id)} />
          </Tooltip>
        ))}
        {!!rest.length && (
          <Tooltip
            withArrow
            label={rest.map(({ _id, name }) => (
              <div key={_id}>{name}</div>
            ))}
          >
            <Avatar radius="xl">{`+${rest.length}`}</Avatar>
          </Tooltip>
        )}
      </Avatar.Group>
    </Tooltip.Group>
  )
}
