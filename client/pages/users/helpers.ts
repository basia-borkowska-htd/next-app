import { UserType } from '@/types/User'

export const getUsers1 = async (): Promise<UserType[] | undefined> => {
    try {
      const res = await fetch('http://localhost:3001/api/users') // TODO find a better way
      const data = await res.json()

      return data
    } catch (error) {
      console.error(error)
      return
    }
  }

  export const addUser1 = async (user: UserType): Promise<UserType | undefined> => {
    const newUser = { ...user, _id: undefined }
    try {
      const res = await fetch('http://localhost:3001/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })

      return await res.json()
    } catch (error) {
      console.error(error)
      return
    }
  }