import { Button } from '@mantine/core'
import { ReactNode } from 'react'

export type ButtonVariant = 'gradient' | 'outline'
export type ButtonType = 'button' | 'submit' | 'reset'

interface ButtonProps {
  className?: string
  children: ReactNode
  variant?: ButtonVariant
  type?: ButtonType
  loading?: boolean
  color?: string

  onClick?: (e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void
}
export const ButtonComponent = ({
  className,
  children,
  variant = 'gradient',
  type = 'button',
  loading = false,
  color = 'blue-200',
  onClick,
}: ButtonProps) => {
  return (
    <Button
      className={className}
      variant={variant}
      gradient={variant === 'gradient' ? { from: 'blue-200', to: 'green-100', deg: 35 } : undefined}
      color={color}
      type={type}
      loading={loading}
      onClick={onClick}
      fullWidth
    >
      {children}
    </Button>
  )
}
