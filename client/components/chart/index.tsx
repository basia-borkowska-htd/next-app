import { ChartDataType } from '@/types/ChartData'
import { useMantineTheme } from '@mantine/core'
import { ReactNode } from 'react'
import { CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { CurveType } from 'recharts/types/shape/Curve'
import { TooltipComponent } from './tooltip'

interface ChartProps {
  data: ChartDataType[]
  type?: CurveType
  lineStroke?: string

  withGrid?: boolean
  customTooltip?: ReactNode
  withLegend?: boolean
}

export const ChartComponent = ({
  data,
  withGrid = false,
  customTooltip,
  withLegend = false,

  type = 'monotone',
  lineStroke,
}: ChartProps) => {
  const { colors } = useMantineTheme()
  const color = lineStroke || colors['blue-100'][0]

  return (
    <ResponsiveContainer width={600} height={300}>
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="yAxis" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.8} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="xAxis" />
        <YAxis />
        {withGrid && <CartesianGrid strokeDasharray="3 3" />}
        <Tooltip labelFormatter={(value) => value} content={<TooltipComponent />} cursor />
        {withLegend && <Legend />}
        <Area
          type={type}
          dataKey="yAxis.value"
          stroke={color}
          strokeWidth="3"
          fillOpacity="1"
          fill="url(#yAxis)"
          activeDot
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
