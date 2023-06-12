import { useUsers } from '@/hooks/useUsers'
import { ChartComponent } from './chart'
import { HeaderComponent } from './header'
import { RangesComponent } from './ranges'
import { useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { UserType } from '@/types/User'

const UserProfilePage = () => {
  const { getUser, updateUser } = useUsers()
  const router = useRouter()
  const { user: userId } = router.query
  const [user, setUser] = useState<UserType | null>()

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

  if (!user) return <></>

  return (
    <>
      <HeaderComponent user={user} onEdit={updateUser} />
      <RangesComponent />
      <ChartComponent />
    </>
  )
}

export default UserProfilePage
