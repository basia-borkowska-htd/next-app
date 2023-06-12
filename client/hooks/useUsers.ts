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
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`) // TODO find a better way
      const data = await res.json()

      return data.user
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const addUser = async (user: UserType): Promise<UserType | null> => {
    const newUser = { ...user, _id: undefined }
    try {
      const res = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      const data = await res.json()

      return data.user
    } catch (error) {
      console.error(error)
      return null
    }
  }

  const updateUser = async (user: UserType): Promise<UserType | null> => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${user._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      })
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
    addUser,
    updateUser,
  }
}
