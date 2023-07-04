import { TextInput } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { MutateOptions } from '@tanstack/react-query'
import { useEffect } from 'react'

import { ButtonComponent } from '@/components/button'
import { ModalComponent } from '@/components/modal'

import { MeasurementType } from '@/types/Measurement'

import { MeasurementLabels } from '@/enums/Measurement.enum'

import { DEFAULT_DATE_FORMAT, dates } from '@/utils/dates'

import { getInitialValues, inputValues } from './helpers'

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

  const {
    onSubmit: onSubmitForm,
    getInputProps,
    setFieldValue,
    reset,
    setValues,
  } = useForm({
    initialValues,
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
      title={isCreating ? 'Add New Measurement' : 'Edit Measurement'}
      size="xl"
    >
      <form
        onSubmit={onSubmitForm((values) => {
          onSubmit(
            { _id: measurement?._id || '', userId, ...values },
            {
              onSuccess: resetAndClose,
            },
          )
        })}
      >
        <div className="grid grid-cols-2 grid-flow-row gap-4">
          {inputValues.map(({ value, placeholder, rightSection }, idx) => (
            <TextInput
              key={`modal-input-${value}-${idx}`}
              label={MeasurementLabels[value]}
              placeholder={placeholder}
              rightSection={rightSection}
              {...getInputProps(`${value}.value`)}
            />
          ))}
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
