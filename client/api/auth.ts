import { AccountType, CreateAccountType, CredentialsType } from '@/types/Account'

export const authApi = {
  authenticate: async (credentials: CredentialsType) => {
    const res = await fetch('http://localhost:3001/api/auth', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    })
    const data = await res.json()
    console.log({ t: res.headers.get('authorization') })
    if (!data?.account) throw new Error(data.error)
    return { account: data.account, token: res.headers.get('authorization') }
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
