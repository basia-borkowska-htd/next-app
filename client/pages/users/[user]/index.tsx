import { api } from '@/api'
import { Divider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useMemo } from 'react'

import { queryClient } from '@/pages/_app'

import { EmptyStateComponent } from '@/components/common/emptyState'
import { ErrorComponent } from '@/components/common/error'
import { ModalComponent } from '@/components/common/modals/modal'
import { PageLoaderComponent } from '@/components/common/pageLoader'
import withPrivateRoute from '@/components/common/withPrivateRoute'

import { useTranslate } from '@/hooks/useTranslate'

import { UpdateUserType, UserType } from '@/types/User'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'

const ChartSectionComponent = dynamic(() =>
  import('@/components/users/chart').then((component) => component.ChartSectionComponent),
)
const HeaderComponent = dynamic(() =>
  import('@/components/users/header').then((component) => component.HeaderComponent),
)
const RangesComponent = dynamic(() =>
  import('@/components/users/ranges').then((component) => component.RangesComponent),
)

const UserFormComponent = dynamic(() =>
  import('@/components/common/forms/userForm').then((component) => component.UserFormComponent),
)

const SettingsComponent = dynamic(() =>
  import('@/components/users/settings').then((component) => component.SettingsComponent),
)

interface UserProfileProps {
  sessionUser: UserType
}

const UserProfilePage = ({ sessionUser }: UserProfileProps) => {
  const router = useRouter()
  const { user: userId } = router.query
  const { t } = useTranslate()

  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [QueryKeyEnum.USER],
    queryFn: () => api.user.getUser(userId?.toString()),
    enabled: router.isReady,
  })

  useEffect(() => {
    refetch()
  }, [userId])

  const editable = useMemo(() => userId === sessionUser?._id, [userId, sessionUser?._id])

  const [opened, { open, close }] = useDisclosure(false)

  const editUserMutation = useMutation({
    mutationFn: (currentUser: UpdateUserType) => api.user.updateUser(currentUser),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeyEnum.USER] })
      notify({ type: 'success', message: t('user.edit_user.toast_success') })
      close()
    },
    onError: () => {
      notify({ type: 'error', message: t('user.edit_user.toast_error') })
    },
  })

  if (error) return <ErrorComponent title={error.toString()} />
  if (isLoading) return <PageLoaderComponent />
  if (!user) return <EmptyStateComponent compact />

  return (
    <>
      <HeaderComponent user={user} openModal={open} editable={editable} />
      <RangesComponent userId={user._id} editable={editable} />
      <ChartSectionComponent userId={user._id} />
      {editable && (
        <>
          <Divider py="md" mx="md" />
          <SettingsComponent userId={user._id} />
        </>
      )}

      <ModalComponent opened={opened} onClose={close} title={t('user_modal.title_edit_user')}>
        <UserFormComponent
          user={user}
          email={user.email}
          onSubmit={editUserMutation.mutate}
          loading={editUserMutation.isLoading}
        />
      </ModalComponent>
    </>
  )
}

export default withPrivateRoute(UserProfilePage)
