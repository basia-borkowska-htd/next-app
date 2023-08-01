import { api } from '@/api'
import { Card, PasswordInput, TextInput, Title } from '@mantine/core'
import { useForm, yupResolver } from '@mantine/form'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import * as Yup from 'yup'

import { ButtonComponent } from '@/components/button'
import { ErrorMessageComponent } from '@/components/errorMessage'

import { useTranslate } from '@/hooks/useTranslate'

import { ProviderEnum } from '@/enums/Provider.enum'
import { StepEnum } from '@/enums/Step.enum'

import Logo from '@/assets/graphics/logo.svg'

import { Pathnames } from '@/utils/pathnames'

import RegistrationStepperComponent from '../RegistrationStepper'

// TODO: strength meter for password
const schema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
})

const RegisterPage = () => {
  const { t } = useTranslate()
  const { onSubmit, getInputProps } = useForm({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate: yupResolver(schema),
  })

  const [error, setError] = useState('')

  const handleSubmit = async ({ email, password }: Yup.InferType<typeof schema>) => {
    try {
      await api.auth.createAccount({ email, password, provider: ProviderEnum.CREDENTIALS })
      await signIn(ProviderEnum.CREDENTIALS, { email, password, callbackUrl: Pathnames.auth.verifyEmail })
    } catch (e) {
      setError(e.message.toString())
    }
  }

  return (
    <div className="bg-green-100/10 flex items-center justify-center h-screen">
      <Card shadow="md" padding="lg" radius="md" className="h-fit w-1/2">
        <div className="flex flex-col items-center gap-1 py-4">
          <Image src={Logo} alt="Logo" />
          <Title color="blue-300">{t('basic.title')}</Title>
        </div>
        <RegistrationStepperComponent active={StepEnum.STEP_1} />
        <form
          className="flex flex-col gap-2"
          onSubmit={onSubmit((values) => {
            handleSubmit(values)
          })}
        >
          {error && <ErrorMessageComponent>{error}</ErrorMessageComponent>}
          <TextInput
            label={t('auth.register.email_label')}
            placeholder={t('auth.register.email_placeholder')}
            name="email"
            {...getInputProps('email')}
            withAsterisk
          />
          <PasswordInput
            label={t('auth.register.password_label')}
            placeholder={t('auth.register.password_placeholder')}
            name="password"
            {...getInputProps('password')}
            withAsterisk
          />
          <PasswordInput
            label={t('auth.register.confirm_password_label')}
            placeholder={t('auth.register.confirm_password_placeholder')}
            name="confirm_password"
            {...getInputProps('confirmPassword')}
            withAsterisk
          />
          <ButtonComponent type="submit" className="mt-5">
            {t('auth.register.button')}
          </ButtonComponent>
        </form>
        <div className="mt-3 text-sm">
          {t('auth.register.have_account')}
          <Link className="text-blue-100 font-bold" href={Pathnames.auth.signIn}>
            {t('auth.register.sign_in')}
          </Link>
        </div>
      </Card>
    </div>
  )
}
export default RegisterPage
