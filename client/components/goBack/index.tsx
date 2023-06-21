import { useRouter } from 'next/router'
import { ButtonComponent } from '../button'
import { IconArrowNarrowLeft } from '@tabler/icons-react'
interface GoBackProps {
  path: string
}

export const GoBackComponent = ({ path }: GoBackProps) => {
  const router = useRouter()

  return (
    <ButtonComponent className="mb-3 ps-0" onClick={() => router.push(path)} variant="icon" fullWidth={false}>
      <IconArrowNarrowLeft size={32} />
    </ButtonComponent>
  )
}
