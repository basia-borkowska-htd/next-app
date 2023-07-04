import { useLocale } from '@/hooks/useLocale'
import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import type { AppProps } from 'next/app'
import { IntlProvider } from 'react-intl'

export const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => {
  const { locale, messages } = useLocale()

  return (
    <QueryClientProvider client={queryClient}>
      <IntlProvider locale={locale as string} messages={messages}>
        <ReactQueryDevtools initialIsOpen />
        <MantineProvider
          theme={{
            colors: {
              // TODO figure out shades https://mantine.dev/theming/colors/
              'green-100': [
                '#D9ED92',
                '#D9ED92',
                '#D9ED92',
                '#D9ED92',
                '#D9ED92',
                '#D9ED92',
                '#D9ED92',
                '#D9ED92',
                '#D9ED92',
                '#D9ED92',
              ],
              'green-200': [
                '#A8DB93',
                '#A8DB93',
                '#A8DB93',
                '#A8DB93',
                '#A8DB93',
                '#A8DB93',
                '#A8DB93',
                '#A8DB93',
                '#A8DB93',
                '#A8DB93',
              ],
              'green-300': [
                '#76C893',
                '#76C893',
                '#76C893',
                '#76C893',
                '#76C893',
                '#76C893',
                '#76C893',
                '#76C893',
                '#76C893',
                '#76C893',
              ],
              'blue-100': [
                '#52b69a',
                '#52b69a',
                '#52b69a',
                '#52b69a',
                '#52b69a',
                '#52b69a',
                '#52b69a',
                '#52b69a',
                '#52b69a',
              ],
              'blue-200': [
                '#34A0A4',
                '#34A0A4',
                '#34A0A4',
                '#34A0A4',
                '#34A0A4',
                '#34A0A4',
                '#34A0A4',
                '#34A0A4',
                '#34A0A4',
                '#34A0A4',
              ],
              'blue-300': [
                '#0E2C44',
                '#0E2C44',
                '#0E2C44',
                '#0E2C44',
                '#0E2C44',
                '#0E2C44',
                '#0E2C44',
                '#0E2C44',
                '#0E2C44',
                '#0E2C44',
              ],
            },
          }}
          withCSSVariables
          withGlobalStyles
          withNormalizeCSS
        >
          <Notifications />
          <Component {...pageProps} />
        </MantineProvider>
      </IntlProvider>
    </QueryClientProvider>
  )
}

export default App
