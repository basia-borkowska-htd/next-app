import { api } from '@/api'
import { Tabs } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useMemo } from 'react'

import { queryClient } from '@/pages/_app'

import { ContainerComponent } from '@/components/common/container'
import withPrivateRoute from '@/components/common/withPrivateRoute'

import { useTranslate } from '@/hooks/useTranslate'

import { MeasurementType } from '@/types/Measurement'
import { UserType } from '@/types/User'

import { DashboardTabEnum } from '@/enums/DashboardTab.enum'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

const ErrorComponent = dynamic(() => import('@/components/common/error').then((component) => component.ErrorComponent))
const PageLoaderComponent = dynamic(() =>
  import('@/components/common/pageLoader').then((component) => component.PageLoaderComponent),
)
const MeasurementModalComponent = dynamic(() =>
  import('@/components/common/modals/measurementModal').then((component) => component.MeasurementModalComponent),
)

const HeaderComponent = dynamic(() =>
  import('@/components/dashboard/header').then((component) => component.HeaderComponent),
)
const ChartsTabComponent = dynamic(() =>
  import('@/components/dashboard/chartsTab').then((component) => component.ChartsTabComponent),
)

const HistoryTabComponent = dynamic(() =>
  import('@/components/dashboard/historyTab').then((component) => component.HistoryTabComponent),
)

interface DashboardProps {
  sessionUser: UserType
}

const DashboardPage = ({ sessionUser }: DashboardProps) => {
  const router = useRouter()

  const { userId, activeTab } = router.query
  const [opened, { open, close }] = useDisclosure(false)
  const { t } = useTranslate()

  const editable = useMemo(() => sessionUser?._id === userId, [sessionUser?._id, userId])

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.BASIC_USER],
    queryFn: () => api.user.getBasicUser(userId?.toString() || ''),
    enabled: router.isReady,
  })

  const addMeasurementMutation = useMutation({
    mutationFn: (measurement: MeasurementType) => api.measurement.addMeasurement(measurement),
    onSuccess: async () => {
      await queryClient.refetchQueries({ stale: true })
      notify({ type: 'success', message: t('add_measurement.toast_success') })
    },
    onError: () => {
      notify({ type: 'error', message: t('add_measurement.toast_error') })
    },
  })

  if (!router.isReady || isLoading) return <PageLoaderComponent />
  if (!userId || error || !user || !activeTab) return <ErrorComponent />

  return (
    <ContainerComponent className="flex flex-col justify-between py-8">
      <HeaderComponent
        userId={user._id}
        userName={user.name}
        userAvatar={user.avatarUrl}
        openModal={open}
        editable={editable}
      />
      <MeasurementModalComponent
        opened={opened}
        userId={userId.toString()}
        onClose={close}
        onSubmit={addMeasurementMutation.mutate}
        loading={addMeasurementMutation.isLoading}
      />

      <Tabs
        value={activeTab.toString()}
        onTabChange={(value) =>
          router.push(
            Pathnames.dashboard
              .replace(':id', userId.toString())
              .replace(':activeTab', value || DashboardTabEnum.HISTORY),
          )
        }
        defaultValue={DashboardTabEnum.HISTORY}
        orientation="horizontal"
        color="blue-300"
      >
        <Tabs.List grow>
          <Tabs.Tab value={DashboardTabEnum.HISTORY}>{t('dashboard.tabs.history')}</Tabs.Tab>
          <Tabs.Tab value={DashboardTabEnum.CHARTS}>{t('dashboard.tabs.charts')}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value={DashboardTabEnum.HISTORY}>
          <HistoryTabComponent userId={userId.toString()} />
        </Tabs.Panel>
        <Tabs.Panel value={DashboardTabEnum.CHARTS}>
          <ChartsTabComponent userId={userId.toString()} />
        </Tabs.Panel>
      </Tabs>
    </ContainerComponent>
  )
}

export default withPrivateRoute(DashboardPage)
