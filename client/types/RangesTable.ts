import { MeasurementType } from './Measurement'
import { RangesType } from './Ranges'

export interface RangesTable {
  latestMeasurement: MeasurementType
  rangesList: RangesType
}
