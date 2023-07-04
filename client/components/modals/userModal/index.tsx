import { Input, NumberInput, SegmentedControl, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconTrash } from '@tabler/icons-react'
import { MutateOptions } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

import { AvatarComponent } from '@/components/avatar'
import { ButtonComponent } from '@/components/button'
import { FileUploaderComponent } from '@/components/fileUploader'
import { ModalComponent } from '@/components/modals/modal'

import { useTranslate } from '@/hooks/useTranslate'

import { UpdateUserType, UserType } from '@/types/User'

import { SexEnum } from '@/enums/Sex.enum'
import { UnitEnum } from '@/enums/Unit.enum'

interface UserModalProps {
  user?: UserType
  opened: boolean
  loading: boolean

  onClose: () => void
  onSubmit: (user: UpdateUserType, options?: MutateOptions<UpdateUserType, unknown, UpdateUserType, unknown>) => void
}

export const UserModalComponent = ({ user, opened, loading, onClose, onSubmit }: UserModalProps) => {
  const isCreating = !user
  const [avatarFile, setAvatarFile] = useState<File>()
  const { t } = useTranslate()

  const {
    onSubmit: onSubmitForm,
    reset,
    getInputProps,
    setValues,
    setFieldValue,
  } = useForm({
    initialValues: {
      name: user?.name || '',
      age: user?.age || 0,
      sex: user?.sex || SexEnum.WOMAN,
      height: user?.height || { value: undefined, unit: UnitEnum.CENTIMETERS },
      weight: user?.weight || { value: undefined, unit: UnitEnum.KILOS },
      avatarUrl: user?.avatarUrl || '',
    },

    validate: {
      name: ({ length }) => (length < 2 ? t('user_modal.validate.name') : undefined),
      age: (age) => (age > 17 && age < 100 ? undefined : t('user_modal.validate.age')),
      sex: (sex) => (!sex ? t('user_modal.validate.sex') : undefined),
      height: (height) => {
        if (!height || !height?.value) return undefined
        return height?.value > 99 && height?.value < 301 ? undefined : t('user_modal.validate.height')
      },
      weight: (weight) => {
        if (!weight || !weight?.value) return undefined
        return weight.value < 301 ? undefined : t('user_modal.validate.weight')
      },
    },
  })

  useEffect(() => {
    setValues({ ...user })
  }, [user])

  const resetAndClose = () => {
    reset()
    onClose()
  }

  const handleChange = async (file: File | undefined) => {
    if (!file) return

    const url = URL.createObjectURL(file)
    setFieldValue('avatarUrl', url)
    setAvatarFile(file)
  }

  return (
    <ModalComponent
      opened={opened}
      onClose={resetAndClose}
      title={isCreating ? t('user_modal.title_add_user') : t('user_modal.title_edit_user')}
    >
      <form
        onSubmit={onSubmitForm((values) => {
          onSubmit(
            { _id: user?._id || '', avatarFile, ...values },
            {
              onSuccess: resetAndClose,
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
                fullWidth={false}
                onClick={() => {
                  setFieldValue('avatarUrl', '')
                }}
              >
                <IconTrash size={22} className="mr-2" />
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
    </ModalComponent>
  )
}
