/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
import { api } from '@/api'
import { Group, Menu, Text } from '@mantine/core'
import { IconLogout, IconUser } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import Logo from '@/assets/graphics/logo.svg'

import { customSignOut } from '@/utils/customSignOut'
import { Pathnames } from '@/utils/pathnames'

import { ErrorComponent } from '../error'
import { PageLoaderComponent } from '../pageLoader'
import UserButtonComponent from './userButton'

export const NavBarComponent = () => {
  const { data: session } = useSession()
  const router = useRouter()
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.SESSION_USER],
    queryFn: () => api.user.getUserByEmail(session?.user?.email),
    enabled: !!session,
    retry: 1,
  })

  useEffect(() => {
    if (user) session.user = user
  }, [user])

  if (isLoading) return <PageLoaderComponent />
  if (error) return <ErrorComponent title={error.toString()} />

  return (
    <div className="flex justify-between bg-blue-300 px-16">
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => router.push(Pathnames.home)}>
        <Image src={Logo} alt="Logo" />
        <Text color="green-100" size={28}>
          Next App
        </Text>
      </div>
      <Group position="center">
        <Menu withArrow position="bottom-start" width={200}>
          <Menu.Target>
            <UserButtonComponent avatarUrl={user.avatarUrl} name={user.name} email={user.email} />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item
              icon={<IconUser size={16} />}
              onClick={() => router.push(Pathnames.userProfile.replace(':id', user._id))}
            >
              My profile
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item color="red" icon={<IconLogout size={16} />} onClick={customSignOut}>
              Log out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </div>
  )
}
