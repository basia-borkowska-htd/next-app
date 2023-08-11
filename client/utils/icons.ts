import { TranslationKey } from '@/lang/flattenMessages'

import { MeasurementsNoteEnum } from '@/enums/MeasurementNote.enum'

export const icons = {
  getNotesIconName: (note: MeasurementsNoteEnum) => {
    switch (note) {
      case MeasurementsNoteEnum.ALCOHOL:
        return 'glass'
      case MeasurementsNoteEnum.SICKNESS:
        return 'vaccine'
      case MeasurementsNoteEnum.SLEEP_DEPRIVATION:
        return 'zzz'
      case MeasurementsNoteEnum.STRESS:
        return 'activity-heartbeat'
      case MeasurementsNoteEnum.WATER_DEPLETION:
        return 'droplet-half-2-filled'
      case MeasurementsNoteEnum.MENSTRUATION:
        return 'gender-female'
      case MeasurementsNoteEnum.TRAVEL:
        return 'plane-tilt'
      default:
        return ''
    }
  },
  // for color values to be dynamic they need to be added to the pattern in tailiwing.config.js
  getNotesIconColor: (note: MeasurementsNoteEnum) => {
    switch (note) {
      case MeasurementsNoteEnum.ALCOHOL:
        return 'bg-violet-300'
      case MeasurementsNoteEnum.SICKNESS:
        return 'bg-emerald-200'
      case MeasurementsNoteEnum.SLEEP_DEPRIVATION:
        return 'bg-blue-400'
      case MeasurementsNoteEnum.STRESS:
        return 'bg-red-400'
      case MeasurementsNoteEnum.WATER_DEPLETION:
        return 'bg-sky-200'
      case MeasurementsNoteEnum.MENSTRUATION:
        return 'bg-pink-200'
      case MeasurementsNoteEnum.TRAVEL:
        return 'bg-yellow-300'
      default:
        return ''
    }
  },
  getNotesIconLabel: (note: MeasurementsNoteEnum, t: (key: TranslationKey) => string): string => {
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
  },
}
