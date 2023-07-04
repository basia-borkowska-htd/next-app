import { api } from '@/api'
import { useTranslate } from '@/hooks/useTranslate'
import { Divider } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { queryClient } from '@/pages/_app'

import { EmptyStateComponent } from '@/components/emptyState'
import { ErrorComponent } from '@/components/error'
import { UserModalComponent } from '@/components/modals/userModal'
import { PageLoaderComponent } from '@/components/pageLoader'

import { UpdateUserType } from '@/types/User'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'

import { ChartSectionComponent } from './chart'
import { HeaderComponent } from './header'
import { RangesComponent } from './ranges'
import { SettingsComponent } from './settings'

const UserProfilePage = () => {
  const router = useRouter()
  const { user: userId } = router.query
  const { t } = useTranslate()

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.USER],
    queryFn: () => api.user.getUser(userId.toString()),
    enabled: router.isReady,
  })

  const [opened, { open, close }] = useDisclosure(false)

  const editUserMutation = useMutation({
    mutationFn: (currentUser: UpdateUserType) => api.user.updateUser(currentUser),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeyEnum.USER] })
      notify({ type: 'success', message: t('user.edit_user.toast_success') })
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
      <HeaderComponent user={user} openModal={open} />

      <RangesComponent userId={user._id} />
      <ChartSectionComponent userId={user._id} />
      <Divider py="md" mx="md" />
      <SettingsComponent userId={user._id} />

      <UserModalComponent
        opened={opened}
        user={user}
        onClose={close}
        onSubmit={editUserMutation.mutate}
        loading={editUserMutation.isLoading}
      />
    </>
  )
}

export default UserProfilePage
