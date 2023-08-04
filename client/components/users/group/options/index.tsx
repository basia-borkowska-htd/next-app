import { api } from '@/api'
import { Menu } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconDotsVertical, IconLogout, IconPencil, IconTrash, IconUserPlus } from '@tabler/icons-react'
import { useMutation } from '@tanstack/react-query'
import React from 'react'

import { queryClient } from '@/pages/_app'

import { GroupFormComponent } from '@/components/common/forms/groupForm'
import { InviteGroupMembersFormComponent } from '@/components/common/forms/inviteGroupMembersForm'
import { ConfirmationModalComponent } from '@/components/common/modals/confirmationModal'
import { ModalComponent } from '@/components/common/modals/modal'

import { useTranslate } from '@/hooks/useTranslate'

import { GroupType, InviteMembersType, UpdateGroupType } from '@/types/Group'

import { notify } from '@/utils/notifications'
import { customStorage } from '@/utils/storage'

interface OptionsProps {
  group: GroupType
}
export const OptionsComponent = ({ group }: OptionsProps) => {
  const { t } = useTranslate()
  const user = customStorage().getSession()
  const [isLeaveModalOpen, { open: openLeaveModal, close: closeLeaveModal }] = useDisclosure()
  const [isDeleteModalOpen, { open: openDeleteModal, close: closeDeleteModal }] = useDisclosure()
  const [isEditModalOpen, { open: openEditModal, close: closeEditModal }] = useDisclosure()
  const [isInviteModalOpen, { open: openInviteModal, close: closeInviteModal }] = useDisclosure()

  const inviteMembersMutation = useMutation({
    mutationFn: (invitations: InviteMembersType) => api.group.inviteMembers(invitations),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true })
      notify({ type: 'success', message: t('users.invite_members.success') })
      closeInviteModal()
    },
    onError: () => {
      notify({ type: 'error', message: t('users.invite_members.error') })
    },
  })

  const leaveGroupMutation = useMutation({
    mutationFn: () => api.group.removeGroupMember(group._id, user._id),
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
          <Menu.Item icon={<IconUserPlus size={16} />} onClick={openInviteModal}>
            {t('group.options.invite_members')}
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

      <ModalComponent opened={isInviteModalOpen} onClose={closeInviteModal} title={t('users.invite_members.title')}>
        <InviteGroupMembersFormComponent
          groupId={group._id}
          inviterId={user._id}
          loading={inviteMembersMutation.isLoading}
          onSubmit={inviteMembersMutation.mutate}
        />
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
