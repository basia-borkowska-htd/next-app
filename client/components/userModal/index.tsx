import { Input, NumberInput, SegmentedControl, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconTrash } from '@tabler/icons-react'
import { MutateOptions } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'

import { UpdateUserType, UserType } from '@/types/User'

import { UnitEnum } from '@/enums/Unit.enum'

import { getInitialValues, validate } from './helpers'

const ModalComponent = dynamic(() => import('@/components/modal').then((component) => component.ModalComponent))
const AvatarComponent = dynamic(() => import('@/components/avatar').then((component) => component.AvatarComponent))
const ButtonComponent = dynamic(() => import('@/components/button').then((component) => component.ButtonComponent))
const FileUploaderComponent = dynamic(() =>
  import('@/components/fileUploader').then((component) => component.FileUploaderComponent),
)

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
  const initialValues = getInitialValues(user)

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
    <ModalComponent opened={opened} onClose={resetAndClose} title={isCreating ? 'Add New User' : 'Edit User'}>
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
            <FileUploaderComponent message="Upload image" handleChange={handleChange} />
            {!!getInputProps('avatarUrl').value && (
              <ButtonComponent
                variant="icon"
                className="text-red-600"
                fullWidth={false}
                onClick={() => {
                  setFieldValue('avatarUrl', '')
                }}
              >
                <IconTrash size={22} className="mr-2" />
                Remove image
              </ButtonComponent>
            )}
          </div>
        </div>
        <TextInput label="Name" placeholder="Name" withAsterisk {...getInputProps('name')} />
        <NumberInput mt="sm" label="Age" placeholder="20" min={18} max={99} {...getInputProps('age')} />
        <Input.Wrapper mt="sm" withAsterisk label="Sex" className="flex flex-col" error={getInputProps('sex').error}>
          <SegmentedControl
            data={[
              { label: 'Woman', value: 'woman' },
              { label: 'Man', value: 'man' },
            ]}
            color="blue-200"
            transitionDuration={500}
            transitionTimingFunction="linear"
            {...getInputProps('sex')}
          />
        </Input.Wrapper>
        <TextInput
          mt="sm"
          label="Height"
          placeholder="185"
          withAsterisk
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.CENTIMETERS}</p>}
          {...getInputProps('height.value')}
        />
        <TextInput
          mt="sm"
          mb="xl"
          label="Weight"
          placeholder="66"
          rightSection={<p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>}
          {...getInputProps('weight.value')}
        />
        <ButtonComponent loading={loading} type="submit" variant="gradient">
          Submit
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}
