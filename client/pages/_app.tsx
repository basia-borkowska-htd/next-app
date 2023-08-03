import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { SessionProvider } from 'next-auth/react'
import { IntlProvider } from 'react-intl'

import { useLocale } from '@/hooks/useLocale'

import { AppPropsWithLayout } from '@/types/Layout'

import { theme } from '@/utils/theme'

export const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppPropsWithLayout) => {
  const { locale, messages } = useLocale()
  const getLayout = Component.getLayout ?? ((page) => page)

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <IntlProvider locale={locale as string} messages={messages}>
          <ReactQueryDevtools initialIsOpen={false} />
          <MantineProvider theme={theme} withCSSVariables withGlobalStyles withNormalizeCSS>
            <Notifications />
            {getLayout(<Component {...pageProps} />)}
          </MantineProvider>
        </IntlProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default App
