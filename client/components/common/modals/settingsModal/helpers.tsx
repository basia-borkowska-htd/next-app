import { TranslationKey } from '@/lang/flattenMessages'
import { IconMoon, IconSunHigh } from '@tabler/icons-react'

export const getAppearanceData = (t: (key: TranslationKey) => string) => [
  {
    label: t('user.settings.modal.appearance_mode.light'),
    value: 'light',
    icon: <IconSunHigh size="1rem" />,
  },
  {
    label: t('user.settings.modal.appearance_mode.dark'),
    value: 'dark',
    icon: <IconMoon size="1rem" />,
  },
]
export const getUnitSystemData = (t: (key: TranslationKey) => string) => [
  {
    label: t('user.settings.modal.unit_system.metric'),
    value: 'metric',
  },
  {
    label: t('user.settings.modal.unit_system.imperial'),
    value: 'imperial',
  },
]
export const getLanguageData = (t: (key: TranslationKey) => string) => [
  {
    label: t('user.settings.modal.language.polish'),
    value: 'pl',
  },
  {
    label: t('user.settings.modal.language.english'),
    value: 'en',
  },
]
