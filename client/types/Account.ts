import { AccountStatusEnum } from '@/enums/AccountStatus.enum'
import { ProviderEnum } from '@/enums/Provider.enum'

export type CredentialsType = {
  email: string
  password: string
}

export type AccountType = {
  _id: string
  email: string
  status: AccountStatusEnum
  provider: ProviderEnum
}

export interface CreateAccountType extends CredentialsType {
  provider: ProviderEnum
}
