import { NotificationType } from '@/types/Notification'
import { createContext, ReactNode, useContext, useState } from 'react'

interface NotificationState {
  notification?: NotificationType
  setNotification: (item: NotificationType | undefined) => void
}

const NotificationStateContext = createContext<NotificationState | null>(null)

export const NotificationStateContextProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<NotificationType>()

  return (
    <NotificationStateContext.Provider value={{ notification, setNotification }}>
      {children}
    </NotificationStateContext.Provider>
  )
}

const useNotificationState = () => {
  const notificationState = useContext(NotificationStateContext)

  if (!notificationState) {
    throw new Error('You forgot about AccountStateContextProvider!')
  }

  return notificationState
}

export const useNotification = () => {
  const { notification, setNotification } = useNotificationState()

  const showSuccessNotification = (description: string) => {
    setNotification({
      description,
      variant: 'success',
    })
  }

  const showErrorNotification = (description: string) => {
    setNotification({
      description,
      variant: 'danger',
    })
  }

  const hideNotification = () => {
    setNotification(undefined)
  }

  return { notification, showSuccessNotification, showErrorNotification, hideNotification }
}
