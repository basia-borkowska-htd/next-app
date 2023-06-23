import { TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'

import { ModalComponent } from '@/components/modal'
import { ButtonComponent } from '@/components/button'
import { MeasurementType } from '@/types/Measurement'

import { getInitialValues, inputValues } from './helpers'
import { MutateOptions } from '@tanstack/react-query'
import { DateTimePicker } from '@mantine/dates'
import { DEFAULT_DATE_FORMAT, dates } from '@/utils/dates'
import { useEffect } from 'react'

interface MeasurementModalProps {
  userId: string
  opened: boolean
  loading: boolean
  measurement?: MeasurementType

  onClose: () => void
  onSubmit: (
    measurement: MeasurementType,
    options?: MutateOptions<MeasurementType, unknown, MeasurementType, unknown>,
  ) => void
}

export const MeasurementModalComponent = ({
  userId,
  opened,
  loading,
  onClose,
  onSubmit,
  measurement,
}: MeasurementModalProps) => {
  const isCreating = !measurement
  const initialValues = getInitialValues(measurement)
  console.log({ onSubmit })
  const {
    onSubmit: onSubmitForm,
    getInputProps,
    setFieldValue,
    reset,
    setValues,
  } = useForm({
    initialValues: measurement || initialValues,
    validate: {
      // weight: ({ value }: { value: number }) => {
      //   if (!value) return undefined
      //   return value > 29 && value < 301 ? undefined : 'Invalid weight: acceptable values are from 30 kg to 300 kg'
      // },
    },
  })

  useEffect(() => {
    setValues(getInitialValues(measurement))
  }, [measurement])

  const resetAndClose = () => {
    reset()
    onClose()
  }

  return (
    <ModalComponent
      opened={opened}
      onClose={resetAndClose}
      title={isCreating ? 'Add New Measurement' : 'Edit New Measurement'}
      size="xl"
    >
      <form
        onSubmit={onSubmitForm((values) => {
          console.log(values)
          onSubmit(
            { _id: measurement?._id || '', userId, ...values },
            {
              onSuccess: resetAndClose,
            },
          )
        })}
      >
        <div className="grid grid-cols-2 grid-flow-row gap-4">
          {inputValues.map(({ value, label, placeholder, rightSection }, idx) => {
            return (
              <TextInput
                key={`modal-input-${value}-${idx}`}
                label={label}
                placeholder={placeholder}
                rightSection={rightSection}
                {...getInputProps(`${value}.value`)}
              />
            )
          })}
          <DateTimePicker
            valueFormat={DEFAULT_DATE_FORMAT}
            label="Date and time"
            placeholder="09 Jun 2023, 16:30"
            value={dates.fromISOToDate(getInputProps('date').value)}
            onChange={(date) => setFieldValue('date', dates.fromDateToISO(date))}
          />
        </div>
        <ButtonComponent className="mt-6" loading={loading} type="submit" variant="gradient">
          Submit
        </ButtonComponent>
      </form>
    </ModalComponent>
  )
}
