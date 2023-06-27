import { Input, NumberInput, SegmentedControl, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { MutateOptions } from '@tanstack/react-query'
import { useEffect } from 'react'

import { SexEnum } from '@/enums/Sex.enum'
import { UnitEnum } from '@/enums/Unit.enum'
import { UserType } from '@/types/User'

import { ButtonComponent } from '../button'
import { ModalComponent } from '../modal'

interface UserModalProps {
  // eslint-disable-next-line react/require-default-props
  user?: UserType
  opened: boolean
  loading: boolean

  onClose: () => void
  onSubmit: (user: UserType, options?: MutateOptions<UserType, unknown, UserType, unknown>) => void
}

export const UserModalComponent = ({ user, opened, loading, onClose, onSubmit }: UserModalProps) => {
  const isCreating = !user

  const {
    onSubmit: onSubmitForm,
    reset,
    getInputProps,
    setValues,
  } = useForm({
    initialValues: {
      name: user?.name || '',
      age: user?.age || 0,
      sex: user?.sex || SexEnum.WOMAN,
      height: user?.height || { value: undefined, unit: UnitEnum.CENTIMETERS },
      weight: user?.weight || { value: undefined, unit: UnitEnum.KILOS },
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

  return (
    <ModalComponent opened={opened} onClose={resetAndClose} title={isCreating ? 'Add New User' : 'Edit User'}>
      <form
        onSubmit={onSubmitForm((values) => {
          onSubmit(
            { _id: user?._id || '', ...values },
            {
              onSuccess: resetAndClose,
            },
          )
        })}
      >
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
