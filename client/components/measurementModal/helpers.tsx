import { UnitEnum } from '@/enums/Unit.enum'
import { MeasurementType } from '@/types/Measurement'
import dayjs from 'dayjs'
import { omit } from 'lodash'
import { ReactNode } from 'react'

type InputValuesType = {
  value: string
  label: string
  placeholder: string
  rightSection?: ReactNode
}[]

export const getInitialValues = (measurement: MeasurementType | undefined) => {
  if (measurement) return omit(measurement, ['userId', '_id'])

  return {
    weight: {
      value: undefined,
      unit: UnitEnum.KILOS,
    },
    bodyFat: {
      value: undefined,
      unit: UnitEnum.PERCENTAGE,
    },
    visceralFat: {
      value: undefined,
      unit: UnitEnum.NO_UNIT,
    },
    muscles: {
      value: undefined,
      unit: UnitEnum.KILOS,
    },
    protein: {
      value: undefined,
      unit: UnitEnum.PERCENTAGE,
    },
    water: {
      value: undefined,
      unit: UnitEnum.PERCENTAGE,
    },
    boneTissue: {
      value: undefined,
      unit: UnitEnum.KILOS,
    },
    BMI: {
      value: undefined,
      unit: UnitEnum.NO_UNIT,
    },
    BMR: {
      value: undefined,
      unit: UnitEnum.KCAL,
    },
    metabolicAge: {
      value: undefined,
      unit: UnitEnum.NO_UNIT,
    },
    bodyRating: {
      value: undefined,
      unit: UnitEnum.NO_UNIT,
    },
    date: dayjs().toISOString(),
  }
}

export const inputValues: InputValuesType = [
  {
    value: 'weight',
    label: 'Weight',
    placeholder: '66',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  {
    value: 'bodyFat',
    label: 'Body Fat',
    placeholder: '30',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  {
    value: 'visceralFat',
    label: 'Visceral Fat',
    placeholder: '5',
  },
  {
    value: 'muscles',
    label: 'Muscles',
    placeholder: '20',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  {
    value: 'protein',
    label: 'Protein',
    placeholder: '15',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  {
    value: 'water',
    label: 'Water',
    placeholder: '55',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  {
    value: 'boneTissue',
    label: 'Bone Tissue',
    placeholder: '3',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  {
    value: 'BMI',
    label: 'BMI',
    placeholder: '24.3',
  },
  {
    value: 'BMR',
    label: 'BMR',
    placeholder: '1770',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KCAL}</p>,
  },
  {
    value: 'metabolicAge',
    label: 'Metabolic Age',
    placeholder: '19',
  },
  {
    value: 'bodyRating',
    label: 'Body Rating',
    placeholder: '95',
  },
]
