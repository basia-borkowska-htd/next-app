import { MeasurementEnum, MeasurementLabels } from '@/enums/Measurement.enum'
import { UnitEnum } from '@/enums/Unit.enum'
import dayjs from 'dayjs'
import { ReactNode } from 'react'

type InputValuesType = {
  value: MeasurementEnum
  placeholder: string
  rightSection?: ReactNode
}[]

export const initialValues = {
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

export const inputValues: InputValuesType = [
  {
    value: MeasurementEnum.WEIGHT,
    placeholder: '66',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  {
    value: MeasurementEnum.BODY_FAT,
    placeholder: '30',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  {
    value: MeasurementEnum.VISCERAL_FAT,
    placeholder: '5',
  },
  {
    value: MeasurementEnum.MUSCLES,
    placeholder: '20',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  {
    value: MeasurementEnum.PROTEIN,
    placeholder: '15',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  {
    value: MeasurementEnum.WATER,
    placeholder: '55',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  {
    value: MeasurementEnum.BONE_TISSUE,
    placeholder: '3',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  {
    value: MeasurementEnum.BMI,
    placeholder: '24.3',
  },
  {
    value: MeasurementEnum.BMR,
    placeholder: '1770',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KCAL}</p>,
  },
  {
    value: MeasurementEnum.METABOLIC_AGE,
    placeholder: '19',
  },
  {
    value: MeasurementEnum.BODY_RATING,
    placeholder: '95',
  },
]
