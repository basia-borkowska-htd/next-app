/* eslint-disable react/destructuring-assignment */
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React, { ReactElement } from 'react'

import LayoutComponent from '@/components/layout'

const login = '/auth/signIn'

export default (WrappedComponent) => {
  const HocComponent = (context) => <WrappedComponent {...context} />
  HocComponent.getLayout = (page: ReactElement) => <LayoutComponent>{page}</LayoutComponent>

  return HocComponent
}
