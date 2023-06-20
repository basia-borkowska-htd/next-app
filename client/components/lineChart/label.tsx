interface LabelProps {
  x: number
  y: number
  stroke: any
  value: string
}

export const CustomizedLabel = ({ x, y, stroke, value }: LabelProps) => {
  return (
    <text x={x} y={y} dy={-4} fill={stroke} fontSize={10} textAnchor="middle">
      {value}
    </text>
  )
}
