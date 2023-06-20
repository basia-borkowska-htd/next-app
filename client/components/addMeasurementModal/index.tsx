import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { ModalComponent } from '@/components/modal'
import { ButtonComponent } from '@/components/button'
import { MeasurementType } from '@/types/Measurement'

import { initialValues, inputValues } from './helpers'
import { MutateOptions, MutationOptions } from 'react-query'

interface AddMeasurementModalProps {
  userId: string
  opened: boolean
  loading: boolean

  onClose: () => void
  onSubmit: (
    measurement: MeasurementType,
    options?: MutateOptions<MeasurementType, unknown, MeasurementType, unknown>,
  ) => void
}

export const AddMeasurementModalComponent = ({
  userId,
  opened,
  loading,
  onClose,
  onSubmit,
}: AddMeasurementModalProps) => {
  const form = useForm({
    initialValues,
    validate: {
      weight: ({ value }) => {
        if (!value) return null
        return value > 29 && value < 301 ? null : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
      },
    },
  })

  const handleSubmit = () => {
    form.onSubmit((values) => {
      onSubmit(
        { _id: '', userId, ...values },
        {
          onSuccess: () => {
            form.reset()
          },
        },
      )
    })
  }

  return (
    <ModalComponent opened={opened} onClose={onClose} title="Add New Measurement">
      <form onSubmit={handleSubmit}>
        {Object.keys(inputValues).map((key: string, idx) => (
          <TextInput
            key={`modal-input-${inputValues[key].value}-${idx}`}
            mt="sm"
            mb="xl"
            label={inputValues[key].label}
            placeholder={inputValues[key].placeholder}
            rightSection={inputValues[key].rightSection}
            {...form.getInputProps(`${inputValues[key].value}.value`)}
          />
        ))}
        <ButtonComponent loading={loading} type="submit" variant="gradient">
          Submit
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}
