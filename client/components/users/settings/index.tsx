import { api } from '@/api'
import { useDisclosure } from '@mantine/hooks'
import { IconSettings, IconTrash } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'

import { ButtonComponent } from '@/components/common/button'
import { ContainerComponent } from '@/components/common/container'
import { ConfirmationModalComponent } from '@/components/common/modals/confirmationModal'
import { SettingsModalComponent } from '@/components/common/modals/settingsModal'

import { useTranslate } from '@/hooks/useTranslate'

import { customSignOut } from '@/utils/customSignOut'
import { notify } from '@/utils/notifications'

interface SettingsProps {
  userId: string
}

export const SettingsComponent = ({ userId }: SettingsProps) => {
  const { t } = useTranslate()

  const [confirmationModalOpened, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false)
  const [settingsModalOpened, { open: openSettingsModal, close: closeSettingsModal }] = useDisclosure(false)

  const deleteUserMutation = useMutation({
    mutationFn: () => api.user.deleteUser(userId),
    onSuccess: async () => {
      closeConfirmationModal()
      notify({ type: 'success', message: t('user.settings.delete_user_modal.toast_success') })
      customSignOut()
    },
    onError: () => {
      notify({ type: 'error', message: t('user.settings.delete_user_modal.toast_error') })
    },
  })

  return (
    <ContainerComponent className="flex justify-center">
      <div className="flex flex-col  items-start mb-8">
        <ButtonComponent
          variant="icon"
          leftIcon={<IconSettings size={22} />}
          fullWidth={false}
          onClick={openSettingsModal}
        >
          {t('user.settings.settings_button')}
        </ButtonComponent>
        <ButtonComponent
          variant="icon"
          leftIcon={<IconTrash size={22} />}
          className="text-red-600"
          fullWidth={false}
          onClick={openConfirmationModal}
        >
          {t('user.settings.delete_user_button')}
        </ButtonComponent>
      </div>

      <ConfirmationModalComponent
        opened={confirmationModalOpened}
        loading={deleteUserMutation.isLoading}
        title={t('user.settings.delete_user_modal.title')}
        description={t('user.settings.delete_user_modal.message')}
        confirmButtonText={t('user.settings.delete_user_modal.delete_button')}
        declineButtonText={t('user.settings.delete_user_modal.cancel_button')}
        onClose={closeConfirmationModal}
        onSubmit={deleteUserMutation.mutate}
      />

      <SettingsModalComponent opened={settingsModalOpened} onClose={closeSettingsModal} />
    </ContainerComponent>
  )
}
