import { AddUserType, BasicUserType, UpdateUserType, UserType } from '@/types/User'

const formatUser = ({ age, name, sex, height, weight, avatarFile, avatarUrl }: UpdateUserType) => {
  const formData = new FormData()
  if (avatarFile) formData.append('avatar', avatarFile)
  formData.append('age', age.toString())
  formData.append('name', name)
  formData.append('sex', sex)
  formData.append('height[unit]', height.unit)
  formData.append('height[value]', height.value?.toString() || '')
  if (weight) {
    formData.append('weight[unit]', weight.unit)
    formData.append('weight[value]', weight.value?.toString() || '')
  }
  if (!avatarUrl) formData.append('removeAvatar', 'true')
  return formData
}

export const usersApi = {
  getUsers: async (): Promise<BasicUserType[]> => {
    const res = await fetch('http://localhost:3001/api/users')
    const data = await res.json()
    if (!data?.users) throw new Error(data.error)
    return data.users
  },
  getUser: async (id: string): Promise<UserType> => {
    if (!id) throw new Error('User does not exist')

    const res = await fetch(`http://localhost:3001/api/users/${id}`)
    const data = await res.json()
    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  getUserByEmail: async (email?: string): Promise<UserType> => {
    if (!email) throw new Error('Email not provided')

    const res = await fetch(`http://localhost:3001/api/users/${email}/auth`)
    const data = await res.json()
    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  getBasicUser: async (id: string): Promise<BasicUserType> => {
    if (!id) throw new Error('User does not exist')

    const res = await fetch(`http://localhost:3001/api/users/${id}/basic`)
    const data = await res.json()
    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  addUser: async (user: AddUserType): Promise<AddUserType> => {
    const body = formatUser(user)
    const res = await fetch('http://localhost:3001/api/users', {
      method: 'POST',
      body,
    })
    const data = await res.json()

    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  updateUser: async (user: UpdateUserType): Promise<UpdateUserType> => {
    const body = formatUser(user)
    const res = await fetch(`http://localhost:3001/api/users/${user._id}`, {
      method: 'PUT',
      body,
    })
    const data = await res.json()

    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  deleteUser: async (id: string): Promise<boolean> => {
    if (!id) throw new Error('User does not exist')

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
