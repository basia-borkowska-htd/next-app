export enum MeasurementEnum {
  WEIGHT = 'weight',
  BODY_FAT = 'bodyFat',
  VISCERAL_FAT = 'visceralFat',
  MUSCLES = 'muscles',
  PROTEIN = 'protein',
  WATER = 'water',
  BONE_TISSUE = 'boneTissue',
  BMI = 'BMI',
  BMR = 'BMR',
  METABOLIC_AGE = 'metabolicAge',
  BODY_RATING = 'bodyRating',
}

export const MeasurementLabels = {
  [MeasurementEnum.WEIGHT]: 'Weight',
  [MeasurementEnum.BODY_FAT]: 'Body Fat',
  [MeasurementEnum.VISCERAL_FAT]: 'Visceral Fat',
  [MeasurementEnum.MUSCLES]: 'Muscles',
  [MeasurementEnum.PROTEIN]: 'Protein',
  [MeasurementEnum.WATER]: 'Water',
  [MeasurementEnum.BONE_TISSUE]: 'Bone Tissue',
  [MeasurementEnum.BMI]: 'BMI',
  [MeasurementEnum.BMR]: 'BMR',
  [MeasurementEnum.METABOLIC_AGE]: 'Metabolic Age',
  [MeasurementEnum.BODY_RATING]: 'Body Rating',
}
