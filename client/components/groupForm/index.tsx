import { Input, SegmentedControl, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconTrash } from '@tabler/icons-react'
import { MutateOptions } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { CreatableSelectComponent } from '@/components/creatable'

import { useTranslate } from '@/hooks/useTranslate'

import { AddGroupType, GroupType } from '@/types/Group'

import { VisibilityEnum } from '@/enums/Visibility.enum'

import { getInitialValues, validate } from './helpers'

const AvatarComponent = dynamic(() => import('@/components/avatar').then((component) => component.AvatarComponent))
const ButtonComponent = dynamic(() => import('@/components/button').then((component) => component.ButtonComponent))
const FileUploaderComponent = dynamic(() =>
  import('@/components/fileUploader').then((component) => component.FileUploaderComponent),
)

interface GroupModalProps {
  group?: GroupType
  loading: boolean
  creatorId?: string
  onSubmit: (group: AddGroupType, options?: MutateOptions<GroupType, unknown, AddGroupType, unknown>) => void
}

export const GroupFormComponent = ({ group, loading, onSubmit, creatorId }: GroupModalProps) => {
  const [photoFile, setPhotoFile] = useState<File>()
  const initialValues = getInitialValues(group)
  const { t } = useTranslate()

  const {
    onSubmit: onSubmitForm,
    reset,
    getInputProps,
    setValues,
    setFieldValue,
  } = useForm({
    initialValues,
    validate,
  })

  useEffect(() => {
    setValues({ ...group })
  }, [group])

  const handleChange = async (file: File | undefined) => {
    if (!file) return

    const url = URL.createObjectURL(file)

    setFieldValue('photoUrl', url)
    setPhotoFile(file)
  }

  return (
    <form
      onSubmit={onSubmitForm((values) => {
        onSubmit(
          { _id: group?._id || '', photoFile, ...values, creatorId },
          {
            onSuccess: reset,
          },
        )
      })}
    >
      <div className="flex items-end mb-4">
        <AvatarComponent src={getInputProps('photoUrl').value} centered={false} isGroup />
        <div className="flex flex-col">
          <FileUploaderComponent message={t('user_modal.upload_button')} handleChange={handleChange} />
          {!!getInputProps('photoUrl').value && (
            <ButtonComponent
              variant="icon"
              className="text-red-600 flex"
              leftIcon={<IconTrash size={22} />}
              fullWidth={false}
              onClick={() => {
                setFieldValue('photoUrl', '')
              }}
            >
              {t('group_modal.remove_button')}
            </ButtonComponent>
          )}
        </div>
      </div>
      <TextInput
        label={t('group_modal.name')}
        placeholder={t('group_modal.placeholders.name')}
        withAsterisk
        {...getInputProps('name')}
      />
      <Input.Wrapper
        label={t('group_modal.visibility.label')}
        mt="sm"
        className="flex flex-col"
        error={getInputProps('visibility').error}
        withAsterisk
      >
        <SegmentedControl
          data={[
            { label: t('group_modal.visibility.private'), value: VisibilityEnum.PRIVATE },
            { label: t('group_modal.visibility.public'), value: VisibilityEnum.PUBLIC },
          ]}
          color="blue-200"
          transitionDuration={500}
          transitionTimingFunction="linear"
          {...getInputProps('visibility')}
        />
      </Input.Wrapper>
      <CreatableSelectComponent
        className="my-4"
        label={t('group_modal.labels.users')}
        placeholder={t('group_modal.placeholders.users')}
        values={getInputProps('invitations').value}
        setValues={(newValue: string) =>
          setFieldValue('invitations', [...getInputProps('invitations').value, newValue])
        }
      />
      <ButtonComponent loading={loading} type="submit" variant="gradient">
        {t('group_modal.submit_button')}
      </ButtonComponent>
    </form>
  )
}
