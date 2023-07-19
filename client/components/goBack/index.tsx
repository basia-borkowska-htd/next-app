import { IconArrowNarrowLeft } from '@tabler/icons-react'
import Link from 'next/link'

import { ButtonComponent } from '@/components/button'

interface GoBackProps {
  path: string
}

export const GoBackComponent = ({ path }: GoBackProps) => (
  <Link href={path}>
    <ButtonComponent className="mb-3 ps-0" variant="icon" fullWidth={false}>
      <IconArrowNarrowLeft height={32} />
    </ButtonComponent>
  </Link>
)
