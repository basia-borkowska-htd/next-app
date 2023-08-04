import { ReactNode } from 'react'

import { NavBarComponent } from '@/components/common/navBar'

interface LayoutProps {
  children: ReactNode
}
const LayoutComponent = ({ children }: LayoutProps) => (
  <>
    <NavBarComponent />
    <main>{children}</main>
  </>
)
export default LayoutComponent
