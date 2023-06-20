import { UnitEnum } from '@/enums/Unit.enum'
import { ReactNode } from 'react'

type InputValuesType = {
  [key: string]: {
    value: string
    label: string
    placeholder: string
    rightSection?: ReactNode
  }
}

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
}

export const inputValues: InputValuesType = {
  weight: {
    value: 'weight',
    label: 'Weight',
    placeholder: '66',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  bodyFat: {
    value: 'bodyFat',
    label: 'Body Fat',
    placeholder: '30',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  visceralFat: {
    value: 'visceralFat',
    label: 'Visceral Fat',
    placeholder: '5',
  },
  muscles: {
    value: 'muscles',
    label: 'Muscles',
    placeholder: '20',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  protein: {
    value: 'protein',
    label: 'Protein',
    placeholder: '15',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  water: {
    value: 'water',
    label: 'Water',
    placeholder: '55',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  boneTissue: {
    value: 'boneTissue',
    label: 'Bone Tissue',
    placeholder: '3',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  BMI: {
    value: 'BMI',
    label: 'BMI',
    placeholder: '24.3',
  },
  BMR: {
    value: 'BMR',
    label: 'BMR',
    placeholder: '1770',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KCAL}</p>,
  },
  metabolicAge: {
    value: 'metabolicAge',
    label: 'Metabolic Age',
    placeholder: '19',
  },
}
