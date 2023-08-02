import { MultiSelect } from '@mantine/core'

interface CreatableProps {
  className: string
  label?: string
  placeholder: string
  values: string[]
  setValues: (newValue: string) => void
}

export const CreatableSelectComponent = ({ className, label, placeholder, values, setValues }: CreatableProps) => {
  const handleCreate = (query: string) => {
    const item = { value: query, label: query }
    setValues(item.value)
    return item
  }

  return (
    <MultiSelect
      className={className}
      label={label}
      data={values}
      placeholder={placeholder}
      getCreateLabel={(query) => query}
      onCreate={handleCreate}
      searchable
      creatable
      clearable
    />
  )
}
