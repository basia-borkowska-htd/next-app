import { ReactNode } from 'react'

interface InformationBoxProps {
  children: ReactNode
}

export const ErrorMessage = ({ children }: InformationBoxProps) => {
  const containerClassNames = `flex items-center bg-red-100 rounded h-fit mt-6 p-3`
  const textClassNames = `text-red-700 text-xs`

  return (
    <div className={containerClassNames}>
      <div className={textClassNames}>{children}</div>
    </div>
  )
}
