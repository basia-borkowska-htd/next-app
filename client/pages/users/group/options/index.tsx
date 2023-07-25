import { api } from '@/api'
import { Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDotsVertical, IconLogout, IconPencil, IconTrash, IconUserPlus } from '@tabler/icons-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'

import { ConfirmationModalComponent } from '@/components/modals/confirmationModal'

import { useTranslate } from '@/hooks/useTranslate'

import { notify } from '@/utils/notifications'

interface OptionsProps {
  id: string
}
export const OptionsComponent = ({ id }: OptionsProps) => {
  const { t } = useTranslate()
  const { data: session } = useSession()
  const [isLeaveModalOpen, { open: openLeaveModal, close: closeLeaveModal }] = useDisclosure()
  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure()

  const leaveGroupMutation = useMutation({
    mutationFn: () => api.group.removeGroupMember(id, session.user._id),
    onSuccess: () => {
      closeLeaveModal()
      notify({ type: 'success', message: t('group.options.leave_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('group.options.leave_error') })
    },
  })

  const deleteGroupMutation = useMutation({
    mutationFn: () => api.group.deleteGroup(id),
    onSuccess: async () => {
      closeDeleteModal()
      notify({ type: 'success', message: t('group.options.delete_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('group.options.delete_error') })
    },
  })

  return (
    <>
      <Menu position="left-start">
        <Menu.Target>
          <IconDotsVertical />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>{t('group.options.settings_label')}</Menu.Label>
          <Menu.Item icon={<IconUserPlus size={16} />} onClick={() => alert('TODO')}>
            {t('group.options.invite_member')}
          </Menu.Item>
          <Menu.Item icon={<IconPencil size={16} />} onClick={() => alert('TODO')}>
            {t('group.options.edit')}
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>{t('group.options.danger_zone_label')}</Menu.Label>
          <Menu.Item color="red" icon={<IconLogout size={16} />} onClick={openLeaveModal}>
            {t('group.options.leave')}
          </Menu.Item>
          <Menu.Item color="red" icon={<IconTrash size={16} />} onClick={openDeleteModal}>
            {t('group.options.delete')}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>

      <ConfirmationModalComponent
        opened={isLeaveModalOpen}
        loading={leaveGroupMutation.isLoading}
        title={t('group.options.leave')}
        description={t('group.options.leave_description')}
        onClose={closeLeaveModal}
        onSubmit={leaveGroupMutation.mutate}
      />

      <ConfirmationModalComponent
        opened={isDeleteModalOpen}
        loading={deleteGroupMutation.isLoading}
        title={t('group.options.delete')}
        description={t('group.options.delete_description')}
        onClose={closeDeleteModal}
        onSubmit={deleteGroupMutation.mutate}
      />
    </>
  )
}
