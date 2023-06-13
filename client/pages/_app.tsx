import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
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
        },
      }}
      withCSSVariables
      withGlobalStyles
      withNormalizeCSS
    >
      <Notifications />
      <Component {...pageProps} />
    </MantineProvider>
  )
}
