import { Card } from '@mantine/core'

interface CardProps {
  title: string
  bg?: string

  onClick: () => void
}

export const CardComponent = ({ title, bg, onClick }: CardProps) => (
  <Card onClick={onClick} bg={bg || 'blue-200'} className="w-1/5 h-28 flex items-center justify-center cursor-pointer">
    <strong>{title}</strong>
  </Card>
)
