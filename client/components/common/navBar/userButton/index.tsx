import { Group, Text, UnstyledButton } from '@mantine/core'
import { IconChevronDown } from '@tabler/icons-react'
import { ComponentPropsWithoutRef, forwardRef } from 'react'

import { AvatarComponent } from '@/components/common/avatar'

interface UserButtonProps extends ComponentPropsWithoutRef<'button'> {
  avatarUrl?: string
  name: string
  email: string
}

const UserButtonComponent = forwardRef<HTMLButtonElement, UserButtonProps>(
  ({ avatarUrl, name, email, ...others }: UserButtonProps, ref) => (
    <UnstyledButton
      ref={ref}
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.md,
      })}
      {...others}
    >
      <Group>
        <IconChevronDown size="1rem" color="white" />
        <AvatarComponent src={avatarUrl} compact />
        <div style={{ flex: 1 }}>
          <Text size="sm" weight={700} color="white">
            {name}
          </Text>
          <Text color="lightgray" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </UnstyledButton>
  ),
)

UserButtonComponent.displayName = 'UserButtonComponent'
export default UserButtonComponent
