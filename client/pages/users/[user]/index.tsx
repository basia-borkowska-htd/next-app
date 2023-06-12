import { useUsers } from '@/hooks/useUsers'
import { ChartComponent } from './chart'
import { HeaderComponent } from './header'
import { RangesComponent } from './ranges'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { UserType } from '@/types/User'
import { useDisclosure } from '@mantine/hooks'
import { UserModalComponent } from '@/components/userModal'
import { useNotification } from '@/hooks/useNotification'

const UserProfilePage = () => {
  const { getUser, updateUser } = useUsers()
  const router = useRouter()
  const { user: userId } = router.query
  const [user, setUser] = useState<UserType | null>()
  const [opened, { open, close }] = useDisclosure(false)
  const { showErrorNotification, showSuccessNotification } = useNotification()

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
      showSuccessNotification('User updated successfully')
    } else {
      showErrorNotification('Unable to update user')
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
