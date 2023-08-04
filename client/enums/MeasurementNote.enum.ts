import { TranslationKey } from '@/lang/flattenMessages'

export enum MeasurementsNoteEnum {
  ALCOHOL = 'alcohol',
  STRESS = 'stress',
  SICKNESS = 'sickness',
  TRAVEL = 'travel',
  MENSTRUATION = 'menstruation',
  SLEEP_DEPRIVATION = 'sleepDeprivation',
  WATER_DEPLETION = 'waterDepletion',
}

export const getNoteLabel = (note: MeasurementsNoteEnum, t: (key: TranslationKey) => string): string => {
  switch (note) {
    case MeasurementsNoteEnum.ALCOHOL:
      return t('notes_modal.alcohol')
    case MeasurementsNoteEnum.STRESS:
      return t('notes_modal.stress')
    case MeasurementsNoteEnum.SICKNESS:
      return t('notes_modal.sickness')
    case MeasurementsNoteEnum.TRAVEL:
      return t('notes_modal.travel')
    case MeasurementsNoteEnum.MENSTRUATION:
      return t('notes_modal.menstruation')
    case MeasurementsNoteEnum.SLEEP_DEPRIVATION:
      return t('notes_modal.sleep_deprivation')
    case MeasurementsNoteEnum.WATER_DEPLETION:
      return t('notes_modal.water_depletion')
    default:
      return ''
  }
}
