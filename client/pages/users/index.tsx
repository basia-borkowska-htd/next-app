import { api } from '@/api'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import dynamic from 'next/dynamic'

import { ButtonComponent } from '@/components/common/button'
import { ContainerComponent } from '@/components/common/container'
import { EmptyStateComponent } from '@/components/common/emptyState'
import { CreateGroupModalComponent } from '@/components/common/modals/createGroupModal'
import withPrivateRoute from '@/components/common/withPrivateRoute'
import { GroupComponent } from '@/components/users/group'
import { PublicGroupsBrowserComponent } from '@/components/users/publicGroupsBrowser'

import { useTranslate } from '@/hooks/useTranslate'

import { UserType } from '@/types/User'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'

import { queryClient } from '../_app'

const ErrorComponent = dynamic(() => import('@/components/common/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/common/pageLoader').then((component) => component.PageLoaderComponent),
)

interface UsersPageProps {
  sessionUser: UserType
}

const UsersPage = ({ sessionUser }: UsersPageProps) => {
  const { t } = useTranslate()
  const [opened, { open, close }] = useDisclosure(false)

  const enabled = !!sessionUser
  const userId = sessionUser?._id

  const {
    data: joinedGroups,
    error: joinedGroupsError,
    isLoading: joinedGroupsLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.JOINED_GROUPS],
    queryFn: () => api.group.getJoinedGroups(userId),
    enabled,
    retry: 1,
  })

  const {
    data: publicGroups,
    error: publicGroupsError,
    isLoading: publicGroupsLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.PUBLIC_GROUPS],
    queryFn: () => api.group.getPublicGroups(userId),
    enabled,
    retry: 1,
  })

  const joinGroupMutation = useMutation({
    mutationFn: (groupId: string) => api.group.joinPublicGroup(groupId, sessionUser._id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true })
      notify({
        message: t('users.public_groups.join_success'),
        type: 'success',
      })
    },
    onError: () => {
      notify({
        message: t('users.public_groups.join_error'),
        type: 'error',
      })
    },
  })

  if (joinedGroupsLoading || publicGroupsLoading) return <PageLoaderComponent />
  if (joinedGroupsError) return <ErrorComponent title={joinedGroupsError.toString()} />
  if (publicGroupsError) return <ErrorComponent title={publicGroupsError.toString()} />

  return (
    <div>
      <CreateGroupModalComponent opened={opened} close={close} creatorId={sessionUser?._id} />

      <ContainerComponent className="flex flex-col mt-8">
        <div className="flex justify-between items-center">
          <div className="mb-8 font-bold text-xl">{t('users.my_groups')}</div>
          <ButtonComponent variant="outline" className="w-3/12" onClick={open}>
            {t('users.create_group.title')}
          </ButtonComponent>
        </div>
        {joinedGroups.length ? (
          joinedGroups.map((group) => <GroupComponent key={group._id} group={group} />)
        ) : (
          <EmptyStateComponent
            compact
            title={t('users.my_groups_empty_state.title')}
            message={t('users.my_groups_empty_state.message')}
          />
        )}
        <div className="mb-4 font-bold text-xl mt-5">{t('users.public_groups.title')}</div>
        <PublicGroupsBrowserComponent
          groups={publicGroups}
          join={joinGroupMutation.mutate}
          loading={joinGroupMutation.isLoading}
          selectedGroupId={joinGroupMutation.variables}
        />
      </ContainerComponent>
    </div>
  )
}

export default withPrivateRoute(UsersPage)
