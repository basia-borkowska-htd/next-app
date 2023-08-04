import { MeasurementsNoteEnum } from '@/enums/MeasurementNote.enum'

import { RecordType } from './helpers'

export type MeasurementType = {
  _id: string
  userId: string
  date: string
  notes: MeasurementsNoteEnum[]
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
