import { api } from '@/api'
import { useDisclosure } from '@mantine/hooks'
import { IconSettings, IconTrash } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { ButtonComponent } from '@/components/button'
import { ContainerComponent } from '@/components/container'
import { ConfirmationModalComponent } from '@/components/modals/confirmationModal'
import { SettingsModalComponent } from '@/components/modals/settingsModal'

import { useTranslate } from '@/hooks/useTranslate'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

interface SettingsProps {
  userId: string
}

export const SettingsComponent = ({ userId }: SettingsProps) => {
  const router = useRouter()
  const { t } = useTranslate()

  const [confirmationModalOpened, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false)
  const [settingsModalOpened, { open: openSettingsModal, close: closeSettingsModal }] = useDisclosure(false)

  const deleteUserMutation = useMutation({
    mutationFn: () => api.user.deleteUser(userId),
    onSuccess: async () => {
      closeConfirmationModal()
      notify({ type: 'success', message: t('user.settings.delete_user_modal.toast_success') })
      router.push(Pathnames.users)
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
