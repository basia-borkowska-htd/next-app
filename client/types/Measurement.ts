import { RecordType } from './helpers'

export type MeasurementType = {
  _id: string
  userId: string
  date: string
  weight: RecordType
  bodyFat: RecordType
  visceralFat: RecordType
  muscles: RecordType
  protein: RecordType
  water: RecordType
  boneTissue: RecordType
  BMI: RecordType
  BMR: RecordType
  metabolicAge: RecordType
  bodyRating: RecordType
}
