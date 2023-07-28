/* eslint-disable react/destructuring-assignment */
import { useSession } from 'next-auth/react'
import Router from 'next/router'
import React, { ReactElement } from 'react'

import LayoutComponent from '@/components/layout'

const login = '/auth/signIn'

export default (WrappedComponent) => {
  const HocComponent = (context) => {
    const { data: auth } = useSession()

    const getProps = async () => {
      if (!auth) {
        if (context.res) {
          context.res?.writeHead(302, {
            Location: login,
          })
          context.res?.end()
        } else {
          Router.replace(login)
        }
      } else if (WrappedComponent.getInitialProps) {
        const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth })
        return { ...wrappedProps, userAuth: auth }
      }
      return { auth }
    }
    return <WrappedComponent {...getProps()} />
  }

  HocComponent.getInitialProps = async (context) => context
  HocComponent.getLayout = (page: ReactElement) => <LayoutComponent>{page}</LayoutComponent>

  return HocComponent
}
