import { UserType } from '@/types/User'
import { useState } from 'react'

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([])

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

  const getUser = async (id: string): Promise<UserType | null> => {
    console.log({ id })
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`) // TODO find a better way
      const data = await res.json()

      return data.user
    } catch (error) {
      console.error(error)
      return null
    }
  }

  return {
    users,
    getUsers,
    getUser,
  }
}
