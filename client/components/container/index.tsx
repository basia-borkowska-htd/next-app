import { Container } from '@mantine/core'
import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
}

export const ContainerComponent = ({ children, className }: ContainerProps) => (
  <Container className={className} size="xl">
    {children}
  </Container>
)
