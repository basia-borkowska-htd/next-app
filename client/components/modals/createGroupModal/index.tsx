import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'

import { queryClient } from '@/pages/_app'

import { InviteGroupMembersFormComponent } from '@/components/forms/inviteGroupMembersForm'
import { ModalComponent } from '@/components/modals/modal'

import { useTranslate } from '@/hooks/useTranslate'

import { AddGroupType, InviteMembersType } from '@/types/Group'

import { StepEnum } from '@/enums/Step.enum'

import { notify } from '@/utils/notifications'

import { GroupFormComponent } from '../../forms/groupForm'
import { StepperComponent } from './Stepper'

interface CreateGroupModalProps {
  opened: boolean
  creatorId: string
  close: () => void
}
export const CreateGroupModalComponent = ({ opened, close, creatorId }: CreateGroupModalProps) => {
  const { t } = useTranslate()
  const [step, setStep] = useState(StepEnum.STEP_1)
  const [groupId, setGroupId] = useState('')

  const createGroupMutation = useMutation({
    mutationFn: (group: AddGroupType) => api.group.createGroup(group),
    onSuccess: async ({ _id }) => {
      await queryClient.refetchQueries({ stale: true })
      notify({ type: 'success', message: t('users.create_group.success') })
      setGroupId(_id)
      setStep(StepEnum.STEP_2)
    },
    onError: () => {
      notify({ type: 'error', message: t('users.create_group.error') })
    },
  })

  const inviteMembersMutation = useMutation({
    mutationFn: (invitations: InviteMembersType) => api.group.inviteMembers(invitations),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true })
      notify({ type: 'success', message: t('users.invite_members.success') })
      close()
    },
    onError: () => {
      notify({ type: 'error', message: t('users.invite_members.error') })
    },
  })

  return (
    <ModalComponent opened={opened} onClose={close} title={t('users.create_group.title')}>
      <StepperComponent active={step} />

      {step === StepEnum.STEP_1 && (
        <GroupFormComponent
          loading={createGroupMutation.isLoading}
          onSubmit={createGroupMutation.mutate}
          creatorId={creatorId}
        />
      )}

      {step === StepEnum.STEP_2 && (
        <InviteGroupMembersFormComponent
          groupId={groupId}
          loading={inviteMembersMutation.isLoading}
          onSubmit={inviteMembersMutation.mutate}
        />
      )}
    </ModalComponent>
  )
}
