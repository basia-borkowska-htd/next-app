import { MultiSelect } from '@mantine/core'
import { useState } from 'react'

interface CreatableProps {
  className: string
  label: string
  placeholder: string
}

export const CreatableComponent = ({ className, label, placeholder }: CreatableProps) => {
  const [data, setData] = useState([])

  const handleCreate = (query) => {
    const item = { value: query, label: query }
    setData((current) => [...current, item])
    return item
  }

  return (
    <MultiSelect
      className={className}
      label={label}
      data={data}
      placeholder={placeholder}
      getCreateLabel={(query) => query}
      onCreate={handleCreate}
      searchable
      creatable
      clearable
    />
  )
}
