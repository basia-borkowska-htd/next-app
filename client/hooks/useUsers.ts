import { UserType } from '@/types/User'
import { useEffect, useState } from 'react'

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async (): Promise<boolean> => {
    try {
      const res = await fetch('http://localhost:3001/api/users') // TODO find a better way
      const data = await res.json()

      setUsers(data.users)
      return true
    } catch (error) {
      console.error(error)
      return false
    }
  }

  return {
    users,
    getUsers,
  }
}
