import { Card } from '@mantine/core'
import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string

  onClick: () => void
}

export const CardComponent = ({ children, className, onClick }: CardProps) => (
  <Card
    onClick={onClick}
    className={`w-1/5 flex items-center flex-col gap-2 justify-center cursor-pointer shadow-md hover:shadow-xl ${className}`}
  >
    {children}
  </Card>
)
