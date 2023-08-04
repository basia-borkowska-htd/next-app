import { TooltipProps } from 'recharts'

export const TooltipComponent = ({ label, labelFormatter, payload }: TooltipProps<number, string>) => {
  // TODO: try using lodash
  if (!payload?.length) return null

  return (
    <div className="bg-white py-2 px-4 rounded-xl	">
      <div>{labelFormatter ? labelFormatter(label, payload) : undefined}</div>
      <div className="flex flex-col">
        <p className="font-bold p-0">{`${payload[0].payload.yAxis.value} ${payload[0].payload.yAxis.unit}`}</p>
      </div>
    </div>
  )
}
