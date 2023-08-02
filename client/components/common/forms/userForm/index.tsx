import { Input, NumberInput, SegmentedControl, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconTrash } from '@tabler/icons-react'
import { MutateOptions } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { useTranslate } from '@/hooks/useTranslate'

import { UpdateUserType, UserType } from '@/types/User'

import { UnitEnum } from '@/enums/Unit.enum'

import { getInitialValues, validate } from './helpers'

const AvatarComponent = dynamic(() =>
  import('@/components/common/avatar').then((component) => component.AvatarComponent),
)
const ButtonComponent = dynamic(() =>
  import('@/components/common/button').then((component) => component.ButtonComponent),
)
const FileUploaderComponent = dynamic(() =>
  import('@/components/common/fileUploader').then((component) => component.FileUploaderComponent),
)

interface UserModalProps {
  email: string
  user?: UserType
  loading: boolean

  onSubmit: (user: UpdateUserType, options?: MutateOptions<UpdateUserType, unknown, UpdateUserType, unknown>) => void
}

export const UserFormComponent = ({ user, email, loading, onSubmit }: UserModalProps) => {
  const [avatarFile, setAvatarFile] = useState<File>()
  const initialValues = getInitialValues(user)
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
    setValues({ ...user })
  }, [user])

  const handleChange = async (file: File | undefined) => {
    if (!file) return

    const url = URL.createObjectURL(file)
    setFieldValue('avatarUrl', url)
    setAvatarFile(file)
  }

  return (
    <form
      onSubmit={onSubmitForm((values) => {
        onSubmit(
          { _id: user?._id || '', email, avatarFile, ...values },
          {
            onSuccess: reset,
          },
        )
      })}
    >
      <div className="flex items-end mb-4">
        <AvatarComponent src={getInputProps('avatarUrl').value} centered={false} />
        <div className="flex flex-col">
          <FileUploaderComponent message={t('user_modal.upload_button')} handleChange={handleChange} />
          {!!getInputProps('avatarUrl').value && (
            <ButtonComponent
              variant="icon"
              className="text-red-600 flex"
              leftIcon={<IconTrash size={22} />}
              fullWidth={false}
              onClick={() => {
                setFieldValue('avatarUrl', '')
              }}
            >
              {t('user_modal.remove_button')}
            </ButtonComponent>
          )}
        </div>
      </div>
      <TextInput
        label={t('user_modal.name')}
        placeholder={t('user_modal.placeholders.name')}
        withAsterisk
        {...getInputProps('name')}
      />
      <NumberInput
        mt="sm"
        label={t('user_modal.age')}
        placeholder={t('user_modal.placeholders.age')}
        min={18}
        max={99}
        {...getInputProps('age')}
      />
      <Input.Wrapper
        mt="sm"
        withAsterisk
        label={t('user_modal.sex.label')}
        className="flex flex-col"
        error={getInputProps('sex').error}
      >
        <SegmentedControl
          data={[
            { label: t('user_modal.sex.woman'), value: 'woman' },
            { label: t('user_modal.sex.man'), value: 'man' },
          ]}
          color="blue-200"
          transitionDuration={500}
          transitionTimingFunction="linear"
          {...getInputProps('sex')}
        />
      </Input.Wrapper>
      <TextInput
        mt="sm"
        label={t('user_modal.height')}
        placeholder={t('user_modal.placeholders.height')}
        withAsterisk
        rightSection={<p className="opacity-25 text-sm">{UnitEnum.CENTIMETERS}</p>}
        {...getInputProps('height.value')}
      />
      <TextInput
        mt="sm"
        mb="xl"
        label={t('user_modal.weight')}
        placeholder={t('user_modal.placeholders.weight')}
        rightSection={<p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>}
        {...getInputProps('weight.value')}
      />
      <ButtonComponent loading={loading} type="submit" variant="gradient">
        {t('user_modal.submit_button')}
      </ButtonComponent>
    </form>
  )
}
