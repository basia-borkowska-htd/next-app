interface IconProps {
  iconName: string
  compact?: boolean
}
export const IconComponent = ({ iconName, compact = false }: IconProps) => (
  <div
    className={`${
      compact ? 'w-6 h-6' : 'w-8 h-8'
    } bg-blue-300/20 rounded-full flex items-center justify-center text-blue-300`}
  >
    <i className={`ti ti-${iconName} ${compact ? 'text-mg' : 'text-2xl'}`} />
  </div>
)
