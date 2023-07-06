import { Card, PasswordInput, TextInput, Title } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

import { ButtonComponent } from '@/components/button'

import Logo from '@/assets/graphics/logo.svg'

import { Pathnames } from '@/utils/pathnames'

// TODO: finish register page
const RegisterPage = () => (
  <div className="bg-green-100/10 flex items-center justify-center h-screen">
    <Card shadow="md" padding="lg" radius="md" className="h-fit w-3/12">
      <div className="flex flex-col items-center gap-1 py-4">
        <Image src={Logo} alt="Logo" />
        <Title color="blue-300">Next App</Title>
      </div>
      <form className="flex flex-col gap-2" method="post" action="/api/auth/callback/credentials">
        <TextInput label="Email" placeholder="user@example.com" name="email" />
        <PasswordInput label="Password" placeholder="*********" name="password" />
        <PasswordInput label="Confirm password" placeholder="*********" name="confirm_password" />
        <ButtonComponent type="submit" className="mt-5">
          Register
        </ButtonComponent>
      </form>
      <div className="mt-3 text-sm">
        {`Already have an account? `}
        <Link className="text-blue-100 font-bold" href={Pathnames.auth.signIn}>
          Sign in
        </Link>
      </div>
    </Card>
  </div>
)

export default RegisterPage
