import { useForm } from '@mantine/form'
import { MutateOptions } from '@tanstack/react-query'
import dynamic from 'next/dynamic'

import { CreatableSelectComponent } from '@/components/creatable'

import { useTranslate } from '@/hooks/useTranslate'

import { InviteMembersType } from '@/types/Group'

const ButtonComponent = dynamic(() => import('@/components/button').then((component) => component.ButtonComponent))

interface InviteGroupMembersFormProps {
  groupId: string
  inviterId: string
  loading: boolean

  onSubmit: (
    invitations: InviteMembersType,
    options?: MutateOptions<boolean, unknown, InviteMembersType, unknown>,
  ) => void
}

export const InviteGroupMembersFormComponent = ({
  groupId,
  inviterId,
  loading,
  onSubmit,
}: InviteGroupMembersFormProps) => {
  const { t } = useTranslate()

  const {
    onSubmit: onSubmitForm,
    reset,
    getInputProps,
    setFieldValue,
  } = useForm({
    initialValues: { emails: [] },
  })

  return (
    <form
      onSubmit={onSubmitForm((values) => {
        onSubmit(
          { groupId, inviterId, ...values },
          {
            onSuccess: reset,
          },
        )
      })}
    >
      <CreatableSelectComponent
        className="my-4"
        placeholder={t('group_modal.placeholders.users')}
        values={getInputProps('emails').value}
        setValues={(newValue: string) => setFieldValue('emails', [...getInputProps('emails').value, newValue])}
      />
      <ButtonComponent loading={loading} type="submit" variant="gradient">
        {t('group_modal.submit_button')}
      </ButtonComponent>
    </form>
  )
}
