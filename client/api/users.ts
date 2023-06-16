import { UserType } from '@/types/User'

export const api = {
  getUsers: async (): Promise<UserType[]> => {
    const res = await fetch('http://localhost:3001/api/users')
    const data = await res.json()
    if (!data?.users) throw new Error(data.error)
    return data.users
  },
  getUser: async (id: string): Promise<UserType> => {
    const res = await fetch(`http://localhost:3001/api/users/${id}`)
    const data = await res.json()
    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  addUser: async (user: UserType): Promise<UserType> => {
    const newUser = { ...user, _id: undefined }
    const res = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
    const data = await res.json()

    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  updateUser: async (user?: UserType): Promise<UserType> => {
    if (!user) throw new Error('User does not exist')
    const res = await fetch(`http://localhost:3001/api/users/${user._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    const data = await res.json()

    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  deleteUser: async (id: string): Promise<boolean> => {
    const res = await fetch(`http://localhost:3001/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()

    if (!data?.success) throw new Error(data.error)
    return data.success
  },
}
