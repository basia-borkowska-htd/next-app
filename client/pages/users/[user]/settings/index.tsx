import { api } from '@/api'
import { useDisclosure } from '@mantine/hooks'
import { IconSettings, IconTrash } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { ButtonComponent } from '@/components/button'
import { ContainerComponent } from '@/components/container'
import { ConfirmationModalComponent } from '@/components/modals/confirmationModal'
import { SettingsModalComponent } from '@/components/modals/settingsModal'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

interface SettingsProps {
  userId: string
}

export const SettingsComponent = ({ userId }: SettingsProps) => {
  const router = useRouter()

  const [confirmationModalOpened, { open: openConfirmationModal, close: closeConfirmationModal }] = useDisclosure(false)
  const [settingsModalOpened, { open: openSettingsModal, close: closeSettingsModal }] = useDisclosure(false)

  const deleteUserMutation = useMutation({
    mutationFn: () => api.user.deleteUser(userId),
    onSuccess: async () => {
      closeConfirmationModal()
      notify({ type: 'success', message: 'User deleted successfully' })
      router.push(Pathnames.home)
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to delete user' })
    },
  })

  return (
    <ContainerComponent className="flex justify-center">
      <div className="flex flex-col  items-start mb-8">
        <ButtonComponent variant="icon" fullWidth={false} onClick={openSettingsModal}>
          <IconSettings size={22} className="mr-2" />
          Settings
        </ButtonComponent>
        <ButtonComponent variant="icon" className="text-red-600" fullWidth={false} onClick={openConfirmationModal}>
          <IconTrash size={22} className="mr-2" />
          Delete account
        </ButtonComponent>
      </div>

      <ConfirmationModalComponent
        opened={confirmationModalOpened}
        loading={deleteUserMutation.isLoading}
        title="Delete user"
        description="Are you sure you want to delete this user and all of their measurements? This action is irreversible."
        confirmButtonText="Delete"
        declineButtonText="Cancel"
        onClose={closeConfirmationModal}
        onSubmit={deleteUserMutation.mutate}
      />

      <SettingsModalComponent
        opened={settingsModalOpened}
        loading={false}
        onClose={closeSettingsModal}
        onSubmit={() => {
          // eslint-disable-next-line no-alert
          alert('saved')
        }}
      />
    </ContainerComponent>
  )
}
