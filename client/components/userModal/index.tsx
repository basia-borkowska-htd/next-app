import { NumberInput, TextInput, Input, SegmentedControl } from '@mantine/core'
import { useForm } from '@mantine/form'

import { UpdateUserType, UserType } from '@/types/User'
import { SexEnum } from '@/enums/Sex.enum'

import { ModalComponent } from '../modal'
import { ButtonComponent } from '../button'
import { UnitEnum } from '@/enums/Unit.enum'
import { MutateOptions } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { AvatarComponent } from '../avatar'
import { FileUploaderComponent } from '../fileUploader'
import { IconTrash } from '@tabler/icons-react'
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
      name: ({ length }) => (length < 2 ? 'Name must be at least 2 characters' : undefined),
      age: (age) => (age > 17 && age < 100 ? undefined : 'Invalid age: acceptable values are from 18 to 99 years-old'),
      sex: (sex) => (!sex ? 'Sex is required' : undefined),
      height: (height) => {
        if (!height || !height?.value) return undefined
        return height?.value > 99 && height?.value < 301
          ? undefined
          : 'Invalid height: acceptable values are from 100 cm to 300 cm'
      },
      weight: (weight) => {
        if (!weight || !weight?.value) return undefined
        return weight.value < 301 ? undefined : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
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
