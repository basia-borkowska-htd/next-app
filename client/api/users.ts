import { UserType } from '@/types/User'

export const api = {
  getUsers: async (): Promise<UserType[] | undefined> => {
    try {
      const res = await fetch('http://localhost:3001/api/users')
      const data = await res.json()

      return data.users
    } catch (error) {
      console.error(error)
      return
    }
  },
  getUser: async (id: string): Promise<UserType | undefined> => {
    try {
      const res = await fetch(`http://localhost:3001/api/users/${id}`)
      const data = await res.json()

      return data.user
    } catch (error) {
      console.error(error)
      return
    }
  },
  addUser: async (user: UserType): Promise<UserType | undefined> => {
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
      return undefined
    }
  },
  updateUser: async (user: UserType): Promise<UserType | undefined> => {
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
      return
    }
  },
  deleteUser: async (id: string): Promise<boolean> => {
    try {
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
    }
  },
}
