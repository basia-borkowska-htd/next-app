import React, { ReactElement } from 'react'

import LayoutComponent from '@/components/layout'

export default (WrappedComponent) => {
  const HocComponent = (context) => <WrappedComponent {...context} />

  HocComponent.getLayout = (page: ReactElement) => <LayoutComponent>{page}</LayoutComponent>

  return HocComponent
}
