import Router from 'next/router'
import React from 'react'

import { zeppLocalStorage } from '@/utils/localStorage'

const login = '/auth/signIn' // Define your login route address.

/**
 * Check user authentication and authorization
 * It depends on you and your auth service provider.
 * @returns {{auth: null}}
 */

export default (WrappedComponent) => {
  const HocComponent = ({ ...props }) => <WrappedComponent {...props} />

  HocComponent.getInitialProps = async (context) => {
    const userAuth = zeppLocalStorage().getSession()?.auth
    // Are you an authorized user or not?
    if (!userAuth) {
      // Handle server-side and client-side rendering.
      if (context.res) {
        context.res?.writeHead(302, {
          Location: login,
        })
        context.res?.end()
      } else {
        Router.replace(login)
      }
    } else if (WrappedComponent.getInitialProps) {
      const wrappedProps = await WrappedComponent.getInitialProps({ ...context, auth: userAuth })
      return { ...wrappedProps, userAuth }
    }

    return { userAuth }
  }

  return HocComponent
}
