import { Radio } from '@mantine/core'
import React from 'react'

import { useTranslate } from '@/hooks/useTranslate'

import { TimePeriodEnum } from '@/enums/TimePeriod.enum'

interface TimePeriodSelectorPtops {
  period: string
  setPeriod: (value: TimePeriodEnum) => void
}

export const TimePeriodSelectorComponent = ({ period, setPeriod }: TimePeriodSelectorPtops) => {
  const { t } = useTranslate()
  return (
    <Radio.Group
      className="flex flex-col gap-5"
      value={period}
      onChange={(value) => setPeriod(value as TimePeriodEnum)}
    >
      <Radio value={TimePeriodEnum.LAST_7_DAYS} label={t('chart.time_period.last_7_days')} color="blue-300" />
      <Radio value={TimePeriodEnum.LAST_30_DAYS} label={t('chart.time_period.last_30_days')} color="blue-300" />
      <Radio value={TimePeriodEnum.LAST_90_DAYS} label={t('chart.time_period.last_90_days')} color="blue-300" />
      <Radio value={TimePeriodEnum.ALL} label={t('chart.time_period.all')} color="blue-300" />
    </Radio.Group>
  )
}
