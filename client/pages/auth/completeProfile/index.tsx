import { api } from '@/api'
import { Card, Title } from '@mantine/core'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { UserFormComponent } from '@/components/userForm'

import { useTranslate } from '@/hooks/useTranslate'

import { AddUserType } from '@/types/User'

import { AccountStatusEnum } from '@/enums/AccountStatus.enum'

import Logo from '@/assets/graphics/logo.svg'

import { customSignOut } from '@/utils/customSignOut'
import { Pathnames } from '@/utils/pathnames'

import { RegistrationStepperComponent } from '../RegistrationStepper'

const CompleteProfilePage = () => {
  const { t } = useTranslate()
  const { data: session } = useSession()
  const router = useRouter()

  const handleSubmit = async (user: AddUserType) => {
    if (!session?.account?._id) return
    const result = await api.auth.completeProfile(session.account._id, user)
    if (result) {
      session.account.status = AccountStatusEnum.COMPLETED
      router.push(Pathnames.home)
    }
  }

  return (
    <div className="bg-green-100/10 flex items-center justify-center h-screen">
      <Card shadow="md" padding="lg" radius="md" className="h-fit w-1/2">
        <div className="flex flex-col items-center gap-1 py-4">
          <Image src={Logo} alt="Logo" />
          <Title color="blue-300">{t('basic.title')}</Title>
        </div>
        <RegistrationStepperComponent active={2} />
        <UserFormComponent email={session?.account?.email} loading={false} onSubmit={handleSubmit} />
      </Card>
      <button type="button" onClick={customSignOut}>
        Sign out
      </button>
    </div>
  )
}
export default CompleteProfilePage
