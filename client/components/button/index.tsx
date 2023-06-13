import { Button } from '@mantine/core'
import { ReactNode } from 'react'

export type ButtonVariant = 'gradient' | 'outline'
export type ButtonType = 'button' | 'submit' | 'reset'

interface ButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  type?: ButtonType
  loading?: boolean
  color?: string

  onClick?: (e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void
}
export const ButtonComponent = ({
  children,
  variant = 'gradient',
  type = 'button',
  loading = false,
  color = 'blue-200',
  onClick,
}: ButtonProps) => {
  return (
    <Button
      fullWidth
      variant={variant}
      gradient={variant === 'gradient' ? { from: 'blue-200', to: 'green-100', deg: 35 } : undefined}
      color={color}
      type={type}
      loading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}
