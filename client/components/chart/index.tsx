import { useMantineTheme } from '@mantine/core'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

import { ChartDataType } from '@/types/ChartData'

import { EmptyStateComponent } from '../emptyState'
import { TooltipComponent } from './tooltip'

interface ChartProps {
  data: ChartDataType[]
  color?: string
}

export const ChartComponent = ({ data, color }: ChartProps) => {
  const { colors } = useMantineTheme()
  const areaColor = color || colors['blue-200'][0]

  if (!data.length)
    return (
      <EmptyStateComponent
        title="No weight measurements"
        message="Add weight measurements to see them displayed on chart"
        compact
      />
    )

  return (
    <ResponsiveContainer width="60%" height={400}>
      <AreaChart data={data} margin={{ top: 20 }}>
        <defs>
          <linearGradient id="yAxis" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={areaColor} stopOpacity={0.8} />
            <stop offset="95%" stopColor={areaColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="xAxis" />
        <YAxis domain={[]} />
        <Tooltip labelFormatter={(value) => value} content={<TooltipComponent />} cursor />
        <Area
          type="monotone"
          dataKey="yAxis.value"
          stroke={areaColor}
          strokeWidth="3"
          fillOpacity="1"
          fill="url(#yAxis)"
          activeDot
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
