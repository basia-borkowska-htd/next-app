import { ChartDataType } from '@/types/ChartData'
import { useMantineTheme } from '@mantine/core'
import { XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { TooltipComponent } from './tooltip'
import { EmptyStateComponent } from '../emptyState'
import { AxisDomain } from 'recharts/types/util/types'

interface ChartProps {
  data: ChartDataType[]
  yDomain?: AxisDomain
  color?: string
}

export const ChartComponent = ({ data, yDomain = [], color }: ChartProps) => {
  const { colors } = useMantineTheme()
  const areaColor = color || colors['blue-100'][0]

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
        <YAxis domain={yDomain} />
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
