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
          pink: [
            '#ed6ea0',
            '#ed6ea0',
            '#ed6ea0',
            '#ed6ea0',
            '#ed6ea0',
            '#ed6ea0',
            '#ed6ea0',
            '#ed6ea0',
            '#ed6ea0',
            '#ed6ea0',
          ],
          peach: [
            '#ec8c69',
            '#ec8c69',
            '#ec8c69',
            '#ec8c69',
            '#ec8c69',
            '#ec8c69',
            '#ec8c69',
            '#ec8c69',
            '#ec8c69',
            '#ec8c69',
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
