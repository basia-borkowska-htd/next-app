import { ReactNode } from 'react'

interface ErrorMessagProps {
  children: ReactNode
}

export const ErrorMessageComponent = ({ children }: ErrorMessagProps) => (
  <div className="flex items-center bg-red-100 rounded h-fit mt-6 mb-3 p-3">
    <div className="text-red-700 text-xs">{children}</div>
  </div>
)
