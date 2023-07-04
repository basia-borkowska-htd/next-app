import { IconUpload } from '@tabler/icons-react'
import { useRef } from 'react'

import { ButtonComponent } from '../button'

interface FileUploaderProps {
  handleChange: (file: File | undefined) => void
  message: string
}

export const FileUploaderComponent = ({ handleChange, message }: FileUploaderProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const handleClick = () => {
    ref?.current?.click()
  }

  return (
    <>
      <input type="file" className="hidden" ref={ref} onChange={(e) => handleChange(e.target.files?.[0])} />
      <ButtonComponent className="flex" variant="icon" fullWidth={false} onClick={handleClick}>
        <IconUpload className="mr-2" size={22} />
        {message}
      </ButtonComponent>
    </>
  )
}
