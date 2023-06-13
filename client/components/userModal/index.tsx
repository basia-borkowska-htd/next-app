import { Input, useMantineTheme } from '@mantine/core'
import { UserType } from '@/types/User'
import { useForm } from '@mantine/form'
import { NumberInput, TextInput, Button, SegmentedControl } from '@mantine/core'
import { SexEnum } from '@/enums/Sex.enum'
import { ModalComponent } from '../Modal'

interface UserModalProps {
  user?: UserType
  opened: boolean

  onClose: () => void
  onSubmit: (user: UserType) => void
}

export const UserModalComponent = ({ user, opened, onClose, onSubmit }: UserModalProps) => {
  const theme = useMantineTheme()
  const isCreating = !user

  const form = useForm({
    initialValues: {
      name: user?.name || '',
      age: user?.age || 0,
      sex: user?.sex || SexEnum.WOMAN,
      height: user?.height || 0,
      weight: user?.weight,
    },

    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters' : null),
      age: (value) => (value > 17 && value < 100 ? null : 'Invalid age: acceptable values are from 18 to 99 years-old'),
      sex: (value) => (!value ? 'Sex is required' : null),
      height: (value) =>
        value > 99 && value < 301 ? null : 'Invalid height: acceptable values are from 100 cm to 300 cm',
      weight: (value) => {
        if (!value) return null
        return value > 29 && value < 301 ? null : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
      },
    },
  })

  return (
    <ModalComponent opened={opened} onClose={onClose} title={isCreating ? 'Add New User' : 'Edit User'}>
      <form onSubmit={form.onSubmit((values) => onSubmit({ _id: user?._id || '', ...values }))}>
        <TextInput label="Name" placeholder="Name" withAsterisk {...form.getInputProps('name')} />
        <NumberInput mt="sm" label="Age" placeholder="Age" min={18} max={99} {...form.getInputProps('age')} />
        <Input.Wrapper
          mt="sm"
          withAsterisk
          label="Sex"
          className="flex flex-col"
          error={form.getInputProps('sex').error}
        >
          <SegmentedControl
            data={[
              { label: 'Woman', value: 'woman' },
              { label: 'Man', value: 'man' },
            ]}
            color="blue-200"
            transitionDuration={500}
            transitionTimingFunction="linear"
            {...form.getInputProps('sex')}
          />
        </Input.Wrapper>
        <TextInput
          mt="sm"
          label="Height"
          placeholder="Height"
          withAsterisk
          rightSection={<p className="opacity-25 text-sm">cm</p>}
          {...form.getInputProps('height')}
        />
        <TextInput
          mt="sm"
          label="Weight"
          placeholder="Weight"
          rightSection={<p className="opacity-25 text-sm">kg</p>}
          {...form.getInputProps('weight')}
        />
        <Button type="submit" mt="sm" variant="gradient" gradient={{ from: 'blue-200', to: 'green-100', deg: 35 }}>
          Submit
        </Button>
      </form>
    </ModalComponent>
  )
}
