import { useEffect, useState } from 'react'

import { useTranslate } from '@/hooks/useTranslate'

import { MeasurementsNoteEnum, getNoteLabel } from '@/enums/MeasurementNote.enum'

import { ButtonComponent } from '../../button'
import { IconBadgeComponent } from '../../iconBadge'
import { ModalComponent } from '../modal'

interface NotesModalProps {
  opened: boolean
  loading: boolean
  notes?: MeasurementsNoteEnum[]

  onClose: () => void
  onSubmit: (notes: MeasurementsNoteEnum[]) => void
}

export const NotesModalComponent = ({ opened, loading, notes: initialNotes, onClose, onSubmit }: NotesModalProps) => {
  const { t } = useTranslate()

  const [notes, setNotes] = useState(initialNotes || [])
  const keys = Object.values(MeasurementsNoteEnum) as Array<MeasurementsNoteEnum>

  useEffect(() => {
    if (initialNotes) setNotes(initialNotes)
  }, [initialNotes])

  const updateNotesList = (note: MeasurementsNoteEnum, clicked: boolean) => {
    if (clicked) {
      setNotes((prev) => [...prev, note])
    } else {
      const newList = notes.filter((item) => item !== note)
      setNotes(newList)
    }
  }

  const getIconName = (note: MeasurementsNoteEnum) => {
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
  }

  const handleClose = () => {
    setNotes([])
    onClose()
  }

  const handleSubmit = () => {
    onSubmit(notes)
    onClose()
  }

  return (
    <ModalComponent opened={opened} onClose={handleClose} title={t('notes_modal.title')}>
      <div className="flex flex-wrap gap-3 mt-5 pb-5">
        {keys.map((key) => (
          <IconBadgeComponent
            key={key}
            clicked={notes.includes(key)}
            title={getNoteLabel(key, t)}
            iconName={getIconName(key)}
            onClick={(clicked) => updateNotesList(key, clicked)}
          />
        ))}
      </div>
      <div className="basis-1/4 flex gap-2 mt-5">
        <ButtonComponent variant="outline" onClick={handleClose}>
          {t('notes_modal.cancel_button')}
        </ButtonComponent>
        <ButtonComponent variant="gradient" loading={loading} onClick={handleSubmit}>
          {t('notes_modal.save_button')}
        </ButtonComponent>
      </div>
    </ModalComponent>
  )
}
