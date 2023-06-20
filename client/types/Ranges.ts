import { SexEnum } from '@/enums/Sex.enum'
import { UnitEnum } from '@/enums/Unit.enum'
import { RangeType } from './helpers'

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
