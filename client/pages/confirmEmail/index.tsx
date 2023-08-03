import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { ErrorComponent } from '@/components/common/error'
import { PageLoaderComponent } from '@/components/common/pageLoader'
import withPrivateRoute from '@/components/common/withPrivateRoute'

import { useTranslate } from '@/hooks/useTranslate'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

const ConfirmEmailPage = () => {
  const { t } = useTranslate()
  const router = useRouter()
  const { data: session } = useSession()
  const { email } = router.query

  const verifyEmailMutation = useMutation({
    mutationFn: () => api.auth.verifyEmail(email.toString()),
    onSuccess: (account) => {
      session.account = account
      router.push(Pathnames.auth.completeProfile)
      notify({ type: 'success', message: t('auth.verify_email.verify_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('auth.verify_email.verify_error') })
    },
  })

  useEffect(() => {
    if (email) {
      verifyEmailMutation.mutate()
    }
  }, [email])

  if (verifyEmailMutation.isLoading) return <PageLoaderComponent />
  if (verifyEmailMutation.error) return <ErrorComponent title={verifyEmailMutation.error.toString()} />

  return null
}

export default withPrivateRoute(ConfirmEmailPage)
