import { api } from '@/api'
import { Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDotsVertical, IconLogout, IconPencil, IconTrash, IconUserPlus } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import React from 'react'

import { queryClient } from '@/pages/_app'

import { ErrorComponent } from '@/components/error'
import { GroupFormComponent } from '@/components/groupForm'
import { ConfirmationModalComponent } from '@/components/modals/confirmationModal'
import { ModalComponent } from '@/components/modals/modal'

import { useTranslate } from '@/hooks/useTranslate'

import { GroupType, UpdateGroupType } from '@/types/Group'

import { notify } from '@/utils/notifications'

interface OptionsProps {
  group: GroupType
}
export const OptionsComponent = ({ group }: OptionsProps) => {
  const { t } = useTranslate()
  const { data: session } = useSession()
  const [isLeaveModalOpen, { open: openLeaveModal, close: closeLeaveModal }] = useDisclosure()
  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure()
  const [isEditModalOpen, { open: openEditModal, close: closeEditModal }] = useDisclosure()

  const leaveGroupMutation = useMutation({
    mutationFn: () => api.group.removeGroupMember(group._id, session.user._id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true })
      closeLeaveModal()
      notify({ type: 'success', message: t('group.options.leave_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('group.options.leave_error') })
    },
  })

  const editGroupMutation = useMutation({
    mutationFn: (updateGroup: UpdateGroupType) => api.group.updateGroup(updateGroup),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true })
      closeEditModal()
      notify({ type: 'success', message: t('users.edit_group.success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('users.edit_group.error') })
    },
  })

  const deleteGroupMutation = useMutation({
    mutationFn: () => api.group.deleteGroup(group._id),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true })
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
          <Menu.Item icon={<IconPencil size={16} />} onClick={openEditModal}>
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

      <ModalComponent opened={isEditModalOpen} onClose={closeEditModal} title={t('users.edit_group.title')}>
        <GroupFormComponent loading={editGroupMutation.isLoading} onSubmit={editGroupMutation.mutate} group={group} />
      </ModalComponent>

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
