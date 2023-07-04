import { TranslationKey } from '@/lang/flattenMessages'

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

export const getMeasurementLabel = (key: MeasurementEnum, t: (key: TranslationKey) => string) => {
  switch (key) {
    case MeasurementEnum.WEIGHT:
      return t('measurement_labels.weight')
    case MeasurementEnum.BODY_FAT:
      return t('measurement_labels.body_fat')
    case MeasurementEnum.VISCERAL_FAT:
      return t('measurement_labels.visceral_fat')
    case MeasurementEnum.MUSCLES:
      return t('measurement_labels.muscles')
    case MeasurementEnum.PROTEIN:
      return t('measurement_labels.protein')
    case MeasurementEnum.WATER:
      return t('measurement_labels.water')
    case MeasurementEnum.BONE_TISSUE:
      return t('measurement_labels.bone_tissue')
    case MeasurementEnum.BMI:
      return t('measurement_labels.bmi')
    case MeasurementEnum.BMR:
      return t('measurement_labels.bmr')
    case MeasurementEnum.METABOLIC_AGE:
      return t('measurement_labels.metabolic_age')
    case MeasurementEnum.BODY_RATING:
      return t('measurement_labels.body_rating')
    default:
      return ''
  }
}
