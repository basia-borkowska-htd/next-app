import { ButtonComponent } from '@/components/common/button'
import { ModalComponent } from '@/components/common/modals/modal'

import { useTranslate } from '@/hooks/useTranslate'

interface ConfirmationModalProps {
  opened: boolean
  title?: string
  description?: string
  confirmButtonText?: string
  declineButtonText?: string
  loading: boolean

  onClose: () => void
  onSubmit: () => void
}

export const ConfirmationModalComponent = ({
  opened,
  title,
  description,
  loading,
  confirmButtonText,
  declineButtonText,
  onClose,
  onSubmit,
}: ConfirmationModalProps) => {
  const { t } = useTranslate()

  return (
    <ModalComponent opened={opened} onClose={onClose} title={title || t('confirmation_modal.title')}>
      {description || t('confirmation_modal.message')}
      <div className="basis-1/4 flex gap-2 mt-5">
        <ButtonComponent variant="outline" onClick={onClose}>
          {declineButtonText || t('confirmation_modal.no_button')}
        </ButtonComponent>
        <ButtonComponent variant="gradient" loading={loading} onClick={onSubmit}>
          {confirmButtonText || t('confirmation_modal.yes_button')}
        </ButtonComponent>
      </div>
    </ModalComponent>
  )
}
