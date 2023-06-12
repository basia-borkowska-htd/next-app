import '@/styles/globals.css'
import { MantineProvider } from '@mantine/core'
import type { AppProps } from 'next/app'
import { Notification } from '@mantine/core'
import { NotificationStateContextProvider, useNotification } from '@/hooks/useNotification'
import { IconCheck, IconX } from '@tabler/icons-react'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <NotificationStateContextProvider>
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
        <NotificationListener />
        <Component {...pageProps} />
      </MantineProvider>
    </NotificationStateContextProvider>
  )
}

const NotificationListener = () => {
  const { notification, hideNotification } = useNotification()

  return (
    <>
      {notification?.description && (
        <Notification
          w={350}
          h={75}
          onClose={hideNotification}
          title={notification.variant === 'success' ? 'Success' : 'Error'}
          icon={notification.variant === 'success' ? <IconCheck size="1.1rem" /> : <IconX size="1.1rem" />}
          color={notification.variant === 'success' ? 'green' : 'red'}
        >
          {notification.description}
        </Notification>
      )}
    </>
  )
}
