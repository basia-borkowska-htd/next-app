import { TranslationKey } from '@/lang/flattenMessages'
import { useCallback } from 'react'
import { useIntl } from 'react-intl'

export const useTranslate = () => {
  const { formatMessage } = useIntl()
  const t = useCallback((key: TranslationKey) => formatMessage({ id: key }), [formatMessage])

  return { t }
}
