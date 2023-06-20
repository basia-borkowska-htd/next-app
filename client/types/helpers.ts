import { UnitEnum } from '@/enums/Unit.enum'

export type RecordType = {
  value?: number
  unit: UnitEnum
}

export type RangeType = {
  min?: number
  max?: number
  unit: UnitEnum
}
