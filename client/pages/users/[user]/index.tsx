import { useUsers } from '@/hooks/useUsers'
import { ChartComponent } from './chart'
import { HeaderComponent } from './header'
import { RangesComponent } from './ranges'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { UserType } from '@/types/User'
import { useDisclosure } from '@mantine/hooks'
import { UserModalComponent } from '@/components/userModal'
import { notifications } from '@mantine/notifications'

const UserProfilePage = () => {
  const { getUser, updateUser } = useUsers()
  const router = useRouter()
  const { user: userId } = router.query
  const [user, setUser] = useState<UserType | null>()
  const [opened, { open, close }] = useDisclosure(false)

  useEffect(() => {
    ;(async () => {
      try {
        const fetchedUser = await getUser(userId?.toString() || '')
        setUser(fetchedUser)
      } catch (e) {
        console.log(e)
      }
    })()
  }, [userId])

  const handleSubmit = async (user: UserType) => {
    const result = await updateUser(user)
    if (result) {
      close()
      setUser(result)
      notifications.show({
        title: 'Success',
        message: 'User updated successfully',
        color: 'green',
      })
    } else {
      notifications.show({
        title: 'Error',
        message: 'Unable to update user',
        color: 'red',
      })
    }
  }

  if (!user) return <></>

  return (
    <>
      <HeaderComponent user={user} openModal={open} />
      <RangesComponent />
      <ChartComponent />

      <UserModalComponent opened={opened} user={user} onClose={close} onSubmit={handleSubmit} />
    </>
  )
}

export default UserProfilePage
