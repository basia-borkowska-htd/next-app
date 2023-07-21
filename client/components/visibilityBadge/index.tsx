import { Badge } from '@mantine/core'

import { useTranslate } from '@/hooks/useTranslate'

import { VisibilityEnum } from '@/enums/Visibility.enum'

interface VisibilityBadgeProps {
  visibility: VisibilityEnum
}
export const VisibilityBadgeComponent = ({ visibility }: VisibilityBadgeProps) => {
  const { t } = useTranslate()
  const isPublic = visibility === VisibilityEnum.PUBLIC

  return (
    <Badge radius="sm" size="sm" color={isPublic ? 'lime' : 'violet'}>
      {isPublic ? t('visibility_badge.public') : t('visibility_badge.private')}
    </Badge>
  )
}
