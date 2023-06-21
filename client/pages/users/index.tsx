import React from 'react'
import { CardComponent } from '@/components/card'
import { UserModalComponent } from '@/components/userModal'
import { Pathnames } from '@/utils/pathnames'
import { useDisclosure } from '@mantine/hooks'
import { useRouter } from 'next/router'

import { useMutation, useQuery } from '@tanstack/react-query'
import { PageLoaderComponent } from '@/components/pageLoader'

import { notify } from '@/utils/notifications'
import { ErrorComponent } from '@/components/error'
import { api } from '@/api'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'
import { queryClient } from '@/pages/_app'
import { ContainerComponent } from '@/components/container'

const UsersPage = () => {
  const router = useRouter()
  const [opened, { open, close }] = useDisclosure(false)

  const { data, error, isLoading } = useQuery({ queryKey: [QueryKeyEnum.USERS], queryFn: api.user.getUsers })

  const addUserMutation = useMutation({
    mutationFn: api.user.addUser,
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: [QueryKeyEnum.USERS] })

      notify({ type: 'success', message: 'User added successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to add user' })
    },
  })

  if (error) return <ErrorComponent title={error.toString()} />
  if (isLoading) return <PageLoaderComponent />

  const handleRedirect = (id: string) => {
    router.push(Pathnames.userProfile.replace(':id', id))
  }
  return (
    <ContainerComponent className="flex h-screen items-center">
      <div className="w-full flex flex-wrap gap-6 justify-center">
        {data?.map(({ _id, name }) => (
          <CardComponent onClick={() => handleRedirect(_id)} key={_id} title={name} />
        ))}
        <CardComponent onClick={open} title="+ Add new user" bg="blue-100" />
      </div>

      <UserModalComponent
        opened={opened}
        onClose={close}
        onSubmit={addUserMutation.mutate}
        loading={addUserMutation.isLoading}
      />
    </ContainerComponent>
  )
}

export default UsersPage
