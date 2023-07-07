import { AccountType, CreateAccountType, CredentialsType } from '@/types/Account'
import { UserType } from '@/types/User'

export const authApi = {
  authenticate: async (credentials: CredentialsType): Promise<UserType> => {
    const res = await fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const data = await res.json()

    if (!data?.user) throw new Error(data.error)
    return data.user
  },
  createAccount: async (account: CreateAccountType): Promise<AccountType> => {
    const res = await fetch('http://localhost:3001/api/auth/accounts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(account),
    })
    const data = await res.json()

    if (!data?.account) throw new Error(data.error)
    return data.account
  },
}
