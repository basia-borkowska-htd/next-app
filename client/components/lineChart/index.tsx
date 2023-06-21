import { ReactNode } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { CurveType } from 'recharts/types/shape/Curve'
// TODO remove mocked data
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
]
interface LineChartProps {
  type?: CurveType
  lineStroke?: string
  dataKeyX?: string
  withGrid?: boolean
  customTooltip?: ReactNode
  activeDot?: boolean
  withLegend?: boolean
}

export const LineChartComponent = ({
  withGrid = true,
  customTooltip,
  activeDot = true,
  withLegend = true,
  dataKeyX = 'name',
  type = 'monotone',
  lineStroke = 'blue',
}: LineChartProps) => {
  return (
    <ResponsiveContainer width={600} height={300}>
      <LineChart width={600} height={300} data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
        <Line type={type} dataKey="uv" stroke={lineStroke} dot={activeDot} />
        {withGrid && <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />}
        <XAxis dataKey={dataKeyX} />
        <YAxis />
        {customTooltip || <Tooltip />}
        {withLegend && <Legend />}
      </LineChart>
    </ResponsiveContainer>
  )
}
