import { Locale, useLocale } from '@/hooks/useLocale'
import { useTranslate } from '@/hooks/useTranslate'
import { Box, Center, SegmentedControl, Select } from '@mantine/core'

import { ModalComponent } from '../modal'
import { getAppearanceData, getLanguageData, getUnitSystemData } from './helpers'

interface SettingsModalProps {
  opened: boolean

  onClose: () => void
}

export const SettingsModalComponent = ({ opened, onClose }: SettingsModalProps) => {
  const { switchLocale, locale } = useLocale()
  const { t } = useTranslate()

  return (
    <ModalComponent opened={opened} onClose={onClose} title={t('user.settings.modal.title')}>
      <div className="flex flex-col gap-4 w-fit pb-4">
        <div className="flex flex-col gap-1">
          <strong>{t('user.settings.modal.language.title')}</strong>
          <Select
            value={locale}
            data={getLanguageData(t)}
            styles={({ colors }) => ({
              item: {
                '&[data-selected]': {
                  '&, &:hover': {
                    backgroundColor: colors['blue-100'][0],
                    color: colors.white,
                  },
                },
              },
            })}
            onChange={(lang) => switchLocale(lang as Locale)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <strong>{t('user.settings.modal.unit_system.title')}</strong>
          {/* TODO: handle unit system */}
          <SegmentedControl
            size="xs"
            data={getUnitSystemData(t)}
            color="blue-300"
            transitionDuration={500}
            transitionTimingFunction="linear"
          />
        </div>
        <div className="flex flex-col gap-1">
          <strong>{t('user.settings.modal.appearance_mode.title')}</strong>
          {/* TODO: handle appearance mode */}
          <SegmentedControl
            data={getAppearanceData(t).map(({ label, value, icon }) => ({
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
    </ModalComponent>
  )
}
