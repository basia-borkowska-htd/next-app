import { api } from '@/api'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { queryClient } from '@/pages/_app'

import { AvatarComponent } from '@/components/avatar'
import { CardComponent } from '@/components/card'
import { ContainerComponent } from '@/components/container'

import { useTranslate } from '@/hooks/useTranslate'

import { AddUserType } from '@/types/User'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

const ErrorComponent = dynamic(() => import('@/components/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/pageLoader').then((component) => component.PageLoaderComponent),
)

const UserCardComponent = dynamic(() =>
  import('@/components/userCard').then((component) => component.UserCardComponent),
)
const UserModalComponent = dynamic(() =>
  import('@/components/modals/userModal').then((component) => component.UserModalComponent),
)

const UsersPage = () => {
  const router = useRouter()
  const { t } = useTranslate()
  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading } = useQuery({ queryKey: [QueryKeyEnum.USERS], queryFn: api.user.getUsers })

  const addUserMutation = useMutation({
    mutationFn: (user: AddUserType) => api.user.addUser(user),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeyEnum.USERS] })

      notify({ type: 'success', message: t('users.add_user_toast_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('users.add_user_toast_error') })
    },
  })

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }

  const memoUsersList = useMemo(
    () =>
      data?.map(({ _id, name, avatarUrl }) => (
        <UserCardComponent
          key={`user-card-${_id}-${name}`}
          _id={_id}
          avatarUrl={avatarUrl}
          name={name}
          handleClick={() => handleRedirect(_id)}
        />
      )),
    [data],
  )

  if (error) return <ErrorComponent title={error.toString()} />
  if (isLoading) return <PageLoaderComponent />

  return (
    <div className="bg-green-100/10">
      <ContainerComponent className="flex h-screen items-center">
        <div className="w-full flex flex-wrap gap-6 justify-center">
          {data?.map(({ _id, name, avatarUrl }) => (
            <CardComponent key={`card-${_id}`} onClick={() => handleRedirect(_id)}>
              <AvatarComponent src={avatarUrl} compact />
              <div className="text-2xl">{name}</div>
            </CardComponent>
          ))}
          <CardComponent className="bg-green-300/25 hover:bg-green-300/30" onClick={open}>
            <div className="text-2xl">{t('users.add_user_button')}</div>
          </CardComponent>
        </div>

        <UserModalComponent
          opened={opened}
          onClose={close}
          onSubmit={addUserMutation.mutate}
          loading={addUserMutation.isLoading}
        />
      </ContainerComponent>
    </div>
  )
}

export default UsersPage
