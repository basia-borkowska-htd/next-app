import { Box, MantineNumberSize, Modal, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'

interface ModalProps {
  opened: boolean
  title?: string
  size?: MantineNumberSize
  children: ReactNode

  onClose: () => void
}

export const ModalComponent = ({ opened, title, size, onClose, children }: ModalProps) => {
  const theme = useMantineTheme()

  return (
    <Modal
      size={size}
      opened={opened}
      onClose={onClose}
      title={<strong className="m-0 text-xl">{title}</strong>}
      overlayProps={{
        color: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
      closeButtonProps={{ size: 'md' }}
      centered
    >
      <Box>{children}</Box>
    </Modal>
  )
}
