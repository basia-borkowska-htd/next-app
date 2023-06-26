import { Pathnames } from '@/utils/pathnames'
import { Tabs } from '@mantine/core'
import { useRouter } from 'next/router'

import { PageLoaderComponent } from '@/components/pageLoader'
import { ErrorComponent } from '@/components/error'
import { HistoryTabComponent } from './historyTab'
import { ChartsTabComponent } from './chartsTab'
import { DashboardTabEnum } from '@/enums/DashboardTab.enum'
import { useDisclosure } from '@mantine/hooks'
import { MeasurementModalComponent } from '@/components/measurementModal'
import { useMutation, useQuery } from '@tanstack/react-query'
import { MeasurementType } from '@/types/Measurement'
import { api } from '@/api'
import { notify } from '@/utils/notifications'
import { QueryKeyEnum } from '@/enums/QueryKey.enum'
import { HeaderComponent } from './header'
import { queryClient } from '@/pages/_app'
import { ContainerComponent } from '@/components/container'

const DashboardPage = () => {
  const router = useRouter()
  const { userId, activeTab } = router.query

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
      notify({ type: 'success', message: 'Measurement added successfully' })
    },
    onError: () => {
      notify({ type: 'error', message: 'Unable to add measurement' })
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
          <Tabs.Tab value={DashboardTabEnum.HISTORY}>History</Tabs.Tab>
          <Tabs.Tab value={DashboardTabEnum.CHARTS}>Charts</Tabs.Tab>
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
