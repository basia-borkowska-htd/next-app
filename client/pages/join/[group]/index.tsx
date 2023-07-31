import { api } from '@/api'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { ErrorComponent } from '@/components/error'
import { PageLoaderComponent } from '@/components/pageLoader'
import withPrivateRoute from '@/components/withPrivateRoute'

import { useTranslate } from '@/hooks/useTranslate'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

// TODO add safety features
// - check if user is logged in
// - check if userId is same as logged in user
// - send groupId hashed

const JoinGroupPage = () => {
  const { t } = useTranslate()
  const router = useRouter()
  const { group: groupId, userId } = router.query

  const addMemberMutation = useMutation({
    mutationFn: () => api.group.addGroupMember(groupId.toString(), userId.toString()),
    onSuccess: () => {
      router.push(Pathnames.home)
      notify({ type: 'success', message: t('users.public_groups.join_success') })
    },
  })

  useEffect(() => {
    if (groupId && userId) {
      addMemberMutation.mutate()
    }
  }, [groupId, userId])

  if (addMemberMutation.isLoading) return <PageLoaderComponent />
  if (addMemberMutation.error) return <ErrorComponent title={addMemberMutation.error.toString()} />

  return null
}

export default withPrivateRoute(JoinGroupPage)
