import { Badge, Card, Image } from '@mantine/core'
import { IconCheck, IconUsersGroup } from '@tabler/icons-react'

import { ButtonComponent } from '@/components/button'

import { useTranslate } from '@/hooks/useTranslate'

import { PreviewGroupType } from '@/types/Group'

interface PublicGroupsBrowserProps {
  groups: PreviewGroupType[]
  loading: boolean
  join: (id: string) => void
  selectedGroupId: string
}
export const PublicGroupsBrowserComponent = ({ groups, join, loading, selectedGroupId }: PublicGroupsBrowserProps) => {
  const { t } = useTranslate()

  return (
    <div className="grid grid-cols-4 gap-5 mb-5">
      {groups.map(({ _id, name, photoUrl, membersCount, joined }) => (
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
          {joined ? (
            <ButtonComponent leftIcon={<IconCheck />} disabled>
              {t('users.public_groups.joined_button')}
            </ButtonComponent>
          ) : (
            <ButtonComponent onClick={() => join(_id)} loading={loading && selectedGroupId === _id}>
              {t('users.public_groups.join_button')}
            </ButtonComponent>
          )}
        </Card>
      ))}
    </div>
  )
}
