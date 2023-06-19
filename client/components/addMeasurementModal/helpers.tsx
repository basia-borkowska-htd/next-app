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
    value: null,
    unit: UnitEnum.KILOS,
  },
  bodyFat: {
    value: null,
    unit: UnitEnum.PERCENTAGE,
  },
  visceralFat: {
    value: null,
    unit: UnitEnum.NO_UNIT,
  },
  muscles: {
    value: null,
    unit: UnitEnum.KILOS,
  },
  protein: {
    value: null,
    unit: UnitEnum.PERCENTAGE,
  },
  water: {
    value: null,
    unit: UnitEnum.PERCENTAGE,
  },
  boneTissue: {
    value: null,
    unit: UnitEnum.KILOS,
  },
  BMI: {
    value: null,
    unit: UnitEnum.NO_UNIT,
  },
  BMR: {
    value: null,
    unit: UnitEnum.KCAL,
  },
  metabolicAge: {
    value: null,
    unit: UnitEnum.NO_UNIT,
  },
}

export const inputValues: InputValuesType = {
  weight: {
    value: 'weight',
    label: 'Weight',
    placeholder: 'Weight',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  bodyFat: {
    value: 'bodyFat',
    label: 'Body Fat',
    placeholder: 'Body Fat',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  visceralFat: {
    value: 'visceralFat',
    label: 'Visceral Fat',
    placeholder: 'Visceral Fat',
  },
  muscles: {
    value: 'muscles',
    label: 'Muscles',
    placeholder: 'Muscles',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  protein: {
    value: 'protein',
    label: 'Protein',
    placeholder: 'Protein',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  water: {
    value: 'water',
    label: 'Water',
    placeholder: 'Water',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.PERCENTAGE}</p>,
  },
  boneTissue: {
    value: 'boneTissue',
    label: 'Bone Tissue',
    placeholder: 'Bone Tissue',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KILOS}</p>,
  },
  BMI: {
    value: 'BMI',
    label: 'BMI',
    placeholder: 'BMI',
  },
  BMR: {
    value: 'BMR',
    label: 'BMR',
    placeholder: 'BMR',
    rightSection: <p className="opacity-25 text-sm">{UnitEnum.KCAL}</p>,
  },
  metabolicAge: {
    value: 'metabolicAge',
    label: 'Metabolic Age',
    placeholder: 'Metabolic Age',
  },
}
