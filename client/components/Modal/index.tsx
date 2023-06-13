import { Box, Modal, useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'

interface ModalProps {
  opened: boolean
  title?: string
  children: ReactNode

  onClose: () => void
}

export const ModalComponent = ({ opened, title, onClose, children }: ModalProps) => {
  const theme = useMantineTheme()

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={<h3 className="m-0">{title}</h3>}
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
