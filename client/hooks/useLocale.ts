import en from '@/lang/en.json'
import { NestedMessagesInterface, flattenMessages } from '@/lang/flattenMessages'
import pl from '@/lang/pl.json'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'

export type Locale = 'en' | 'pl'

const messages: Record<Locale, NestedMessagesInterface> = {
  en,
  pl,
}

export const useLocale = () => {
  const router = useRouter()

  const flattenedMessages = useMemo(() => flattenMessages(messages[router.locale as keyof typeof messages]), [router])

  const switchLocale = useCallback(
    (locale: Locale) => {
      if (locale === router.locale) return

      const path = router.asPath
      // eslint-disable-next-line consistent-return
      return router.push(path, path, { locale })
    },
    [router],
  )
  return { locale: router.locale, switchLocale, messages: flattenedMessages }
}
