import { Button } from '@mantine/core'
import { ReactNode } from 'react'

export type ButtonVariant = 'gradient' | 'outline' | 'icon'
export type ButtonType = 'button' | 'submit' | 'reset'

interface ButtonProps {
  className?: string
  children: ReactNode
  variant?: ButtonVariant
  type?: ButtonType
  loading?: boolean
  color?: string
  fullWidth?: boolean

  onClick?: (e?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>) => void
}
export const ButtonComponent = ({
  className,
  children,
  variant = 'gradient',
  type = 'button',
  loading = false,
  fullWidth = true,
  color = 'blue-200',
  onClick,
}: ButtonProps) => (
  <Button
    className={className}
    variant={variant}
    gradient={variant === 'gradient' ? { from: 'blue-200', to: 'green-100', deg: 35 } : undefined}
    color={color}
    type={type}
    loading={loading}
    onClick={onClick}
    fullWidth={fullWidth}
  >
    {children}
  </Button>
)
