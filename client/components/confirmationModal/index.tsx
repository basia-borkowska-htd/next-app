import { UserType } from '@/types/User'
import { NumberInput, TextInput, Button, Box } from '@mantine/core'
import { ModalComponent } from '../Modal'

interface ConfirmationModalProps {
  opened: boolean
  title?: string
  description?: string
  confirmButtonText?: string
  declineButtonText?: string

  onClose: () => void
  onSubmit: () => void
}

export const ConfirmationModalComponent = ({
  opened,
  title,
  description,
  confirmButtonText,
  declineButtonText,
  onClose,
  onSubmit,
}: ConfirmationModalProps) => {
  return (
    <>
      <ModalComponent opened={opened} onClose={onClose} title={title || 'Are you sure?'}>
        {description || 'Are you sure you want to confirm this action? It is irreversable!'}
        <div className="basis-1/4 flex gap-2 mt-5">
          <Button fullWidth variant="outline" color="blue-200" onClick={onClose}>
            {declineButtonText || 'No'}
          </Button>
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: 'blue-200', to: 'green-100', deg: 35 }}
            onClick={onSubmit}
          >
            {confirmButtonText || 'Yes'}
          </Button>
        </div>
      </ModalComponent>
    </>
  )
}
