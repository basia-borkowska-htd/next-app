import { Menu } from '@mantine/core'
import { IconDotsVertical, IconLogout, IconPencil, IconTrash, IconUserPlus } from '@tabler/icons-react'
import React from 'react'

import { useTranslate } from '@/hooks/useTranslate'

export const OptionsComponent = () => {
  const { t } = useTranslate()
  return (
    <Menu position="left-start">
      <Menu.Target>
        <IconDotsVertical />
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Label>{t('group.options.settings_label')}</Menu.Label>
        <Menu.Item icon={<IconUserPlus size={16} />} onClick={() => alert('TODO')}>
          {t('group.options.invite_member')}
        </Menu.Item>
        <Menu.Item icon={<IconPencil size={16} />} onClick={() => alert('TODO')}>
          {t('group.options.edit')}
        </Menu.Item>
        <Menu.Divider />
        <Menu.Label>{t('group.options.danger_zone_label')}</Menu.Label>
        <Menu.Item color="red" icon={<IconLogout size={16} />} onClick={() => alert('TODO')}>
          {t('group.options.leave')}
        </Menu.Item>
        <Menu.Item color="red" icon={<IconTrash size={16} />} onClick={() => alert('TODO')}>
          {t('group.options.delete')}
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}
