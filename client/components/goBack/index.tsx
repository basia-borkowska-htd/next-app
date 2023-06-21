import Link from 'next/link'
import { IconArrowNarrowLeft } from '@tabler/icons-react'

import { ButtonComponent } from '../button'

interface GoBackProps {
  path: string
}

export const GoBackComponent = ({ path }: GoBackProps) => (
  <Link href={path}>
    <ButtonComponent className="mb-3 ps-0" variant="icon" fullWidth={false}>
      <IconArrowNarrowLeft size={32} />
    </ButtonComponent>
  </Link>
)
