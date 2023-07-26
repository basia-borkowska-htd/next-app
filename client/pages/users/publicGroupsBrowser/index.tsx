import { Badge, Card, Image, Text } from '@mantine/core'
import { IconUsersGroup } from '@tabler/icons-react'

import { AvatarComponent } from '@/components/avatar'
import { ButtonComponent } from '@/components/button'

import { useTranslate } from '@/hooks/useTranslate'

import { PreviewGroupType } from '@/types/Group'

interface PublicGroupsBrowserProps {
  groups: PreviewGroupType[]
}
export const PublicGroupsBrowserComponent = ({ groups }: PublicGroupsBrowserProps) => {
  const { t } = useTranslate()

  return (
    <div className="grid grid-cols-4 gap-5 ">
      {groups.map(({ _id, name, photoUrl, membersCount }) => (
        <Card key={_id} shadow="sm" padding="lg" radius="md">
          <Card.Section>
            {photoUrl ? (
              <Image src={photoUrl} height={128} alt="Photo of group" />
            ) : (
              <div className="bg-green-100 flex items-center justify-center h-32 w-full">
                <IconUsersGroup size={70} color="white" />
              </div>
            )}
          </Card.Section>
          <div className="flex justify-between items-center my-4">
            <div className="font-bold text-lg">{name}</div>
            <Badge radius="sm" color="cyan" size="sm">
              {membersCount === 1
                ? t('users.public_groups.member')
                : t('users.public_groups.members', { count: membersCount.toString() })}
            </Badge>
          </div>

          <ButtonComponent>Join</ButtonComponent>
        </Card>
      ))}
    </div>
  )
}
