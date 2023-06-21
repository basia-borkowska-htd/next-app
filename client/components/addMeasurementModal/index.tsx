import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { ModalComponent } from '@/components/modal'
import { ButtonComponent } from '@/components/button'
import { MeasurementType } from '@/types/Measurement'

import { initialValues, inputValues } from './helpers'
import { MutateOptions } from '@tanstack/react-query'

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
  const {
    onSubmit: onSubmitForm,
    getInputProps,
    reset,
  } = useForm({
    initialValues,
    validate: {
      weight: ({ value }) => {
        if (!value) return undefined
        return value > 29 && value < 301 ? undefined : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
      },
    },
  })

  const resetAndClose = () => {
    reset()
    onClose()
  }

  return (
    <ModalComponent opened={opened} onClose={resetAndClose} title="Add New Measurement">
      <form
        onSubmit={onSubmitForm((values) => {
          onSubmit(
            { _id: '', userId, ...values },
            {
              onSuccess: resetAndClose,
            },
          )
        })}
      >
        {inputValues.map(({ value, label, placeholder, rightSection }, idx) => (
          <TextInput
            key={`modal-input-${value}-${idx}`}
            mt="sm"
            mb="xl"
            label={label}
            placeholder={placeholder}
            rightSection={rightSection}
            {...getInputProps(`${value}.value`)}
          />
        ))}
        <ButtonComponent loading={loading} type="submit" variant="gradient">
          Submit
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}
