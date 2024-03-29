import { Table } from '@mantine/core'
import { ReactNode } from 'react'

interface TableProps {
  headers: string[]
  children: ReactNode
}

export const TableComponent = ({ headers, children }: TableProps) => (
  <Table striped highlightOnHover>
    <thead>
      <tr>
        {headers.map((header, idx) => (
          <th key={`header-${header}-${idx}`}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
)
