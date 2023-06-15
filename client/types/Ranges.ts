import { SexEnum } from '@/enums/Sex.enum'
import { UnitEnum } from '@/enums/Unit.enum'

type RangeType = {
  min?: number
  max?: number
  unit: UnitEnum
}

export type RangesType = {
  _id: string
  sex: SexEnum
  weight: RangeType
  bodyFat: RangeType
  visceralFat: RangeType
  muscles: RangeType
  protein: RangeType
  water: RangeType
  boneTissue: RangeType
  BMI: RangeType
  BMR: RangeType
  metabolicAge: RangeType
}
