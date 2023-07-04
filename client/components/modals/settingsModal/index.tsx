import { Box, Center, SegmentedControl, Select } from '@mantine/core'

import { ButtonComponent } from '../../button'
import { ModalComponent } from '../modal'
import { APPEARANCE_MODE_DATA, LANGUAGE_DATA, UNIT_SYSTEM_DATA } from './helpers'

interface SettingsModalProps {
  opened: boolean
  loading: boolean

  onClose: () => void
  onSubmit: () => void
}

export const SettingsModalComponent = ({ opened, loading, onClose, onSubmit }: SettingsModalProps) => (
  <ModalComponent opened={opened} onClose={onClose} title="Settings">
    <div className="flex flex-col gap-4 w-fit pb-4">
      <div className="flex flex-col gap-1">
        <strong>Language</strong>
        {/* TODO: handle language change */}
        <Select placeholder="Language" data={LANGUAGE_DATA} />
      </div>
      <div className="flex flex-col gap-1">
        <strong>Unit system</strong>
        {/* TODO: handle unit system */}
        <SegmentedControl
          size="xs"
          data={UNIT_SYSTEM_DATA}
          color="blue-300"
          transitionDuration={500}
          transitionTimingFunction="linear"
        />
      </div>
      <div className="flex flex-col gap-1">
        <strong>Appearance mode</strong>
        {/* TODO: handle appearance mode */}
        <SegmentedControl
          data={APPEARANCE_MODE_DATA.map(({ label, value, icon }) => ({
            label: (
              <Center>
                {icon}
                <Box ml={10}>{label}</Box>
              </Center>
            ),
            value,
          }))}
          size="xs"
          color="blue-300"
          transitionDuration={500}
          transitionTimingFunction="linear"
        />
      </div>
    </div>
    <div className="basis-1/4 flex gap-2 mt-5">
      <ButtonComponent variant="outline" onClick={onClose}>
        Close
      </ButtonComponent>
      <ButtonComponent variant="gradient" loading={loading} onClick={onSubmit}>
        Save
      </ButtonComponent>
    </div>
  </ModalComponent>
)
