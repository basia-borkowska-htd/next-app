import { UserType } from '@/types/User'
import { useState } from 'react'

export const useUsers = () => {
  const [users, setUsers] = useState<UserType[]>([])
  const [loading, setLoading] = useState(false)

  const getUsers = async (): Promise<boolean> => {
    try {
      setLoading(true)
      const res = await fetch('http://localhost:3001/api/users') // TODO find a better way
      const data = await res.json()

      setUsers(data.users)
      return true
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const getUser = async (id: string): Promise<UserType | null> => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3001/api/users/${id}`) // TODO find a better way
      const data = await res.json()

      return data.user
    } catch (error) {
      console.error(error)
      return null
    } finally {
      setLoading(false)
    }
  }

  const addUser = async (user: UserType): Promise<UserType | null> => {
    const newUser = { ...user, _id: undefined }
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }

  const updateUser = async (user: UserType): Promise<UserType | null> => {
    try {
      setLoading(true)
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
    } finally {
      setLoading(false)
    }
  }
  const deleteUser = async (id: string): Promise<boolean> => {
    try {
      setLoading(true)
      const res = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      return data.success
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    loading,
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser,
  }
}
