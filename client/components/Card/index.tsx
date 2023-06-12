import { Card } from '@mantine/core'

import React from 'react'

interface CardProps {
  title: string
}

export const CardComponent = ({ title }: CardProps) => {
  return <Card className="w-1/4 h-28">{title}</Card>
}
