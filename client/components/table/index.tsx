import { Table } from '@mantine/core'
import React, { ReactNode } from 'react'

interface TableProps {
  headers: string[]
  children: ReactNode
}

export const TableComponent = ({ headers, children }: TableProps) => (
  <Table striped highlightOnHover>
    <thead>
      <tr>
        {headers.map((header, idx) => (
          <th key={idx}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Table>
)
