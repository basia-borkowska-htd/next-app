import { TranslationKey } from '@/lang/flattenMessages'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

export const useTranslate = () => {
  const { formatMessage } = useIntl()
  const t = useCallback(
    (key: TranslationKey, values?: Record<string, string>) => formatMessage({ id: key }, values),
    [formatMessage],
  )

  return { t }
}
