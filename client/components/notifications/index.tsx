import { notifications } from '@mantine/notifications'

interface NotificationProps {
  type: 'success' | 'error'
  message: string
}
export const Notifications = ({ type, message }: NotificationProps) => {
  if (type === 'success') {
    return notifications.show({
      title: 'Success',
      color: 'green',
      message,
    })
  }
  if (type === 'error') {
    return notifications.show({
      title: 'Error',
      color: 'red',
      message,
    })
  }
  return null
}
