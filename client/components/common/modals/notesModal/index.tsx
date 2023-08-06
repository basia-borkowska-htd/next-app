import { useEffect, useState } from 'react'

import { useTranslate } from '@/hooks/useTranslate'

import { MeasurementsNoteEnum } from '@/enums/MeasurementNote.enum'

import { icons } from '@/utils/icons'

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
            title={icons.getNotesIconLabel(key, t)}
            iconName={icons.getNotesIconName(key)}
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
