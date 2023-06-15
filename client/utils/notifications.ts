import { notifications } from '@mantine/notifications'

type NotificationType = {
  type: 'success' | 'error'
  message: string
}

export const notify = ({ type, message }: NotificationType) => {
  if (type === 'success') {
    notifications.show({
      title: 'Success',
      color: 'green',
      message,
    })
  } else {
    notifications.show({
      title: 'Error',
      color: 'red',
      message,
    })
  }
}
