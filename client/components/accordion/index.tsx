import { Accordion } from '@mantine/core'
import { ReactNode } from 'react'

interface AccordionProps {
  defaultOpened: string[]
  children: ReactNode
}
export const AccordionComponent = ({ children, defaultOpened }: AccordionProps) => (
  <Accordion defaultValue={defaultOpened} chevronPosition="left" transitionDuration={1000} multiple>
    {children}
  </Accordion>
)
