interface IconProps {
  name: string
  color?: string
  compact?: boolean
}
export const IconComponent = ({ name, color = 'bg-blue-300/20', compact = false }: IconProps) => (
  <div
    className={`${
      compact ? 'w-6 h-6' : 'w-8 h-8'
    } rounded-full flex items-center justify-center text-blue-300 ${color}`}
  >
    <i className={`ti ti-${name} ${compact ? 'text-mg' : 'text-2xl'}`} />
  </div>
)
