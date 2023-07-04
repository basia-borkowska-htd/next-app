import { api } from '@/api'
import { Tabs } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/router'

import { queryClient } from '@/pages/_app'

import { ContainerComponent } from '@/components/container'
import { ErrorComponent } from '@/components/error'
import { MeasurementModalComponent } from '@/components/modals/measurementModal'
import { PageLoaderComponent } from '@/components/pageLoader'

import { useTranslate } from '@/hooks/useTranslate'

import { MeasurementType } from '@/types/Measurement'

import { DashboardTabEnum } from '@/enums/DashboardTab.enum'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'

import { notify } from '@/utils/notifications'
import { Pathnames } from '@/utils/pathnames'

import { ChartsTabComponent } from './chartsTab'
import { HeaderComponent } from './header'
import { HistoryTabComponent } from './historyTab'

const DashboardPage = () => {
  const router = useRouter()
  const { userId, activeTab } = router.query
  const { t } = useTranslate()

  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryKey: [QueryKeyEnum.BASIC_USER],
    queryFn: () => api.user.getBasicUser(userId?.toString() || ''),
    enabled: router.isReady,
  })

  const [opened, { open, close }] = useDisclosure(false)
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
      <HeaderComponent userId={user._id} userName={user.name} userAvatar={user.avatarUrl} openModal={open} />
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
        color="blue-100"
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

export default DashboardPage
