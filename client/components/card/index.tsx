import { Card } from '@mantine/core'

import React from 'react'

interface CardProps {
  title: string
  bg?: string

  onClick: () => void
}

export const CardComponent = ({ title, bg, onClick }: CardProps) => {
  return (
    <Card
      onClick={onClick}
      bg={bg || 'blue-200'}
      className="w-1/5 h-28 flex items-center justify-center cursor-pointer"
    >
      <strong>{title}</strong>
    </Card>
  )
}
