import { ChartDataType } from '@/types/ChartData'
import { ReactNode } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CurveType } from 'recharts/types/shape/Curve'

interface ChartProps {
  data: ChartDataType[]
  type?: CurveType
  lineStroke?: string
  lineDataKey?: string
  xDataKey?: string
  yDataKey?: string
  withGrid?: boolean
  customTooltip?: ReactNode
  activeDot?: boolean
  withLegend?: boolean
}

export const ChartComponent = ({
  data,
  withGrid = true,
  customTooltip,
  activeDot = true,
  withLegend = false,
  lineDataKey = 'yAxis.value',
  yDataKey,
  xDataKey = 'xAxis',
  type = 'monotone',
  lineStroke = 'blue',
}: ChartProps) => {
  return (
    <ResponsiveContainer width={600} height={300}>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type={type} dataKey={lineDataKey} stroke={lineStroke} dot={activeDot} />
        {withGrid && <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />}
        <XAxis dataKey={xDataKey} />
        <YAxis dataKey={yDataKey} />
        {customTooltip || <Tooltip />}
        {withLegend && <Legend />}
      </LineChart>
    </ResponsiveContainer>
  )
}
